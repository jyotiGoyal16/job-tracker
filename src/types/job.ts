export type ApplicationStatus = "Applied" | "Interview" | "Rejected" | "Offer";

export type Platform = "LinkedIn" | "Naukri" | "Instahyre" | "Career Page";

export interface JobApplication {
  id: string;
  companyName: string;
  role: string;
  platform: Platform;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
}
