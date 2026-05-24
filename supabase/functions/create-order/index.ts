import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLANS: Record<string, { amount: number }> = {
  monthly: { amount: 19900 },
  cycle:   { amount: 89900 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const body = await req.json();
    const plan: string = body.plan;
    if (!PLANS[plan]) return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400, headers: { ...CORS, "Content-Type": "application/json" } });

    const authHeader = req.headers.get("Authorization") || "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data, error: authError } = await supabase.auth.getUser();
    if (authError || !data.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...CORS, "Content-Type": "application/json" } });

    const user = data.user;
    const keyId     = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const amount    = PLANS[plan].amount;
    const receipt   = "inicet_" + user.id.slice(0, 8) + "_" + Date.now();

    const orderBody = JSON.stringify({ amount, currency: "INR", receipt, notes: { plan, userId: user.id } });
    const credentials = btoa(keyId + ":" + keySecret);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "Authorization": "Basic " + credentials, "Content-Type": "application/json" },
      body: orderBody,
    });

    if (!rzpRes.ok) return new Response(JSON.stringify({ error: "Failed to create order" }), { status: 502, headers: { ...CORS, "Content-Type": "application/json" } });

    const order = await rzpRes.json();
    return new Response(JSON.stringify({ orderId: order.id, amount, currency: "INR", keyId }), { headers: { ...CORS, "Content-Type": "application/json" } });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500, headers: { ...CORS, "Content-Type": "application/json" } });
  }
});
