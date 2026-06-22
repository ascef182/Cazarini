import React from "react";

interface Member {
  name: string;
  role: string;
  photo: string;
  photoAlt?: string;
  quote: string;
  bio: string;
}

interface TeamSectionBProps {
  content: any;
  lang: "en" | "pt";
}

const TeamSectionB: React.FC<TeamSectionBProps> = ({ content, lang }) => {
  const data = content.team[lang];
  const [first, second] = data.members;

  return (
    <section className="relative h-full overflow-hidden bg-gray-50">
      {/* Decorative accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-green/10 blur-3xl"
      />

      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div data-animate="fade-up" className="mb-2 sm:mb-4 lg:mb-6 max-w-2xl">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent-green mb-1.5 sm:mb-3">
            {data.label}
          </p>
          <h2 className="text-balance text-lg sm:text-3xl font-editorial italic leading-tight text-brand-900 md:text-4xl lg:text-[2.25rem] tracking-tight mb-1.5 sm:mb-4">
            {data.title}
          </h2>
          <p className="text-xs sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">{data.subtitle}</p>
        </div>

        {/* Asymmetric grid: foto duo grande + 2 cards empilhados — always side-by-side, never stacks */}
        <div className="grid grid-cols-[1.1fr_1fr] gap-2 sm:gap-4 lg:gap-6 h-[260px] sm:h-[320px] lg:h-[380px]">
          {/* Foto duo */}
          <div
            data-animate="fade-up"
            className="group relative rounded-2xl lg:rounded-[32px] overflow-hidden shadow-2xl h-full"
          >
            <img
              src={data.duoPhotoAlt || data.duoPhoto}
              alt={`${first.name} & ${second.name}`}
              className="w-full h-full object-cover object-center transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />

            {/* Department tag overlay */}
            <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-green px-2 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-900 shadow-lg">
                {data.departmentTag}
              </span>
            </div>
          </div>

          {/* Cards empilhados */}
          <div className="flex h-full flex-col gap-2 sm:gap-4 lg:gap-6">
            {data.members.map((member: Member, idx: number) => (
              <article
                key={member.name}
                data-animate="fade-up"
                className="group flex flex-1 min-h-0 items-center gap-2 sm:gap-4 rounded-xl sm:rounded-[24px] bg-white p-2 sm:p-5 lg:p-6 shadow-[0_8px_24px_rgba(1,2,5,0.06)] border border-gray-100 hover:border-accent-green/40 transition-all overflow-hidden"
                style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-9 h-9 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden ring-2 ring-accent-green/30">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transform-gpu will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-green mb-0.5 sm:mb-1">
                    {member.role}
                  </p>
                  <h3 className="text-xs sm:text-base lg:text-lg font-semibold text-brand-900 mb-0.5 sm:mb-2 leading-tight">
                    {member.name}
                  </h3>
                  <blockquote className="hidden sm:block text-sm text-gray-600 italic leading-relaxed line-clamp-2">
                    "{member.quote}"
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSectionB;
