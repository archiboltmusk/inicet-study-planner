-- Enable Supabase Realtime on user_data so premium users get true cross-device sync.
-- UPDATE events already carry payload.new (full row); REPLICA IDENTITY FULL also
-- makes payload.old available on DELETE, consistent with mistake_logbook behaviour.

ALTER TABLE user_data REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE user_data;
