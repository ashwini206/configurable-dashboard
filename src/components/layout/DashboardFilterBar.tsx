import { useDashboardFilters } from '../../context/DashboardFiltersContext'

export default function DashboardFilterBar() {
  const { filters, updateFilter, clearFilters } = useDashboardFilters()

  const activeLabels = Object.entries(filters ?? {}).filter(([, value]) => Boolean(value && value !== 'all'))

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          Department
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
            value={filters.department ?? 'all'}
            onChange={(event) => updateFilter('department', event.target.value)}
          >
            <option value="all">All</option>
            <option value="Emergency">Emergency</option>
            <option value="Cardiology">Cardiology</option>
            <option value="ICU">ICU</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          Region
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
            value={filters.region ?? 'all'}
            onChange={(event) => updateFilter('region', event.target.value)}
          >
            <option value="all">All</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          Date Range
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
            value={filters.dateRange ?? 'all'}
            onChange={(event) => updateFilter('dateRange', event.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
          </select>
        </label>

        <button
          className="rounded-xl border border-slate-200 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-700 transition hover:bg-slate-50"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {activeLabels.length === 0 ? (
          <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            No active filters
          </span>
        ) : null}
        {activeLabels.map(([key, value]) => (
          <span key={key} className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-sky-700">
            {key}: {String(value)}
          </span>
        ))}
      </div>
    </section>
  )
}
