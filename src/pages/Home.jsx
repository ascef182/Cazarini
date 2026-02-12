import React from "react";
import { AboutUsSection } from "../components/AboutUsSection";
import ContactSection from "../components/ContactSection";
import { FaqSection } from "../components/FaqSection";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { StatsSection } from "../components/StatsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

export const Home = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";

  return (
    <>
      <SEO
        title={lang === "en"
          ? "Cazarini Coffee Trading | Premium Brazilian Coffee Brokers Since 2009"
          : "Cazarini Trading de Café | Corretores Premium de Café Brasileiro Desde 2009"}
        description={lang === "en"
          ? "Leading coffee brokerage connecting producers, exporters & buyers worldwide. 920+ bags delivered, 250+ trusted partners. Specializing in premium Brazilian coffee."
          : "Líder em corretagem de café conectando produtores, exportadores e compradores mundialmente. 920+ sacas entregues, 250+ parceiros confiáveis. Especializado em café brasileiro premium."}
        keywords={lang === "en"
          ? "coffee trading, coffee broker, brazilian coffee, coffee export, coffee brokerage, premium coffee, arabica, robusta"
          : "trading café, corretor café, café brasileiro, exportação café, corretagem café, café premium, arábica, robusta"}
      />

      <HeroSection />
      <StatsSection />
      <AboutUsSection />
      <TestimonialsSection />
      <FaqSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
