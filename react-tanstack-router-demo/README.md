# Router Feature Showcase

A small React 19 + TypeScript + [TanStack Router](https://tanstack.com/router) v1 app that
demonstrates one router feature per route, using file-based routing and `@tanstack/router-plugin`
for code generation.

## Setup

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks with tsc, then builds with Vite
npm run preview   # serve the production build locally
```

No test runner or linter is configured.

## Route → feature map

| Route file | URL | Router feature demonstrated |
| --- | --- | --- |
| `src/routes/__root.tsx` | (layout) | `createRootRouteWithContext`, persistent sidebar `Link`s with `activeProps` + `preload="intent"`, `notFoundComponent`, `errorComponent`, `<TanStackRouterDevtools />` |
| `src/routes/index.tsx` | `/` | Overview page linking to every demo |
| `src/routes/posts/route.tsx` | `/posts` (layout) | Nested layout route with its own `<Outlet />` |
| `src/routes/posts/index.tsx` | `/posts` | Loader fetching from a mock API, `pendingComponent`, `staleTime: 30_000` loader caching |
| `src/routes/posts/$postId.tsx` | `/posts/$postId` | Dynamic path param via typed `useParams`/`useLoaderData`, loader throws `notFound()` for unknown ids, per-route `errorComponent` + `notFoundComponent` |
| `src/routes/files/$.tsx` | `/files/$` | Splat/catch-all route reading the rest of the path as a single `_splat` param (fake file browser) |
| `src/routes/users/index.tsx` | `/users` | Hand-rolled `validateSearch` (no zod) for `{ page, sort, filter }`, `loaderDeps` refetching on search change, pagination/sort/filter driven by `<Link search={...}>` and `useNavigate`/`useSearch` |
| `src/routes/_auth.tsx` | (pathless layout) | `beforeLoad` checks mock auth and throws `redirect({ to: '/login', search: { redirect: location.href } })` |
| `src/routes/_auth.dashboard.tsx` | `/dashboard` | Protected page behind the `_auth` layout, with a logout button |
| `src/routes/login.tsx` | `/login` | `validateSearch` for `{ redirect?: string }`; logging in sets mock auth then navigates to the captured redirect target |
| `src/routes/deferred.tsx` | `/deferred` | Loader returns `{ fast, slowPromise }` without awaiting the slow part; component renders `fast` immediately and streams the rest via `<Suspense>` + `<Await>` |
| `src/routes/editor.tsx` | `/editor` | `useBlocker({ shouldBlockFn, withResolver: true })` blocks navigation while there are unsaved changes, with an inline confirm UI |
| `src/routes/charts.tsx` + `src/routes/charts.lazy.tsx` | `/charts` | Code-split route: `charts.tsx` is the eager shell, `charts.lazy.tsx` (the actual component, a pure-CSS bar chart of mock data) ships as its own JS chunk |
| `src/routes/redirect-demo.tsx` | `/redirect-demo` | `beforeLoad` throws `redirect({ to: '/' })` to demonstrate a programmatic redirect before any render happens |

## Router setup

`src/main.tsx` creates the router with:

- `context: { auth, api }` — matches the `RouterContext` type declared in `__root.tsx`
- `defaultPreload: 'intent'` and `defaultPreloadStaleTime: 0`
- `scrollRestoration: true`
- `defaultPendingComponent` / `defaultErrorComponent`
- `declare module '@tanstack/react-router' { interface Register { router: typeof router } }` for full type inference across the app

## Data layer

- `src/api/mockData.ts` — ~15 in-memory posts, 12 users, and async accessor functions with a
  300–800ms artificial delay (so loading/pending states are actually visible).
- `src/auth.ts` — a tiny mock auth store: module-level state, `login`/`logout`, and `subscribe`.

## Styling

One hand-rolled `src/styles.css` with CSS variables and a dark theme — no Tailwind, no CSS
framework.
