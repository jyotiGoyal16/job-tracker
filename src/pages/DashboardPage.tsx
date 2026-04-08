import ApplicationsTable from '../components/ApplicationsTable'
import FiltersSection from '../components/FiltersSection'
import KPICards from '../components/KPICards'

function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Job Application Tracker
        </h1>
        <p className="text-sm text-slate-500 md:text-base">
          Track applications from LinkedIn, Naukri, Instahyre, and career pages.
        </p>
      </header>

      <KPICards />
      <FiltersSection />
      <ApplicationsTable />
    </main>
  )
}

export default DashboardPage
