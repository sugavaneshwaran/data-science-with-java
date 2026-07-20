import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider, ErrorComponent } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { auth } from './auth'
import * as api from './api/mockData'
import './styles.css'

export const router = createRouter({
  routeTree,
  context: {
    auth,
    api,
  },
  defaultPreload: 'intent',
  // Consider preloaded data instantly stale so `intent` preloads always hit
  // the network in this demo (easier to observe pending states).
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingComponent: () => <div className="pending">Loading…</div>,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
})

// Register the router instance for maximum type safety across the app.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}
