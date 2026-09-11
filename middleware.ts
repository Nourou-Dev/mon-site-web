import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeSession } from "@/lib/sessionUtils";

const SESSION_COOKIE = "nd_session";

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

  // 3. Détection de sous-domaine
  const isAppSubdomain =
    host.startsWith("app.") ||
    host.startsWith("dashboard.") ||
    host.includes("app.localhost");

  // Déterminer le chemin logique de l'application
  let targetPath = pathname;
  if (isAppSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    targetPath = pathname === "/" ? "/app" : `/app${pathname.startsWith("/app") ? pathname.slice(4) : pathname}`;
  }

  // 4. VÉRIFICATION D'AUTHENTIFICATION CÔTÉ SERVEUR (Espace Client & Admin)
  const isProtectedAppRoute =
    targetPath.startsWith("/app") &&
    !targetPath.startsWith("/app/login") &&
    !targetPath.startsWith("/app/admin");

  const isLoginPage = targetPath === "/app/login";
  const isAdminLoginPage = targetPath === "/admin" || targetPath === "/app/admin";

  const rawCookie = request.cookies.get(SESSION_COOKIE)?.value;
  const session = rawCookie ? decodeSession(rawCookie) : null;
  const isAuthenticated = Boolean(session && session.id);

  // A. Accès à une page protégée de l'espace (/app, /app/projets, /app/messages, etc.)
  if (isProtectedAppRoute) {
    if (!isAuthenticated) {
      // Redirection immédiate côté serveur vers la page de login
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = isAppSubdomain ? "/login" : "/app/login";
      loginUrl.searchParams.set("reason", "session_expired");
      
      const redirectRes = NextResponse.redirect(loginUrl);
      // Supprimer tout cookie périmé
      redirectRes.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
      return redirectRes;
    }
  }

  // B. Visite de la page de login alors qu'on est déjà connecté
  if (isLoginPage && isAuthenticated) {
    // Redirection directe vers le tableau de bord
    const appUrl = request.nextUrl.clone();
    appUrl.pathname = isAppSubdomain ? "/" : "/app";
    return NextResponse.redirect(appUrl);
  }

  // C. Visite de la page /admin alors qu'on est déjà connecté en tant qu'admin
  if (isAdminLoginPage && isAuthenticated && session?.role === "admin") {
    const appUrl = request.nextUrl.clone();
    appUrl.pathname = isAppSubdomain ? "/" : "/app";
    return NextResponse.redirect(appUrl);
  }

  // 5. Réécriture transparente pour le sous-domaine
  let response: NextResponse;
  if (isAppSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  // 6. En-têtes de sécurité HTTP sur toutes les réponses
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
