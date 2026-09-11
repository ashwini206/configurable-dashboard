import type { ReactNode } from 'react'

import {
  healthcareBarData,
  healthcareKpis,
  healthcareLineData,
  healthcareTableRows,
} from '../../data/mockHealthcareData'
import type { WidgetConfig } from '../../types'
import BarChartWidget from './BarChartWidget'
import KpiWidget from './KpiWidget'
import LineChartWidget from './LineChartWidget'
import TableWidget from './TableWidget'
import UnsupportedWidget from './UnsupportedWidget'

export type WidgetRenderer = (widget: WidgetConfig) => ReactNode

const registry = new Map<WidgetConfig['type'], WidgetRenderer>([
  ['kpi', (widget) => <KpiWidget widget={widget} metrics={healthcareKpis} />],
  ['bar', (widget) => <BarChartWidget widget={widget} data={healthcareBarData} />],
  ['line', (widget) => <LineChartWidget widget={widget} data={healthcareLineData} />],
  ['table', (widget) => <TableWidget widget={widget} rows={healthcareTableRows} />],
])

export function renderWidget(widget: WidgetConfig) {
  const render = registry.get(widget.type)

  if (!render) {
    return <UnsupportedWidget widget={widget} />
  }

  return render(widget)
}
