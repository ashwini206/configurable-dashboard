import type { KpiMetric } from '../../data/mockHealthcareData'
import type { WidgetConfig } from '../../types/widget'
import WidgetCard from './WidgetCard'

interface KpiWidgetProps {
  widget: WidgetConfig
  metrics: KpiMetric[]
}

export default function KpiWidget({ widget, metrics }: KpiWidgetProps) {
  return (
    <WidgetCard widget={widget}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
              {metric.label}
            </span>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-black text-slate-900">{metric.value}</span>
              <span className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                {metric.unit}
              </span>
            </div>
            <span className="mt-2 block text-[11px] font-bold text-emerald-600">
              {metric.trend}
            </span>
          </article>
        ))}
      </div>
    </WidgetCard>
  )
}
