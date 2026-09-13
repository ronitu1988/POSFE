import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import type { StaffRole } from "../types/auth";

type RoleCardProps = {
  role: StaffRole;
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
  selected: boolean;
  onSelect: (role: StaffRole) => void;
};

export function RoleCard({
  role,
  title,
  description,
  icon: Icon,
  selected,
  onSelect,
}: RoleCardProps) {
  return (
    <button
      type="button"
      className={`role-card ${selected ? "role-card--selected" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(role)}
    >
      <Icon size={33} strokeWidth={1.6} aria-hidden="true" />
      <span className="role-card__title">{title}</span>
      <span className="role-card__description">{description}</span>
    </button>
  );
}