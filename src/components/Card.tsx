import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
