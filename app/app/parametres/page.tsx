"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Building,
  Phone,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  KeyRound,
  Sparkles,
} from "lucide-react";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
  phone?: string;
}

export default function ParametresPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback states
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/app/profile");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setCompany(data.user.company || "");
          setPhone(data.user.phone || "");
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);
    setSavingProfile(true);

    try {
      const res = await fetch("/api/app/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Impossible d'enregistrer vos modifications.");
      }

      setProfileSuccess("Vos coordonnées ont été enregistrées avec succès !");
      if (data.user) {
        setUser(data.user);
      }
    } catch (err: any) {
      setProfileError(err.message || "Erreur lors de la mise à jour.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSuccess(null);
    setPwdError(null);

    if (newPassword.length < 6) {
      setPwdError("Le nouveau mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError("La confirmation du mot de passe ne correspond pas.");
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/app/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Impossible de modifier le mot de passe.");
      }

      setPwdSuccess("Votre mot de passe a été modifié avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdError(err.message || "Erreur lors du changement de mot de passe.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
          <p className="text-sm font-semibold text-[#4b4b4b]">Chargement de vos paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* En-tête */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
            Paramètres du Compte
          </h1>
          <span className="rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-xs font-bold text-[#0060c3]">
            {user?.role === "admin" ? "Profil Administrateur" : "Profil Client"}
          </span>
        </div>
        <p className="mt-1 text-sm text-[#4b4b4b]">
          Modifiez vos informations personnelles, les coordonnées de votre marque et mettez à jour votre mot de passe de connexion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* SECTION 1 : Coordonnées du profil */}
        <div className="rounded-3xl border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-[#171717]/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0060c3]/10 text-[#0060c3]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#171717]">Informations Générales</h2>
              <p className="text-xs text-[#7b7b7b]">Coordonnées visibles par votre interlocuteur</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
            {profileSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{profileSuccess}</span>
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{profileError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#171717]">Nom Complet</label>
              <div className="relative mt-1">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717]">Adresse E-mail</label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717]">Entreprise / Organisation</label>
              <div className="relative mt-1">
                <Building className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nom de votre marque ou société"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717]">Téléphone / WhatsApp</label>
              <div className="relative mt-1">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 01 00 00 00"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0060c3] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#004ca3] disabled:opacity-60"
            >
              <Save className="h-3.5 w-3.5" />
              {savingProfile ? "Enregistrement..." : "Enregistrer mes coordonnées"}
            </button>
          </form>
        </div>

        {/* SECTION 2 : Sécurité & Mot de passe */}
        <div className="rounded-3xl border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-[#171717]/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#171717]">Identifiants de Connexion</h2>
              <p className="text-xs text-[#7b7b7b]">Mettez à jour votre mot de passe d&apos;accès</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4">
            {pwdSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{pwdSuccess}</span>
              </div>
            )}
            {pwdError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{pwdError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#171717]">Mot de passe actuel</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717]">Nouveau mot de passe</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Au moins 6 caractères"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717]">Confirmer le nouveau mot de passe</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Retapez le nouveau mot de passe"
                  className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-black disabled:opacity-60"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              {savingPassword ? "Mise à jour..." : "Modifier mon mot de passe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
