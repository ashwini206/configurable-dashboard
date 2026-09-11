# Design Assessment: Configurable Dashboard Context

## Goal

This project implements a resilient, configuration-driven healthcare dashboard rendering layer. It is designed for the common real-world failure modes of operational tooling: old configs, missing fields, unknown widgets, hostile payloads, bad layout coordinates, slow data sources, temporary failures, and concurrent editing.

## Domain Model

The configuration file is a declarative, versioned object containing:

```json
{
  "version": "1.0.0",
  "widgets": [
    {
      "id": "kpi-care-performance",
      "type": "kpi",
      "title": "Care Operations KPIs",
      "dataSource": "kpi",
      "x": 0,
      "y": 0,
      "w": 6,
      "h": 2
    }
  ],
  "filters": {
    "region": "north",
    "department": "all",
    "dateRange": "today"
  },
  "metadata": {
    "name": "Healthcare Operations Dashboard",
    "description": "Operational healthcare dashboard",
    "createdAt": "2026-09-11T00:00:00.000Z",
    "updatedAt": "2026-09-11T00:00:00.000Z"
  },
  "layout": {
    "columns": 12,
    "rowHeight": 120,
    "gap": 16,
    "responsive": true
  }
}
```

The dashboard is rendered by interpreting `widgets` against a mock asynchronous data service. Each widget must either render the truth or expose a clear card showing why it cannot render.

## System Guarantees

1. A config validator normalizes and checks the input before widgets render.
2. Unsupported widget classes and invalid widget shapes degrade safely into a widget error card rather than crashing the entire page.
3. The data layer simulates latency and failure behavior.
4. Dashboard-level filters can be updated by the UI and passed through to the widget data model.
5. Layout and widget composition changes are persisted locally.
6. Revision history is stored so the user may restore an older configuration.
7. JSON export and import are supported.
8. LocalStorage storage events are listened to so cross-tab conflict changes can be displayed as a notice.

## Edge Cases Covered

- Unknown widget type.
- Missing title.
- Missing dataKey or dataSource.
- Invalid x/y/w/h layout values.
- Duplicate widget IDs.
- Invalid configuration version.
- Missing widget ID.
- Missing widgets array.
- Malformed JSON import.
- Widget filter mismatch or empty filter set.

## Design Trade-Offs

The implementation prefers resilience and clarity over a perfect parsing or schema engine. Where the config is hostile or malformed, the dashboard preserves the layout and converts the broken widget into a visible card error. The system prioritizes no total-page crash. That means some widget-level errors are shown with message text rather than an engine-level thrown exception.

## Implementation Notes

This repository is a Vite + React + TypeScript application. It exposes a reusable validator and persistence service that keeps the app operation-safe while supporting the requested design assessment tasks.
