type KPICard = {
  label: string;
  value: number;
  accent: string;
};

const getKPIs = (
  applicationCount: number,
  interviewsCount: number,
  rejectionsCount: number,
  offersCount: number,
): KPICard[] => {
  return [
    {
      label: "Total Applications",
      value: applicationCount,
      accent: "text-blue-600",
    },
    {
      label: "Interviews Scheduled",
      value: interviewsCount,
      accent: "text-amber-600",
    },
    { label: "Rejections", value: rejectionsCount, accent: "text-red-600" },
    { label: "Offers", value: offersCount, accent: "text-emerald-600" },
  ];
};

export { getKPIs };
