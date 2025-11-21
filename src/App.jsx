import React from "react";

import { AboutUsSection } from "./components/AboutUsSection";
import ContactSection from "./components/ContactSection";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";

export const CoffeTrading = () => {
  return (
    <div data-color-mode="SDS-light" className="flex w-full flex-col bg-white">
      <HeroSection />
      <StatsSection />
      <AboutUsSection />
      <TestimonialsSection />
      <FaqSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default CoffeTrading;
