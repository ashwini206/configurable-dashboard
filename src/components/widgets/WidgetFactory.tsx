import type { WidgetConfig } from '../../types'
import WidgetCard from './WidgetCard'
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
    return <WidgetCard widget={widget} />
  }

  return renderWidget(widget)
}
