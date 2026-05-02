import type { ReactNode } from "react";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

interface TableProps {
  columnLabels: string[];
  isLoading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
  scrollable?: boolean;
}

const Table = ({
  columnLabels,
  isLoading = false,
  loadingLabel = "Loading...",
  children,
  scrollable = false,
}: TableProps) => {
  const columnCount = columnLabels.length;

  const scrollWrapClass = scrollable
    ? "min-h-[63vh] max-h-[63vh] overflow-auto overscroll-contain"
    : "overflow-x-auto";

  const theadClass = [
    "bg-slate-100 text-xs uppercase tracking-wide text-slate-500",
    scrollable
      ? "sticky top-0 z-20 shadow-[inset_0_-1px_0_0_rgb(226_232_240)]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className="overflow-hidden p-0">
      <div className={scrollWrapClass}>
        <table className="min-w-full text-left text-sm">
          <thead className={theadClass}>
            <tr>
              {columnLabels.map((label) => (
                <th key={label} className="px-4 py-3">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columnCount} className="px-4 py-10">
                  <LoadingSpinner label={loadingLabel} />
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Table;
