import type { WidgetConfig } from '../types'

export interface KpiMetric {
  label: string
  value: number
  unit: string
  trend: string
  tone: 'positive' | 'warning' | 'neutral'
}

export interface HealthBarDatum {
  department: string
  patients: number
}

export interface HealthLineDatum {
  period: string
  waitTime: number
}

export interface HealthTableRow {
  ward: string
  occupancy: number
  wait: number
  alertLevel: 'Low' | 'Medium' | 'High'
}

export const healthcareWidgetConfigs: WidgetConfig[] = [
  { id: 'kpi', type: 'kpi', title: 'Care Operations KPIs' },
  { id: 'bar', type: 'bar', title: 'Emergency Intake by Department' },
  { id: 'line', type: 'line', title: 'Average Wait Time Trend' },
  { id: 'table', type: 'table', title: 'Ward Capacity Monitor' },
]

export const healthcareKpis: KpiMetric[] = [
  { label: 'Patients Today', value: 842, unit: 'patients', trend: '+12.8%', tone: 'positive' },
  { label: 'Average Wait Time', value: 14, unit: 'min', trend: '-8.3%', tone: 'positive' },
  { label: 'Bed Occupancy', value: 84, unit: '%', trend: '+2.0%', tone: 'warning' },
  { label: 'Clinical Risk Score', value: 6, unit: '/10', trend: '-1.2%', tone: 'neutral' },
]

export const healthcareBarData: HealthBarDatum[] = [
  { department: 'Emergency', patients: 112 },
  { department: 'Cardiology', patients: 74 },
  { department: 'ICU', patients: 54 },
  { department: 'Radiology', patients: 67 },
  { department: 'Pharmacy', patients: 41 },
]

export const healthcareLineData: HealthLineDatum[] = [
  { period: 'Mon', waitTime: 21 },
  { period: 'Tue', waitTime: 19 },
  { period: 'Wed', waitTime: 18 },
  { period: 'Thu', waitTime: 15 },
  { period: 'Fri', waitTime: 14 },
  { period: 'Sat', waitTime: 16 },
  { period: 'Sun', waitTime: 12 },
]

export const healthcareTableRows: HealthTableRow[] = [
  { ward: 'Emergency Care', occupancy: 91, wait: 18, alertLevel: 'High' },
  { ward: 'Cardiology Unit', occupancy: 76, wait: 10, alertLevel: 'Low' },
  { ward: 'ICU', occupancy: 88, wait: 7, alertLevel: 'Medium' },
  { ward: 'Surgery', occupancy: 73, wait: 13, alertLevel: 'Low' },
  { ward: 'Radiology', occupancy: 69, wait: 12, alertLevel: 'Low' },
]
