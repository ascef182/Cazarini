import React, { useState } from "react";
import TeamMemberModal from "./TeamMemberModal";

interface Member {
  name: string;
  role: string;
  photo: string;
  photoAlt?: string;
  quote: string;
  bio: string;
}

interface TeamSectionAProps {
  content: any;
  lang: "en" | "pt";
}

const TeamSectionA: React.FC<TeamSectionAProps> = ({ content, lang }) => {
  const data = content.team[lang];
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const readMoreLabel = lang === "pt" ? "Ler mais" : "Read more";

  return (
    <section className="relative h-full overflow-hidden bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div data-animate="fade-up" className="mb-3 sm:mb-6 lg:mb-8 text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent-green mb-2 sm:mb-4">
            {data.label}
          </p>
          <h2 className="text-balance text-xl sm:text-4xl font-editorial italic leading-tight text-brand-900 md:text-5xl lg:text-[3.25rem] tracking-tight mb-2 sm:mb-6">
            {data.title}
          </h2>
          <p className="text-xs sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
            {data.subtitle}
          </p>
        </div>

        {/* Members grid — 2 columns centered */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10 max-w-4xl mx-auto">
          {data.members.map((member: Member, idx: number) => (
            <div
              key={member.name}
              data-animate="fade-up"
              className="group relative rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-sm sm:shadow-md"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent" />

                {/* Accent border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-green/60 transition-colors duration-500 pointer-events-none" />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                  <p className="text-accent-green font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-1 sm:mb-2">
                    {member.role}
                  </p>
                  <h3 className="text-sm sm:text-xl lg:text-3xl font-semibold text-white">
                    {member.name}
                  </h3>
                </div>
              </div>

              <div className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4">
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 leading-snug sm:leading-relaxed line-clamp-3 lg:line-clamp-4">
                  {member.bio}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="mt-1 text-[10px] sm:text-xs font-semibold text-accent-green hover:underline"
                >
                  {readMoreLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  );
};

export default TeamSectionA;
