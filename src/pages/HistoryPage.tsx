import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { loadRevisionHistory, restoreRevision } from '../services/dashboardPersistence'

export default function HistoryPage() {
  const navigate = useNavigate()
  const revisions = useMemo(() => loadRevisionHistory(), [])

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
          {revisions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              No revisions yet
            </div>
          ) : null}

          {revisions.map((revision) => (
            <article key={revision.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {revision.summary}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {new Date(revision.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                  {revision.config.version}
                </span>
                <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-700 transition hover:bg-slate-50" onClick={() => {
                  const restored = restoreRevision(revision.id)
                  if (restored) {
                    navigate('/')
                  }
                }}>
                  Restore
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
