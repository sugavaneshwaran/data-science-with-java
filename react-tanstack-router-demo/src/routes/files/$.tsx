import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$')({
  component: FileBrowser,
})

// A fake in-memory "filesystem" just for the demo.
const fakeFiles = new Set([
  'docs/guides/routing.md',
  'docs/guides/data-loading.md',
  'docs/reference/api.md',
  'src/index.ts',
  'src/components/Button.tsx',
  'README.md',
])

function FileBrowser() {
  // `_splat` captures everything after `/files/` as a single string,
  // including any additional slashes.
  const { _splat } = Route.useParams()
  const path = _splat ?? ''
  const segments = path.split('/').filter(Boolean)
  const exists = fakeFiles.has(path)

  return (
    <div className="page">
      <h1 className="page-title">Fake file browser</h1>
      <p className="page-description">
        This route is defined as <code>files/$.tsx</code> — a splat (catch-all) route. Everything
        after <code>/files/</code> is captured in a single <code>_splat</code> param, no matter how
        many slashes it contains.
      </p>

      <div className="callout">
        <strong>_splat value:</strong> <code>"{path}"</code>
      </div>

      <div className="file-tree card">
        <div>
          <Link to="/files/$" params={{ _splat: '' }}>
            files
          </Link>
          {segments.map((seg, i) => {
            const partial = segments.slice(0, i + 1).join('/')
            return (
              <span key={i}>
                <span className="crumb-sep">/</span>
                <Link to="/files/$" params={{ _splat: partial }}>
                  {seg}
                </Link>
              </span>
            )
          })}
        </div>

        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          {exists ? 'This is a known file in the demo set.' : 'No such file in the demo set — try one below.'}
        </p>

        <ul className="list-plain">
          {[...fakeFiles].map((f) => (
            <li key={f}>
              <Link to="/files/$" params={{ _splat: f }}>
                {f}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
