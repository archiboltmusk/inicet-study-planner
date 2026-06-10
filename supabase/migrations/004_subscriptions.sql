-- subscriptions: tracks Razorpay payments and premium access windows

CREATE TABLE IF NOT EXISTS subscriptions (
  id                  UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan                TEXT        NOT NULL CHECK (plan IN ('monthly', 'cycle')),
  status              TEXT        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  razorpay_order_id   TEXT        NOT NULL,
  razorpay_payment_id TEXT,
  amount_paise        INTEGER     NOT NULL,
  started_at          TIMESTAMPTZ DEFAULT now(),
  expires_at          TIMESTAMPTZ NOT NULL,
  created_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS subscriptions_expires_at_idx ON subscriptions (expires_at);

-- Row-level security: users can only read their own subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own subscriptions" ON subscriptions;
CREATE POLICY "Users read own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only the service role (Edge Functions) may insert/update
DROP POLICY IF EXISTS "Service role manages subscriptions" ON subscriptions;
CREATE POLICY "Service role manages subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');
