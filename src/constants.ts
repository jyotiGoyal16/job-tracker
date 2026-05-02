import type { ApplicationStatusDropdownOptions } from "./types/applicationStatus";
import type { BadgeVariant } from "./types/badge";
import type { PlatformDropdownOptions } from "./types/platform";

const COLUMN_LABELS: string[] = [
  "Company Name",
  "Role",
  "Platform",
  "Location",
  "Date Applied",
  "Status",
  "Actions",
];

const BADGE_CLASSES: Record<BadgeVariant, string> = {
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

const STATUS_OPTIONS: ApplicationStatusDropdownOptions[] = [
  "All",
  "applied",
  "interview",
  "rejected",
  "offer",
];

const PLATFORM_OPTIONS: PlatformDropdownOptions[] = [
  "All",
  "Linkedin",
  "Indeed",
  "Greenhouse",
  "Workday",
  "Other",
];

const LOCATION_OPTIONS: string[] = [
  "All",
  "Bengaluru",
  "Bangalore",
  "Hybrid",
  "Remote",
  "On-site",
];

export {
  COLUMN_LABELS,
  BADGE_CLASSES,
  STATUS_OPTIONS,
  PLATFORM_OPTIONS,
  LOCATION_OPTIONS,
};
