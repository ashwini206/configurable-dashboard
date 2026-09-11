import type { DashboardConfig } from '../types'

export interface FakeApiOptions {
  slowMode?: boolean
  forceFailure?: boolean
  retryAttempts?: number
  randomFailureRate?: number
}

export interface FakeApiResult {
  data: DashboardConfig
  latencyMs: number
}

const MIN_DELAY_MS = 2000
const MAX_DELAY_MS = 5000

export async function loadDashboard(config: DashboardConfig, options: FakeApiOptions = {}): Promise<FakeApiResult> {
  const retryAttempts = Math.max(0, options.retryAttempts ?? 2)
  const randomFailureRate = options.randomFailureRate ?? 0.25
  const slowMode = options.slowMode ?? false
  const forceFailure = options.forceFailure ?? false

  for (let attempt = 0; attempt <= retryAttempts; attempt += 1) {
    if (forceFailure) {
      if (attempt < retryAttempts) {
        await wait(800)
        continue
      }

      throw new Error('Forced failure mode blocked the dashboard request.')
    }

    if (Math.random() < randomFailureRate) {
      if (attempt < retryAttempts) {
        await wait(800)
        continue
      }

      throw new Error('Random network failure while loading dashboard data.')
    }

    const delay = slowMode ? 5000 : randomDelay(MIN_DELAY_MS, MAX_DELAY_MS)
    await wait(delay)

    return {
      data: config,
      latencyMs: delay,
    }
  }

  throw new Error('Dashboard request failed after retries.')
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function randomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
