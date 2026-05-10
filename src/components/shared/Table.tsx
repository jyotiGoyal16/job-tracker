import type { ReactNode, Ref } from "react";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

interface TableProps {
  columnLabels: string[];
  isLoading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
  scrollable?: boolean;
  //Ref on the element that actually scrolls (required for row virtualization)
  scrollContainerRef?: Ref<HTMLDivElement | null>;
  // Inner wrapper height for virtualized body rows (TanStack Virtual table pattern)
  virtualizedContentHeight?: number;
}

const Table = ({
  columnLabels,
  isLoading = false,
  loadingLabel = "Loading...",
  children,
  scrollable = false,
  scrollContainerRef,
  virtualizedContentHeight,
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
      <div ref={scrollContainerRef} className={scrollWrapClass}>
        <div style={{ height: virtualizedContentHeight }}>
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
      </div>
    </Card>
  );
};

export default Table;
