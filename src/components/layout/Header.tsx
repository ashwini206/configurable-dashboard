export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white shadow-sm">
          CD
        </span>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Configurable Dashboard
          </span>
          <span className="block text-sm font-semibold text-slate-900">
            Operations Overview
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
          This Week
        </button>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Create Report
        </button>
      </div>
    </header>
  )
}
