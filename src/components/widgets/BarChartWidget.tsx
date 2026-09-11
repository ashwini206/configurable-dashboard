import type { HealthBarDatum } from '../../data/mockHealthcareData'
import type { WidgetConfig } from '../../types'
import WidgetCard from './WidgetCard'

interface BarChartWidgetProps {
  widget: WidgetConfig
  data: HealthBarDatum[]
}

export default function BarChartWidget({ widget, data }: BarChartWidgetProps) {
  const maxPatients = Math.max(...data.map((d) => d.patients))

  return (
    <WidgetCard widget={widget}>
      <div className="flex h-52 items-end justify-between gap-3">
        {data.map((item) => (
          <div key={item.department} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500">{item.patients}</span>
            <div
              className="w-full rounded-t-xl bg-sky-600"
              style={{ height: `${Math.max(18, (item.patients / maxPatients) * 160)}px` }}
              title={item.department}
            />
            <span className="text-[10px] font-bold text-slate-500">{item.department}</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  )
}
