import type { DashboardConfig } from '../types'
import { defaultDashboardConfig } from '../data/defaultDashboardConfig'

export const DASHBOARD_CONFIG_KEY = 'configurable-dashboard-config-v1'
export const DASHBOARD_REVISION_KEY = 'configurable-dashboard-revisions-v1'

export interface DashboardRevision {
  id: string
  timestamp: string
  summary: string
  config: DashboardConfig
}

export function cloneDefaultDashboardConfig(): DashboardConfig {
  return structuredClone(defaultDashboardConfig)
}

export function loadDashboardConfiguration(): DashboardConfig {
  try {
    const raw = localStorage.getItem(DASHBOARD_CONFIG_KEY)
    if (!raw) {
      return cloneDefaultDashboardConfig()
    }

    return JSON.parse(raw) as DashboardConfig
  } catch {
    return cloneDefaultDashboardConfig()
  }
}

export function saveDashboardConfiguration(config: DashboardConfig, summary = 'Dashboard saved') {
  const normalized = { ...config, metadata: { ...config.metadata, updatedAt: new Date().toISOString() } }

  localStorage.setItem(DASHBOARD_CONFIG_KEY, JSON.stringify(normalized))
  addRevision(normalized, summary)

  return normalized
}

export function loadRevisionHistory(): DashboardRevision[] {
  try {
    const raw = localStorage.getItem(DASHBOARD_REVISION_KEY)
    if (!raw) {
      return []
    }

    return JSON.parse(raw) as DashboardRevision[]
  } catch {
    return []
  }
}

export function addRevision(config: DashboardConfig, summary = 'Dashboard saved') {
  const history = loadRevisionHistory()
  const now = new Date().toISOString()

  const revision: DashboardRevision = {
    id: `revision-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`,
    timestamp: now,
    summary,
    config,
  }

  const nextHistory = [revision, ...history].slice(0, 40)
  localStorage.setItem(DASHBOARD_REVISION_KEY, JSON.stringify(nextHistory))

  return revision
}

export function restoreRevision(revisionId: string) {
  const history = loadRevisionHistory()
  const revision = history.find((entry) => entry.id === revisionId)

  if (!revision) {
    return null
  }

  const restored = saveDashboardConfiguration(revision.config, `Restored ${revision.id}`)
  return restored
}

export function exportDashboardConfiguration(config: DashboardConfig) {
  const payload = JSON.stringify(config, null, 2)
  const blob = new Blob([payload], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${(config.metadata?.name ?? 'dashboard').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'dashboard'}-config.json`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function importDashboardConfigurationFromText(text: string): DashboardConfig {
  const parsed = JSON.parse(text) as DashboardConfig
  if (!parsed || !parsed.version || !Array.isArray(parsed.widgets)) {
    throw new Error('Invalid dashboard configuration JSON.')
  }

  return parsed
}

export function subscribeToRemoteDashboardUpdates(handler: (config: DashboardConfig) => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== DASHBOARD_CONFIG_KEY || !event.newValue) {
      return
    }

    try {
      const next = JSON.parse(event.newValue) as DashboardConfig
      handler(next)
    } catch {
      return
    }
  }

  window.addEventListener('storage', onStorage)

  return () => {
    window.removeEventListener('storage', onStorage)
  }
}
