import { useState } from 'react'

import { hostileConfigs } from '../../data/hostileConfigs'
import { validateDashboardConfig } from '../../services/configValidator'
import type { DashboardConfig } from '../../types'

interface HostileConfigLoaderProps {
  onLoad: (config: DashboardConfig) => void
}

export default function HostileConfigLoader({ onLoad }: HostileConfigLoaderProps) {
  const [selected, setSelected] = useState(0)

  return (
    <section className="rounded-3xl border border-rose-200 bg-rose-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-rose-700">
            Hostile Config Lab
          </div>
          <div className="mt-1 text-xs font-bold text-rose-500">
            {hostileConfigs.length} known malformed configurations
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-700"
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            {hostileConfigs.map((_, index) => (
              <option key={index} value={index}>
                Case {index + 1}
              </option>
            ))}
          </select>

          <button
            className="rounded-xl bg-rose-700 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-rose-800"
            onClick={() => {
              const candidate = hostileConfigs[selected]
              const result = validateDashboardConfig(candidate)
              if (!result.valid) {
                onLoad(candidate)
                return
              }

              onLoad(candidate)
            }}
          >
            Load Hostile Config
          </button>
        </div>
      </div>
    </section>
  )
}
