import type { DashboardConfig, WidgetConfig } from '../types'

export interface ConfigIssue {
  widgetId?: string
  widgetTitle?: string
  code: string
  message: string
}

export interface ConfigValidationResult {
  valid: boolean
  issues: ConfigIssue[]
  widgets: WidgetConfig[]
}

const widgetTypes = new Set(['kpi', 'bar', 'line', 'table'])

export function validateDashboardConfig(config: DashboardConfig): ConfigValidationResult {
  const issues: ConfigIssue[] = []
  const widgets = Array.isArray(config?.widgets) ? config.widgets : []

  if (config?.version !== '1.0.0') {
    issues.push({
      code: 'INVALID_VERSION',
      message: 'Invalid configuration version. Expected 1.0.0.',
    })
  }

  const seenIds = new Set<string>()

  for (const widget of widgets) {
    const widgetTitle = widget.title ?? '(missing title)'

    if (!widget.id || !widget.id.trim()) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'MISSING_WIDGET_ID',
        message: 'Missing widget id: widget id is required.',
      })
    }

    if (!widget.title || !widget.title.trim()) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'MISSING_TITLE',
        message: 'Missing title: widget title is required.',
      })
    }

    if (!widget.type || !widgetTypes.has(widget.type)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'UNKNOWN_WIDGET_TYPE',
        message: `Unknown widget type: ${widget.type ?? 'unknown'}.`,
      })
    }

    const dataKey = widget.dataKey ?? widget.dataSource
    if (!dataKey || !dataKey.trim()) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'MISSING_DATA_KEY',
        message: 'Missing dataKey: widget dataSource is required.',
      })
    }

    if ([widget.x, widget.y, widget.w, widget.h].some((value) => value === undefined || value === null)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'INVALID_LAYOUT_VALUES',
        message: 'Invalid layout values: x, y, w, and h are required.',
      })
    }

    if (widget.w !== undefined && (widget.w < 1 || widget.w > 12)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'INVALID_LAYOUT_VALUES',
        message: `Invalid layout values: widget width must be between 1 and 12, got ${widget.w}.`,
      })
    }

    if (widget.h !== undefined && (widget.h < 1 || widget.h > 8)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'INVALID_LAYOUT_VALUES',
        message: `Invalid layout values: widget height must be between 1 and 8, got ${widget.h}.`,
      })
    }

    if (widget.x !== undefined && (widget.x < 0 || widget.x > 11)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'INVALID_LAYOUT_VALUES',
        message: `Invalid layout values: widget x must be between 0 and 11, got ${widget.x}.`,
      })
    }

    if (widget.y !== undefined && (widget.y < 0 || widget.y > 12)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'INVALID_LAYOUT_VALUES',
        message: `Invalid layout values: widget y must be between 0 and 12, got ${widget.y}.`,
      })
    }

    if (widget.id && seenIds.has(widget.id)) {
      issues.push({
        widgetId: widget.id,
        widgetTitle,
        code: 'DUPLICATE_WIDGET_ID',
        message: `Duplicate widget ID: ${widget.id} appears more than once.`,
      })
    }

    if (widget.id && widget.id.trim()) {
      seenIds.add(widget.id)
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    widgets,
  }
}
