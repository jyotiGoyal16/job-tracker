import type { ApplicationStatus, Platform } from "../types/job";

type BadgeVariant = ApplicationStatus | Platform;

interface BadgeProps {
  variant: BadgeVariant;
}

const badgeClasses: Record<BadgeVariant, string> = {
  applied: "bg-blue-100 text-blue-700",
  interview: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  offer: "bg-emerald-100 text-emerald-700",
  Linkedin: "bg-sky-100 text-sky-700",
  Indeed: "bg-indigo-100 text-indigo-700",
  Greenhouse: "bg-green-200 text-green-700",
  Workday: "bg-amber-100 text-amber-800",
  Other: "bg-slate-200 text-slate-700",
};

function Badge({ variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClasses[variant]}`}
    >
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </span>
  );
}

export default Badge;
