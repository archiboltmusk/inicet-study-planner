import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

async function verifyWebhookSignature(body: string, signature: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = Array.from(new Uint8Array(sigBuf)).map(b => b.toString(16).padStart(2, "0")).join("");
  return expected === signature;
}

serve(async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get("X-Razorpay-Signature") || "";
    const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || "";

    // An unset secret must hard-fail — otherwise anyone who computes an
    // HMAC with an empty key can forge refund events.
    if (!secret) {
      console.error("[webhook] RAZORPAY_WEBHOOK_SECRET is not configured");
      return new Response("Webhook not configured", { status: 500 });
    }

    const valid = await verifyWebhookSignature(body, signature, secret);
    if (!valid) {
      console.error("[webhook] Invalid signature");
      return new Response("Unauthorized", { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (eventType === "refund.created" || eventType === "refund.processed" || eventType === "refund.speed_changed") {
      const paymentId = event.payload?.refund?.entity?.payment_id;
      if (!paymentId) {
        console.warn("[webhook] No payment ID in refund event");
        return new Response("OK", { status: 200 });
      }

      const { error } = await adminSupabase
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("razorpay_payment_id", paymentId);

      if (error) {
        console.error("[webhook] Failed to cancel subscription:", error.message);
        return new Response("DB error", { status: 500 });
      }

      console.log("[webhook] Subscription cancelled for payment:", paymentId);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[webhook] Unexpected error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
