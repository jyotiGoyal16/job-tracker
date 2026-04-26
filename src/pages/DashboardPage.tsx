import { useEffect, useMemo, useState } from "react";
import ApplicationsTable from "../components/ApplicationsTable";
import DashboardHeader from "../components/DashboardHeader";
import FiltersSection from "../components/FiltersSection";
import KPICards from "../components/KPICards";
import { formatDateInput } from "../utils/dateTimeHelper";

interface DashboardPageProps {
  onLogout: () => void;
}

function DashboardPage(props: DashboardPageProps) {
  const { onLogout } = props;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const defaultStartDateInput = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    return formatDateInput(d);
  }, []);
  const defaultEndDateInput = useMemo(() => formatDateInput(new Date()), []);
  const [startDate, setStartDate] = useState(defaultStartDateInput);
  const [endDate, setEndDate] = useState(defaultEndDateInput);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    const params = new URLSearchParams({ startDate, endDate });
    fetch(`${import.meta.env.VITE_API_URL}/applications?${params.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const jobApplications = data.data.filter(
          (application: any) => application.status !== "other",
        );
        setApplications(jobApplications);
      });
  };

  const syncMails = (rangeStartDate: string, rangeEndDate: string) => {
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
  };

  useEffect(() => {
    syncMails(defaultStartDateInput, defaultEndDateInput);
  }, [defaultStartDateInput, defaultEndDateInput]);

  const onMailSync = () => {
    setIsLoading(true);
    syncMails(startDate, endDate);
  };

  console.log(applications);

  const applicationCount = applications.length;
  const interviewCount = applications?.filter(
    (application) => application.status.toLowerCase() === "interview",
  ).length;
  const rejectionCount = applications?.filter(
    (application) => application.status.toLowerCase() === "rejected",
  ).length;
  const offerCount = applications?.filter(
    (application) => application.status.toLowerCase() === "offer",
  ).length;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <DashboardHeader
        username={userInfo.name}
        avatarUrl={userInfo.picture}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onMailSync={onMailSync}
        onLogout={onLogout}
        isSyncing={isLoading}
      />

      <KPICards
        applicationCount={applicationCount}
        interviewsCount={interviewCount}
        rejectionsCount={rejectionCount}
        offersCount={offerCount}
      />
      <FiltersSection />
      <ApplicationsTable applications={applications} isLoading={isLoading} />
    </main>
  );
}

export default DashboardPage;
