import React from "react";

interface Member {
  name: string;
  role: string;
  photo: string;
  photoAlt?: string;
  quote: string;
  bio: string;
}

interface TeamSectionCProps {
  content: any;
  lang: "en" | "pt";
}

const TeamSectionC: React.FC<TeamSectionCProps> = ({ content, lang }) => {
  const data = content.team[lang];

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-brand-950 py-20 lg:py-28">
      {/* Subtle grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-green/10 blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div data-animate="fade-up" className="mb-3 sm:mb-6 lg:mb-8 text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent-green mb-2 sm:mb-4">
            {data.label}
          </p>
          <h2 className="text-balance text-xl sm:text-4xl font-editorial italic leading-tight text-white md:text-5xl lg:text-[3.25rem] tracking-tight mb-2 sm:mb-6">
            {data.title}
          </h2>
          <p className="text-xs sm:text-lg text-white/60 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Circular duo */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {data.members.map((member: Member, idx: number) => (
            <div
              key={member.name}
              data-animate="fade-up"
              className="group flex flex-col items-center text-center"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Circular portrait with glow */}
              <div className="relative mb-2 sm:mb-4">
                <div className="absolute inset-0 rounded-full bg-accent-green/20 blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-accent-green/30 group-hover:ring-accent-green transition-all duration-500 shadow-2xl">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <h3 className="text-base sm:text-xl lg:text-2xl font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-green mb-2 sm:mb-3">
                {member.role}
              </p>
              <blockquote className="relative text-white/70 italic text-[11px] sm:text-sm leading-relaxed max-w-xs line-clamp-2">
                <span className="text-accent-green text-lg sm:text-2xl font-serif leading-none mr-1">"</span>
                {member.quote}
                <span className="text-accent-green text-lg sm:text-2xl font-serif leading-none ml-1">"</span>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSectionC;
