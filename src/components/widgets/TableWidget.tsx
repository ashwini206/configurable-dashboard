import type { HealthTableRow } from '../../data/mockHealthcareData'
import type { WidgetConfig } from '../../types'
import WidgetCard from './WidgetCard'

interface TableWidgetProps {
  widget: WidgetConfig
  rows: HealthTableRow[]
}

export default function TableWidget({ widget, rows }: TableWidgetProps) {
  return (
    <WidgetCard widget={widget}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Ward
              </th>
              <th className="pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Occupancy
              </th>
              <th className="pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Avg Wait
              </th>
              <th className="pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Alert
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.ward} className="border-b border-slate-50">
                <td className="py-3 text-sm font-bold text-slate-700">{row.ward}</td>
                <td className="py-3 text-sm font-semibold text-slate-600">{row.occupancy}%</td>
                <td className="py-3 text-sm font-semibold text-slate-600">{row.wait} min</td>
                <td className="py-3">
                  <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white bg-slate-700">
                    {row.alertLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  )
}
