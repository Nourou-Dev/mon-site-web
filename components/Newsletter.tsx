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
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-[#0060c3]/30 bg-[#0060c3] px-6 py-12 text-white shadow-[0_25px_60px_rgba(0,96,195,0.28)] sm:px-12 sm:py-16 lg:px-16">
        {/* Glow décoratif */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#004a99]/40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
            <Mail className="h-3.5 w-3.5 text-[#0060c3]" />
            Newsletter · Stratégie &amp; Design
          </span>

          <h2 className="mt-5 text-2xl font-black tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl">
            Recevez mes conseils pour faire de votre site une machine à convaincre
          </h2>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/95 sm:text-[1.05rem]">
            Analyses de sites, retours d’expérience concrets et astuces d’optimisation
            pour développer votre clientèle grâce à votre présence en ligne.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-white/30 bg-white/20 p-6 text-center text-white backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0060c3]">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                </div>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  {feedbackMessage || "C'est noté ! Merci pour votre confiance, vos premiers conseils arrivent bientôt."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFeedbackMessage(null);
                  }}
                  className="mt-2 text-xs font-semibold text-white/90 underline hover:text-white transition-colors"
                >
                  Inscrire une autre adresse
                </button>
              </div>
            ) : (
              <div className="mx-auto max-w-md">
                {errorMessage && (
                  <div className="mb-3 flex items-center justify-center gap-2 rounded-xl border border-red-200/50 bg-red-500/20 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-200" />
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
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse e-mail..."
                      aria-label="Votre adresse e-mail pour la newsletter"
                      className="w-full rounded-full border border-white/30 bg-white/15 px-11 py-3.5 text-sm text-white placeholder-white/75 backdrop-blur-sm transition-colors focus:border-white focus:bg-white/25 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0060c3] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#f5f9ff] active:scale-95 disabled:opacity-70"
                  >
                    {loading ? (
                      "Inscription..."
                    ) : (
                      <>
                        Rejoindre
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center text-xs text-white/90 font-medium">
            <span>✓ Gratuit &amp; sans engagement</span>
            <span>•</span>
            <span>✓ Désinscription en 1 clic</span>
            <span>•</span>
            <span>✓ 0% spam, 100% valeur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
