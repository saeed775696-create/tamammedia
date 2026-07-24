import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "readline";

const prisma = new PrismaClient();

/**
 * ينشئ أو يحدّث حساب المسؤول.
 *
 * الاستخدام:
 *   npx tsx scripts/createAdmin.ts
 *
 * يطلب البريد وكلمة المرور تفاعليًا. إن لم تُوفَّر، يستخدم قيمًا افتراضية
 * (يُنصح بتغييرها فور أول تسجيل دخول).
 */
async function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log("=== إنشاء/تحديث حساب المسؤول ===\n");

  const defaultEmail = "admin@tamammedia.com";
  const email =
    (await ask(`البريد الإلكتروني [default: ${defaultEmail}]: `)) || defaultEmail;

  const password = await ask("كلمة المرور (8 أحرف على الأقل): ");
  if (password.length < 8) {
    console.error("✗ كلمة المرور قصيرة جدًا. الحد الأدنى 8 أحرف.");
    process.exit(1);
  }

  const name = (await ask("الاسم [default: Admin]: ")) || "Admin";

  const hashedPassword = await bcrypt.hash(password, 10);

  // upsert آمن بدلًا من deleteMany + create الذي كان يحذف المسؤول الحالي
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name,
      role: "admin",
    },
    create: {
      email,
      name,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("\n✅ تم حفظ حساب المسؤول بنجاح:");
  console.log(`   البريد: ${user.email}`);
  console.log(`   الاسم:  ${user.name}`);
  console.log(`   الدور:  ${user.role}`);
}

main()
  .catch((e) => {
    console.error("✗ فشل إنشاء المسؤول:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
