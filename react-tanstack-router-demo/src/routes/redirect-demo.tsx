import { createFileRoute, redirect } from '@tanstack/react-router'

// There is no component here on purpose: beforeLoad throws a redirect
// before the router ever tries to render this route, so control never
// reaches a component body.
export const Route = createFileRoute('/redirect-demo')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
