# Instructions to Exercise the System

## Local Setup

```bash
npm install
npm run dev
```

Then open the Vite app in the browser.

## Load the Dashboard

The default dashboard loads from the local starter configuration and can be persisted into `localStorage` using `dashboardPersistence.ts`.

## Induce Slow Mode

Use the Developer Panel from the dashboard UI and click `Enable Slow Mode`.

## Induce Force Failure

Use the Developer Panel and click `Enable Force Failure`.

## Load Hostile Configurations

Use `Hostile Config Lab` and `Load Hostile Config` to load one of the five intentionally malformed configurations in `src/data/hostileConfigs.ts`.

## Import a JSON Configuration

Click the `Import JSON` control in the dashboard header and select a valid JSON file. The file must follow the `DashboardConfig` contract.

## Export the Current Dashboard JSON

Click the `Export JSON` control in the dashboard header. This downloads a config JSON file.

## Restore a Revision

Visit the `Revision History` route and choose `Restore` on any history card.

## Cross-Tab Concurrency Simulation

Open the app in another browser tab or browser context and change or save a configuration. The dashboard listens for the `storage` event and displays a flash notice: `Dashboard updated from another tab.`
