import type { WidgetConfig } from '../../types'
import { renderWidget } from './widgetRegistry'

interface WidgetFactoryProps {
  widget: WidgetConfig
}

export default function WidgetFactory({ widget }: WidgetFactoryProps) {
  if (widget.loading) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Loading...
      </div>
    )
  }

  if (widget.error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-10 text-center text-xs font-black uppercase tracking-[0.2em] text-rose-700">
        {widget.error}
      </div>
    )
  }

  if (widget.empty) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        No healthcare data available
      </div>
    )
  }

  return renderWidget(widget)
}
