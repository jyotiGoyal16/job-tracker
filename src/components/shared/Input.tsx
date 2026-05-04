export interface InputProps {
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "date";
  placeholder?: string;
  id?: string;
  className?: string;
}

const defaultInputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

const Input = ({
  value,
  onValueChange,
  type = "text",
  placeholder,
  id,
  className,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={className ?? defaultInputClass}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default Input;
