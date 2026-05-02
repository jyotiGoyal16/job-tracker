import { LogOut } from "lucide-react";
import logoUrl from "../assets/logo.png";
import Button from "./shared/Button";
import DateInput from "./shared/DateInput";

interface DashboardSidebarProps {
  username: string;
  avatarUrl: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onLogout: () => void;
}

const DashboardSidebar = (props: DashboardSidebarProps) => {
  const {
    username,
    avatarUrl,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onLogout,
  } = props;

  return (
    <aside className="flex min-h-0 w-full shrink-0 flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft backdrop-blur-sm lg:w-72 lg:min-h-0 lg:self-stretch">
      <div className="flex shrink-0 items-center gap-1 border-b border-slate-200/80 pb-5">
        <img
          src={logoUrl}
          alt=""
          className="h-10 w-auto max-w-[120px] shrink-0 object-contain object-left"
        />
        <div className="min-w-0 flex-1 text-left">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            Job Application Tracker
          </h1>
          <p className="text-xs leading-snug text-slate-500">
            Track smarter. Get hired faster.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200/80 py-5">
        <img
          src={avatarUrl}
          alt="Logged in user"
          className="h-12 w-12 shrink-0 rounded-full border border-slate-200 object-cover"
        />
        <p className="min-w-0 text-left text-sm text-slate-600">
          Welcome,{" "}
          <span className="font-medium text-slate-900">{username}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 py-5">
        <DateInput
          id="startDate"
          label="Start date"
          value={startDate}
          onValueChange={onStartDateChange}
        />
        <DateInput
          id="endDate"
          label="End date"
          value={endDate}
          onValueChange={onEndDateChange}
        />
      </div>

      <div className="mt-auto shrink-0 border-t border-slate-200/80 pt-5">
        <Button
          type="button"
          icon={<LogOut size={18} />}
          text="Logout"
          onClick={onLogout}
          className="w-full justify-center rounded-lg px-3 py-2 text-slate-600"
        />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
