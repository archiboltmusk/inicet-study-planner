import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLAN_DAYS: Record<string, number>  = { monthly: 30,    cycle: 180   };
const PLAN_PAISE: Record<string, number> = { monthly: 19900, cycle: 89900 };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sigBuf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time comparison to avoid leaking signature bytes via timing
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const body      = await req.json();
    const orderId   = body.orderId   as string;
    const paymentId = body.paymentId as string;
    const signature = body.signature as string;

    if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
      return json({ error: "Missing payment fields" }, 400);
    }

    const authHeader = req.headers.get("Authorization") || "";
    const supabase   = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data, error: authError } = await supabase.auth.getUser();
    if (authError || !data.user) return json({ error: "Unauthorized" }, 401);
    const user = data.user;

    const keyId     = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const expected = await hmacHex(orderId + "|" + paymentId, keySecret);
    if (!timingSafeEqual(expected, signature)) return json({ error: "Invalid signature" }, 400);

    // Fetch the order from Razorpay — plan and amount come from the order we
    // created server-side, never from the client (a tampered request could
    // otherwise pay the monthly price and claim the 6-month plan).
    const orderRes = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: "Basic " + btoa(keyId + ":" + keySecret) },
    });
    if (!orderRes.ok) return json({ error: "Could not fetch order" }, 502);
    const order = await orderRes.json();

    const plan = order?.notes?.plan as string | undefined;
    if (!plan || !PLAN_DAYS[plan]) return json({ error: "Unknown plan on order" }, 400);
    if (order?.notes?.userId !== user.id) return json({ error: "Order does not belong to this user" }, 403);
    if (order?.amount !== PLAN_PAISE[plan]) return json({ error: "Order amount mismatch" }, 400);

    const adminSupabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Idempotency: if this payment was already recorded, return the existing window
    const { data: existing } = await adminSupabase
      .from("subscriptions")
      .select("expires_at")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();
    if (existing) return json({ success: true, expiresAt: existing.expires_at });

    // Extend from the user's current active expiry (so "Extend" actually stacks)
    const { data: current } = await adminSupabase
      .from("subscriptions")
      .select("expires_at")
      .eq("user_id", user.id)
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .order("expires_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const base = current && new Date(current.expires_at) > new Date()
      ? new Date(current.expires_at)
      : new Date();
    const expiresAt = new Date(base);
    expiresAt.setDate(expiresAt.getDate() + PLAN_DAYS[plan]);

    const { error: insertError } = await adminSupabase.from("subscriptions").insert({
      user_id:             user.id,
      plan,
      status:              "active",
      razorpay_order_id:   orderId,
      razorpay_payment_id: paymentId,
      amount_paise:        PLAN_PAISE[plan],
      expires_at:          expiresAt.toISOString(),
    });
    if (insertError) {
      // Unique violation = concurrent duplicate verify; treat as success
      if (insertError.code === "23505") {
        const { data: dup } = await adminSupabase
          .from("subscriptions")
          .select("expires_at")
          .eq("razorpay_payment_id", paymentId)
          .maybeSingle();
        if (dup) return json({ success: true, expiresAt: dup.expires_at });
      }
      return json({ error: "Failed to record subscription" }, 500);
    }

    return json({ success: true, expiresAt: expiresAt.toISOString() });
  } catch (_err) {
    return json({ error: "Internal error" }, 500);
  }
});
