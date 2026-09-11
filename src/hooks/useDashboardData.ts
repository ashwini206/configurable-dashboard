import { useEffect, useState } from 'react'

import { getDashboardHealth } from '../services/dashboardService'

interface HealthStatus {
  status: string
  message: string
}

export function useDashboardHealth() {
  const [health, setHealth] = useState<HealthStatus>({ status: 'unknown', message: 'Loading' })

  useEffect(() => {
    let cancelled = false

    getDashboardHealth().then((result) => {
      if (!cancelled) {
        setHealth(result)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return health
}
