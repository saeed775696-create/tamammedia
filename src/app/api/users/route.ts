import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { ApiResponseHandler, requireAdmin, getActiveUser } from "@/lib/api";
import { ConflictError } from "@/lib/api/errors";
import { prisma } from "@/lib/prisma";
import { createEditorSchema } from "@/lib/validations";

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

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const users = await prisma.user.findMany({
      select: publicUserSelect,
      orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    });
    return { items: users };
  });
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const input = createEditorSchema.parse(await request.json());
    const actor = await getActiveUser();
    if (!actor) throw new Error("Active administrator session is required");

    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictError("An account already exists for this email");

    const password = await bcrypt.hash(input.temporaryPassword, 12);
    const editorId = randomUUID();
    const [editor] = await prisma.$transaction([
      prisma.user.create({
        data: {
          id: editorId,
          email: input.email,
          name: input.name || null,
          password,
          role: "editor",
          isActive: true,
          mustChangePassword: true,
        },
        select: publicUserSelect,
      }),
      prisma.auditLog.create({
        data: {
          actorId: actor.id,
          targetUserId: editorId,
          action: "EDITOR_CREATED",
          metadata: { email: input.email },
        },
      }),
    ]);

    return editor;
  }, { status: 201, successMessage: "Editor account created" });
}
