"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          _hp_fax: honeypot,
          _renderedAt: renderedAt,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Une erreur est survenue lors de l'inscription.");
      }

      setFeedbackMessage(result.message);
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Impossible de valider votre inscription pour l'instant. Veuillez réessayer ultérieurement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F6F4EF] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1100px] border border-[#C9C4B8] bg-white p-8 sm:p-14 lg:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono text-[#1B1D22]/60">
            Dispatch mensuel · Veille &amp; Stratégie
          </p>

          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#1B1D22]">
            Des réflexions concrètes sur l&apos;ingénierie et le design, <span className="italic">directement dans votre boîte</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#1B1D22]/70 leading-relaxed font-sans max-w-xl mx-auto">
            Analyses de cas réels, retours d&apos;expérience sur la conversion et méthodologie de projet. Sans jargon commercial, ni promotion agressive.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="mx-auto flex max-w-lg flex-col items-center gap-3 border border-[#C9C4B8] bg-[#F6F4EF] p-6 text-center text-[#1B1D22]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D5AFE]/10 text-[#3D5AFE]">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                </div>
                <p className="text-sm font-medium leading-relaxed font-sans">
                  {feedbackMessage || "C'est noté ! Merci pour votre confiance, vos premières analyses arrivent bientôt."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFeedbackMessage(null);
                  }}
                  className="mt-2 text-xs font-mono text-[#3D5AFE] underline hover:text-[#1B1D22] transition-colors"
                >
                  Inscrire une autre adresse
                </button>
              </div>
            ) : (
              <div className="mx-auto max-w-md">
                {errorMessage && (
                  <div className="mb-4 flex items-center justify-center gap-2 border border-red-300 bg-red-50 px-4 py-2.5 text-xs text-red-800">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                >
                  {/* Piège Honeypot anti-robot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "-9999px",
                      opacity: 0,
                      height: 0,
                      width: 0,
                      overflow: "hidden",
                    }}
                    aria-hidden="true"
                  >
                    <label htmlFor="newsletter-hp-fax">Laissez vide</label>
                    <input
                      id="newsletter-hp-fax"
                      type="text"
                      name="_hp_fax"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1D22]/40" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      aria-label="Votre adresse e-mail pour la newsletter"
                      className="w-full border border-[#C9C4B8] bg-white px-11 py-3 text-sm text-[#1B1D22] placeholder-[#1B1D22]/40 transition-colors focus:border-[#1B1D22] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center bg-[#1B1D22] px-7 py-3 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE] disabled:opacity-70 shrink-0"
                  >
                    {loading ? "Inscription..." : "S'inscrire"}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center text-xs font-mono text-[#1B1D22]/50">
            <span>Gratuit</span>
            <span>·</span>
            <span>Un email tous les 15 jours</span>
            <span>·</span>
            <span>Désinscription immédiate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
