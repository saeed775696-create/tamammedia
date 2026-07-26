import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { ApiResponseHandler, getActiveUser } from "@/lib/api";
import { UnauthorizedError, ValidationError } from "@/lib/api/errors";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  return ApiResponseHandler.handle(request, async () => {
    const actor = await getActiveUser();
    if (!actor) throw new UnauthorizedError();

    const parsedInput = changePasswordSchema.safeParse(await request.json());
    if (!parsedInput.success) {
      throw new ValidationError(
        "كلمة المرور الجديدة يجب أن تضم 12 حرفًا على الأقل، وحرفًا إنجليزيًا كبيرًا وصغيرًا، ورقمًا، ورمزًا خاصًا، وأن تختلف عن كلمة المرور المؤقتة."
      );
    }
    const input = parsedInput.data;
    const user = await prisma.user.findUnique({ where: { id: actor.id } });
    if (!user?.isActive) throw new UnauthorizedError();

    const isCurrentPasswordValid = await bcrypt.compare(input.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new ValidationError("Current password is incorrect");
    }

    const password = await bcrypt.hash(input.newPassword, 12);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: actor.id },
        data: {
          password,
          mustChangePassword: false,
          passwordChangedAt: new Date(),
          sessionVersion: { increment: 1 },
        },
      }),
      prisma.auditLog.create({
        data: {
          actorId: actor.id,
          targetUserId: actor.id,
          action: "PASSWORD_CHANGED",
        },
      }),
    ]);

    return { success: true };
  }, { successMessage: "Password changed" });
}
