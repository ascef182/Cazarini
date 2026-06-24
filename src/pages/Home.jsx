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
import { useTranslation } from "../hooks/useTranslation";

const SITE_URL = "https://www.cazarini.com";

export const Home = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const { t } = useTranslation();

  const faqItems = t("faq.items") || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Cazarini Trading Company",
        url: SITE_URL,
        logo: `${SITE_URL}/photos/Logomarca-Cazarini-12.09.13.svg`,
        email: "trading@cazarini.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Alameda do Café, 317 - Industrial Reinaldo Foresti",
          addressLocality: "Varginha",
          addressRegion: "MG",
          addressCountry: "BR",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Cazarini Coffee Trading | Brazilian Coffee Brokers Since 2009"
            : "Cazarini Trading de Café | Corretores de Café Brasileiro Desde 2009"
        }
        description={
          lang === "en"
            ? "Leading coffee brokerage connecting producers, exporters & buyers worldwide. 920+ bags delivered, 250+ trusted partners. Specializing in Brazilian coffee."
            : "Líder em corretagem de café conectando produtores, exportadores e compradores mundialmente. 920+ sacas entregues, 250+ parceiros confiáveis. Especializado em café brasileiro."
        }
        keywords={
          lang === "en"
            ? "coffee trading, coffee broker, brazilian coffee, coffee export, coffee brokerage, arabica, robusta"
            : "trading café, corretor café, café brasileiro, exportação café, corretagem café, arábica, robusta"
        }
        jsonLd={jsonLd}
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
