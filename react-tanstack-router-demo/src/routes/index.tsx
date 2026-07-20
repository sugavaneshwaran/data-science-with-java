import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

interface Demo {
  title: string
  description: string
  feature: string
  link: ReactNode
}

function IndexComponent() {
  const demos: Demo[] = [
    {
      title: 'Posts list',
      description:
        'A nested layout route with its own Outlet, a loader with staleTime caching, and a pendingComponent.',
      feature: 'Nested layout routes + loader caching',
      link: <Link to="/posts">Open demo</Link>,
    },
    {
      title: 'Deferred data',
      description:
        'Loader returns fast data plus an un-awaited slow promise, streamed in via Suspense + Await.',
      feature: 'Deferred loaders / streaming',
      link: <Link to="/deferred">Open demo</Link>,
    },
    {
      title: 'Lazy-loaded charts',
      description: 'A .lazy.tsx route component that is code-split into its own JS chunk.',
      feature: 'Code-splitting with .lazy.tsx',
      link: <Link to="/charts">Open demo</Link>,
    },
    {
      title: 'Users directory',
      description: 'Typed, hand-validated search params drive pagination, sorting, and filtering.',
      feature: 'validateSearch + loaderDeps',
      link: (
        <Link to="/users" search={{ page: 1, sort: 'name', filter: '' }}>
          Open demo
        </Link>
      ),
    },
    {
      title: 'File browser',
      description: 'A splat/catch-all route reads the rest of the path as one _splat param.',
      feature: 'Splat routes',
      link: (
        <Link to="/files/$" params={{ _splat: 'docs/guides/routing.md' }}>
          Open demo
        </Link>
      ),
    },
    {
      title: 'Redirect demo',
      description: "beforeLoad throws redirect() back to the overview page before anything renders.",
      feature: 'Programmatic redirects',
      link: <Link to="/redirect-demo">Open demo (bounces back here)</Link>,
    },
    {
      title: 'Protected dashboard',
      description:
        'A pathless layout route gates access with beforeLoad and redirects unauthenticated users to /login.',
      feature: 'Auth guarding with pathless layouts',
      link: <Link to="/dashboard">Open demo</Link>,
    },
    {
      title: 'Draft editor',
      description: 'useBlocker stops you from navigating away while you have unsaved changes.',
      feature: 'useBlocker navigation blocking',
      link: <Link to="/editor">Open demo</Link>,
    },
  ]

  return (
    <div className="page">
      <h1 className="page-title">Router Feature Showcase</h1>
      <p className="page-description">
        Every card below links to a small, self-contained demo of a TanStack Router v1 feature.
        Open the router devtools panel (bottom-right) to inspect route matches, pending states,
        and the route tree as you navigate.
      </p>

      <div className="grid demo-list">
        {demos.map((demo) => (
          <div className="card demo-card" key={demo.title}>
            <span className="tag">{demo.feature}</span>
            <h3 className="card-title">{demo.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{demo.description}</p>
            {demo.link}
          </div>
        ))}
      </div>
    </div>
  )
}
