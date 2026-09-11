import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive } from 'react-grid-layout'
import type { Layout } from 'react-grid-layout'

import type { DashboardConfig, WidgetConfig, WidgetType } from '../../types'
import WidgetFactory from './WidgetFactory'
import WidgetCatalogueSidebar from '../layout/WidgetCatalogueSidebar'

interface WidgetBoardProps {
  config: DashboardConfig
  widgets: WidgetConfig[]
  onRemove: (id: string) => void
  onAdd: (type: WidgetType) => void
  onLayoutChange: (layout: Layout) => void
}

const baseLayout = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 120,
}

export default function WidgetBoard({ config, widgets, onRemove, onAdd, onLayoutChange }: WidgetBoardProps) {
  const layout = widgets.map((widget) => ({
    i: widget.id,
    x: widget.x ?? 0,
    y: widget.y ?? 0,
    w: widget.w ?? 6,
    h: widget.h ?? 2,
    minW: 2,
    minH: 2,
  }))

  return (
    <section className="flex flex-wrap gap-4">
      <section className="min-w-[680px] flex-1">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <Responsive
            className="layout"
            layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
            breakpoints={baseLayout.breakpoints}
            cols={baseLayout.cols}
            rowHeight={baseLayout.rowHeight}
            width={760}
            onLayoutChange={(layoutValue) => onLayoutChange(layoutValue)}
            dragConfig={{ enabled: true, bounded: false, threshold: 2, handle: '.widget-heading' }}
            resizeConfig={{ enabled: true, handles: ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] }}
          >
            {widgets.map((widget) => (
              <div key={widget.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="widget-heading flex cursor-grab items-center justify-between border-b border-slate-100 px-4 py-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
                    {widget.title}
                  </span>
                  <button
                    className="rounded-lg border border-rose-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-rose-700 hover:bg-rose-50"
                    onClick={() => onRemove(widget.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="h-[calc(100%-50px)] overflow-hidden p-3">
                  <WidgetFactory widget={widget} />
                </div>
              </div>
            ))}
          </Responsive>
        </div>
      </section>

      <WidgetCatalogueSidebar config={config} onAddWidget={onAdd} onDeleteWidget={onRemove} />
    </section>
  )
}
