import { useEffect, useMemo, useState } from "react";
import { formatDateInput } from "../utils/dateTimeHelper";

function useDateFilter(
  syncMails: (startDate: string, endDate: string) => void,
) {
  const defaultStartDateInput = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    return formatDateInput(d);
  }, []);
  const defaultEndDateInput = useMemo(() => formatDateInput(new Date()), []);

  const [startDate, setStartDate] = useState(defaultStartDateInput);
  const [endDate, setEndDate] = useState(defaultEndDateInput);

  useEffect(() => {
    syncMails(startDate, endDate);
  }, [startDate, endDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
}

export default useDateFilter;
