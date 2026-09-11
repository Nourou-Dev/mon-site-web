// Durée maximale d'inactivité autorisée : 1 heure (3600 secondes)
export const SESSION_INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000;

export interface SessionPayload {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
  lastActivity: number;
  exp: number;
}

export function encodeSession(user: { id?: string; name?: string; email?: string; role?: string; company?: string }): string {
  const now = Date.now();
  const payload: SessionPayload = {
    id: user.id || "",
    name: user.name || "",
    email: user.email || "",
    role: (user.role as "admin" | "client") || "client",
    company: user.company || "",
    lastActivity: now,
    exp: now + SESSION_INACTIVITY_TIMEOUT_MS, // 1 heure d'inactivité
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function touchSession(existing: SessionPayload): string {
  const now = Date.now();
  const renewed: SessionPayload = {
    ...existing,
    lastActivity: now,
    exp: now + SESSION_INACTIVITY_TIMEOUT_MS,
  };
  return Buffer.from(JSON.stringify(renewed)).toString("base64url");
}

export function decodeSession(cookieValue: string): SessionPayload | null {
  if (!cookieValue || typeof cookieValue !== "string") return null;

  try {
    let cleanVal = decodeURIComponent(cookieValue).trim();
    if (cleanVal.startsWith('"') && cleanVal.endsWith('"')) {
      cleanVal = cleanVal.slice(1, -1);
    }

    let payload: any = null;

    try {
      const json = Buffer.from(cleanVal, "base64url").toString("utf-8");
      payload = JSON.parse(json);
    } catch {}

    if (!payload) {
      try {
        const json = Buffer.from(cleanVal, "base64").toString("utf-8");
        payload = JSON.parse(json);
      } catch {}
    }

    if (!payload || typeof payload !== "object") return null;

    const now = Date.now();

    if (payload.exp && payload.exp < now) {
      return null;
    }

    if (payload.lastActivity && (now - payload.lastActivity) > SESSION_INACTIVITY_TIMEOUT_MS) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}
