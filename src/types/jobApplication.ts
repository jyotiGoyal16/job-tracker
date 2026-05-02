import type { ApplicationStatus } from "./applicationStatus";
import type { Platform } from "./platform";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  platform: Platform;
  location: string;
  date: string;
  status: ApplicationStatus;
}
