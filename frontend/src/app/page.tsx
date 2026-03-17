import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import SkillsSection from "@/components/layout/SkillsSection";
import ProjectsSection from "@/components/layout/ProjectsSection"
import AboutSection from "@/components/layout/AboutSection";
import ContactSection from "@/components/layout/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">

      <Navbar />
      <div className="fixed inset-0 -z-\[5\] bg-linear-to-b from-black/30 via-black/10 to-black/40 pointer-events-none"/>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}