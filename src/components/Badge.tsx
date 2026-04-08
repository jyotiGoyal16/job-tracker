import type { ApplicationStatus, Platform } from '../types/job'

type BadgeVariant = ApplicationStatus | Platform

interface BadgeProps {
  variant: BadgeVariant
}

const badgeClasses: Record<BadgeVariant, string> = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
  Offer: 'bg-emerald-100 text-emerald-700',
  LinkedIn: 'bg-sky-100 text-sky-700',
  Naukri: 'bg-indigo-100 text-indigo-700',
  Instahyre: 'bg-violet-100 text-violet-700',
  'Career Page': 'bg-slate-200 text-slate-700',
}

function Badge({ variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClasses[variant]}`}
    >
      {variant}
    </span>
  )
}

export default Badge
