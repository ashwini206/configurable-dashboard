import WidgetFactory from '../components/widgets/WidgetFactory'
import { healthcareWidgetConfigs } from '../data/mockHealthcareData'

export default function DashboardPage() {
  return (
    <section className="space-y-5">
      <section className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
            Dashboard
          </span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Executive Dashboard
          </h1>
        </div>
        <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-slate-700 transition hover:bg-slate-50">
          Refresh Data
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {healthcareWidgetConfigs.map((widget) => (
          <div key={widget.id}>
            <WidgetFactory widget={widget} />
          </div>
        ))}
      </section>
    </section>
  )
}
