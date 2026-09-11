"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/lib/data";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "site-vitrine",
    budget: "150k-350k",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{ name: string; projectType: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _hp_fax: honeypot,
          _renderedAt: renderedAt,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Une erreur est survenue lors de l'envoi de votre demande.");
      }

      setLastSubmission({
        name: formData.name,
        projectType: formData.projectType,
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "site-vitrine",
        budget: "150k-350k",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Impossible d'envoyer votre demande pour le moment. Veuillez vérifier votre connexion ou me contacter directement sur WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-[5.5rem]">
        {/* En-tête Contact */}
        <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,195,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.03),transparent_20%)]" />

          <div className="relative mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <MessageCircle className="h-3.5 w-3.5 text-[#0060c3]" />
              Démarrer un projet
            </span>

            <h1 className="mx-auto mt-6 max-w-[850px] font-black tracking-[-0.07em] text-[#171717]">
              Donnons vie à un site qui fera choisir votre marque
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
              Décrivez vos besoins en quelques lignes ou contactez-moi directement. Je vous réponds sous 24 heures avec une proposition claire et sans engagement.
            </p>
          </div>
        </section>

        {/* Section principale : Formulaire & Coordonnées */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Formulaire de devis */}
              <div className="rounded-[2rem] border border-[#171717]/8 bg-white p-6 shadow-[0_15px_40px_rgba(21,20,27,0.04)] sm:p-10">
                <h2 className="text-2xl font-black tracking-[-0.05em] text-[#171717] sm:text-3xl">
                  Parlez-moi de votre projet
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                  Remplissez ce formulaire pour recevoir un devis estimatif et des conseils sur mesure.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl border border-[#3FB88A]/30 bg-[#3FB88A]/10 p-8 text-center text-[#171717]">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3FB88A] text-white">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-xl font-black text-[#171717]">
                      Demande enregistrée avec succès !
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                      Merci pour votre message. Vos informations ont bien été transmises. Je prends connaissance de votre projet et reviens vers vous sous 24 heures avec une proposition claire.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/22900000000?text=${encodeURIComponent(
                          `Bonjour Nourou, je viens de soumettre une demande de devis sur votre site (${lastSubmission?.projectType || "Projet Web"}). Mon nom est ${lastSubmission?.name || ""}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Accélérer l'échange sur WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setLastSubmission(null);
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-[#171717] px-6 py-3 text-xs font-bold text-white transition-transform active:scale-95"
                      >
                        Envoyer une autre demande
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Piège Honeypot invisible pour tromper les robots automatisés */}
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
                      <label htmlFor="contact-hp-fax">Laissez ce champ vide</label>
                      <input
                        id="contact-hp-fax"
                        type="text"
                        name="_hp_fax"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <div className="flex-1">{errorMessage}</div>
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                          Votre nom complet *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="ex. Alicia Martin"
                          className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-4 py-3 text-sm text-[#171717] placeholder-[#171717]/55 transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                          Adresse e-mail *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="alicia@exemple.com"
                          className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-4 py-3 text-sm text-[#171717] placeholder-[#171717]/55 transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                          Téléphone / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+229 01 00 00 00"
                          className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-4 py-3 text-sm text-[#171717] placeholder-[#171717]/55 transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-project-type" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                          Type de projet *
                        </label>
                        <select
                          id="contact-project-type"
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData({ ...formData, projectType: e.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-4 py-3 text-sm text-[#171717] transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                        >
                          <option value="site-vitrine">Site vitrine premium</option>
                          <option value="landing-page">Landing page de vente</option>
                          <option value="catalogue">Catalogue WhatsApp / E-commerce</option>
                          <option value="refonte">Refonte de site existant</option>
                          <option value="autre">Autre demande spécifique</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                        Budget approximatif
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-4 py-3 text-sm text-[#171717] transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                      >
                        <option value="moins-150k">Moins de 150 000 FCFA</option>
                        <option value="150k-350k">150 000 à 350 000 FCFA</option>
                        <option value="350k-700k">350 000 à 700 000 FCFA</option>
                        <option value="plus-700k">Plus de 700 000 FCFA</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-[0.1em] text-[#171717]">
                        Décrivez brièvement votre projet *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Présentez votre activité, vos objectifs, les fonctionnalités souhaitées ou votre date limite..."
                        className="mt-2 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] p-4 text-sm text-[#171717] placeholder-[#171717]/55 transition-colors focus:border-[#0060c3] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0060c3] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-all hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
                    >
                      {loading ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          Envoyer ma demande
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Coordonnées & Accès direct */}
              <div className="flex flex-col justify-between gap-6">
                <div className="rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-8">
                  <h3 className="text-xl font-black tracking-[-0.04em] text-[#171717]">
                    Canaux directs
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                    Préférez-vous un échange direct et immédiat ? Vous pouvez me joindre par e-mail ou sur WhatsApp.
                  </p>

                  <div className="mt-6 space-y-4">
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/70">
                          WhatsApp direct
                        </div>
                        <div className="text-sm font-extrabold text-[#171717]">
                          Discuter sur WhatsApp
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3.5 rounded-2xl border border-[#171717]/10 bg-white p-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0060c3]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/70">
                          Adresse e-mail
                        </div>
                        <div className="truncate text-sm font-extrabold text-[#171717]">
                          {site.email}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3.5 rounded-2xl border border-[#171717]/10 bg-white p-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0060c3]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/70">
                          Téléphone
                        </div>
                        <div className="text-sm font-extrabold text-[#171717]">
                          {site.phone}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#171717]/8 bg-[#171717] p-6 text-white sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                    <Clock className="h-4 w-4" />
                    <span>Disponibilité & Réactivité</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Réponse garantie sous <strong>24 heures</strong> ouvrées. Tous les devis sont gratuits, détaillés et sans engagement.
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="h-4 w-4 text-[#0060c3]" />
                    <span>Basé à Abomey-Calavi · Projets locaux & internationaux</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter lead capture */}
        <Newsletter />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
