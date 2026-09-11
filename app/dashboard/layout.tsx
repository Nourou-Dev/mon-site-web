"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Users,
  UserCheck,
  Cookie,
  LogOut,
  Menu,
  X,
  Shield,
  Settings,
  ShieldAlert,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
  company?: string;
}

// 1 heure d'inactivité = 3 600 000 ms
const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastActiveRef = useRef<number>(Date.now());

  // 1. Vérification stricte de session Admin
  useEffect(() => {
    if (pathname.includes("/login")) {
      setLoading(false);
      return;
    }

    async function checkAdminAuth() {
      try {
        const res = await fetch("/api/app/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "me", scope: "admin" }),
        });
        const data = await res.json();
        if (data.authenticated && data.user && data.user.role === "admin") {
          setUser(data.user);
          lastActiveRef.current = Date.now();
        } else {
          window.location.replace("/dashboard/login?reason=session_expired");
        }
      } catch {
        window.location.replace("/dashboard/login?reason=session_expired");
      } finally {
        setLoading(false);
      }
    }

    checkAdminAuth();
  }, [pathname]);

  // 2. Gestion de l'inactivité (Déconnexion automatique après 1h)
  useEffect(() => {
    if (pathname.includes("/login")) return;

    const resetActivity = () => {
      lastActiveRef.current = Date.now();
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((evt) => window.addEventListener(evt, resetActivity, { passive: true }));

    const interval = setInterval(async () => {
      const inactiveDuration = Date.now() - lastActiveRef.current;
      if (inactiveDuration >= INACTIVITY_TIMEOUT_MS) {
        try {
          await fetch("/api/app/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout", scope: "admin" }),
          });
        } catch {}
        window.location.replace("/dashboard/login?reason=inactivity");
      }
    }, 30000);

    const heartbeatInterval = setInterval(async () => {
      const inactiveDuration = Date.now() - lastActiveRef.current;
      if (inactiveDuration < INACTIVITY_TIMEOUT_MS) {
        try {
          await fetch("/api/app/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "me", scope: "admin" }),
          });
        } catch {}
      }
    }, 10 * 60 * 1000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetActivity));
      clearInterval(interval);
      clearInterval(heartbeatInterval);
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout", scope: "admin" }),
      });
      window.location.replace("/dashboard/login");
    } catch {
      window.location.replace("/dashboard/login");
    }
  };

  // Ne pas afficher le layout sur la page de connexion admin
  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3 text-[#0f172a]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4338ca] border-t-transparent" />
          <p className="text-sm font-semibold text-[#475569]">Vérification des accès administrateur...</p>
        </div>
      </div>
    );
  }

  // Navigation complète de l'Espace Administrateur
  const navItems = [
    {
      label: "Vue d'ensemble",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Comptes Clients & Logins",
      href: "/dashboard/clients",
      icon: UserCheck,
    },
    {
      label: "Demandes & Devis (CRM)",
      href: "/dashboard/leads",
      icon: Users,
    },
    {
      label: "Statistiques Cookies",
      href: "/dashboard/cookies",
      icon: Cookie,
    },
    {
      label: "Projets & Roadmap",
      href: "/dashboard/projets",
      icon: FolderKanban,
    },
    {
      label: "Messagerie en Direct",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      label: "Paramètres Administrateur",
      href: "/dashboard/parametres",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      {/* Barre supérieure Mobile */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#cbd5e1] bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-base font-extrabold tracking-tight text-[#0f172a]">
            <span>Nourou Dine</span> <span className="text-[#4338ca]">AMANDOU</span>
          </Link>
          <span className="rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-[10px] font-bold text-[#312e81] border border-[#c7d2fe]">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl p-2 text-[#0f172a] hover:bg-[#f1f5f9] active:scale-95 transition-all"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Arrière-plan sombre mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <div className="flex w-full min-w-0">
        {/* Sidebar Desktop & Mobile (Thème Deep Royal Indigo & Slate) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col justify-between border-r border-[#e2e8f0] bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Header Sidebar Admin */}
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-extrabold tracking-tight text-[#0f172a]"
                >
                  <span>Nourou Dine</span> <span className="text-[#4338ca]">AMANDOU</span>
                </Link>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-[11px] font-bold text-[#312e81] border border-[#c7d2fe]">
                    <Shield className="h-3 w-3 text-[#4338ca]" />
                    Espace Administrateur
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl p-2 text-[#475569] hover:bg-[#f1f5f9] active:scale-95 transition-all lg:hidden"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation principale de l'Administrateur */}
            <nav className="mt-7 space-y-1.5" aria-label="Navigation principale administrateur">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#4338ca] text-white shadow-md shadow-[#4338ca]/25"
                        : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-[#4338ca]"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer de la Sidebar Admin */}
          <div className="border-t border-[#e2e8f0] pt-4 space-y-2.5">
            {/* Widget Admin connecté */}
            {user && (
              <div className="flex items-center gap-2.5 rounded-xl bg-[#f8fafc] p-2.5 border border-[#e2e8f0]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4338ca] text-xs font-bold text-white shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[#0f172a]">{user.name}</p>
                  <p className="truncate text-[10px] text-[#64748b] font-medium">{user.email}</p>
                </div>
              </div>
            )}

            {/* Boutons d'action et Déconnexion */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/parametres"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#cbd5e1] bg-white py-2.5 px-3 text-xs font-bold text-[#0f172a] transition-colors hover:bg-[#f8fafc] hover:border-[#4338ca] active:scale-95"
              >
                <Settings className="h-4 w-4 text-[#4338ca]" />
                <span>Paramètres</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Se déconnecter de l'espace administrateur"
                aria-label="Se déconnecter"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 shrink-0 active:scale-95"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Contenu principal Administrateur */}
        <main className="min-h-screen flex-1 min-w-0 max-w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="w-full min-w-0 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
