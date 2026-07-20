import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

// A "pathless" layout route (leading underscore, no path segment). Every
// child route nested under `_auth.*` inherits this beforeLoad guard without
// adding anything to the URL.
export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.getState().isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: () => <Outlet />,
})
