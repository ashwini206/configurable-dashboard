import { useEffect, useState } from 'react'

import DeveloperPanel from '../components/widgets/DeveloperPanel'
import WidgetFactory from '../components/widgets/WidgetFactory'
import { defaultDashboardConfig } from '../data/defaultDashboardConfig'
import { loadDashboard } from '../services/fakeApi'
import type { DashboardConfig, WidgetConfig } from '../types'

export default function DashboardPage() {
  const [config, setConfig] = useState<DashboardConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slowMode, setSlowMode] = useState(false)
  const [forceFailure, setForceFailure] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    const start = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await loadDashboard(defaultDashboardConfig, {
          slowMode,
          forceFailure,
          retryAttempts: 2,
          randomFailureRate: 0.2,
        })

        if (!cancelled) {
          setConfig(result.data)
        }
      } catch (failure) {
        if (!cancelled) {
          setError(failure instanceof Error ? failure.message : 'Unknown dashboard loading error')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    start()

    return () => {
      cancelled = true
    }
  }, [reloadCount, slowMode, forceFailure])

  const widgets = config?.widgets ?? []

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

      <DeveloperPanel
        config={defaultDashboardConfig}
        slowMode={slowMode}
        forceFailure={forceFailure}
        onToggleSlowMode={() => setSlowMode((value) => !value)}
        onToggleForceFailure={() => setForceFailure((value) => !value)}
        onReload={() => {
          setReloadCount((count) => count + 1)
        }}
      />

      {error ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-rose-700">
            Data Load Error
          </div>
          <div className="mt-2 text-sm font-semibold text-rose-800">{error}</div>
        </section>
      ) : null}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {widgets.map((widget: WidgetConfig) => (
          <div key={widget.id}>
            {loading ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Loading...
              </div>
            ) : (
              <WidgetFactory widget={widget} />
            )}
          </div>
        ))}
      </section>
    </section>
  )
}
