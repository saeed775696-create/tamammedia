const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("admin123", 10);
console.log("انسخ هذا الهاش بالكامل:");
console.log(hash);