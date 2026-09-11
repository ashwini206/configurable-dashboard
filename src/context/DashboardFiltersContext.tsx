import { createContext, useContext, useMemo, useState } from 'react'

import type { DashboardFilters } from '../types'

interface DashboardFiltersContextValue {
  filters: DashboardFilters
  updateFilter: (key: keyof DashboardFilters, value: string) => void
  clearFilters: () => void
}

const emptyFilters: DashboardFilters = {
  department: 'all',
  region: 'all',
  dateRange: 'all',
}

const DashboardFiltersContext = createContext<DashboardFiltersContextValue | undefined>(undefined)

export function DashboardFiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<DashboardFilters>(emptyFilters)

  const updateFilter = (key: keyof DashboardFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value === 'all' ? undefined : value,
    }))
  }

  const clearFilters = () => {
    setFilters(emptyFilters)
  }

  const value = useMemo(
    () => ({
      filters,
      updateFilter,
      clearFilters,
    }),
    [filters],
  )

  return <DashboardFiltersContext.Provider value={value}>{children}</DashboardFiltersContext.Provider>
}

export function useDashboardFilters() {
  const context = useContext(DashboardFiltersContext)

  if (!context) {
    throw new Error('useDashboardFilters must be used inside DashboardFiltersProvider')
  }

  return context
}
