-- بيانات أولية لمسؤول لوحة التحكم
-- كلمة المرور الافتراضية: Tamam@2026
-- الهاش تم توليده عبر bcrypt بـ 10 rounds
-- يُنصح بشدة بتغيير كلمة المرور فور أول تسجيل دخول عبر `npm run create-admin`

INSERT INTO "User" (id, email, name, password, role)
VALUES (
  'cm_admin_seed',
  'admin@tamammedia.com',
  'Admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'admin'
)
ON CONFLICT (email) DO NOTHING;
