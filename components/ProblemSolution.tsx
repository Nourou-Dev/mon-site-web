export default function ProblemSolution() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f7f4f2] p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
              Votre site vous fait-il perdre des clients ?
            </span>

            <h2 className="mt-6 max-w-[480px] font-black tracking-[-0.07em] text-[#171717]">
              Votre site actuel ne reflète peut-être pas la valeur réelle

            </h2>
            <h2 className=" font-black tracking-[-0.07em] text-[#171717]">
              de votre entreprise

            </h2>

            <p className="mt-5 max-w-[520px] text-lg leading-8 text-[#4b4b4b]">
              Vous proposez de bons produits ou services, mais votre présence en ligne ne vous aide pas suffisamment à les vendre.
            </p>

            <div className="mt-9">
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#171717]/65">
                Peut-être que :
              </p>

              <ul className="space-y-2 text-[0.98rem] leading-7 text-[#2f2f2f]">
                {[
                  "votre site paraît dépassé ou manque de personnalité ;",
                  "vos visiteurs ne comprennent pas rapidement ce que vous proposez ;",
                  "votre image manque de cohérence ;",
                  "votre site n’est pas adapté aux smartphones ;",
                  "vous dépendez uniquement des réseaux sociaux pour présenter votre activité ;",
                  "vos prospects posent toujours les mêmes questions avant de passer à l’action ;",
                  "vous recevez peu de demandes malgré vos efforts de communication.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[0.35rem] text-base font-bold leading-none text-[#d76b45]">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex min-h-[340px] h-full items-stretch sm:min-h-[400px] lg:min-h-[420px]">
            <div className="absolute left-5 top-6 h-28 w-28 rounded-full bg-[#d76b45]/10 blur-2xl" />
            <div className="absolute bottom-4 right-0 h-24 w-24 rounded-full bg-[#171717]/5 blur-2xl" />

            <div className="relative flex h-full w-full flex-col justify-between rounded-[1.8rem] border border-[#171717]/8 bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(17,17,17,0.16)] sm:p-8">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/70">
                  Diagnostic
                </p>
                <p className="mt-6 text-5xl font-black leading-none tracking-[-0.08em] text-white">
                  01
                </p>
              </div>

              <div className="mt-8">
                <p className="text-[1.05rem] leading-7 text-white/80">
                  Un site web ne doit pas seulement être agréable à regarder.
                </p>
                <p className="mt-4 text-[1.05rem] leading-7 text-white/80">
                  Il doit rassurer, expliquer clairement votre valeur et guider vos visiteurs vers la prochaine étape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
