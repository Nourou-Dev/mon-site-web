import { Layers } from "lucide-react";
import { techStack } from "@/lib/data";

export default function TechStack() {
  const n = techStack.length;
  const spread = 260;
  const startX = 160 - spread / 2;
  const step = n > 1 ? spread / (n - 1) : 0;

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-wrap rounded-[2rem] bg-ink px-6 py-14 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-lg text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80">
            Sous le capot
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Des outils modernes, choisis pour durer
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/55">
            Une stack éprouvée qui privilégie la vitesse, la maintenabilité et
            un bon référencement, quel que soit le projet.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative">
            <svg viewBox="0 0 320 100" className="w-full" aria-hidden>
              {techStack.map((_, i) => {
                const x = startX + step * i;
                return (
                  <path
                    key={i}
                    d={`M160,6 C160,45 ${x},45 ${x},84`}
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
            <span className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-ember-500 text-white shadow-lg shadow-ember-500/30 sm:h-11 sm:w-11">
              <Layers className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
            </span>
          </div>

          <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-center text-sm font-semibold text-white/85 transition-colors hover:border-ember-500/40"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
