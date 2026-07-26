import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ApiResponseHandler } from "@/lib/api";
import { ValidationError } from "@/lib/api/errors";
import { getClientIp, rateLimit } from "@/lib/api/rate-limit";
import { authConfig } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { passwordResetConfirmSchema } from "@/lib/validations";

function hashCode(code: string) {
  return createHash("sha256").update(`${code}:${authConfig.secret}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`admin-password-confirm-ip:${ip}`, { limit: 10, windowSeconds: 15 * 60 }))) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
      { status: 429 }
    );
  }

  return ApiResponseHandler.handle(request, async () => {
    const input = passwordResetConfirmSchema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true, role: true, isActive: true },
    });
    if (!user || user.role !== "admin" || !user.isActive) {
      throw new ValidationError("Verification code is invalid or expired");
    }

    const reset = await prisma.passwordResetCode.findFirst({
      where: { userId: user.id, consumedAt: null },
      orderBy: { createdAt: "desc" },
    });
    if (!reset || reset.expiresAt <= new Date() || reset.attempts >= 5) {
      throw new ValidationError("Verification code is invalid or expired");
    }

    const suppliedHash = Buffer.from(hashCode(input.code), "utf8");
    const storedHash = Buffer.from(reset.codeHash, "utf8");
    const matches = suppliedHash.length === storedHash.length && timingSafeEqual(suppliedHash, storedHash);
    if (!matches) {
      await prisma.passwordResetCode.update({
        where: { id: reset.id },
        data: { attempts: { increment: 1 } },
      });
      throw new ValidationError("Verification code is invalid or expired");
    }

    const password = await bcrypt.hash(input.newPassword, 12);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password,
          mustChangePassword: false,
          passwordChangedAt: new Date(),
          sessionVersion: { increment: 1 },
        },
      }),
      prisma.passwordResetCode.update({
        where: { id: reset.id },
        data: { consumedAt: new Date() },
      }),
      prisma.auditLog.create({
        data: { actorId: user.id, targetUserId: user.id, action: "PASSWORD_RESET_BY_EMAIL" },
      }),
    ]);

    return { success: true };
  }, { successMessage: "Password reset successfully" });
}
