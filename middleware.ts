import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des signatures d'outils de scan de vulnérabilités et robots malveillants connus
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "acunetix",
  "dirbuster",
  "gobuster",
  "wpscan",
  "masscan",
  "zgrab",
  "censys",
  "nmap",
  "havij",
  "nessus",
  "openvas",
  "netsparker",
  "burpcollaborator",
];

// Chemins et sondes typiques d'attaques automatisées
const BLOCKED_PATH_PATTERNS = [
  /\/\.env/i,
  /\/\.git/i,
  /\/wp-admin/i,
  /\/wp-login\.php/i,
  /\/xmlrpc\.php/i,
  /\/\.aws/i,
  /\/\.ssh/i,
  /\/\.htaccess/i,
  /\/phpmyadmin/i,
  /\/\.\.\//, // Tentative de traversée de dossier ../
  /%2e%2e/i,  // Encodage URL de ..
  /\/etc\/passwd/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";
  const host = request.headers.get("host") || "";

  // 1. Blocage des User-Agents de scan et d'attaque
  const lowerUA = userAgent.toLowerCase();
  for (const botSignature of BLOCKED_USER_AGENTS) {
    if (lowerUA.includes(botSignature)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // 2. Blocage immédiat des requêtes de scan de vulnérabilités sur les chemins sensibles
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // 3. Routage dynamique par sous-domaine pour l'application : app.nomdusite.com / app.localhost
  const isAppSubdomain =
    host.startsWith("app.") ||
    host.startsWith("dashboard.") ||
    host.includes("app.localhost");

  let response: NextResponse;

  // Si l'utilisateur visite le sous-domaine app.* et n'appelle pas déjà une route /api ou /_next
  if (isAppSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    const url = request.nextUrl.clone();
    // Réécriture transparente vers les pages de l'espace app
    const targetPath = pathname === "/" ? "/app" : `/app${pathname.startsWith("/app") ? pathname.slice(4) : pathname}`;
    url.pathname = targetPath;
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  // 4. En-têtes de sécurité HTTP sur toutes les réponses
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // HSTS en production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Intercepte toutes les requêtes sauf les fichiers statiques internes Next.js
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|media/).*)",
  ],
};
