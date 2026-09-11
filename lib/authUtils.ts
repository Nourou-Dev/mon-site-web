import crypto from "crypto";
import { AppUser } from "@/lib/appStorage";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "_nd_salt_2026").digest("hex");
}

export function encodeSession(user: AppUser): string {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    exp: Date.now() + 7 * 24 * 3600 * 1000, // 7 jours
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function decodeSession(cookieValue: string): (Partial<AppUser> & { exp: number }) | null {
  try {
    const json = Buffer.from(cookieValue, "base64").toString("utf-8");
    const payload = JSON.parse(json);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
