export interface DropdownProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  className?: string;
}

const defaultSelectClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

const Dropdown = ({
  options,
  value,
  onValueChange,
  label,
  id,
  className,
}: DropdownProps) => {
  const selectId = id ?? label;

  const select = (
    <select
      id={selectId}
      className={className ?? defaultSelectClass}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  if (!label) {
    return select;
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <label
        htmlFor={selectId}
        className="text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {label}
      </label>
      {select}
    </div>
  );
};

export default Dropdown;
