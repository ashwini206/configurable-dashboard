import type { DashboardConfig } from '../types'

export const hostileConfigs: DashboardConfig[] = [
  {
    version: '2.0.0',
    widgets: [
      { id: 'kpi-1', type: 'kpi', title: 'Care Operations KPIs', dataSource: 'kpi', x: 0, y: 0, w: 6, h: 2 },
    ],
    filters: { region: 'north', department: 'all', dateRange: 'today' },
    metadata: { name: 'Bad Version', createdAt: '2026-09-11T00:00:00.000Z', updatedAt: '2026-09-11T00:00:00.000Z' },
    layout: { columns: 12, rowHeight: 120, gap: 16, responsive: true },
  },
  {
    version: '1.0.0',
    widgets: [
      { id: 'ghost-1', type: 'radar', title: 'Ghost Metric', dataSource: 'radar', x: 0, y: 0, w: 6, h: 2 },
    ],
    filters: { region: 'east', department: 'all', dateRange: 'today' },
    metadata: { name: 'Unknown Type', createdAt: '2026-09-11T00:00:00.000Z', updatedAt: '2026-09-11T00:00:00.000Z' },
    layout: { columns: 12, rowHeight: 120, gap: 16, responsive: true },
  },
  {
    version: '1.0.0',
    widgets: [
      { id: 'missing-data-1', type: 'bar', title: 'Missing Source', x: 0, y: 0, w: 6, h: 2 },
    ],
    filters: { region: 'south', department: 'ICU', dateRange: 'today' },
    metadata: { name: 'Missing Data Key', createdAt: '2026-09-11T00:00:00.000Z', updatedAt: '2026-09-11T00:00:00.000Z' },
    layout: { columns: 12, rowHeight: 120, gap: 16, responsive: true },
  },
  {
    version: '1.0.0',
    widgets: [
      { id: 'dupe-1', type: 'line', title: 'Trend', dataSource: 'line', x: 0, y: 0, w: 6, h: 2 },
      { id: 'dupe-1', type: 'table', title: 'Table', dataSource: 'table', x: 0, y: 2, w: 6, h: 2 },
    ],
    filters: { region: 'north', department: 'Emergency', dateRange: 'today' },
    metadata: { name: 'Duplicate IDs', createdAt: '2026-09-11T00:00:00.000Z', updatedAt: '2026-09-11T00:00:00.000Z' },
    layout: { columns: 12, rowHeight: 120, gap: 16, responsive: true },
  },
  {
    version: '1.0.0',
    widgets: [
      { id: 'layout-1', type: 'kpi', title: 'Broken Layout', dataSource: 'kpi', x: 12, y: 13, w: 20, h: 99 },
    ],
    filters: { region: 'all', department: 'all', dateRange: 'all' },
    metadata: { name: 'Invalid Layout Values', createdAt: '2026-09-11T00:00:00.000Z', updatedAt: '2026-09-11T00:00:00.000Z' },
    layout: { columns: 12, rowHeight: 120, gap: 16, responsive: true },
  },
]
