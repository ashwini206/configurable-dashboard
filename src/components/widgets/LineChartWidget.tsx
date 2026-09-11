import type { HealthLineDatum } from '../../data/mockHealthcareData'
import type { WidgetConfig } from '../../types/widget'
import WidgetCard from './WidgetCard'

interface LineChartWidgetProps {
  widget: WidgetConfig
  data: HealthLineDatum[]
}

export default function LineChartWidget({ widget, data }: LineChartWidgetProps) {
  const maxWait = Math.max(...data.map((d) => d.waitTime))
  const minWait = Math.min(...data.map((d) => d.waitTime))

  const points = data
    .map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100
      const y = 100 - ((item.waitTime - minWait) / Math.max(maxWait - minWait, 1)) * 80
      return `${x},${y}`
    })
    .join(' ')

  return (
    <WidgetCard widget={widget}>
      <div className="h-52 rounded-xl border border-slate-100 bg-slate-50 p-3">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <linearGradient id="waitLine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0ea5e9" stopOpacity="0.9" />
              <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            points={points}
          />
          {data.map((item, index) => {
            const x = (index / Math.max(data.length - 1, 1)) * 100
            const y = 100 - ((item.waitTime - minWait) / Math.max(maxWait - minWait, 1)) * 80
            return (
              <g key={item.period}>
                <circle cx={x} cy={y} r="2.5" fill="#0f172a" />
                <text x={x} y="98" fontSize="4" textAnchor="middle" fill="#475569">
                  {item.period}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </WidgetCard>
  )
}
