export type ApplicationStatus = "applied" | "interview" | "rejected" | "offer";

/** Values allowed in a status filter dropdown (domain statuses plus "all"). */
export type ApplicationStatusDropdownOptions = ApplicationStatus | "All";
