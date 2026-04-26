import LoadingSpinner from "./LoadingSpinner";

interface DashboardHeaderProps {
  username: string;
  avatarUrl: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onMailSync: () => void;
  onLogout: () => void;
  isSyncing?: boolean;
}

function DashboardHeader(props: DashboardHeaderProps) {
  const {
    username,
    avatarUrl,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onMailSync,
    onLogout,
    isSyncing = false,
  } = props;

  return (
    <header className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Job Application Tracker
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Track applications from LinkedIn, Naukri, Instahyre, and career
            pages.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-sm font-medium text-slate-600">
            Welcome, <span className="text-slate-900">{username}</span>
          </p>
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="Logged in user"
              className="h-12 w-12 rounded-full border border-slate-200 object-cover"
            />
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="my-4 h-px bg-slate-200/80" />

      <div className="flex flex-wrap items-end gap-3 lg:gap-4">
        <div className="flex min-w-[170px] flex-col gap-1">
          <label
            htmlFor="startDate"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Start date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </div>

        <div className="flex min-w-[170px] flex-col gap-1">
          <label
            htmlFor="endDate"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            End date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </div>

        <button
          type="button"
          onClick={onMailSync}
          disabled={isSyncing}
          className="flex h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSyncing ? (
            <LoadingSpinner size={16} label="Syncing..." />
          ) : (
            "Sync Mails"
          )}
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
