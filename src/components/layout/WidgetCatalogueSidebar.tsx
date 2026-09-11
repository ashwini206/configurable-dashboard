import type { DashboardConfig, WidgetConfig, WidgetType } from '../../types'

interface WidgetCatalogueSidebarProps {
  config: DashboardConfig
  onAddWidget: (type: WidgetType) => void
  onDeleteWidget: (id: string) => void
}

const catalogue: Array<{ type: WidgetType; title: string; subtitle: string }> = [
  { type: 'kpi', title: 'KPI Summary', subtitle: 'Care operations KPIs' },
  { type: 'bar', title: 'Department Flow', subtitle: 'Emergency intake chart' },
  { type: 'line', title: 'Wait Trend', subtitle: 'Wait time trend chart' },
  { type: 'table', title: 'Ward Capacity', subtitle: 'Ward table' },
]

export default function WidgetCatalogueSidebar({ config, onAddWidget, onDeleteWidget }: WidgetCatalogueSidebarProps) {
  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:w-[280px]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
            Widget Catalogue
          </div>
          <div className="mt-1 text-xs font-semibold text-slate-400">
            {config.widgets.length} active widgets
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {catalogue.map((item) => {
          return (
            <div key={item.type} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-slate-900">{item.title}</div>
                  <div className="text-[11px] font-semibold text-slate-500">{item.subtitle}</div>
                </div>
                <button
                  className="rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-slate-700"
                  onClick={() => onAddWidget(item.type)}
                >
                  Add
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          Active Layout
        </div>
        <div className="mt-3 space-y-2">
          {config.widgets.map((widget: WidgetConfig) => (
            <div key={widget.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
              <span className="text-xs font-bold text-slate-600">{widget.title}</span>
              <button
                className="rounded-lg border border-rose-200 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-rose-700 transition hover:bg-rose-50"
                onClick={() => onDeleteWidget(widget.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
