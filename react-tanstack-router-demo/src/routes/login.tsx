import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

interface LoginSearch {
  redirect?: string
}

function validateSearch(search: Record<string, unknown>): LoginSearch {
  return {
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }
}

export const Route = createFileRoute('/login')({
  validateSearch,
  component: LoginPage,
})

function LoginPage() {
  const { auth } = Route.useRouteContext()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('demo-user')

  function handleLogin() {
    auth.login(username || 'demo-user')

    // `search.redirect` is the relative href (pathname + search) that
    // _auth.tsx's beforeLoad captured via `location.href` before bouncing
    // here — hand it straight back to the navigator.
    navigate({ to: search.redirect || '/dashboard', replace: true })
  }

  return (
    <div className="page">
      <h1 className="page-title">Log in</h1>
      <p className="page-description">
        This is a mock login — clicking the button just flips a flag in{' '}
        <code>src/auth.ts</code>. <code>validateSearch</code> types the optional{' '}
        <code>redirect</code> search param that <code>_auth.tsx</code> attached when it bounced
        you here.
      </p>

      {search.redirect && (
        <div className="callout">
          You'll be sent back to <code>{search.redirect}</code> after logging in.
        </div>
      )}

      <div className="card" style={{ maxWidth: 320 }}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <button className="primary" onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  )
}
