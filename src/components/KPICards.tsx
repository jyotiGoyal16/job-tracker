import { generateKPIMapping } from "../utils/kpisHelper";
import Card from "./shared/Card";

interface KPICardsProps {
  applicationCount: number;
  interviewsCount: number;
  rejectionsCount: number;
  offersCount: number;
}

const KPICards = ({
  applicationCount,
  interviewsCount,
  rejectionsCount,
  offersCount,
}: KPICardsProps) => {
  const kpis = generateKPIMapping(
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
};

export default KPICards;
