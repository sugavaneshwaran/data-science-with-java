import { createLazyFileRoute } from '@tanstack/react-router'
import { getViewsChartData } from '../api/mockData'

export const Route = createLazyFileRoute('/charts')({
  component: ChartsPage,
})

function ChartsPage() {
  const data = getViewsChartData()
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="page">
      <h1 className="page-title">Lazy-loaded route</h1>
      <p className="page-description">
        This component is defined in <code>charts.lazy.tsx</code> and code-split from{' '}
        <code>charts.tsx</code> (the route shell). Open your browser's network tab, navigate here
        fresh, and you'll see a separate chunk fetched only when this route is visited. Run{' '}
        <code>npm run build</code> and check <code>dist/assets</code> to see the standalone chunk
        file on disk.
      </p>

      <div className="card">
        <h3 className="card-title">Post views (pure CSS bar chart, mock data)</h3>
        <div className="bar-chart">
          {data.map((d) => (
            <div className="bar-chart-col" key={d.label}>
              <span className="bar-chart-value">{d.value}</span>
              <div
                className="bar-chart-bar"
                style={{ height: `${Math.max(4, (d.value / max) * 100)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="bar-chart" style={{ height: 'auto', borderBottom: 'none', paddingTop: '0.4rem' }}>
          {data.map((d) => (
            <div className="bar-chart-col" key={d.label} style={{ height: 'auto' }}>
              <span className="bar-chart-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
