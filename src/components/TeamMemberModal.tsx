import React from "react";
import { X } from "lucide-react";

interface Member {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

interface TeamMemberModalProps {
  member: Member | null;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-brand-950/90 backdrop-blur-md" />

      <div
        className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[24px]">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-5">
          <p className="text-accent-green font-semibold text-xs uppercase tracking-[0.2em] mb-1">
            {member.role}
          </p>
          <h3 className="text-xl font-semibold text-brand-900 mb-3">
            {member.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
