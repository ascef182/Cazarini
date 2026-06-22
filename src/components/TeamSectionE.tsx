import React from "react";

interface Member {
  name: string;
  role: string;
  photo: string;
  photoAlt?: string;
  quote: string;
  bio: string;
}

interface TeamSectionEProps {
  content: any;
  lang: "en" | "pt";
}

const TeamSectionE: React.FC<TeamSectionEProps> = ({ content, lang }) => {
  const data = content.team[lang];

  return (
    <section className="relative h-full overflow-hidden bg-brand-900">
      {/* Decorative accent line at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-accent-green to-transparent"
      />

      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div data-animate="fade-up" className="mb-3 sm:mb-6 lg:mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-2 py-1 sm:px-4 sm:py-1.5 mb-1.5 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <p className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent-green">
              {data.departmentTag}
            </p>
          </div>
          <h2 className="text-balance text-xl sm:text-4xl font-editorial italic leading-tight text-white md:text-5xl lg:text-[3.25rem] tracking-tight mb-1.5 sm:mb-6">
            {data.title}
          </h2>
          <p className="hidden sm:block text-lg text-white/60 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Executive cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {data.members.map((member: Member, idx: number) => (
            <article
              key={member.name}
              data-animate="fade-up"
              className="group relative rounded-lg sm:rounded-[32px] bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-500 hover:border-accent-green/40 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {/* Photo */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />

                {/* Index */}
                <div className="absolute top-1.5 right-1.5 sm:top-5 sm:right-5 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-accent-green/80">
                  / {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-1.5 sm:p-4 lg:p-5">
                <p className="text-[8px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-accent-green mb-0.5 sm:mb-2">
                  {member.role}
                </p>
                <h3 className="text-[11px] sm:text-xl lg:text-2xl font-semibold text-white mb-0.5 sm:mb-2 leading-tight truncate">
                  {member.name}
                </h3>
                <p className="hidden sm:block text-sm lg:text-base text-white/70 leading-relaxed mb-3 line-clamp-3">
                  {member.bio}
                </p>

                <blockquote className="hidden sm:block relative pl-4 border-l-2 border-accent-green/60 italic text-white/80 text-sm line-clamp-2">
                  "{member.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSectionE;
