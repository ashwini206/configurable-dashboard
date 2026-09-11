import { useEffect, useMemo, useRef, useState } from 'react'
import type { Layout } from 'react-grid-layout'

import DashboardFilterBar from '../components/layout/DashboardFilterBar'
import HostileConfigLoader from '../components/widgets/HostileConfigLoader'
import WidgetBoard from '../components/widgets/WidgetBoard'
import DeveloperPanel from '../components/widgets/DeveloperPanel'
import { defaultDashboardConfig } from '../data/defaultDashboardConfig'
import { loadDashboard } from '../services/fakeApi'
import { validateDashboardConfig } from '../services/configValidator'
import {
  exportDashboardConfiguration,
  importDashboardConfigurationFromText,
  loadDashboardConfiguration,
  saveDashboardConfiguration,
  subscribeToRemoteDashboardUpdates,
} from '../services/dashboardPersistence'
import type { DashboardConfig, WidgetConfig, WidgetType } from '../types'
import { useDashboardFilters } from '../context/DashboardFiltersContext'

function attachErrorsToWidgets(config: DashboardConfig): DashboardConfig {
  const validation = validateDashboardConfig(config)
  const issueMap = new Map<string, string[]>()
  for (const issue of validation.issues) {
    if (!issue.widgetId) {
      continue
    }

    const existing = issueMap.get(issue.widgetId) ?? []
    existing.push(issue.message)
    issueMap.set(issue.widgetId, existing)
  }

  const widgets = config.widgets.map((widget) => {
    const messages = issueMap.get(widget.id)
    if (!messages?.length) {
      return widget
    }

    return {
      ...widget,
      error: messages.join(' '),
    }
  })

  return {
    ...config,
    widgets,
  }
}

export default function DashboardPage() {
  const { filters } = useDashboardFilters()
  const [config, setConfig] = useState<DashboardConfig | null>(loadDashboardConfiguration())
  const [error, setError] = useState<string | null>(null)
  const [slowMode, setSlowMode] = useState(false)
  const [forceFailure, setForceFailure] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)
  const [remoteNotice, setRemoteNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToRemoteDashboardUpdates((next) => {
      const normalized = attachErrorsToWidgets(next)
      setConfig(normalized)
      setRemoteNotice('Dashboard updated from another tab.')
      setTimeout(() => setRemoteNotice(null), 2400)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    let cancelled = false

    loadDashboard(defaultDashboardConfig, {
      slowMode,
      forceFailure,
      retryAttempts: 2,
      randomFailureRate: 0.2,
    })
      .then((result) => {
        if (!cancelled) {
          const next = attachErrorsToWidgets(result.data)
          const persisted = saveDashboardConfiguration(next, 'Initial dashboard load')
          setConfig(persisted)
          setError(null)
        }
      })
      .catch((failure) => {
        if (!cancelled) {
          setError(failure instanceof Error ? failure.message : 'Unknown dashboard loading error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [reloadCount, slowMode, forceFailure])

  const noDataForCurrentFilters = useMemo(() => {
    const validDepartmentRegion = {
      North: ['Emergency', 'Cardiology'],
      South: ['ICU', 'Radiology'],
      East: ['Pharmacy'],
    }

    const region = filters.region ?? 'all'
    const department = filters.department ?? 'all'
    const dateRange = filters.dateRange ?? 'all'

    if (region !== 'all' && department !== 'all' && !validDepartmentRegion[region as keyof typeof validDepartmentRegion]?.includes(department)) {
      return true
    }

    if (dateRange !== 'all' && dateRange === '30d' && department === 'Cardiology') {
      return false
    }

    return false
  }, [filters])

  const widgets = config?.widgets ?? []

  const loadHostileConfig = (incoming: DashboardConfig) => {
    const normalized = attachErrorsToWidgets(incoming)
    const validation = validateDashboardConfig(incoming)

    if (!validation.valid) {
      setError('Loaded hostile configuration has validation issues; widget error cards explain the failures.')
    } else {
      setError(null)
    }

    const persisted = saveDashboardConfiguration(normalized, 'Loaded hostile configuration')
    setConfig(persisted)
  }

  const addWidget = (type: WidgetType) => {
    if (!config || type === 'unsupported') {
      return
    }

    const widgetMap: Record<Exclude<WidgetType, 'unsupported'>, WidgetConfig> = {
      kpi: {
        id: `kpi-${crypto.randomUUID()}`,
        type: 'kpi',
        title: 'Care Operations KPIs',
        subtitle: 'Healthcare summary',
        x: 0,
        y: 0,
        w: 6,
        h: 2,
        dataSource: 'kpi',
      },
      bar: {
        id: `bar-${crypto.randomUUID()}`,
        type: 'bar',
        title: 'Emergency Intake by Department',
        subtitle: 'Department flow',
        x: 0,
        y: 0,
        w: 6,
        h: 2,
        dataSource: 'bar',
      },
      line: {
        id: `line-${crypto.randomUUID()}`,
        type: 'line',
        title: 'Average Wait Time Trend',
        subtitle: 'Line chart',
        x: 0,
        y: 0,
        w: 6,
        h: 2,
        dataSource: 'line',
      },
      table: {
        id: `table-${crypto.randomUUID()}`,
        type: 'table',
        title: 'Ward Capacity Monitor',
        subtitle: 'Ward table',
        x: 0,
        y: 0,
        w: 6,
        h: 2,
        dataSource: 'table',
      },
    }

    const templateWidget = widgetMap[type]
    const nextConfig = {
      ...config,
      widgets: [...config.widgets, templateWidget],
    }

    const normalized = attachErrorsToWidgets(nextConfig)
    const persisted = saveDashboardConfiguration(normalized, 'Added widget')
    setConfig(persisted)
  }

  const removeWidget = (id: string) => {
    if (!config) {
      return
    }

    const nextConfig = {
      ...config,
      widgets: config.widgets.filter((widget) => widget.id !== id),
    }

    const normalized = attachErrorsToWidgets(nextConfig)
    const persisted = saveDashboardConfiguration(normalized, 'Removed widget')
    setConfig(persisted)
  }

  const persistLayout = (layout: Layout) => {
    if (!config) {
      return
    }

    const mapped = layout.map((entry) => {
      const source = config.widgets.find((widget) => widget.id === entry.i)
      return {
        ...(source ?? {
          id: entry.i,
          type: 'unsupported' as const,
          title: 'Unknown Widget',
          x: entry.x,
          y: entry.y,
          w: entry.w,
          h: entry.h,
          dataSource: 'unknown',
        }),
        id: entry.i,
        x: entry.x,
        y: entry.y,
        w: entry.w,
        h: entry.h,
      }
    })

    const nextConfig = { ...config, widgets: mapped as WidgetConfig[] }
    const normalized = attachErrorsToWidgets(nextConfig)
    const persisted = saveDashboardConfiguration(normalized, 'Updated layout')
    setConfig(persisted)
  }

  const handleExport = () => {
    if (!config) {
      return
    }

    exportDashboardConfiguration(config)
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const imported = importDashboardConfigurationFromText(text)
      const normalized = attachErrorsToWidgets(imported)
      const persisted = saveDashboardConfiguration(normalized, 'Imported configuration JSON')
      setConfig(persisted)
      setError(null)
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Unable to import dashboard configuration JSON.')
    }

    event.target.value = ''
  }

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
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-slate-700 transition hover:bg-slate-50">
            Refresh Data
          </button>
          <button className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-emerald-700 transition hover:bg-emerald-100" onClick={handleExport}>
            Export JSON
          </button>
          <button className="rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-sky-700 transition hover:bg-sky-100" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </div>
      </section>

      {remoteNotice ? (
        <section className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">{remoteNotice}</span>
        </section>
      ) : null}

      <DashboardFilterBar />
      <HostileConfigLoader onLoad={loadHostileConfig} />

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

      {noDataForCurrentFilters ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            No data for current filters.
          </span>
        </section>
      ) : null}

      {config ? (
        <WidgetBoard
          config={config}
          widgets={config.widgets}
          onRemove={removeWidget}
          onAdd={addWidget}
          onLayoutChange={persistLayout}
        />
      ) : (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {(widgets as WidgetConfig[]).map((widget: WidgetConfig) => (
            <div key={widget.id}>
              <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Loading...
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  )
}
