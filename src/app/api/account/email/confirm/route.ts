import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseHandler, getActiveUser } from "@/lib/api";
import { ConflictError, UnauthorizedError, ValidationError } from "@/lib/api/errors";
import { getClientIp, rateLimit } from "@/lib/api/rate-limit";
import { sendAccountEmailChangedNotice } from "@/lib/email.server";
import { prisma } from "@/lib/prisma";
import { confirmAccountEmailSchema } from "@/lib/validations";
import { authConfig } from "@/config/auth";

function hashCode(code: string) {
  return createHash("sha256").update(`${code}:${authConfig.secret}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`account-email-confirm:ip:${ip}`, { limit: 10, windowSeconds: 15 * 60 }))) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
      { status: 429 }
    );
  }

  return ApiResponseHandler.handle(request, async () => {
    const actor = await getActiveUser();
    if (!actor) throw new UnauthorizedError();

    const parsedInput = confirmAccountEmailSchema.safeParse(await request.json());
    if (!parsedInput.success) throw new ValidationError("رمز التأكيد غير صالح.");
    const input = parsedInput.data;

    const change = await prisma.emailChangeCode.findFirst({
      where: { userId: actor.id, newEmail: input.email, consumedAt: null },
      orderBy: { createdAt: "desc" },
    });
    if (!change || change.expiresAt <= new Date() || change.attempts >= 5) {
      throw new ValidationError("رمز التأكيد غير صالح أو منتهي الصلاحية.");
    }

    const suppliedHash = Buffer.from(hashCode(input.code), "utf8");
    const storedHash = Buffer.from(change.codeHash, "utf8");
    const matches = suppliedHash.length === storedHash.length && timingSafeEqual(suppliedHash, storedHash);
    if (!matches) {
      await prisma.emailChangeCode.update({
        where: { id: change.id },
        data: { attempts: { increment: 1 } },
      });
      throw new ValidationError("رمز التأكيد غير صالح أو منتهي الصلاحية.");
    }

    const existingAccount = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });
    if (existingAccount && existingAccount.id !== actor.id) {
      throw new ConflictError("هذا البريد الإلكتروني مستخدم لحساب آخر.");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: actor.id },
        data: { email: input.email, sessionVersion: { increment: 1 } },
      }),
      prisma.emailChangeCode.update({ where: { id: change.id }, data: { consumedAt: new Date() } }),
      prisma.passwordResetCode.deleteMany({ where: { userId: actor.id } }),
      prisma.auditLog.create({
        data: {
          actorId: actor.id,
          targetUserId: actor.id,
          action: "ACCOUNT_EMAIL_CHANGED",
          metadata: { previousEmail: change.currentEmail, newEmail: input.email },
        },
      }),
    ]);

    // A delivery failure must not roll back a completed, verified account change.
    await sendAccountEmailChangedNotice({ to: change.currentEmail, newEmail: input.email }).catch(() => undefined);

    return { email: input.email };
  }, { successMessage: "Account email changed" });
}
