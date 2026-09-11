import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import ClientSpace from "@/components/ClientSpace";
import Benefits from "@/components/Benefits";
import StatsBar from "@/components/StatsBar";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Qualification from "@/components/Qualification";
import FAQ from "@/components/FAQ";
import BlogTeaser from "@/components/BlogTeaser";
import Newsletter from "@/components/Newsletter";
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
        <Services />
        <Differentiation />
        <ClientSpace />
        <Benefits />
        <StatsBar />
        <TechStack />
        <Testimonials />
        <Qualification />
        <FAQ />
        <BlogTeaser />
        <Newsletter />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
