import { Suspense } from 'react'
import { Await, createFileRoute, defer } from '@tanstack/react-router'
import { fetchSlowStats } from '../api/mockData'

export const Route = createFileRoute('/deferred')({
  loader: () => {
    const fast = { message: 'This part loaded fast.', loadedAt: new Date().toLocaleTimeString() }
    // NOT awaited: defer() wraps the promise so the router can hand it to
    // the component immediately while it keeps resolving in the background.
    const slowPromise = defer(fetchSlowStats())
    return { fast, slowPromise }
  },
  component: DeferredPage,
})

function DeferredPage() {
  const { fast, slowPromise } = Route.useLoaderData()

  return (
    <div className="page">
      <h1 className="page-title">Deferred data</h1>
      <p className="page-description">
        The loader returns <code>{'{ fast, slowPromise }'}</code> and does <strong>not</strong>{' '}
        await <code>slowPromise</code>. The component renders immediately with{' '}
        <code>fast</code>, then streams in the slow part via <code>&lt;Suspense&gt;</code> +{' '}
        <code>&lt;Await&gt;</code>.
      </p>

      <div className="card">
        <h3 className="card-title">Fast data (available immediately)</h3>
        <p>{fast.message}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Loaded at {fast.loadedAt}</p>
      </div>

      <div className="card">
        <h3 className="card-title">Slow data (streamed in ~1.2-2s later)</h3>
        <Suspense fallback={<p className="pending">Crunching stats…</p>}>
          <Await promise={slowPromise}>
            {(stats) => (
              <div className="stat-row">
                <div className="stat-tile">
                  <div className="label">Total views</div>
                  <div className="value">{stats.totalViews.toLocaleString()}</div>
                </div>
                <div className="stat-tile">
                  <div className="label">Avg views / post</div>
                  <div className="value">{stats.avgViews.toLocaleString()}</div>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
