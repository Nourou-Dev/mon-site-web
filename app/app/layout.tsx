"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Users,
  Cookie,
  LogOut,
  Menu,
  X,
  Sparkles,
  Settings,
  Shield,
} from "lucide-react";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Vérifier la session active
  useEffect(() => {
    if (pathname.includes("/login") || pathname.includes("/admin")) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/app/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "me" }),
        });
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          window.location.href = "/app/login";
        }
      } catch {
        window.location.href = "/app/login";
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      window.location.href = "/app/login";
    } catch (e) {
      console.error(e);
      window.location.href = "/app/login";
    }
  };

  // Si on est sur la page de login ou d'admin, afficher sans le layout de dashboard
  if (pathname.includes("/login") || pathname.includes("/admin")) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <div className="flex flex-col items-center gap-3 text-[#171717]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
          <p className="text-sm font-semibold text-[#4b4b4b]">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  const navItems = [
    {
      label: "Vue d'ensemble",
      href: "/app",
      icon: LayoutDashboard,
      adminOnly: false,
    },
    {
      label: "Demandes & Devis (CRM)",
      href: "/app/leads",
      icon: Users,
      adminOnly: true,
    },
    {
      label: "Statistiques Cookies",
      href: "/app/cookies",
      icon: Cookie,
      adminOnly: true,
    },
    {
      label: "Projets & Roadmap",
      href: "/app/projets",
      icon: FolderKanban,
      adminOnly: false,
    },
    {
      label: "Messagerie en Direct",
      href: "/app/messages",
      icon: MessageSquare,
      adminOnly: false,
    },
    {
      label: "Paramètres du Compte",
      href: "/app/parametres",
      icon: Settings,
      adminOnly: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#171717]">
      {/* Barre supérieure Mobile */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#171717]/10 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Link href="/app" className="text-base font-extrabold tracking-tight text-[#171717]">
            <span>Nourou Dine</span> <span className="text-[#0060c3]">AMANDOU</span>
          </Link>
          <span className="rounded-full bg-[#0060c3]/10 px-2 py-0.5 text-[10px] font-bold text-[#0060c3]">
            {isAdmin ? "Espace Admin" : "Espace Client"}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-[#171717] hover:bg-[#171717]/5"
          aria-label="Menu de navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-[#171717]/10 bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Header de la Sidebar */}
            <div className="flex items-center justify-between">
              <div>
                <Link href="/app" className="text-lg font-extrabold tracking-tight text-[#171717]">
                  <span>Nourou Dine</span> <span className="text-[#0060c3]">AMANDOU</span>
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#0060c3]">
                    <Sparkles className="h-3 w-3" />
                    {isAdmin ? "Espace Administrateur" : "Espace Client"}
                  </span>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <Shield className="h-2.5 w-2.5" />
                      Admin
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1 text-[#4b4b4b] lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-8 space-y-1.5">
              {navItems.map((item) => {
                if (item.adminOnly && !isAdmin) return null;
                const isActive =
                  item.href === "/app"
                    ? pathname === "/app"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#0060c3] text-white shadow-md shadow-[#0060c3]/25"
                        : "text-[#4b4b4b] hover:bg-[#171717]/5 hover:text-[#171717]"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-[#4b4b4b]"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer de la Sidebar : Profil & Paramètres (Aucun bouton admin pour le client) */}
          <div className="border-t border-[#171717]/10 pt-4 space-y-2.5">
            {/* Widget utilisateur connecté */}
            {user && (
              <div className="flex items-center gap-2.5 rounded-xl bg-[#f8f9fa] p-2.5 border border-[#171717]/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0060c3] text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[#171717]">{user.name}</p>
                  <p className="truncate text-[10px] text-[#4b4b4b]">{user.company || user.email}</p>
                </div>
              </div>
            )}

            {/* Bouton Paramètres & Déconnexion */}
            <div className="flex items-center gap-2">
              <Link
                href="/app/parametres"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#171717]/10 bg-white py-2 text-xs font-bold text-[#171717] transition-colors hover:bg-[#f8f9fa] hover:border-[#0060c3]"
              >
                <Settings className="h-3.5 w-3.5 text-[#0060c3]" />
                <span>Paramètres</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 shrink-0"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="min-h-screen flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
