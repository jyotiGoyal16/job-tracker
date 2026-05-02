import Input from "./Input";

export interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

const dateFieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

const DateInput = ({ id, label, value, onValueChange }: DateInputProps) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {label}
      </label>
      <Input
        id={id}
        type="date"
        value={value}
        placeholder="DD/MM/YYYY"
        onValueChange={onValueChange}
        className={dateFieldClass}
      />
    </div>
  );
};

export default DateInput;
