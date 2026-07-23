/**
 * أداة مساعدة لتوليد هاش bcrypt لكلمة مرور.
 * الاستخدام: node scripts/hash.js
 */
const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error("الاستخدام: node scripts/hash.js <password (8+ chars)>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("انسخ هذا الهاش بالكامل:");
console.log(hash);
