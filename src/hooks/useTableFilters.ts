import { useEffect, useState } from "react";
import {
  LOCATION_OPTIONS,
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from "../constants";
import type { UpdateFilters } from "../types/tableFilters";

function useTableFilters(updateFilters: UpdateFilters) {
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_OPTIONS[0]);
  const [platformFilter, setPlatformFilter] = useState<string>(
    PLATFORM_OPTIONS[0],
  );
  const [locationFilter, setLocationFilter] = useState<string>(
    LOCATION_OPTIONS[0],
  );

  useEffect(() => {
    updateFilters({
      status: statusFilter,
      platform: platformFilter,
      location: locationFilter,
    });
  }, [statusFilter, platformFilter, locationFilter, updateFilters]);

  return {
    statusFilter,
    setStatusFilter,
    platformFilter,
    setPlatformFilter,
    locationFilter,
    setLocationFilter,
  };
}

export default useTableFilters;
