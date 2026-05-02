import { BADGE_CLASSES } from "../../constants";
import type { BadgeVariant } from "../../types/badge";

interface BadgeProps {
  variant: BadgeVariant;
}

const Badge = ({ variant }: BadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_CLASSES[variant]}`}
    >
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </span>
  );
};

export default Badge;
