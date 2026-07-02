import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ServicesSection from "@/components/ServicesSection";
import HistorySection from "@/components/HistorySection";
import AboutSection from "@/components/AboutSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <HistorySection />
        <AboutSection />
        <ServicesSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
