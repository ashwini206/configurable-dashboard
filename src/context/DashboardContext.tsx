import type { PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'

import { DashboardContext } from './dashboardContext'

export function DashboardProvider({ children }: PropsWithChildren) {
  const [selectedWorkspace, setSelectedWorkspace] = useState('Operations Overview')

  const value = useMemo(
    () => ({
      selectedWorkspace,
      setSelectedWorkspace,
    }),
    [selectedWorkspace],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
