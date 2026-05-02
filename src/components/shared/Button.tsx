import type { ReactNode } from "react";

export type ButtonVariant = "outlined" | "solid";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  text?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  /** Sets `aria-label` on the native button (e.g. icon-only actions). */
  ariaLabel?: string;
}

const baseClass =
  "inline-flex items-center justify-center gap-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60";

const variantClass: Record<ButtonVariant, string> = {
  outlined:
    "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
  solid:
    "border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700",
};

const Button = ({
  type = "button",
  variant = "outlined",
  text,
  icon,
  children,
  onClick,
  className,
  disabled,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children ?? (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
