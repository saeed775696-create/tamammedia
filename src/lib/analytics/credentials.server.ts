import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { GoogleServiceAccount } from "@/lib/validations/analytics.schema";

const ANALYTICS_CONNECTION_KEY = "google-analytics-connection";
const ENCRYPTION_CONTEXT = "tamammedia:google-analytics:v1";

type EncryptedValue = {
  version: 1;
  iv: string;
  authTag: string;
  ciphertext: string;
};

type StoredGoogleAnalyticsConnection = {
  version: 1;
  propertyId: string;
  clientEmail: string;
  projectId: string;
  credentials: EncryptedValue;
  updatedAt: string;
};

export type GoogleAnalyticsConnection = {
  propertyId: string;
  credentials: GoogleServiceAccount;
};

function encryptionKey() {
  const secret =
    process.env.ANALYTICS_ENCRYPTION_KEY?.trim() ||
    process.env.NEXTAUTH_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error(
      "ANALYTICS_ENCRYPTION_KEY or NEXTAUTH_SECRET must contain at least 32 characters"
    );
  }

  return createHash("sha256")
    .update(`${ENCRYPTION_CONTEXT}:${secret}`, "utf8")
    .digest();
}

function encrypt(value: string): EncryptedValue {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  cipher.setAAD(Buffer.from(ENCRYPTION_CONTEXT, "utf8"));
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  return {
    version: 1,
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

function decrypt(value: EncryptedValue): string {
  if (value.version !== 1) throw new Error("Unsupported encrypted value version");

  const decipher = createDecipheriv(
    "aes-256-gcm",
    encryptionKey(),
    Buffer.from(value.iv, "base64")
  );
  decipher.setAAD(Buffer.from(ENCRYPTION_CONTEXT, "utf8"));
  decipher.setAuthTag(Buffer.from(value.authTag, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(value.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

function parseStoredConnection(value: string | null | undefined) {
  if (!value) return null;

  const parsed = JSON.parse(value) as StoredGoogleAnalyticsConnection;
  if (
    parsed.version !== 1 ||
    !parsed.propertyId ||
    !parsed.clientEmail ||
    !parsed.projectId ||
    !parsed.credentials
  ) {
    throw new Error("Invalid Google Analytics connection record");
  }

  return parsed;
}

export async function getStoredGoogleAnalyticsConnection() {
  const record = await prisma.siteSetting.findUnique({
    where: { key: ANALYTICS_CONNECTION_KEY },
    select: { value: true, updatedAt: true },
  });

  if (!record?.value) return null;
  return {
    connection: parseStoredConnection(record.value),
    updatedAt: record.updatedAt,
  };
}

export async function loadGoogleAnalyticsConnection(): Promise<GoogleAnalyticsConnection | null> {
  const stored = await getStoredGoogleAnalyticsConnection();
  if (!stored?.connection) return null;

  return {
    propertyId: stored.connection.propertyId,
    credentials: JSON.parse(
      decrypt(stored.connection.credentials)
    ) as GoogleServiceAccount,
  };
}

export async function saveGoogleAnalyticsConnection(
  propertyId: string,
  credentials: GoogleServiceAccount
) {
  const now = new Date().toISOString();
  const stored: StoredGoogleAnalyticsConnection = {
    version: 1,
    propertyId,
    clientEmail: credentials.client_email,
    projectId: credentials.project_id,
    credentials: encrypt(JSON.stringify(credentials)),
    updatedAt: now,
  };

  await prisma.siteSetting.upsert({
    where: { key: ANALYTICS_CONNECTION_KEY },
    create: {
      id: ANALYTICS_CONNECTION_KEY,
      key: ANALYTICS_CONNECTION_KEY,
      value: JSON.stringify(stored),
      category: "integration",
    },
    update: {
      value: JSON.stringify(stored),
      category: "integration",
    },
  });
}

export async function deleteGoogleAnalyticsConnection() {
  await prisma.siteSetting.deleteMany({
    where: { key: ANALYTICS_CONNECTION_KEY },
  });
}
