import { Eye, Pencil } from "lucide-react";
import Badge from "./Badge";
import LoadingSpinner from "./LoadingSpinner";
import Table from "./Table";
import type { JobApplication } from "../types/job";
import { formatDateDisplay } from "../utils/dateTimeHelper";

interface ApplicationsTableProps {
  applications: JobApplication[];
  isLoading?: boolean;
}

function ApplicationsTable(props: ApplicationsTableProps) {
  const { applications, isLoading } = props;

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-800">Applications</h2>
      </div>

      <Table>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-10">
                  <LoadingSpinner label="Loading applications..." />
                </td>
              </tr>
            )}
            {!isLoading &&
              applications.map((job, index) => (
                <tr
                  key={job.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} border-t border-slate-100 transition hover:bg-blue-50/50`}
                >
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {job.company}
                  </td>
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
                      <button
                        type="button"
                        className="rounded-md border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Edit ${job.company}`}
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
    </section>
  );
}

export default ApplicationsTable;
