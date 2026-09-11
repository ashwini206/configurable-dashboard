import { createContext } from 'react'

import type { DashboardContextValue } from './dashboardContextDefaults'

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined)
