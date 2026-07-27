import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { ApiResponseHandler, requireAdmin, getActiveUser } from "@/lib/api";
import { ForbiddenError, NotFoundError } from "@/lib/api/errors";
import { prisma } from "@/lib/prisma";
import { updateEditorSchema } from "@/lib/validations";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  mustChangePassword: true,
  lastLoginAt: true,
  passwordChangedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const input = updateEditorSchema.parse(await request.json());
    const { id } = await params;
    const actor = await getActiveUser();
    if (!actor) throw new Error("Active administrator session is required");

    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, email: true },
    });
    if (!target) throw new NotFoundError("User not found");
    if (target.role !== "editor") {
      throw new ForbiddenError("Only editor accounts can be managed here");
    }

    const password = input.temporaryPassword
      ? await bcrypt.hash(input.temporaryPassword, 12)
      : undefined;
    const [editor] = await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
          ...(password ? { password, mustChangePassword: true, sessionVersion: { increment: 1 } } : {}),
        },
        select: publicUserSelect,
      }),
      prisma.auditLog.create({
        data: {
          actorId: actor.id,
          targetUserId: id,
          action: password
            ? "EDITOR_PASSWORD_RESET"
            : input.isActive
              ? "EDITOR_ACCESS_ENABLED"
              : "EDITOR_ACCESS_DISABLED",
          metadata: { email: target.email },
        },
      }),
    ]);

    return editor;
  }, { successMessage: "Editor account updated" });
}
