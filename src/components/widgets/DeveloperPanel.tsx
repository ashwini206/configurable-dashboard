import type { DashboardConfig } from '../../types'

interface DeveloperPanelProps {
  config: DashboardConfig
  slowMode: boolean
  forceFailure: boolean
  onToggleSlowMode: () => void
  onToggleForceFailure: () => void
  onReload: () => void
}

export default function DeveloperPanel({
  config,
  slowMode,
  forceFailure,
  onToggleSlowMode,
  onToggleForceFailure,
  onReload,
}: DeveloperPanelProps) {
  return (
    <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            Developer Panel
          </span>
          <span className="ml-3 text-[11px] font-bold text-slate-400">
            {config.metadata.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded-xl border border-slate-300 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 transition hover:bg-slate-50"
            onClick={onToggleSlowMode}
          >
            {slowMode ? 'Disable Slow Mode' : 'Enable Slow Mode'}
          </button>
          <button
            className="rounded-xl border border-slate-300 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 transition hover:bg-slate-50"
            onClick={onToggleForceFailure}
          >
            {forceFailure ? 'Disable Force Failure' : 'Enable Force Failure'}
          </button>
          <button
            className="rounded-xl bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-slate-700"
            onClick={onReload}
          >
            Reload Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}
