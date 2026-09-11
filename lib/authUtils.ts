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
  // Utilisation de base64url : aucun caractère =, +, /, %3D
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function decodeSession(cookieValue: string): (Partial<AppUser> & { exp: number }) | null {
  if (!cookieValue || typeof cookieValue !== "string") return null;

  try {
    // 1. Nettoyage des éventuels encodages d'URL (%3D, etc.)
    let cleanVal = decodeURIComponent(cookieValue).trim();
    if (cleanVal.startsWith('"') && cleanVal.endsWith('"')) {
      cleanVal = cleanVal.slice(1, -1);
    }

    // 2. Décodage base64url (format standard sécurisé sans padding)
    try {
      const json = Buffer.from(cleanVal, "base64url").toString("utf-8");
      const payload = JSON.parse(json);
      if (payload && typeof payload === "object" && payload.exp && payload.exp >= Date.now()) {
        return payload;
      }
    } catch {}

    // 3. Fallback sur base64 classique (avec ou sans =)
    try {
      const json = Buffer.from(cleanVal, "base64").toString("utf-8");
      const payload = JSON.parse(json);
      if (payload && typeof payload === "object" && payload.exp && payload.exp >= Date.now()) {
        return payload;
      }
    } catch {}

    return null;
  } catch {
    return null;
  }
}
