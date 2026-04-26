import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

function LoadingSpinner(props: LoadingSpinnerProps) {
  const { size = 20, label, className = "", fullScreen = false } = props;

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-2 text-slate-500 ${className}`}
    >
      <Loader2 className="animate-spin text-blue-600" size={size} />
      {label ? (
        <span className="text-sm font-medium text-slate-600">{label}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;
