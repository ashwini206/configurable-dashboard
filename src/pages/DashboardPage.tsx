export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Dashboard
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Executive Dashboard
          </h1>
        </div>

        <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700">
          Refresh Data
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Revenue
          </span>
          <div className="mt-4 text-3xl font-bold text-slate-900">$84.2k</div>
          <div className="mt-2 text-xs font-semibold text-emerald-600">+12.4% vs last week</div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Customers
          </span>
          <div className="mt-4 text-3xl font-bold text-slate-900">1,248</div>
          <div className="mt-2 text-xs font-semibold text-blue-600">+124 new accounts</div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Production
          </span>
          <div className="mt-4 text-3xl font-bold text-slate-900">96%</div>
          <div className="mt-2 text-xs font-semibold text-amber-600">4 systems active</div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Main Dashboard Area
        </div>
        <div className="mt-4 h-72 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8">
          <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-500">
            Widget board placeholder
          </div>
        </div>
      </section>
    </section>
  )
}
