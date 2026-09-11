import type { WidgetConfig } from '../../types'
import WidgetCard from './WidgetCard'

interface UnsupportedWidgetProps {
  widget: WidgetConfig
}

export default function UnsupportedWidget({ widget }: UnsupportedWidgetProps) {
  return (
    <WidgetCard widget={{ ...widget, error: `Unsupported Widget: ${widget.type}` }}>
      <div className="flex min-h-44 items-center justify-center rounded-xl border border-amber-200 bg-amber-50">
        <span className="text-sm font-black uppercase tracking-[0.12em] text-amber-700">
          Unsupported Widget
        </span>
      </div>
    </WidgetCard>
  )
}
