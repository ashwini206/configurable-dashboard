export default function HistoryPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Revision History
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard Revisions
          </h1>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Revision Timeline
        </div>
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <article key={item} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Revision {item}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Published by System Admin · 2026-09-11
                </div>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                Complete
              </span>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
