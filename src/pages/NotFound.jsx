import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowRight, Home, Mail } from "lucide-react";

const content = {
  en: {
    title: "Lost Origin",
    subtitle: "The page you are looking for has not been mapped in our route.",
    home: "Return to Home",
    contact: "Contact Trading",
    code: "ERR_404 // ORIGIN_NOT_FOUND",
  },
  pt: {
    title: "Origem Perdida",
    subtitle: "A página que você procura não foi mapeada em nossa rota.",
    home: "Voltar ao Início",
    contact: "Contatar Trading",
    code: "ERR_404 // ORIGEM_NAO_ENCONTRADA",
  },
};

const NotFound = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const containerRef = useRef(null);
  const beanRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse animation for the "bean"
      gsap.to(beanRef.current, {
        scale: 1.2,
        opacity: 0.8,
        boxShadow: "0 0 30px rgba(153, 207, 98, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Reveal animation
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
      
      tl.from(".not-found-bg", { opacity: 0, scale: 1.1, duration: 2 })
        .from(".error-code", { y: -20, opacity: 0 }, "-=1.5")
        .from(".hollow-404", { y: 20, opacity: 0, duration: 1.2 }, "-=1.2")
        .from(".content-text", { y: 20, opacity: 0, stagger: 0.1 }, "-=1")
        .from(".action-buttons", { y: 20, opacity: 0 }, "-=0.8")
        .from(".status-line", { width: 0, opacity: 0 }, "-=0.5");
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-brand-950 min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 not-found-bg">
        <img
          src="/photos/cafevistoporcima.jpg"
          alt="Coffee field texture"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/40" />
        <div className="absolute inset-0 opacity-90" style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(2,6,9,0.5) 50%, rgba(2,6,9,1) 100%)" }} />
      </div>

      <div className="relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <Header variant="dark" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 text-center min-h-[60vh]">
        {/* Glowing "Bean" Focal Point */}
        <div className="relative mb-8">
          <div 
            ref={beanRef}
            className="w-3 h-3 rounded-full bg-accent-green shadow-[0_0_20px_rgba(153,207,98,0.4)] relative z-10"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-accent-green/30 to-transparent blur-[1px]" />
        </div>

        {/* 404 Hollow Text */}
        <h1 className="hollow-404 hollow-text font-bold text-[clamp(100px,20vw,280px)] leading-[0.8] tracking-tighter select-none font-sans text-brand-950/0 opacity-30 mix-blend-overlay">
          404
        </h1>

        <div className="content-text space-y-6 max-w-lg mx-auto -mt-4 sm:-mt-12 relative z-20">
          <p className="error-code text-accent-green text-xs font-mono tracking-[0.2em] uppercase">
            {content[lang].code}
          </p>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial italic text-white">
            {content[lang].title}
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            {content[lang].subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons flex flex-wrap justify-center gap-4 mt-12">
          <Link
            to="/"
            className="group flex items-center gap-3 bg-white text-brand-900 px-8 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-accent-green transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{content[lang].home}</span>
          </Link>
          
          <Link
            to="/contact"
            className="group flex items-center gap-3 border border-white/20 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-white/10 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{content[lang].contact}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="relative z-10 border-t border-white/5 bg-brand-950/50 backdrop-blur-sm mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
          <span>Sys.Err // 404</span>
          <span className="status-line h-px w-24 bg-white/10" />
          <span>Route_Unmapped</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
