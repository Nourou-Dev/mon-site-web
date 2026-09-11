import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Solution from "@/components/Solution";
import ClientSpace from "@/components/ClientSpace";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BlogTeaser from "@/components/BlogTeaser";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <Hero />
        <ProblemSolution />
        <Solution />
        <ClientSpace />
        <StatsBar />
        <Services />
        <TechStack />
        <Testimonials />
        <FAQ />
        <BlogTeaser />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
