-- Replay protection: a Razorpay payment can only ever create one subscription row.
-- Without this, re-submitting the same orderId/paymentId/signature to
-- verify-payment would stack unlimited premium windows from a single payment.

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_payment_id_unique
  ON subscriptions (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL;
