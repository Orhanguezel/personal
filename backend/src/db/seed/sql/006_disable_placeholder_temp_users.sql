-- Disable legacy placeholder accounts that were only reachable through ALLOW_TEMP_LOGIN.
-- The update is intentionally conservative: accounts with any assigned role are left intact.

UPDATE users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
SET
  u.is_active = 0,
  u.reset_token = NULL,
  u.reset_token_expires = NULL,
  u.updated_at = NOW(3)
WHERE u.email IN (
  'mehmet@',
  'hostingisletmesi@',
  'mlhgs1@',
  'melihkececi@',
  'kececimelih@'
)
AND ur.user_id IS NULL;
