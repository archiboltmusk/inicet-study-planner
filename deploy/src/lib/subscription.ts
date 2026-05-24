import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export type Plan = "monthly" | "cycle";

export interface SubscriptionRow {
  id: string;
  plan: Plan;
  status: "active" | "expired" | "cancelled";
  expires_at: string;
  started_at: string;
}

export interface SubscriptionState {
  isPremium: boolean;
  daysLeft: number | null;
  plan: Plan | null;
  expiresAt: Date | null;
  loading: boolean;
  refresh: () => void;
}

export const PLANS = {
  monthly: { label: "Monthly Pulse", price: 199, days: 30, paise: 19900 },
  cycle:   { label: "INI-CET Cycle Pass", price: 899, days: 180, paise: 89900 },
} as const;

export function useSubscription(): SubscriptionState {
  const { user } = useAuth();
  const [row, setRow]       = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSub = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const now = new Date().toISOString();
    const { data } = await supabase
      .from("subscriptions")
      .select("id, plan, status, expires_at, started_at")
      .eq("user_id", user.id)
      .eq("status", "active")
      .gt("expires_at", now)
      .order("expires_at", { ascending: false })
      .limit(1)
      .single();
    setRow(data ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => { void fetchSub(); }, [fetchSub]);

  const expiresAt  = row ? new Date(row.expires_at) : null;
  const isPremium  = !!row && !!expiresAt && expiresAt > new Date();
  const daysLeft   = isPremium && expiresAt
    ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / 86_400_000))
    : null;

  return { isPremium, daysLeft, plan: row?.plan ?? null, expiresAt, loading, refresh: fetchSub };
}

// ── Razorpay checkout ─────────────────────────────────────────────────────────

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { email?: string; name?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

export interface CheckoutResult {
  success: boolean;
  error?: string;
  expiresAt?: string;
}

export async function startCheckout(
  plan: Plan,
  userEmail: string | undefined,
  session: { access_token: string } | null,
  onSuccess: (expiresAt: string) => void,
  onError: (msg: string) => void,
): Promise<void> {
  if (!session) { onError("Please sign in to subscribe."); return; }

  try {
    await loadRazorpayScript();
  } catch {
    onError("Could not load payment SDK. Check your internet connection.");
    return;
  }

  const authHeader = `Bearer ${session.access_token}`;
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
    ?? "https://fkqazoltrxmwlareblpi.supabase.co";

  // 1. Create order server-side
  const orderRes = await fetch(
    `${supabaseUrl}/functions/v1/create-order`,
    {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    }
  );

  if (!orderRes.ok) {
    const { error } = await orderRes.json().catch(() => ({ error: "Network error" }));
    onError(error ?? "Failed to create order.");
    return;
  }

  const { orderId, amount, currency, keyId } = await orderRes.json();

  // 2. Open Razorpay modal
  const rzp = new window.Razorpay({
    key: keyId,
    amount,
    currency,
    name: "INICET Planner",
    description: PLANS[plan].label,
    order_id: orderId,
    prefill: { email: userEmail },
    theme: { color: "#6366f1" },
    handler: async (response) => {
      // 3. Verify payment server-side
      const verifyRes = await fetch(
        `${supabaseUrl}/functions/v1/verify-payment`,
        {
          method: "POST",
          headers: { Authorization: authHeader, "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            plan,
          }),
        }
      );

      if (!verifyRes.ok) {
        const { error } = await verifyRes.json().catch(() => ({ error: "Verification failed" }));
        onError(error ?? "Payment verification failed. Contact support.");
        return;
      }

      const { expiresAt } = await verifyRes.json();
      onSuccess(expiresAt);
    },
    modal: { ondismiss: () => { /* user closed modal, no-op */ } },
  });

  rzp.open();
}
