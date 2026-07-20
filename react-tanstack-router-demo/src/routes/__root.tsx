import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { Auth } from '../auth'
import type * as api from '../api/mockData'

export interface RouterContext {
  auth: Auth
  api?: typeof api
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: RootNotFound,
  errorComponent: RootError,
})

const navGroups = [
  {
    label: 'Overview',
    links: [{ to: '/', label: 'All demos' }],
  },
  {
    label: 'Data loading',
    links: [
      { to: '/posts', label: 'Posts (loader + cache)' },
      { to: '/deferred', label: 'Deferred / Await' },
      { to: '/charts', label: 'Lazy route (charts)' },
    ],
  },
  {
    label: 'Routing patterns',
    links: [
      { to: '/users', label: 'Search params' },
      { to: '/redirect-demo', label: 'Redirect demo' },
    ],
  },
  {
    label: 'Auth & forms',
    links: [
      { to: '/dashboard', label: 'Protected dashboard' },
      { to: '/editor', label: 'Nav blocking' },
    ],
  },
] as const

function RootComponent() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">Router Feature Showcase</div>
        <div className="sidebar-subtitle">TanStack Router v1 demos</div>
        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="sidebar-group-label">{group.label}</div>
              {group.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="sidebar-link"
                  activeProps={{ className: 'sidebar-link active-link' }}
                  activeOptions={{ exact: link.to === '/' }}
                  preload="intent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}

function RootNotFound() {
  return (
    <div className="not-found-box">
      <p className="code">404</p>
      <h2>Page not found</h2>
      <p className="page-description">
        There's no route registered for this URL. Try one of the demos in the sidebar.
      </p>
      <Link to="/">Back to overview</Link>
    </div>
  )
}

function RootError({ error }: { error: Error }) {
  return (
    <div className="error-box">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  )
}
