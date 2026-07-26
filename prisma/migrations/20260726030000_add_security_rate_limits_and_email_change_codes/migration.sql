CREATE TABLE IF NOT EXISTS "RateLimitBucket" (
  "key" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  "resetAt" TIMESTAMP(3) NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

CREATE INDEX IF NOT EXISTS "RateLimitBucket_resetAt_idx" ON "RateLimitBucket"("resetAt");

CREATE TABLE IF NOT EXISTS "EmailChangeCode" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "currentEmail" TEXT NOT NULL,
  "newEmail" TEXT NOT NULL,
  "codeHash" TEXT NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "consumedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailChangeCode_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "EmailChangeCode_userId_createdAt_idx" ON "EmailChangeCode"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "EmailChangeCode_newEmail_createdAt_idx" ON "EmailChangeCode"("newEmail", "createdAt");
CREATE INDEX IF NOT EXISTS "EmailChangeCode_expiresAt_idx" ON "EmailChangeCode"("expiresAt");
