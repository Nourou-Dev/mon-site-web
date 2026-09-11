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
  const isDashboardSubdomain = host.startsWith("dashboard.");
  const isAppSubdomain = host.startsWith("app.") || host.includes("app.localhost");

  // Déterminer le chemin logique
  let targetPath = pathname;
  if (isDashboardSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    targetPath = pathname === "/" ? "/dashboard" : `/dashboard${pathname.startsWith("/dashboard") ? pathname.slice(10) : pathname}`;
  } else if (isAppSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    targetPath = pathname === "/" ? "/app" : `/app${pathname.startsWith("/app") ? pathname.slice(4) : pathname}`;
  }

  // 4. RÉCUPÉRATION DES SESSIONS (Cookies isolés Client & Admin)
  const adminCookie = request.cookies.get("nd_admin_session")?.value || request.cookies.get("nd_session")?.value;
  const clientCookie = request.cookies.get("nd_client_session")?.value || request.cookies.get("nd_session")?.value;

  const adminSession = adminCookie ? decodeSession(adminCookie) : null;
  const clientSession = clientCookie ? decodeSession(clientCookie) : null;

  const isAdminAuthenticated = Boolean(adminSession && adminSession.role === "admin");
  const isClientAuthenticated = Boolean(clientSession && clientSession.id);

  // A. Redirection de l'ancienne URL /admin vers le nouvel espace /dashboard
  if (targetPath === "/admin" || targetPath === "/app/admin") {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = isAdminAuthenticated ? "/dashboard" : "/dashboard/login";
    return NextResponse.redirect(dashUrl);
  }

  // B. ESPACE ADMINISTRATEUR : /dashboard/*
  if (targetPath.startsWith("/dashboard")) {
    const isDashboardLogin = targetPath === "/dashboard/login";

    if (isDashboardLogin) {
      if (isAdminAuthenticated) {
        const dashUrl = request.nextUrl.clone();
        dashUrl.pathname = isDashboardSubdomain ? "/" : "/dashboard";
        return NextResponse.redirect(dashUrl);
      }
      // Autoriser l'accès au formulaire de connexion admin
    } else {
      if (!isAdminAuthenticated) {
        // Rediriger vers la page de login admin
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = isDashboardSubdomain ? "/login" : "/dashboard/login";
        loginUrl.searchParams.set("reason", "session_expired");
        const res = NextResponse.redirect(loginUrl);
        res.cookies.set("nd_admin_session", "", { path: "/", maxAge: 0 });
        return res;
      }
    }
  }

  // C. ESPACE CLIENT : /app/*
  if (targetPath.startsWith("/app")) {
    const isClientLogin = targetPath === "/app/login";

    if (isClientLogin) {
      if (isClientAuthenticated || isAdminAuthenticated) {
        const appUrl = request.nextUrl.clone();
        appUrl.pathname = isAppSubdomain ? "/" : "/app";
        return NextResponse.redirect(appUrl);
      }
    } else {
      if (!isClientAuthenticated && !isAdminAuthenticated) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = isAppSubdomain ? "/login" : "/app/login";
        loginUrl.searchParams.set("reason", "session_expired");
        const res = NextResponse.redirect(loginUrl);
        res.cookies.set("nd_client_session", "", { path: "/", maxAge: 0 });
        return res;
      }
    }
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
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
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
