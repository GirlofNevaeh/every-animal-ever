import { createHash, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const COOKIE = "eae_access";
const PEPPER = process.env.EAE_ACCESS_SECRET || "eae-gate-v1-school-key";
const TOKEN = createHash("sha256").update(`open:${PEPPER}`).digest("base64url");

/** SHA-256 of issued keys. Plaintext stays off the site. */
const BAKED = new Set([
  "3e3419e2fa8d7fda8cb073d882f6f68de15293df7d0831f8792a6d8a4408b4e8",
  "c38e73f96b6bc05ff3e573bc2cb00bd09f0e4d71cbdf10c4543f592f909c2325",
  "dac58e932599bfbf4b370e75c4080bae4cd2a1e208da187c795f977307684c17",
  "dcc95f44c065ba0fffd8106ae8ba17e92a9cc9fd4c53e8b86f281b488f49691f",
]);

export function normalizeKey(raw: string): string {
  const compact = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!compact.startsWith("EAE") || compact.length !== 15) return "";
  const body = compact.slice(3);
  return `EAE-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}`;
}

function envKeys(): string[] {
  return (process.env.EAE_ACCESS_KEYS ?? "")
    .split(",")
    .map((item) => normalizeKey(item))
    .filter(Boolean);
}

export function keyIsValid(raw: string): boolean {
  const key = normalizeKey(raw);
  if (!key) return false;
  const extra = envKeys();
  if (extra.length > 0) return extra.includes(key);
  return BAKED.has(createHash("sha256").update(key).digest("hex"));
}

function cookieOptions(maxAge: number) {
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge,
  };
}

export function hasAccessCookie(): boolean {
  const value = getCookie(COOKIE);
  if (!value || value.length !== TOKEN.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(TOKEN));
}

export function setAccessCookie(): void {
  setCookie(COOKIE, TOKEN, cookieOptions(60 * 60 * 24 * 400));
}

export function clearAccessCookie(): void {
  setCookie(COOKIE, "", cookieOptions(0));
}
