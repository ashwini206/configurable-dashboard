import type { PropsWithChildren, ReactNode } from 'react'

import type { WidgetConfig } from '../../types/widget'

interface WidgetCardProps extends PropsWithChildren {
  widget: WidgetConfig
  children?: ReactNode
}

export default function WidgetCard({ widget, children }: WidgetCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {widget.title}
          </span>
          {widget.subtitle ? (
            <span className="mt-1 block text-xs font-medium text-slate-400">
              {widget.subtitle}
            </span>
          ) : null}
        </div>

        <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
          {widget.type}
        </span>
      </div>

      {widget.loading ? <LoadingState /> : null}
      {!widget.loading && widget.error ? <ErrorState message={widget.error} /> : null}
      {!widget.loading && !widget.error && widget.empty ? <EmptyState /> : null}
      {!widget.loading && !widget.error && !widget.empty ? children : null}
    </section>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
      <span className="text-sm font-semibold text-slate-500">Loading widget...</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
      <span className="text-sm font-semibold text-slate-500">No healthcare data available</span>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-xl border border-rose-200 bg-rose-50">
      <span className="text-sm font-semibold text-rose-700">{message}</span>
    </div>
  )
}
