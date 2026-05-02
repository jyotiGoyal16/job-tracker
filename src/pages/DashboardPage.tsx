import { useState } from "react";
import ApplicationsTable from "../components/ApplicationsTable";
import KPICards from "../components/KPICards";
import DashboardSidebar from "../components/DashboardSidebar";
import useDateFilter from "../hooks/useDateFilter";
import type { JobApplication } from "../types/jobApplication";

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);

  const { startDate, setStartDate, endDate, setEndDate } =
    useDateFilter(syncMails);

  const fetchApplications = () => {
    const params = new URLSearchParams({ startDate, endDate });
    fetch(`${import.meta.env.VITE_API_URL}/applications?${params.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const jobApplications = data.data;
        setApplications(jobApplications);
        setFilteredApplications(jobApplications);
      });
  };

  function syncMails(rangeStartDate: string, rangeEndDate: string) {
    const params = new URLSearchParams({
      startDate: rangeStartDate,
      endDate: rangeEndDate,
    });

    fetch(`${import.meta.env.VITE_API_URL}/mail/sync?${params.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => fetchApplications())
      .finally(() => setIsLoading(false));
  }

  const applicationCount = filteredApplications.length;
  const interviewCount = filteredApplications?.filter(
    (application) => application.status.toLowerCase() === "interview",
  ).length;
  const rejectionCount = filteredApplications?.filter(
    (application) => application.status.toLowerCase() === "rejected",
  ).length;
  const offerCount = filteredApplications?.filter(
    (application) => application.status.toLowerCase() === "offer",
  ).length;

  return (
    <main className="flex min-h-screen w-full flex-col gap-6 px-4 py-6 md:px-6 md:py-8 lg:flex-row lg:items-stretch">
      <DashboardSidebar
        username={userInfo.name}
        avatarUrl={userInfo.picture}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onLogout={onLogout}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6">
        <div className="shrink-0">
          <KPICards
            applicationCount={applicationCount}
            interviewsCount={interviewCount}
            rejectionsCount={rejectionCount}
            offersCount={offerCount}
          />
        </div>
        <ApplicationsTable
          filteredApplications={filteredApplications}
          applications={applications}
          isLoading={isLoading}
          setFilteredApplications={setFilteredApplications}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
