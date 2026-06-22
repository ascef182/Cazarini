import React from "react";

interface TeamSectionDProps {
  content: any;
  lang: "en" | "pt";
}

const TeamSectionD: React.FC<TeamSectionDProps> = ({ content, lang }) => {
  const data = content.team[lang];
  const [first, second] = data.members;

  return (
    <section className="relative h-full overflow-hidden bg-white">
      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10 items-center">
          {/* Photo side */}
          <div data-animate="fade-up" className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] lg:max-h-[420px] rounded-xl sm:rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src={data.duoPhotoAlt || data.duoPhoto}
                alt={`${first.name} & ${second.name}`}
                className="w-full h-full object-cover object-top transform-gpu will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-950/40" />

              {/* Department badge */}
              <div className="absolute bottom-1.5 left-1.5 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-accent-green px-1.5 py-0.5 sm:px-4 sm:py-1.5 text-[8px] sm:text-xs font-bold uppercase tracking-widest text-brand-900 shadow-lg">
                  {lang === "en" ? "Logistics Department" : "Departamento de Logística"}
                </span>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-2 sm:space-y-4 lg:space-y-5">
            <div data-animate="fade-up">
              <p className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-accent-green mb-1 sm:mb-3">
                {data.label}
              </p>
              <h2 className="text-balance text-base sm:text-3xl font-editorial italic leading-tight text-brand-900 md:text-4xl lg:text-[2.5rem] tracking-tight mb-1 sm:mb-4">
                {data.title}
              </h2>
              <p className="hidden sm:block text-base text-gray-600 leading-relaxed">
                {data.subtitle}
              </p>
            </div>

            {/* Members list */}
            <div data-animate="fade-up" className="space-y-1.5 sm:space-y-3 pt-1.5 sm:pt-3 border-t border-gray-200">
              {data.members.map((member: any, idx: number) => (
                <div
                  key={member.name}
                  className="flex items-center gap-1.5 sm:gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-accent-green/40 group-hover:ring-accent-green transition-all">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transform-gpu will-change-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] sm:text-base lg:text-lg font-semibold text-brand-900 leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="hidden sm:block text-sm text-gray-500 mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  <span className="hidden sm:block flex-shrink-0 text-3xl font-editorial italic text-accent-green/40 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSectionD;
