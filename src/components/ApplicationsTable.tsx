import { Eye, Pencil } from 'lucide-react'
import { mockApplications } from '../data/mockApplications'
import Badge from './Badge'
import Table from './Table'

function ApplicationsTable() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-800">Applications</h2>
        <p className="text-sm text-slate-500">Track progress from inbox to offer</p>
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
            {mockApplications.map((job, index) => (
              <tr
                key={job.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100 transition hover:bg-blue-50/50`}
              >
                <td className="px-4 py-3 font-medium text-slate-800">{job.companyName}</td>
                <td className="px-4 py-3 text-slate-600">{job.role}</td>
                <td className="px-4 py-3">
                  <Badge variant={job.platform} />
                </td>
                <td className="px-4 py-3 text-slate-600">{job.location}</td>
                <td className="px-4 py-3 text-slate-600">{job.dateApplied}</td>
                <td className="px-4 py-3">
                  <Badge variant={job.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`View ${job.companyName}`}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`Edit ${job.companyName}`}
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
  )
}

export default ApplicationsTable
