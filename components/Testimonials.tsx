"use client";

const TESTIMONIALS = [
  {
    name: "Alicia M.",
    role: "Fondatrice · Studio de création",
    text:
      "Nourou a su traduire notre ADN en une identité visuelle claire, élégante et immédiatement compréhensible. Le travail a donné un vrai coup de projecteur à notre marque.",
    rating: 5,
  },
  {
    name: "Samuel K.",
    role: "Responsable marketing · Structure locale",
    text:
      "Le plus agréable dans le travail, c’est la précision. Les décisions de design étaient justes, utiles et orientées résultat. Le site a immédiatement gagné en crédibilité.",
    rating: 5,
  },
  {
    name: "Mariam D.",
    role: "Directrice · Boutique lifestyle",
    text:
      "On sent la réflexion stratégique derrière chaque choix visuel. Une vraie alliance entre esthétique, expérience utilisateur et efficacité commerciale.",
    rating: 5,
  },
];

const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  return (
    <section id="avis" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f3efe9] p-6 sm:p-8 lg:p-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
            Témoignages
          </span>
          <h2 className="mt-5 max-w-[18ch] font-black tracking-[-0.07em] text-[#171717]">
            Ce que mes clients disent
          </h2>
          <p className="mt-4 max-w-[42rem] text-base leading-7 text-[#4b4b4b]">
            Des collaborations claires, des décisions utiles et une présence en ligne qui inspire confiance.
          </p>
        </div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="testimonials-marquee flex w-max items-stretch gap-5">
            {duplicatedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="flex h-full w-[320px] shrink-0 flex-col rounded-[1.6rem] border border-[#171717]/8 bg-white p-5 shadow-[0_12px_28px_rgba(21,20,27,0.03)] sm:w-[360px] sm:p-6"
              >
                <div className="flex items-center gap-3 border-b border-[#171717]/8 pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
                    {testimonial.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#171717]">
                      {testimonial.name}
                    </div>
                    <div className="text-[12px] text-[#4b4b4b]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-sm text-[#d7a33d]">
                    {/* {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))} */}
                  </div>
                  {/* <span className="rounded-full border border-[#171717]/10 bg-[#f5f1ed] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171717]/60">
                    Google
                  </span> */}
                </div>

                <blockquote className="flex-1 text-[1.02rem] leading-7 text-[#2b2b2b]">
                  “{testimonial.text}”
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
