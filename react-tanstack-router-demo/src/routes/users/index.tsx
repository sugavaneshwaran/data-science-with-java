import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { fetchUsers, type UsersQuery } from '../../api/mockData'

const VALID_SORTS = ['name', 'email'] as const
type Sort = (typeof VALID_SORTS)[number]

// Hand-rolled search validation: no schema library, just plain parsing +
// coercion with sane fallbacks. validateSearch receives the raw (unknown)
// parsed query object and must return a fully typed value.
function validateSearch(search: Record<string, unknown>): UsersQuery {
  const rawPage = Number(search.page)
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1

  const rawSort = typeof search.sort === 'string' ? search.sort : 'name'
  const sort: Sort = (VALID_SORTS as readonly string[]).includes(rawSort) ? (rawSort as Sort) : 'name'

  const filter = typeof search.filter === 'string' ? search.filter : ''

  return { page, sort, filter }
}

export const Route = createFileRoute('/users/')({
  validateSearch,
  // Only re-run the loader when the *parsed* search actually changes value
  // (not on every render/object identity change).
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => fetchUsers(deps),
  pendingComponent: () => <p className="pending">Loading users…</p>,
  component: UsersIndex,
})

function UsersIndex() {
  const data = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  function updateSearch(patch: Partial<UsersQuery>) {
    navigate({
      search: (prev) => ({ ...prev, ...patch }),
    })
  }

  return (
    <div className="page">
      <h1 className="page-title">Users directory</h1>
      <p className="page-description">
        Pagination, sorting, and filtering all live in the URL's search params, validated by a
        hand-rolled <code>validateSearch</code> (no zod). <code>loaderDeps</code> re-triggers the
        loader whenever the parsed search object changes.
      </p>

      <div className="toolbar">
        <div className="field">
          <label htmlFor="filter">Filter</label>
          <input
            id="filter"
            type="text"
            value={search.filter}
            placeholder="Search name or email…"
            onChange={(e) => updateSearch({ filter: e.target.value, page: 1 })}
          />
        </div>

        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={search.sort}
            onChange={(e) => updateSearch({ sort: e.target.value as Sort, page: 1 })}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role}`}>{user.role}</span>
              </td>
            </tr>
          ))}
          {data.items.length === 0 && (
            <tr>
              <td colSpan={3} style={{ color: 'var(--text-muted)' }}>
                No users match "{search.filter}".
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <Link
          to="/users"
          search={{ ...search, page: Math.max(1, data.page - 1) }}
          disabled={data.page <= 1}
          className="page-num"
        >
          Prev
        </Link>
        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            to="/users"
            search={{ ...search, page: p }}
            className={`page-num${p === data.page ? ' current' : ''}`}
          >
            {p}
          </Link>
        ))}
        <Link
          to="/users"
          search={{ ...search, page: Math.min(data.totalPages, data.page + 1) }}
          disabled={data.page >= data.totalPages}
          className="page-num"
        >
          Next
        </Link>
      </div>

      <p className="breadcrumb" style={{ marginTop: '1rem' }}>
        Current URL search: <code>{JSON.stringify(search)}</code>
      </p>
    </div>
  )
}
