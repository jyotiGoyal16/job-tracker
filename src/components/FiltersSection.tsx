import {
  LOCATION_OPTIONS,
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from "../constants";
import useTableFilters from "../hooks/useTableFilters";
import type { UpdateFilters } from "../types/tableFilters";
import Dropdown from "./shared/Dropdown";

const FiltersSection = ({
  updateFilters,
}: {
  updateFilters: UpdateFilters;
}) => {
  const {
    statusFilter,
    setStatusFilter,
    platformFilter,
    setPlatformFilter,
    locationFilter,
    setLocationFilter,
  } = useTableFilters(updateFilters);

  return (
    <div className="flex items-center justify-end gap-2">
      <Dropdown
        id="filter-status"
        label="Status"
        options={[...STATUS_OPTIONS]}
        value={statusFilter}
        onValueChange={setStatusFilter}
      />
      <Dropdown
        id="filter-platform"
        label="Platform"
        options={[...PLATFORM_OPTIONS]}
        value={platformFilter}
        onValueChange={setPlatformFilter}
      />
      <Dropdown
        id="filter-location"
        label="Location"
        options={[...LOCATION_OPTIONS]}
        value={locationFilter}
        onValueChange={setLocationFilter}
      />
    </div>
  );
};

export default FiltersSection;
