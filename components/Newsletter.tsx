"use client";

import { useState } from "react";
import { Mail, ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

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
    <section className="bg-[#fbf9f5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 border-t border-[#171717]/10">
      <div className="mx-auto max-w-[1280px] rounded-3xl border border-[#171717]/15 bg-[#f4efe6] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 shadow-xs">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#737373]">
            <span className="text-[#171717] font-semibold">[ 11 / DISPATCH MENSUEL ]</span>
            <span>—</span>
            <span>Veille &amp; Stratégie</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-[-0.03em] text-[#171717]">
            Des réflexions concrètes sur l&apos;ingénierie et le design, <span className="italic font-normal">directement dans votre boîte</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#4b4b4b] font-light leading-relaxed max-w-xl mx-auto">
            Analyses de cas réels, retours d&apos;expérience sur la conversion et méthodologie de projet. Sans jargon commercial, ni promotion agressive.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-[#171717]/15 bg-white p-6 text-center text-[#171717] shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                </div>
                <p className="text-sm font-medium leading-relaxed text-[#171717]">
                  {feedbackMessage || "C'est noté ! Merci pour votre confiance, vos premières analyses arrivent bientôt."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFeedbackMessage(null);
                  }}
                  className="mt-2 text-xs font-mono uppercase tracking-wider text-[#737373] underline hover:text-[#171717] transition-colors"
                >
                  Inscrire une autre adresse
                </button>
              </div>
            ) : (
              <div className="mx-auto max-w-md">
                {errorMessage && (
                  <div className="mb-3 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-800">
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
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      aria-label="Votre adresse e-mail pour la newsletter"
                      className="w-full rounded-full border border-[#171717]/20 bg-white px-11 py-3 text-sm text-[#171717] placeholder-[#737373] transition-colors focus:border-[#171717] focus:outline-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-xs font-mono uppercase tracking-wider text-white shadow-sm transition-all hover:bg-black hover:shadow active:scale-95 disabled:opacity-70"
                  >
                    {loading ? (
                      "Inscription..."
                    ) : (
                      <>
                        <span>S&apos;inscrire</span>
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center text-xs font-mono text-[#737373]">
            <span>[ GRATUIT ]</span>
            <span>·</span>
            <span>[ 1 E-MAIL / 15 JOURS ]</span>
            <span>·</span>
            <span>[ 0 SPAM / DÉSINSCRIPTION EN 1 CLIC ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
