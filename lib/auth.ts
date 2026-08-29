import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "ankush_admin_session";

export async function createAdminSession() {
  const token = crypto.randomBytes(32).toString("hex");
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  // For a single-admin app, the signed/random session can be kept server-side
  // in a production deployment. This starter uses an HMAC-derived cookie.
  const signature = crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD_HASH || "dev-secret")
    .update(token)
    .digest("hex");
  store.set(`${COOKIE}_sig`, signature, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  const sig = store.get(`${COOKIE}_sig`)?.value;
  if (!token || !sig) return false;
  const expected = crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD_HASH || "dev-secret")
    .update(token)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE);
  store.delete(`${COOKIE}_sig`);
}
