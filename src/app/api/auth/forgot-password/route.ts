import { createHash, randomInt, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseHandler } from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/api/rate-limit";
import { authConfig } from "@/config/auth";
import { sendAdminPasswordResetCode } from "@/lib/email.server";
import { prisma } from "@/lib/prisma";
import { passwordResetRequestSchema } from "@/lib/validations";

const RESET_TTL_MS = 10 * 60 * 1000;

function hashCode(code: string) {
  return createHash("sha256").update(`${code}:${authConfig.secret}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`admin-password-reset-ip:${ip}`, { limit: 5, windowSeconds: 15 * 60 }))) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many requests. Please try again later." } },
      { status: 429 }
    );
  }

  return ApiResponseHandler.handle(request, async () => {
    const { email } = passwordResetRequestSchema.parse(await request.json());
    if (!(await rateLimit(`admin-password-reset-email:${email}`, { limit: 3, windowSeconds: 15 * 60 }))) {
      return { accepted: true };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true, isActive: true },
    });

    // A generic response is essential to prevent account enumeration.
    if (!user || user.role !== "admin" || !user.isActive) return { accepted: true };

    const code = randomInt(100_000, 1_000_000).toString();
    const resetId = randomUUID();
    const [, reset] = await prisma.$transaction([
      prisma.passwordResetCode.deleteMany({ where: { userId: user.id } }),
      prisma.passwordResetCode.create({
        data: {
          id: resetId,
          userId: user.id,
          email: user.email,
          codeHash: hashCode(code),
          expiresAt: new Date(Date.now() + RESET_TTL_MS),
        },
      }),
    ]);

    let deliveryFailed = false;
    try {
      await sendAdminPasswordResetCode({ to: user.email, code });
    } catch {
      deliveryFailed = true;
      await prisma.passwordResetCode.delete({ where: { id: reset.id } }).catch(() => undefined);
    }

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        targetUserId: user.id,
        action: "PASSWORD_RESET_CODE_REQUESTED",
        metadata: { deliveryFailed },
      },
    });

    return { accepted: true };
  }, { successMessage: "If the account is eligible, a verification code has been sent" });
}
