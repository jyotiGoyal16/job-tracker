export type TableFilters = {
  status: string;
  platform: string;
  location: string;
};

export type UpdateFilters = (filters: TableFilters) => void;
