import { getKPIs } from "../utils/kpisHelper";
import Card from "./Card";

interface KPICardsProps {
  applicationCount: number;
  interviewsCount: number;
  rejectionsCount: number;
  offersCount: number;
}

function KPICards(props: KPICardsProps) {
  const { applicationCount, interviewsCount, rejectionsCount, offersCount } =
    props;
  const kpis = getKPIs(
    applicationCount,
    interviewsCount,
    rejectionsCount,
    offersCount,
  );
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
