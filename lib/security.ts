import { NextResponse } from "next/server";

// ==========================================
// 1. LIMITATION DE DÉBIT (RATE LIMITING)
// ==========================================

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Mémoire tampon pour stocker les compteurs de requêtes par IP
const rateLimitMap = new Map<string, RateLimitRecord>();

// Nettoyage périodique toutes les 5 minutes pour éviter toute fuite de mémoire
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (record.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Vérifie si une IP a dépassé son quota de requêtes
 * @param identifier Clé unique (ex. "contact:192.168.1.1")
 * @param limit Nombre maximum de requêtes autorisées
 * @param windowMs Durée de la fenêtre en millisecondes
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || record.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

// ==========================================
// 2. EXTRACTION SÉCURISÉE DE L'IP DU CLIENT
// ==========================================

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Prend la première adresse de la chaîne en cas de proxies multiples
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return "127.0.0.1";
}

// ==========================================
// 3. ASSAINISSEMENT & PROTECTION ANTI-XSS
// ==========================================

/**
 * Neutralise les caractères spéciaux HTML pour prévenir toute injection XSS
 */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validation stricte d'adresse e-mail (RFC 5322 simplifiée et sans risque de ReDoS)
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 120 || trimmed.length < 5) return false;
  // Empêche les attaques par injection d'en-tête (CRLF)
  if (/[\r\n]/.test(trimmed)) return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return regex.test(trimmed);
}

// ==========================================
// 4. PROTECTION ANTI-ROBOTS (HONEYPOT & TIMING)
// ==========================================

/**
 * Vérifie si la soumission provient d'un robot
 * @param honeypotValue Valeur du champ piège masqué (doit être vide)
 * @param renderedAt Horodatage du rendu du formulaire côté client
 * @param minSeconds Délai minimum en secondes pour un humain (ex. 1.2s)
 */
export function verifyBotProtection(
  honeypotValue: unknown,
  renderedAt: unknown,
  minSeconds: number = 1.2
): { isBot: boolean; reason?: string } {
  // 1. Si le champ honeypot invisible contient du texte, c'est un bot automatisé
  if (honeypotValue && typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
    return { isBot: true, reason: "Honeypot triggered" };
  }

  // 2. Si le formulaire a été soumis anormalement vite (< 1.2 seconde après chargement)
  if (renderedAt) {
    const timestamp = Number(renderedAt);
    if (!isNaN(timestamp)) {
      const durationSeconds = (Date.now() - timestamp) / 1000;
      if (durationSeconds < minSeconds) {
        return { isBot: true, reason: "Submitted too quickly" };
      }
    }
  }

  return { isBot: false };
}
