"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, Mail, User, Building, ArrowRight, Sparkles, AlertCircle, Phone } from "lucide-react";

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

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f8f9fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight text-[#171717]">
          <span>Nourou Dine</span> <span className="text-[#0060c3]">AMANDOU</span>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0060c3]">
            <Sparkles className="h-3 w-3" />
            Espace Client &amp; Suivi de Projet
          </span>
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-[#171717]">
          {tab === "login" ? "Accéder à votre espace client" : "Créer votre compte client"}
        </h1>
        <p className="mt-1 text-xs text-[#4b4b4b]">
          Suivi de votre projet en temps réel, échanges directs et validation des jalons.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.06)] sm:p-8">
          {/* Onglets Connexion / Inscription Client */}
          <div role="tablist" aria-label="Modes de connexion" className="mb-6 flex rounded-xl bg-[#f4f6f8] p-1 text-xs font-bold">
            <button
              role="tab"
              aria-selected={tab === "login"}
              onClick={() => {
                setTab("login");
                setErrorMessage(null);
              }}
              className={`flex min-h-[44px] flex-1 items-center justify-center rounded-lg py-2.5 transition-all ${
                tab === "login"
                  ? "bg-white text-[#171717] shadow-sm font-extrabold"
                  : "text-[#4b4b4b] hover:text-[#171717]"
              }`}
            >
              Connexion
            </button>
            <button
              role="tab"
              aria-selected={tab === "register"}
              onClick={() => {
                setTab("register");
                setErrorMessage(null);
              }}
              className={`flex min-h-[44px] flex-1 items-center justify-center rounded-lg py-2.5 transition-all ${
                tab === "register"
                  ? "bg-white text-[#171717] shadow-sm font-extrabold"
                  : "text-[#4b4b4b] hover:text-[#171717]"
              }`}
            >
              Nouveau Client
            </button>
          </div>

          {errorMessage && (
            <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="client-login-email" className="block text-xs font-bold text-[#171717]">
                  Adresse E-mail
                </label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="client-login-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="votre-email@entreprise.com"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="client-login-password" className="block text-xs font-bold text-[#171717]">
                    Mot de passe
                  </label>
                </div>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="client-login-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0060c3] py-3 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-transform hover:-translate-y-0.5 hover:bg-[#0050a5] active:scale-95 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#0060c3]/40"
              >
                {loading ? "Connexion..." : "Se connecter"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label htmlFor="reg-name" className="block text-xs font-bold text-[#171717]">
                  Votre Nom &amp; Prénom *
                </label>
                <div className="relative mt-1">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="reg-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Marc Dossou"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-company" className="block text-xs font-bold text-[#171717]">
                  Entreprise / Marque
                </label>
                <div className="relative mt-1">
                  <Building className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="reg-company"
                    type="text"
                    autoComplete="organization"
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                    placeholder="Clinique Santé Plus"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold text-[#171717]">
                  Adresse E-mail *
                </label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="reg-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="direction@entreprise.com"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-xs font-bold text-[#171717]">
                  Téléphone / WhatsApp
                </label>
                <div className="relative mt-1">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="reg-phone"
                    type="tel"
                    autoComplete="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+229 01 00 00 00"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-xs font-bold text-[#171717]">
                  Mot de passe *
                </label>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                  <input
                    id="reg-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Au moins 6 caractères"
                    className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-3 pl-11 pr-3 text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0060c3] py-3 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-transform hover:-translate-y-0.5 hover:bg-[#0050a5] active:scale-95 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#0060c3]/40"
              >
                {loading ? "Création du compte..." : "Créer mon compte client"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Lien sécurisé vers l'Espace Administrateur */}
          <div className="mt-6 border-t border-[#171717]/10 pt-4 text-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4b4b4b] hover:text-[#0060c3] transition-colors"
            >
              <Shield className="h-3.5 w-3.5 text-[#0060c3]" />
              <span>Accès réservé Administrateur →</span>
            </Link>
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
