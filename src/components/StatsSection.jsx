import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const StatsSection = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;

    const counters = root.querySelectorAll("[data-counter]");
    const tweens = [];

    counters.forEach((node) => {
      const target = Number(node.getAttribute("data-target"));
      const suffix = node.getAttribute("data-suffix") ?? "";
      if (Number.isNaN(target)) return;

      const state = { value: 0 };

      const tween = gsap.to(state, {
        value: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          const current = state.value;
          node.textContent =
            target % 1 === 0
              ? `${Math.round(current)}${suffix}`
              : `${current.toFixed(1)}${suffix}`;
        },
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section
      id="metricas"
      ref={statsRef}
      className="relative overflow-hidden bg-white py-12 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <img
          src="/photos/cazarini.jpg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.25rem]">
            Provide the best service a reference in coffee trading
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            Cazarini Trading Company excels in risk management, international
            sales, and domestic procurement, maintaining a meticulous focus on
            every detail until contract fulfillment—always minimizing risk and
            proactively addressing any challenges that may arise.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 lg:flex-row lg:h-[382px]">
          {/* ---------- CARD 1 - 920+ ---------- */}
          <div className="relative w-full lg:w-[438px] h-[382px] rounded-3xl overflow-hidden bg-black flex-shrink-0">
            {/* Brilho suave e curvas fluidas */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
              }}
            />

            {/* Conteúdo */}
            <div className="relative z-10 p-12">
              <h2 className="text-white text-7xl font-bold leading-none mb-3">
                <span data-counter data-target="920" data-suffix="+">
                  920+
                </span>
              </h2>
              <p className="text-white/70 text-base">
                Bags delivered with success
              </p>
            </div>

            {/* Grãos de café - distribuídos horizontalmente pela base do card */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src="/photos/grão.png" // ← seu arquivo grão.png
                  alt="coffee bean"
                  className="w-10 h-12 object-contain"
                />
              ))}
            </div>
          </div>

          {/* ---------- CARD 2 - WHO WE ARE ---------- */}
          <div
            className="relative rounded-[28px] shadow-[0_12px_30px_rgba(1,2,5,0.08)] w-full lg:flex-1 h-[382px]"
            style={{
              borderRadius: "28px",
              overflow: "visible", // permite o botão "sair" do limite do retângulo
              // máscara para recorte circular no canto inferior direito:
              WebkitMaskImage:
                "radial-gradient(circle at 100% 100%, transparent 0 120px, black 121px)",
              maskImage:
                "radial-gradient(circle at 100% 100%, transparent 0 120px, black 121px)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "cover",
              maskSize: "cover",
            }}
          >
            {/* imagem de fundo (opacity para ficar parecido com o design) */}
            <img
              src="/photos/bandeira-cazarini.jpg"
              alt="WHO WE ARE"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0.7 }}
              loading="lazy"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/20 to-transparent" />

            {/* título central */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <h3 className="text-center text-3xl font-semibold tracking-[0.2em] text-white">
                WHO WE ARE
              </h3>
            </div>

            {/* Botão Play - totalmente visível, fora do card */}
            <button
              className="absolute bottom-2 -right-2 w-24 h-24 rounded-full bg-[#B4F34C] flex items-center justify-center shadow-2xl hover:bg-[#A0E338] transition-all z-20 hover:scale-105"
              onClick={() =>
                window.open(
                  "https://www.figma.com/design/7TgD4X065LaFFtNRZ8w0IU",
                  "_blank"
                )
              }
            >
              <svg
                className="w-10 h-10 text-black ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
