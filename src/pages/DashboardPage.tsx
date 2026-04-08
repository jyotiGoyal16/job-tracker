import ApplicationsTable from "../components/ApplicationsTable";
import FiltersSection from "../components/FiltersSection";
import KPICards from "../components/KPICards";

interface DashboardPageProps {
  onLogout: () => void;
}

function DashboardPage({ onLogout }: DashboardPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <header className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft backdrop-blur-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Job Application Tracker
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Track applications from LinkedIn, Naukri, Instahyre, and career
            pages.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      <KPICards />
      <FiltersSection />
      <ApplicationsTable />
    </main>
  );
}

export default DashboardPage;
