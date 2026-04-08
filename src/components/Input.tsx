interface InputProps {
  placeholder: string;
}

function Input({ placeholder }: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    />
  );
}

export default Input;
