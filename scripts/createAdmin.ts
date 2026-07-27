import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "readline";
import { z } from "zod";
import { strongPasswordSchema } from "../src/lib/validations/user.schema";

const prisma = new PrismaClient();

/**
 * ينشئ أو يحدّث حساب المسؤول.
 *
 * الاستخدام:
 *   npx tsx scripts/createAdmin.ts
 *
 * يطلب البريد وكلمة المرور تفاعليًا ولا يستخدم بيانات اعتماد افتراضية.
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

  const emailResult = z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(254)
    .safeParse(await ask("البريد الإلكتروني: "));
  if (!emailResult.success) {
    console.error("✗ أدخل بريدًا إلكترونيًا صالحًا.");
    process.exit(1);
  }
  const email = emailResult.data;

  const passwordResult = strongPasswordSchema.safeParse(
    await ask("كلمة المرور (12 محرفًا مع حرف كبير وصغير ورقم ورمز): "),
  );
  if (!passwordResult.success) {
    console.error("✗ كلمة المرور لا تطابق سياسة الأمان المطلوبة.");
    process.exit(1);
  }
  const password = passwordResult.data;

  const name = (await ask("الاسم [default: Admin]: ")) || "Admin";

  const hashedPassword = await bcrypt.hash(password, 12);
  const passwordChangedAt = new Date();

  // upsert آمن بدلًا من deleteMany + create الذي كان يحذف المسؤول الحالي
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name,
      role: "admin",
      isActive: true,
      mustChangePassword: false,
      sessionVersion: { increment: 1 },
      passwordChangedAt,
    },
    create: {
      email,
      name,
      password: hashedPassword,
      role: "admin",
      isActive: true,
      mustChangePassword: false,
      passwordChangedAt,
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
