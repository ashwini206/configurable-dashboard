export type WidgetType = 'kpi' | 'bar' | 'line' | 'table'

export interface WidgetConfig {
  id: string
  type: WidgetType
  title: string
  subtitle?: string
  loading?: boolean
  empty?: boolean
  error?: string
}

export type StatusTone = 'positive' | 'warning' | 'neutral' | 'danger'
