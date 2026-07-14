-- aspirant_kv: anonymous key-value store for The Perfect Aspirant page
-- Stores revision queue + error log per device (cookie-based anonymous ID)
CREATE TABLE IF NOT EXISTS aspirant_kv (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id  text        NOT NULL,
  key        text        NOT NULL,
  value      jsonb       NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(device_id, key)
);

ALTER TABLE aspirant_kv ENABLE ROW LEVEL SECURITY;

-- Each device can only read/write its own rows, matched via custom request header
DROP POLICY IF EXISTS "aspirant_kv_own_device" ON aspirant_kv;
CREATE POLICY "aspirant_kv_own_device" ON aspirant_kv
  FOR ALL
  USING (device_id = (current_setting('request.headers', true)::json->>'x-device-id'))
  WITH CHECK (device_id = (current_setting('request.headers', true)::json->>'x-device-id'));

GRANT ALL ON aspirant_kv TO anon;

-- Index for fast lookups by device + key
CREATE INDEX IF NOT EXISTS aspirant_kv_device_key ON aspirant_kv(device_id, key);
