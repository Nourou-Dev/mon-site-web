import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import ClientSpace from "@/components/ClientSpace";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import ProblemSolution from "@/components/ProblemSolution";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenu" tabIndex={-1}>
        {/* 1. Hero éditorial asymétrique avec spécifications live & géolocalisation */}
        <Hero />

        {/* 2. Vitrine des projets récents (la preuve concrète tout de suite) */}
        <SelectedWork />

        {/* 3. L'espace client interactif (démonstrateur exclusif Nourou Dine) */}
        <ClientSpace />

        {/* 4. Les offres & services précis avec livrables & tarifs transparents */}
        <Services />

        {/* 5. Mon approche & vision commerciale du web */}
        <Differentiation />

        {/* 6. Méthode agile vs pièges des agences traditionnelles */}
        <ProblemSolution />

        {/* 7. Stack technologique & standards d'ingénierie */}
        <TechStack />

        {/* 8. Témoignages réels vérifiés */}
        <Testimonials />

        {/* 9. Réponses transparentes aux questions fréquentes */}
        <FAQ />

        {/* 10. Bannière d'engagement direct & garantie 24h */}
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
