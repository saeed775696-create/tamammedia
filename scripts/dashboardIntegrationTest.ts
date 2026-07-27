import { createHash, randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

loadEnvConfig(process.cwd());

type JsonRecord = Record<string, unknown>;

type HttpResult = {
  status: number;
  text: string;
  json: JsonRecord | null;
};

type TestResult = {
  name: string;
  status: "passed" | "failed";
  durationMs: number;
  error?: string;
};

const prisma = new PrismaClient();
const baseUrl = process.env.DASHBOARD_TEST_BASE_URL || "http://localhost:3000";
const parsedBaseUrl = new URL(baseUrl);
const runId = randomUUID().replaceAll("-", "").slice(0, 12);
const runMarker = `E2E-${runId}`;
const startedAt = new Date();

if (process.env.RUN_DASHBOARD_INTEGRATION_TESTS !== "1") {
  throw new Error("Set RUN_DASHBOARD_INTEGRATION_TESTS=1 to run integration tests.");
}

if (process.env.ALLOW_SHARED_DATABASE_TESTS !== "1") {
  throw new Error("Set ALLOW_SHARED_DATABASE_TESTS=1 to permit isolated database test records.");
}

if (!["localhost", "127.0.0.1", "::1"].includes(parsedBaseUrl.hostname)) {
  throw new Error("Dashboard integration tests may only target a local application server.");
}

function asRecord(value: unknown): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected an object response.");
  }
  return value as JsonRecord;
}

function asArray(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error("Expected an array response.");
  return value;
}

function apiData(result: HttpResult): JsonRecord {
  return asRecord(result.json?.data);
}

function apiErrorCode(result: HttpResult) {
  const error = result.json?.error;
  return error && typeof error === "object" && !Array.isArray(error)
    ? String((error as JsonRecord).code || "")
    : "";
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertEqual(actual: unknown, expected: unknown, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, received ${String(actual)}`);
  }
}

function strongPassword() {
  return `Aa9!${randomUUID().replaceAll("-", "")}Zz`;
}

class CookieJar {
  private readonly cookies = new Map<string, string>();

  capture(headers: Headers) {
    const cookieHeaders = headers as Headers & { getSetCookie?: () => string[] };
    const values =
      cookieHeaders.getSetCookie?.() ||
      (headers.get("set-cookie") ? [headers.get("set-cookie") as string] : []);

    for (const value of values) {
      const firstPart = value.split(";", 1)[0];
      const separator = firstPart.indexOf("=");
      if (separator <= 0) continue;
      const name = firstPart.slice(0, separator);
      const cookieValue = firstPart.slice(separator + 1);
      if (cookieValue) this.cookies.set(name, cookieValue);
      else this.cookies.delete(name);
    }
  }

  header() {
    return [...this.cookies.entries()]
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  hasSession() {
    return [...this.cookies.keys()].some((name) => name.includes("session-token"));
  }
}

async function request(
  path: string,
  init: RequestInit = {},
  jar?: CookieJar
): Promise<HttpResult> {
  const headers = new Headers(init.headers);
  const cookie = jar?.header();
  if (cookie) headers.set("cookie", cookie);

  const response = await fetch(new URL(path, baseUrl), {
    ...init,
    headers,
    redirect: init.redirect || "manual",
    signal: init.signal || AbortSignal.timeout(30_000),
  });
  jar?.capture(response.headers);
  const text = await response.text();
  let json: JsonRecord | null = null;
  if (text && response.headers.get("content-type")?.includes("application/json")) {
    const parsed = JSON.parse(text) as unknown;
    json = asRecord(parsed);
  }
  return { status: response.status, text, json };
}

async function jsonRequest(
  path: string,
  method: string,
  body: unknown,
  jar?: CookieJar
) {
  return request(
    path,
    {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    },
    jar
  );
}

function expectStatus(result: HttpResult, status: number, context: string) {
  if (result.status !== status) {
    const code = apiErrorCode(result);
    const error = result.json?.error;
    const message =
      error && typeof error === "object" && !Array.isArray(error)
        ? String((error as JsonRecord).message || "")
        : "";
    throw new Error(
      `${context} returned ${result.status}, expected ${status}${code ? ` (${code})` : ""}${message ? `: ${message}` : ""}`
    );
  }
}

async function login(email: string, password: string) {
  const jar = new CookieJar();
  const csrfResult = await request("/api/auth/csrf", {}, jar);
  expectStatus(csrfResult, 200, "CSRF request");
  const csrfToken = String(csrfResult.json?.csrfToken || "");
  assert(csrfToken, "CSRF token was not returned.");

  const body = new URLSearchParams({
    csrfToken,
    email,
    password,
    callbackUrl: `${baseUrl}/dashboard`,
    json: "true",
  });
  const callback = await request(
    "/api/auth/callback/credentials",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    },
    jar
  );
  expectStatus(callback, 200, "Credentials callback");
  assert(jar.hasSession(), "Authentication did not issue a session cookie.");
  const callbackUrl = String(callback.json?.url || "");
  assert(!callbackUrl.includes("error="), "Authentication callback returned an error.");
  return jar;
}

const results: TestResult[] = [];
let failures = 0;

async function check(name: string, task: () => Promise<void>) {
  const started = Date.now();
  try {
    await task();
    results.push({ name, status: "passed", durationMs: Date.now() - started });
    console.log(`PASS ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown test failure";
    failures += 1;
    results.push({
      name,
      status: "failed",
      durationMs: Date.now() - started,
      error: message,
    });
    console.error(`FAIL ${name}: ${message}`);
  }
}

const cleanupIds = {
  services: new Set<string>(),
  partners: new Set<string>(),
  team: new Set<string>(),
  portfolio: new Set<string>(),
  contacts: new Set<string>(),
  users: new Set<string>(),
  whatsapp: new Set<string>(),
};

let uploadedStoragePath: string | null = null;
let siteSettingsSnapshot:
  | { id: string; key: string; value: string | null; category: string }
  | null
  | undefined;
let analyticsConnectionSnapshot:
  | { id: string; key: string; value: string | null; category: string }
  | null
  | undefined;

async function exerciseCrud({
  name,
  endpoint,
  createBody,
  updateBody,
  cleanupSet,
  readDatabase,
  verifyCreated,
  verifyUpdated,
  publicPath,
  publicMarker,
  jar,
}: {
  name: string;
  endpoint: string;
  createBody: JsonRecord;
  updateBody: JsonRecord;
  cleanupSet: Set<string>;
  readDatabase: (id: string) => Promise<JsonRecord | null>;
  verifyCreated: (row: JsonRecord) => void;
  verifyUpdated: (row: JsonRecord) => void;
  publicPath: string;
  publicMarker: string;
  jar: CookieJar;
}) {
  const createdResult = await jsonRequest(endpoint, "POST", createBody, jar);
  expectStatus(createdResult, 201, `${name} create`);
  const created = apiData(createdResult);
  const id = String(created.id || "");
  assert(id, `${name} create response did not include an id.`);
  cleanupSet.add(id);

  const createdRow = await readDatabase(id);
  assert(createdRow, `${name} was not persisted in the database.`);
  verifyCreated(createdRow);

  const listResult = await request(`${endpoint}?page=1&limit=100`, {}, jar);
  expectStatus(listResult, 200, `${name} list`);
  const items = asArray(apiData(listResult).items);
  assert(
    items.some((item) => asRecord(item).id === id),
    `${name} list did not contain the created record.`
  );

  const itemResult = await request(`${endpoint}/${id}`, {}, jar);
  expectStatus(itemResult, 200, `${name} read`);
  assertEqual(apiData(itemResult).id, id, `${name} read returned the wrong record`);

  const updatedResult = await jsonRequest(`${endpoint}/${id}`, "PUT", updateBody, jar);
  expectStatus(updatedResult, 200, `${name} update`);
  const updatedRow = await readDatabase(id);
  assert(updatedRow, `${name} disappeared after update.`);
  verifyUpdated(updatedRow);

  const publicResult = await request(publicPath);
  expectStatus(publicResult, 200, `${name} public page`);
  assert(
    publicResult.text.includes(publicMarker),
    `${name} update was not visible on ${publicPath}.`
  );

  const deletedResult = await request(`${endpoint}/${id}`, { method: "DELETE" }, jar);
  expectStatus(deletedResult, 200, `${name} delete`);
  assertEqual(await readDatabase(id), null, `${name} remained in the database after delete`);
  cleanupSet.delete(id);

  const missingResult = await request(`${endpoint}/${id}`, {}, jar);
  expectStatus(missingResult, 404, `${name} read after delete`);
}

async function restoreSnapshots() {
  if (siteSettingsSnapshot !== undefined) {
    if (siteSettingsSnapshot) {
      await prisma.siteSetting.upsert({
        where: { key: siteSettingsSnapshot.key },
        create: siteSettingsSnapshot,
        update: {
          value: siteSettingsSnapshot.value,
          category: siteSettingsSnapshot.category,
        },
      });
    } else {
      await prisma.siteSetting.deleteMany({ where: { key: "site-content" } });
    }
  }

  if (analyticsConnectionSnapshot !== undefined) {
    if (analyticsConnectionSnapshot) {
      await prisma.siteSetting.upsert({
        where: { key: analyticsConnectionSnapshot.key },
        create: analyticsConnectionSnapshot,
        update: {
          value: analyticsConnectionSnapshot.value,
          category: analyticsConnectionSnapshot.category,
        },
      });
    } else {
      await prisma.siteSetting.deleteMany({
        where: { key: "google-analytics-connection" },
      });
    }
  }
}

async function cleanup() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    const storage = createClient(supabaseUrl, supabaseKey).storage.from("images");
    if (uploadedStoragePath) {
      await storage.remove([uploadedStoragePath]);
    }
    const { data: testUploads } = await storage.list("integration-tests", {
      search: runId,
      limit: 100,
    });
    const paths = (testUploads || []).map(
      (item) => `integration-tests/${item.name}`
    );
    if (paths.length > 0) await storage.remove(paths);
  }

  await Promise.all([
    prisma.contactSubmission.deleteMany({
      where: { id: { in: [...cleanupIds.contacts] } },
    }),
    prisma.portfolioItem.deleteMany({
      where: { id: { in: [...cleanupIds.portfolio] } },
    }),
    prisma.service.deleteMany({
      where: { id: { in: [...cleanupIds.services] } },
    }),
    prisma.partner.deleteMany({
      where: { id: { in: [...cleanupIds.partners] } },
    }),
    prisma.teamMember.deleteMany({
      where: { id: { in: [...cleanupIds.team] } },
    }),
    prisma.whatsAppClick.deleteMany({
      where: { id: { in: [...cleanupIds.whatsapp] } },
    }),
  ]);

  const userIds = [...cleanupIds.users];
  const strayUsers = await prisma.user.findMany({
    where: {
      createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
      OR: [
        { name: { contains: runMarker } },
        { email: { contains: runId } },
      ],
    },
    select: { id: true },
  });
  for (const user of strayUsers) {
    if (!userIds.includes(user.id)) userIds.push(user.id);
  }
  if (userIds.length > 0) {
    await prisma.$transaction([
      prisma.passwordResetCode.deleteMany({ where: { userId: { in: userIds } } }),
      prisma.emailChangeCode.deleteMany({ where: { userId: { in: userIds } } }),
      prisma.auditLog.deleteMany({
        where: {
          OR: [
            { actorId: { in: userIds } },
            { targetUserId: { in: userIds } },
          ],
        },
      }),
      prisma.user.deleteMany({ where: { id: { in: userIds } } }),
    ]);
  }

  await Promise.all([
    prisma.contactSubmission.deleteMany({
      where: {
        createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
        name: { contains: runMarker },
      },
    }),
    prisma.service.deleteMany({
      where: {
        createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
        titleEn: { contains: runMarker },
      },
    }),
    prisma.partner.deleteMany({
      where: {
        createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
        name: { contains: runMarker },
      },
    }),
    prisma.teamMember.deleteMany({
      where: {
        createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
        name: { contains: runMarker },
      },
    }),
    prisma.portfolioItem.deleteMany({
      where: {
        createdAt: { gte: new Date(startedAt.getTime() - 60_000) },
        titleEn: { contains: runMarker },
      },
    }),
  ]);

  await restoreSnapshots();
}

async function main() {
  siteSettingsSnapshot = await prisma.siteSetting.findUnique({
    where: { key: "site-content" },
    select: { id: true, key: true, value: true, category: true },
  });
  analyticsConnectionSnapshot = await prisma.siteSetting.findUnique({
    where: { key: "google-analytics-connection" },
    select: { id: true, key: true, value: true, category: true },
  });

  let adminEmail = `dashboard-admin-${runId}@example.com`;
  let adminPassword = strongPassword();
  let adminId = "";
  let adminJar: CookieJar | null = null;

  await check("temporary administrator setup and authentication", async () => {
    const password = await bcrypt.hash(adminPassword, 12);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: runMarker,
        password,
        role: "admin",
        isActive: true,
        mustChangePassword: false,
      },
    });
    adminId = admin.id;
    cleanupIds.users.add(admin.id);
    adminJar = await login(adminEmail, adminPassword);

    const session = await request("/api/account/session", {}, adminJar);
    expectStatus(session, 200, "Admin session");
    assertEqual(apiData(session).role, "admin", "Admin session role");
  });

  if (!adminJar || !adminId) {
    throw new Error("Cannot continue without an authenticated temporary administrator.");
  }

  await check("authorization boundaries without a session", async () => {
    const users = await request("/api/users");
    expectStatus(users, 401, "Unauthenticated users endpoint");
    const settings = await request("/api/site-settings");
    expectStatus(settings, 401, "Unauthenticated settings endpoint");
    const createService = await jsonRequest("/api/services", "POST", {
      titleAr: runMarker,
      titleEn: runMarker,
      descriptionAr: runMarker,
      descriptionEn: runMarker,
    });
    expectStatus(createService, 401, "Unauthenticated service create");
  });

  await check("all administrator dashboard pages render", async () => {
    const pages = [
      "/dashboard",
      "/dashboard/account",
      "/dashboard/analytics",
      "/dashboard/contacts",
      "/dashboard/partners",
      "/dashboard/portfolio",
      "/dashboard/services",
      "/dashboard/settings",
      "/dashboard/team",
      "/dashboard/users",
    ];
    for (const path of pages) {
      const page = await request(path, {}, adminJar as CookieJar);
      expectStatus(page, 200, `Dashboard page ${path}`);
      assert(!page.text.includes("error=access-revoked"), `${path} redirected unexpectedly.`);
    }
  });

  await check("services create, list, update, public visibility, and delete", async () => {
    const updatedTitle = `${runMarker}-service-updated`;
    await exerciseCrud({
      name: "Service",
      endpoint: "/api/services",
      createBody: {
        titleAr: `${runMarker}-خدمة`,
        titleEn: `${runMarker}-service`,
        descriptionAr: "وصف اختبار التكامل",
        descriptionEn: "Integration test description",
        imageUrl: "/imgs/2-3.png",
        order: 999_901,
      },
      updateBody: { titleEn: updatedTitle, order: 999_902 },
      cleanupSet: cleanupIds.services,
      readDatabase: async (id) => {
        const row = await prisma.service.findUnique({ where: { id } });
        return row as unknown as JsonRecord | null;
      },
      verifyCreated: (row) => assertEqual(row.order, 999_901, "Service create order"),
      verifyUpdated: (row) => assertEqual(row.titleEn, updatedTitle, "Service update title"),
      publicPath: "/services",
      publicMarker: updatedTitle,
      jar: adminJar as CookieJar,
    });
  });

  await check("partners create, list, update, public visibility, and delete", async () => {
    const updatedName = `${runMarker}-partner-updated`;
    await exerciseCrud({
      name: "Partner",
      endpoint: "/api/partners",
      createBody: {
        name: `${runMarker}-partner`,
        imageUrl: "/imgs/2-3.png",
        website: "https://example.com",
        order: 999_911,
      },
      updateBody: { name: updatedName, order: 999_912 },
      cleanupSet: cleanupIds.partners,
      readDatabase: async (id) => {
        const row = await prisma.partner.findUnique({ where: { id } });
        return row as unknown as JsonRecord | null;
      },
      verifyCreated: (row) => assertEqual(row.order, 999_911, "Partner create order"),
      verifyUpdated: (row) => assertEqual(row.name, updatedName, "Partner update name"),
      publicPath: "/",
      publicMarker: updatedName,
      jar: adminJar as CookieJar,
    });
  });

  await check("team create, list, update, public visibility, and delete", async () => {
    const updatedName = `${runMarker}-team-updated`;
    await exerciseCrud({
      name: "Team member",
      endpoint: "/api/team",
      createBody: {
        name: `${runMarker}-team`,
        role: "Integration Tester",
        bio: "Temporary integration test record",
        imageUrl: "/imgs/2-3.png",
        order: 999_921,
      },
      updateBody: { name: updatedName, order: 999_922 },
      cleanupSet: cleanupIds.team,
      readDatabase: async (id) => {
        const row = await prisma.teamMember.findUnique({ where: { id } });
        return row as unknown as JsonRecord | null;
      },
      verifyCreated: (row) => assertEqual(row.order, 999_921, "Team create order"),
      verifyUpdated: (row) => assertEqual(row.name, updatedName, "Team update name"),
      publicPath: "/",
      publicMarker: updatedName,
      jar: adminJar as CookieJar,
    });
  });

  await check("portfolio create, list, update, public visibility, and delete", async () => {
    const updatedTitle = `${runMarker}-portfolio-updated`;
    await exerciseCrud({
      name: "Portfolio item",
      endpoint: "/api/portfolio",
      createBody: {
        titleAr: `${runMarker}-عمل`,
        titleEn: `${runMarker}-portfolio`,
        descriptionAr: "وصف اختبار التكامل",
        descriptionEn: "Integration test description",
        imageUrl: "/imgs/2-3.png",
        gallery: ["/imgs/2-3.png"],
        technologies: ["Next.js", "PostgreSQL"],
        category: "website",
        clientName: runMarker,
        link: "https://example.com",
        featured: false,
        order: 999_931,
      },
      updateBody: { titleEn: updatedTitle, featured: true, order: 999_932 },
      cleanupSet: cleanupIds.portfolio,
      readDatabase: async (id) => {
        const row = await prisma.portfolioItem.findUnique({ where: { id } });
        return row as unknown as JsonRecord | null;
      },
      verifyCreated: (row) => {
        assertEqual(row.order, 999_931, "Portfolio create order");
        assert(Array.isArray(row.gallery), "Portfolio gallery was not stored as JSON.");
      },
      verifyUpdated: (row) => {
        assertEqual(row.titleEn, updatedTitle, "Portfolio update title");
        assertEqual(row.featured, true, "Portfolio featured update");
      },
      publicPath: "/portfolio",
      publicMarker: updatedTitle,
      jar: adminJar as CookieJar,
    });
  });

  await check("contact submission lifecycle and dashboard visibility", async () => {
    const createdResult = await jsonRequest("/api/contacts", "POST", {
      name: `${runMarker} Contact`,
      email: `contact-${runId}@example.com`,
      phone: "967700000000",
      service: "integration-test",
      message: "Temporary integration test message",
      language: "ar",
    });
    expectStatus(createdResult, 201, "Contact create");
    const id = String(apiData(createdResult).id || "");
    assert(id, "Contact create response did not include an id.");
    cleanupIds.contacts.add(id);

    const databaseRow = await prisma.contactSubmission.findUnique({ where: { id } });
    assertEqual(databaseRow?.status, "new", "Contact initial status");

    const list = await request("/api/contacts?page=1&limit=100", {}, adminJar as CookieJar);
    expectStatus(list, 200, "Contact list");
    assert(
      asArray(apiData(list).items).some((item) => asRecord(item).id === id),
      "Created contact was not visible in the dashboard list."
    );

    const read = await request(`/api/contacts/${id}`, {}, adminJar as CookieJar);
    expectStatus(read, 200, "Contact read");

    const patched = await jsonRequest(
      `/api/contacts/${id}`,
      "PATCH",
      { status: "read" },
      adminJar as CookieJar
    );
    expectStatus(patched, 200, "Contact patch");
    assertEqual(
      (await prisma.contactSubmission.findUnique({ where: { id } }))?.status,
      "read",
      "Contact PATCH status"
    );

    const updated = await jsonRequest(
      `/api/contacts/${id}`,
      "PUT",
      { status: "replied" },
      adminJar as CookieJar
    );
    expectStatus(updated, 200, "Contact update");
    assertEqual(
      (await prisma.contactSubmission.findUnique({ where: { id } }))?.status,
      "replied",
      "Contact PUT status"
    );

    const deleted = await request(
      `/api/contacts/${id}`,
      { method: "DELETE" },
      adminJar as CookieJar
    );
    expectStatus(deleted, 200, "Contact delete");
    cleanupIds.contacts.delete(id);
    assertEqual(
      await prisma.contactSubmission.findUnique({ where: { id } }),
      null,
      "Contact remained after delete"
    );
  });

  await check("site settings update, public propagation, and restoration", async () => {
    const originalResult = await request("/api/site-settings", {}, adminJar as CookieJar);
    expectStatus(originalResult, 200, "Settings read");
    const original = apiData(originalResult);
    const modified = structuredClone(original);
    const homeAbout = asRecord(modified.homeAbout);
    const marker = `${runMarker}-settings`;
    homeAbout.eyebrowEn = marker;

    const saved = await jsonRequest(
      "/api/site-settings",
      "PUT",
      modified,
      adminJar as CookieJar
    );
    expectStatus(saved, 200, "Settings update");
    assertEqual(asRecord(apiData(saved).homeAbout).eyebrowEn, marker, "Saved setting");

    const record = await prisma.siteSetting.findUnique({ where: { key: "site-content" } });
    assert(record?.value?.includes(marker), "Settings update was not persisted.");
    const homepage = await request("/");
    expectStatus(homepage, 200, "Homepage after settings update");
    assert(homepage.text.includes(marker), "Updated setting was not visible on the homepage.");

    const restored = await jsonRequest(
      "/api/site-settings",
      "PUT",
      original,
      adminJar as CookieJar
    );
    expectStatus(restored, 200, "Settings restoration");
    const restoredRecord = await prisma.siteSetting.findUnique({ where: { key: "site-content" } });
    assert(!restoredRecord?.value?.includes(marker), "Original settings were not restored.");
  });

  await check("image upload, public retrieval, and storage cleanup", async () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      "base64"
    );
    const form = new FormData();
    form.set("file", new File([png], `${runMarker}.png`, { type: "image/png" }));
    const uploaded = await request(
      "/api/upload",
      {
        method: "POST",
        body: form,
        headers: { "x-dashboard-test-run": runId },
      },
      adminJar as CookieJar
    );
    expectStatus(uploaded, 201, "Image upload");
    const url = String(apiData(uploaded).url || "");
    assert(url.startsWith("https://"), "Upload did not return a public HTTPS URL.");
    const marker = "/storage/v1/object/public/images/";
    const markerIndex = new URL(url).pathname.indexOf(marker);
    assert(markerIndex >= 0, "Could not identify the uploaded storage path.");
    uploadedStoragePath = decodeURIComponent(
      new URL(url).pathname.slice(markerIndex + marker.length)
    );
    const publicImage = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assertEqual(publicImage.status, 200, "Uploaded image public retrieval");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    assert(supabaseUrl && supabaseKey, "Supabase cleanup credentials are unavailable.");
    const { error } = await createClient(supabaseUrl, supabaseKey)
      .storage.from("images")
      .remove([uploadedStoragePath]);
    assert(!error, `Uploaded image cleanup failed: ${error?.message || "unknown error"}`);
    uploadedStoragePath = null;
  });

  await check("WhatsApp click tracking persists and cleans up one event", async () => {
    const before = new Set(
      (
        await prisma.whatsAppClick.findMany({
          where: { timestamp: { gte: new Date(Date.now() - 60_000) } },
          select: { id: true },
        })
      ).map((row) => row.id)
    );
    const tracked = await request("/api/track/whatsapp", { method: "POST" });
    expectStatus(tracked, 201, "WhatsApp tracking");
    const after = await prisma.whatsAppClick.findMany({
      where: { timestamp: { gte: new Date(Date.now() - 60_000) } },
      select: { id: true },
    });
    const newRows = after.filter((row) => !before.has(row.id));
    assertEqual(newRows.length, 1, "Could not isolate exactly one WhatsApp test event");
    cleanupIds.whatsapp.add(newRows[0].id);
    await prisma.whatsAppClick.delete({ where: { id: newRows[0].id } });
    cleanupIds.whatsapp.delete(newRows[0].id);
  });

  await check("Google Analytics disconnected and validation states", async () => {
    const status = await request(
      "/api/analytics/settings",
      {},
      adminJar as CookieJar
    );
    expectStatus(status, 200, "Analytics settings status");

    if (!analyticsConnectionSnapshot) {
      const dashboard = await request(
        "/api/analytics?period=7d",
        {},
        adminJar as CookieJar
      );
      expectStatus(dashboard, 409, "Disconnected analytics dashboard");
      assertEqual(
        apiErrorCode(dashboard),
        "GOOGLE_ANALYTICS_NOT_CONNECTED",
        "Disconnected analytics error code"
      );

      const invalidConnection = await jsonRequest(
        "/api/analytics/settings",
        "PUT",
        {
          measurementId: "G-TEST1234",
          propertyId: "123456789",
          serviceAccountJson: "{}",
        },
        adminJar as CookieJar
      );
      expectStatus(invalidConnection, 400, "Invalid analytics connection");

      const disconnected = await request(
        "/api/analytics/settings",
        { method: "DELETE" },
        adminJar as CookieJar
      );
      expectStatus(disconnected, 200, "Analytics disconnect without credentials");
      assertEqual(
        await prisma.siteSetting.findUnique({
          where: { key: "google-analytics-connection" },
        }),
        null,
        "Analytics connection remained after disconnect"
      );
      await restoreSnapshots();
    }
  });

  let editorId = "";
  const editorEmail = `dashboard-editor-${runId}@example.com`;
  const editorTemporaryPassword = strongPassword();
  const editorPassword = strongPassword();
  const editorResetPassword = strongPassword();
  let editorJar: CookieJar | null = null;

  await check("editor creation, forced password change, and role permissions", async () => {
    const created = await jsonRequest(
      "/api/users",
      "POST",
      {
        name: `${runMarker} Editor`,
        email: editorEmail,
        temporaryPassword: editorTemporaryPassword,
      },
      adminJar as CookieJar
    );
    expectStatus(created, 201, "Editor create");
    const editor = apiData(created);
    editorId = String(editor.id || "");
    assert(editorId, "Editor create response did not include an id.");
    cleanupIds.users.add(editorId);
    assert(!("password" in editor), "Editor API exposed a password hash.");
    const databaseEditor = await prisma.user.findUnique({ where: { id: editorId } });
    assertEqual(databaseEditor?.role, "editor", "Editor database role");
    assertEqual(databaseEditor?.mustChangePassword, true, "Editor temporary password flag");

    const initialEditorJar = await login(editorEmail, editorTemporaryPassword);
    const editorSession = await request("/api/account/session", {}, initialEditorJar);
    expectStatus(editorSession, 200, "Editor initial session");
    assertEqual(apiData(editorSession).mustChangePassword, true, "Editor change-password flag");

    const blockedCreate = await jsonRequest(
      "/api/services",
      "POST",
      {
        titleAr: runMarker,
        titleEn: runMarker,
        descriptionAr: runMarker,
        descriptionEn: runMarker,
      },
      initialEditorJar
    );
    expectStatus(blockedCreate, 403, "Editor create before password change");
    assertEqual(
      apiErrorCode(blockedCreate),
      "PASSWORD_CHANGE_REQUIRED",
      "Editor password-change guard"
    );

    const changed = await jsonRequest(
      "/api/account/password",
      "POST",
      {
        currentPassword: editorTemporaryPassword,
        newPassword: editorPassword,
      },
      initialEditorJar
    );
    expectStatus(changed, 200, "Editor password change");
    const invalidatedSession = await request("/api/account/session", {}, initialEditorJar);
    expectStatus(invalidatedSession, 401, "Editor old session invalidation");

    editorJar = await login(editorEmail, editorPassword);
    const activeSession = await request("/api/account/session", {}, editorJar);
    expectStatus(activeSession, 200, "Editor active session");
    assertEqual(apiData(activeSession).mustChangePassword, false, "Editor changed-password flag");

    const restrictedEndpoints = [
      "/api/users",
      "/api/site-settings",
      "/api/contacts",
      "/api/analytics/settings",
    ];
    for (const endpoint of restrictedEndpoints) {
      const restricted = await request(endpoint, {}, editorJar);
      expectStatus(restricted, 403, `Editor restriction ${endpoint}`);
    }

    const editorService = await jsonRequest(
      "/api/services",
      "POST",
      {
        titleAr: `${runMarker}-محرر`,
        titleEn: `${runMarker}-editor-service`,
        descriptionAr: "اختبار صلاحية المحرر",
        descriptionEn: "Editor permission test",
        order: 999_941,
      },
      editorJar
    );
    expectStatus(editorService, 201, "Editor content create");
    const serviceId = String(apiData(editorService).id || "");
    cleanupIds.services.add(serviceId);
    const editorUpdate = await jsonRequest(
      `/api/services/${serviceId}`,
      "PUT",
      { titleEn: `${runMarker}-editor-updated` },
      editorJar
    );
    expectStatus(editorUpdate, 200, "Editor content update");
    const editorDelete = await request(
      `/api/services/${serviceId}`,
      { method: "DELETE" },
      editorJar
    );
    expectStatus(editorDelete, 200, "Editor content delete");
    cleanupIds.services.delete(serviceId);
  });

  await check("administrator can revoke, restore, and reset editor access", async () => {
    assert(editorId && editorJar, "Editor setup did not complete.");
    const disabled = await jsonRequest(
      `/api/users/${editorId}`,
      "PATCH",
      { isActive: false },
      adminJar as CookieJar
    );
    expectStatus(disabled, 200, "Editor disable");
    assertEqual(apiData(disabled).isActive, false, "Editor disabled state");
    const revoked = await request("/api/account/session", {}, editorJar as CookieJar);
    expectStatus(revoked, 401, "Disabled editor session");

    const enabled = await jsonRequest(
      `/api/users/${editorId}`,
      "PATCH",
      { isActive: true },
      adminJar as CookieJar
    );
    expectStatus(enabled, 200, "Editor enable");

    const reset = await jsonRequest(
      `/api/users/${editorId}`,
      "PATCH",
      { temporaryPassword: editorResetPassword },
      adminJar as CookieJar
    );
    expectStatus(reset, 200, "Editor password reset");
    assertEqual(apiData(reset).mustChangePassword, true, "Editor reset flag");
    const resetLogin = await login(editorEmail, editorResetPassword);
    const resetSession = await request("/api/account/session", {}, resetLogin);
    expectStatus(resetSession, 200, "Editor reset-password login");
    assertEqual(apiData(resetSession).mustChangePassword, true, "Reset editor change flag");

    const auditActions = (
      await prisma.auditLog.findMany({
        where: { targetUserId: editorId },
        select: { action: true },
      })
    ).map((entry) => entry.action);
    for (const action of [
      "EDITOR_CREATED",
      "EDITOR_ACCESS_DISABLED",
      "EDITOR_ACCESS_ENABLED",
      "EDITOR_PASSWORD_RESET",
    ]) {
      assert(auditActions.includes(action), `Missing audit action ${action}.`);
    }
  });

  await check("administrator password change invalidates the old session", async () => {
    const nextPassword = strongPassword();
    const changed = await jsonRequest(
      "/api/account/password",
      "POST",
      { currentPassword: adminPassword, newPassword: nextPassword },
      adminJar as CookieJar
    );
    expectStatus(changed, 200, "Administrator password change");
    const invalidated = await request("/api/account/session", {}, adminJar as CookieJar);
    expectStatus(invalidated, 401, "Administrator old session");
    adminPassword = nextPassword;
    adminJar = await login(adminEmail, adminPassword);
  });

  await check("administrator email confirmation updates login identity", async () => {
    const sameEmail = await jsonRequest(
      "/api/account/email",
      "POST",
      { email: adminEmail, currentPassword: adminPassword },
      adminJar as CookieJar
    );
    expectStatus(sameEmail, 400, "Same administrator email request");

    const newEmail = `dashboard-admin-changed-${runId}@example.com`;
    const code = "314159";
    const authSecret = process.env.NEXTAUTH_SECRET;
    assert(authSecret, "NEXTAUTH_SECRET is required for email confirmation testing.");
    await prisma.emailChangeCode.deleteMany({ where: { userId: adminId } });
    await prisma.emailChangeCode.create({
      data: {
        userId: adminId,
        currentEmail: adminEmail,
        newEmail,
        codeHash: createHash("sha256")
          .update(`${code}:${authSecret}`)
          .digest("hex"),
        expiresAt: new Date(Date.now() + 10 * 60_000),
      },
    });

    const confirmed = await jsonRequest(
      "/api/account/email/confirm",
      "POST",
      { email: newEmail, code },
      adminJar as CookieJar
    );
    expectStatus(confirmed, 200, "Administrator email confirmation");
    assertEqual(
      (await prisma.user.findUnique({ where: { id: adminId } }))?.email,
      newEmail,
      "Administrator database email"
    );
    const invalidated = await request("/api/account/session", {}, adminJar as CookieJar);
    expectStatus(invalidated, 401, "Administrator old-email session invalidation");
    adminEmail = newEmail;
    adminJar = await login(adminEmail, adminPassword);
  });

  await check("administrator password reset code changes credentials", async () => {
    const resetCode = "271828";
    const resetPassword = strongPassword();
    const authSecret = process.env.NEXTAUTH_SECRET;
    assert(authSecret, "NEXTAUTH_SECRET is required for password reset testing.");
    await prisma.passwordResetCode.deleteMany({ where: { userId: adminId } });
    await prisma.passwordResetCode.create({
      data: {
        userId: adminId,
        email: adminEmail,
        codeHash: createHash("sha256")
          .update(`${resetCode}:${authSecret}`)
          .digest("hex"),
        expiresAt: new Date(Date.now() + 10 * 60_000),
      },
    });

    const reset = await jsonRequest("/api/auth/reset-password", "POST", {
      email: adminEmail,
      code: resetCode,
      newPassword: resetPassword,
    });
    expectStatus(reset, 200, "Administrator password reset");
    const invalidated = await request("/api/account/session", {}, adminJar as CookieJar);
    expectStatus(invalidated, 401, "Password-reset session invalidation");
    adminPassword = resetPassword;
    adminJar = await login(adminEmail, adminPassword);

    const unknownRequest = await jsonRequest("/api/auth/forgot-password", "POST", {
      email: `unknown-${runId}@example.com`,
    });
    expectStatus(unknownRequest, 200, "Unknown-account password reset request");
    assertEqual(
      apiData(unknownRequest).accepted,
      true,
      "Password reset enumeration-safe response"
    );
  });

  await check("temporary test data is still isolated before cleanup", async () => {
    const foreignTestRecords = await Promise.all([
      prisma.service.count({
        where: { titleEn: { contains: runMarker }, id: { notIn: [...cleanupIds.services] } },
      }),
      prisma.partner.count({
        where: { name: { contains: runMarker }, id: { notIn: [...cleanupIds.partners] } },
      }),
      prisma.teamMember.count({
        where: { name: { contains: runMarker }, id: { notIn: [...cleanupIds.team] } },
      }),
      prisma.portfolioItem.count({
        where: { titleEn: { contains: runMarker }, id: { notIn: [...cleanupIds.portfolio] } },
      }),
    ]);
    assert(
      foreignTestRecords.every((count) => count === 0),
      "Unexpected integration-test records exist outside the cleanup registry."
    );
  });
}

main()
  .catch((error) => {
    failures += 1;
    const message = error instanceof Error ? error.message : "Unknown integration failure";
    console.error(`FATAL ${message}`);
  })
  .finally(async () => {
    try {
      await cleanup();
      console.log("PASS cleanup completed");
    } catch (error) {
      failures += 1;
      const message = error instanceof Error ? error.message : "Unknown cleanup failure";
      console.error(`FAIL cleanup: ${message}`);
    }

    const remaining = await Promise.all([
      prisma.user.count({ where: { name: runMarker } }),
      prisma.contactSubmission.count({ where: { name: { contains: runMarker } } }),
      prisma.service.count({ where: { titleEn: { contains: runMarker } } }),
      prisma.partner.count({ where: { name: { contains: runMarker } } }),
      prisma.teamMember.count({ where: { name: { contains: runMarker } } }),
      prisma.portfolioItem.count({ where: { titleEn: { contains: runMarker } } }),
    ]).catch(() => [-1]);

    if (remaining.some((count) => count !== 0)) {
      failures += 1;
      console.error("FAIL cleanup verification found remaining integration-test records");
    } else {
      console.log("PASS cleanup verification");
    }

    console.log(
      JSON.stringify(
        {
          runId,
          startedAt: startedAt.toISOString(),
          completedAt: new Date().toISOString(),
          passed: results.filter((result) => result.status === "passed").length,
          failed: failures,
          results,
        },
        null,
        2
      )
    );
    await prisma.$disconnect();
    process.exitCode = failures === 0 ? 0 : 1;
  });
