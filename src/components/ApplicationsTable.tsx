import { Pencil } from "lucide-react";
import Badge from "./shared/Badge";
import Button from "./shared/Button";
import Table from "./shared/Table";
import type { JobApplication } from "../types/jobApplication";
import type { TableFilters, UpdateFilters } from "../types/tableFilters";
import { COLUMN_LABELS } from "../constants";
import { formatDateDisplay } from "../utils/dateTimeHelper";
import FiltersSection from "./FiltersSection";
import { useCallback } from "react";

interface ApplicationsTableProps {
  filteredApplications: JobApplication[];
  applications: JobApplication[];
  isLoading?: boolean;
  setFilteredApplications: (applications: JobApplication[]) => void;
}

const rowClassName = (index: number) => {
  const stripe = index % 2 === 0 ? "bg-white" : "bg-slate-50";
  return `${stripe} border-t border-slate-100 transition hover:bg-blue-50/50`;
};

const ApplicationRow = ({
  job,
  index,
}: {
  job: JobApplication;
  index: number;
}) => {
  return (
    <tr className={rowClassName(index)}>
      <td className="px-4 py-3 font-medium text-slate-800">{job.company}</td>
      <td className="px-4 py-3 text-slate-600">{job.role}</td>
      <td className="px-4 py-3">
        <Badge variant={job.platform} />
      </td>
      <td className="px-4 py-3 text-slate-600">{job.location}</td>
      <td className="px-2 py-3 text-slate-600">
        {formatDateDisplay(job.date)}
      </td>
      <td className="px-4 py-3">
        <Badge variant={job.status} />
      </td>
      <td className="px-2 py-3">
        <div className="flex justify-end items-center gap-2">
          <Button
            type="button"
            icon={<Pencil size={16} />}
            ariaLabel={`Edit ${job.company}`}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          />
        </div>
      </td>
    </tr>
  );
};

const ApplicationsTable = ({
  filteredApplications,
  applications,
  isLoading,
  setFilteredApplications,
}: ApplicationsTableProps) => {
  const updateFilters: UpdateFilters = useCallback(
    (filters: TableFilters) => {
      const { status, platform, location } = filters;
      const filteredApplicationsList = applications.filter((application) => {
        return (
          (status === "All" || application.status === status) &&
          (platform === "All" || application.platform === platform) &&
          (location === "All" || application.location.includes(location))
        );
      });
      setFilteredApplications(filteredApplicationsList);
    },
    [applications, setFilteredApplications],
  );

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Applications</h2>
        <div className="flex items-center gap-2">
          <span>Filters: </span>
          <FiltersSection updateFilters={updateFilters} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <Table
          columnLabels={COLUMN_LABELS}
          isLoading={isLoading}
          loadingLabel="Loading applications..."
          scrollable
        >
          {!isLoading &&
            filteredApplications.map((job, index) => (
              <ApplicationRow key={job.id} job={job} index={index} />
            ))}
        </Table>
      </div>
    </section>
  );
};

export default ApplicationsTable;
