import Card from "./Card";

const kpis = [
  { label: "Total Applications", value: "124", accent: "text-slate-800" },
  { label: "Interviews Scheduled", value: "18", accent: "text-amber-600" },
  { label: "Rejections", value: "37", accent: "text-red-600" },
  { label: "Offers", value: "4", accent: "text-emerald-600" },
  { label: "Response Rate", value: "44%", accent: "text-blue-600" },
];

function KPICards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="p-5">
          <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
          <p className={`mt-2 text-3xl font-semibold ${kpi.accent}`}>
            {kpi.value}
          </p>
        </Card>
      ))}
    </section>
  );
}

export default KPICards;
