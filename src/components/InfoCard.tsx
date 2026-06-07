import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  value: string | number | null | undefined
  icon?: React.ReactNode
  className?: string
  unit?: string
}

const InfoCard: React.FC<Props> = ({ label, value, icon, className, unit }) => {
  const displayValue = value === null || value === undefined || value === '' ? '—' : value

  return (
    <div className={cn('p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors', className)}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon && <span className="text-white/60 w-3.5 h-3.5">{icon}</span>}
        <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">{label}</span>
      </div>
      <div className="text-sm font-semibold text-white">
        {displayValue}
        {unit && displayValue !== '—' && <span className="text-white/50 text-xs ml-1">{unit}</span>}
      </div>
    </div>
  )
}

export { InfoCard }
