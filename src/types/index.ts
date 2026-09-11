export type WidgetType = 'kpi' | 'bar' | 'line' | 'table' | 'unsupported' | (string & {})

export interface DashboardFilters {
  region?: string
  department?: string
  ward?: string
  status?: 'normal' | 'warning' | 'critical'
  timeRange?: string
  dateRange?: string
}

export interface LayoutConfig {
  columns: number
  rowHeight: number
  gap: number
  responsive: boolean
}

export interface WidgetConfig {
  id: string
  type: WidgetType
  title: string
  subtitle?: string
  loading?: boolean
  empty?: boolean
  error?: string
  x?: number
  y?: number
  w?: number
  h?: number
  dataSource?: string
  dataKey?: string
  filters?: DashboardFilters
}

export interface DashboardMetadata {
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardConfig {
  version: string
  widgets: WidgetConfig[]
  filters: DashboardFilters
  metadata: DashboardMetadata
  layout: LayoutConfig
}

export type DashboardRoute = '/' | '/history'
