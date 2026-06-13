import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@tamammedia.com";
  const password = "admin123"; // كلمة المرور الأصلية

  const hashedPassword = await bcrypt.hash(password, 10);

  // حذف المستخدم القديم لو موجود (اختياري)
  await prisma.user.deleteMany({ where: { email } });

  const user = await prisma.user.create({
    data: {
      email,
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ تم إنشاء المستخدم بنجاح:", user.email);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
