import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { auth } = Route.useRouteContext()
  const router = useRouter()
  const navigate = useNavigate()
  const { user } = auth.getState()

  function handleLogout() {
    auth.logout()
    // Invalidate so the root/loaders re-evaluate auth state, then leave the
    // protected area entirely.
    router.invalidate()
    navigate({ to: '/login' })
  }

  return (
    <div className="page">
      <h1 className="page-title">Protected dashboard</h1>
      <p className="page-description">
        This page lives under <code>_auth.dashboard.tsx</code>, a child of the pathless{' '}
        <code>_auth.tsx</code> layout route. Its <code>beforeLoad</code> checked the mock auth
        store and would have redirected to <code>/login</code> if you weren't signed in.
      </p>

      <div className="card">
        <p>
          Signed in as <strong>{user?.username}</strong>.
        </p>
        <button className="danger" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}
