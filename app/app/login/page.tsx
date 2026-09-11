"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, Mail, User, Building, ArrowRight, Sparkles, AlertCircle, KeyRound, Phone } from "lucide-react";

export default function AppLoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Échec de connexion.");
      }

      // Rechargement complet pour hydrater le layout et les cookies sans cache stale
      window.location.href = "/app";
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          name: regName.trim(),
          email: regEmail.trim(),
          company: regCompany.trim(),
          phone: regPhone.trim(),
          password: regPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Impossible de créer le compte.");
      }

      window.location.href = "/app";
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur d'inscription.");
      setLoading(false);
    }
  };

  // Raccourci Démo rapide
  const quickDemoLogin = async (role: "admin" | "client") => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const payload =
        role === "admin"
          ? { action: "login", email: "contact@nouroudineamandou.com", password: "admin123!" }
          : { action: "login", email: "direction@cliniquesanteplus.com", password: "password123" };

      // Si le compte client démo n'existe pas encore, l'inscrire d'abord
      if (role === "client") {
        await fetch("/api/app/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "register",
            name: "Dr. Marc Dossou",
            email: "direction@cliniquesanteplus.com",
            company: "Clinique Santé Plus",
            password: "password123",
          }),
        }).catch(() => {});
      }

      const res = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Connexion démo échouée.");
      }

      window.location.href = "/app";
    } catch (err: any) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setTab("login");
    setLoginEmail("contact@nouroudineamandou.com");
    setLoginPassword("admin123!");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f8f9fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight text-[#171717]">
          <span>Nourou Dine</span> <span className="text-[#0060c3]">AMANDOU</span>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0060c3]">
            <Sparkles className="h-3 w-3" />
            Portail Collaboratif &amp; Dashboard
          </span>
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-[#171717]">
          {tab === "login" ? "Accéder à votre espace" : "Créer votre compte client"}
        </h1>
        <p className="mt-1 text-xs text-[#4b4b4b]">
          Suivi de projet, échanges directs, validation des jalons et gestion.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.06)] sm:p-8">
          {/* Bannière d'aide pour l'Admin */}
          <div className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Shield className="h-4 w-4 text-emerald-600" />
                Accès Administrateur
              </span>
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900"
              >
                Pré-remplir
              </button>
            </div>
            <p className="mt-1 text-[11px] text-emerald-700">
              E-mail : <code className="font-mono bg-white/80 px-1 py-0.5 rounded">contact@nouroudineamandou.com</code>
              <br />
              Mot de passe : <code className="font-mono bg-white/80 px-1 py-0.5 rounded">admin123!</code>
            </p>
          </div>

          {/* Onglets Connexion / Inscription */}
          <div className="mb-6 flex rounded-xl bg-[#f4f6f8] p-1 text-xs font-bold">
            <button
              onClick={() => {
                setTab("login");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 transition-all ${
                tab === "login"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#4b4b4b] hover:text-[#171717]"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setTab("register");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 transition-all ${
                tab === "register"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#4b4b4b] hover:text-[#171717]"
              }`}
            >
              Nouveau Client
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171717]">Adresse E-mail</label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="contact@nouroudineamandou.com"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#171717]">Mot de passe / Clé d&apos;accès</label>
                </div>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0060c3] py-3 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-transform hover:-translate-y-0.5 hover:bg-[#0050a5] active:scale-95 disabled:opacity-70"
              >
                {loading ? "Connexion..." : "Se connecter"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#171717]">Votre Nom &amp; Prénom *</label>
                <div className="relative mt-1">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Marc Dossou"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717]">Entreprise / Marque</label>
                <div className="relative mt-1">
                  <Building className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="text"
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                    placeholder="Clinique Santé Plus"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717]">Adresse E-mail *</label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="direction@entreprise.com"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717]">Téléphone / WhatsApp</label>
                <div className="relative mt-1">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+229 01 00 00 00"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717]">Mot de passe *</label>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Au moins 6 caractères"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0060c3] py-3 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-transform hover:-translate-y-0.5 hover:bg-[#0050a5] active:scale-95 disabled:opacity-70"
              >
                {loading ? "Création du compte..." : "Créer mon compte client"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Boutons d'accès Démo pour tester facilement */}
          <div className="mt-6 border-t border-[#171717]/10 pt-5">
            <p className="text-center text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
              Accès Démo 1-Clic pour tester :
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => quickDemoLogin("admin")}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span>Connexion Admin</span>
              </button>
              <button
                type="button"
                onClick={() => quickDemoLogin("client")}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors shadow-sm"
              >
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>Connexion Client</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-semibold text-[#4b4b4b] hover:text-[#0060c3] transition-colors">
            ← Retourner sur le site public
          </Link>
        </div>
      </div>
    </div>
  );
}
