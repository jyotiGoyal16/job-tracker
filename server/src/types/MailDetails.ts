import { ApplicationStatus } from "./ApplicationStatus";

type MailDetails = {
  id: string;
  role: string | null;
  company: string | null;
  location: string | null;
  status: ApplicationStatus;
  platform: string | null;
  date: string | null;
};

export type { MailDetails };
