-- 005_fedapay_webhook_events.sql
-- Idempotence des webhooks FedaPay et références marchandes uniques

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(128) UNIQUE,
  event_name VARCHAR(100),
  transaction_id VARCHAR(64),
  payload JSONB,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payment_webhook_events_tx ON payment_webhook_events(transaction_id);

ALTER TABLE payments ADD COLUMN IF NOT EXISTS merchant_reference VARCHAR(128);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS plan VARCHAR(32) DEFAULT 'monthly';

CREATE INDEX IF NOT EXISTS idx_payments_merchant_ref ON payments(merchant_reference);
