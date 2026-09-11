import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive } from 'react-grid-layout'
import type { Layout } from 'react-grid-layout'
import { useEffect, useRef, useState } from 'react'

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
  const boardRef = useRef<HTMLElement | null>(null)
  const [expandedWidgetId, setExpandedWidgetId] = useState<string | null>(null)
  const [boardWidth, setBoardWidth] = useState(760)

  useEffect(() => {
    const updateBoardWidth = () => {
      const width = boardRef.current?.getBoundingClientRect().width ?? 760
      setBoardWidth(Math.max(width, 640))
    }

    updateBoardWidth()
    window.addEventListener('resize', updateBoardWidth)

    return () => {
      window.removeEventListener('resize', updateBoardWidth)
    }
  }, [])

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
      <section className="min-w-0 flex-1 widget-board-wrap" ref={boardRef}>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm widget-board-panel">
          <Responsive
            className="layout widget-board-grid"
            layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
            breakpoints={baseLayout.breakpoints}
            cols={baseLayout.cols}
            rowHeight={baseLayout.rowHeight}
            width={boardWidth}
            margin={[10, 10]}
            onLayoutChange={(layoutValue) => onLayoutChange(layoutValue)}
          >
            {widgets.map((widget) => {
              const isExpanded = widget.id === expandedWidgetId
              return (
                <div key={widget.id} className={`rounded-2xl border border-slate-200 bg-white shadow-sm widget-shell ${isExpanded ? 'widget-shell-expanded' : ''}`}>
                  <div className="widget-heading flex items-center justify-between border-b border-slate-100 px-4 py-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
                      {widget.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg border border-sky-200 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-sky-700 hover:bg-sky-50"
                        onClick={() => setExpandedWidgetId(isExpanded ? null : widget.id)}
                      >
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </button>
                      <button
                        className="rounded-lg border border-rose-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-rose-700 hover:bg-rose-50"
                        onClick={() => onRemove(widget.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={`widget-body ${isExpanded ? 'widget-body-expanded' : ''}`}> 
                    <WidgetFactory widget={widget} />
                  </div>
                </div>
              )
            })}
          </Responsive>
        </div>
      </section>

      <WidgetCatalogueSidebar config={config} onAddWidget={onAdd} onDeleteWidget={onRemove} />
    </section>
  )
}
