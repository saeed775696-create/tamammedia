import { createHash, randomInt, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ApiResponseHandler, getActiveUser } from "@/lib/api";
import { AppError, ConflictError, UnauthorizedError, ValidationError } from "@/lib/api/errors";
import { getClientIp, rateLimit } from "@/lib/api/rate-limit";
import { sendAccountEmailChangeCode } from "@/lib/email.server";
import { prisma } from "@/lib/prisma";
import { changeAccountEmailSchema } from "@/lib/validations";
import { authConfig } from "@/config/auth";

const EMAIL_CHANGE_TTL_MS = 10 * 60 * 1000;

function hashCode(code: string) {
  return createHash("sha256").update(`${code}:${authConfig.secret}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`account-email-change:ip:${ip}`, { limit: 5, windowSeconds: 15 * 60 }))) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many requests. Please try again later." } },
      { status: 429 }
    );
  }

  return ApiResponseHandler.handle(request, async () => {
    const actor = await getActiveUser();
    if (!actor) throw new UnauthorizedError();
    if (!(await rateLimit(`account-email-change:user:${actor.id}`, { limit: 3, windowSeconds: 15 * 60 }))) {
      throw new AppError({ statusCode: 429, code: "RATE_LIMITED", message: "Too many requests. Please try again later." });
    }

    const parsedInput = changeAccountEmailSchema.safeParse(await request.json());
    if (!parsedInput.success) {
      throw new ValidationError("أدخل بريدًا إلكترونيًا صالحًا وكلمة المرور الحالية.");
    }
    const input = parsedInput.data;

    const user = await prisma.user.findUnique({
      where: { id: actor.id },
      select: { id: true, email: true, password: true, isActive: true },
    });
    if (!user?.isActive) throw new UnauthorizedError();

    if (!(await bcrypt.compare(input.currentPassword, user.password))) {
      throw new ValidationError("كلمة المرور الحالية غير صحيحة.");
    }
    if (input.email === user.email) {
      throw new ValidationError("هذا هو البريد الإلكتروني الحالي بالفعل.");
    }

    const existingAccount = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });
    if (existingAccount) {
      throw new ConflictError("هذا البريد الإلكتروني مستخدم لحساب آخر.");
    }

    const code = randomInt(100_000, 1_000_000).toString();
    const emailChangeId = randomUUID();
    const [, emailChange] = await prisma.$transaction([
      prisma.emailChangeCode.deleteMany({ where: { userId: user.id } }),
      prisma.emailChangeCode.create({
        data: {
          id: emailChangeId,
          userId: user.id,
          currentEmail: user.email,
          newEmail: input.email,
          codeHash: hashCode(code),
          expiresAt: new Date(Date.now() + EMAIL_CHANGE_TTL_MS),
        },
      }),
    ]);

    try {
      await sendAccountEmailChangeCode({ to: input.email, code });
    } catch {
      await prisma.emailChangeCode.delete({ where: { id: emailChange.id } }).catch(() => undefined);
      throw new AppError({
        statusCode: 503,
        code: "EMAIL_UNAVAILABLE",
        message: "تعذر إرسال رمز التأكيد حاليًا. حاول لاحقًا.",
      });
    }

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        targetUserId: user.id,
        action: "ACCOUNT_EMAIL_CHANGE_CODE_REQUESTED",
        metadata: { previousEmail: user.email, newEmail: input.email },
      },
    });

    return { accepted: true };
  }, { successMessage: "Verification code sent" });
}
