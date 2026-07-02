import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { CoursesSection } from "@/components/layout/CoursesSection";
import { AboutSection } from "@/components/layout/AboutSection";
import { CTASection } from "@/components/layout/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CoursesSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
