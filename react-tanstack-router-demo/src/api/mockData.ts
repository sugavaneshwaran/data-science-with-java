// In-memory mock "database" plus async accessor functions that simulate
// network latency (300-800ms) so loading states in the demos are visible.

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

export interface Post {
  id: string
  title: string
  excerpt: string
  body: string
  authorId: string
  tags: string[]
  views: number
}

export const users: User[] = [
  { id: 'u1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
  { id: 'u2', name: 'Grace Hopper', email: 'grace@example.com', role: 'admin' },
  { id: 'u3', name: 'Alan Turing', email: 'alan@example.com', role: 'editor' },
  { id: 'u4', name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'editor' },
  { id: 'u5', name: 'Katherine Johnson', email: 'katherine@example.com', role: 'editor' },
  { id: 'u6', name: 'Barbara Liskov', email: 'barbara@example.com', role: 'viewer' },
  { id: 'u7', name: 'Radia Perlman', email: 'radia@example.com', role: 'viewer' },
  { id: 'u8', name: 'Dennis Ritchie', email: 'dennis@example.com', role: 'viewer' },
  { id: 'u9', name: 'Ken Thompson', email: 'ken@example.com', role: 'viewer' },
  { id: 'u10', name: 'Linus Torvalds', email: 'linus@example.com', role: 'editor' },
  { id: 'u11', name: 'Anita Borg', email: 'anita@example.com', role: 'admin' },
  { id: 'u12', name: 'Tim Berners-Lee', email: 'tim@example.com', role: 'viewer' },
]

export const posts: Post[] = [
  {
    id: 'p1',
    title: 'Why File-Based Routing Clicks',
    excerpt: 'A tour of how directory structure maps to your route tree.',
    body: 'File-based routing turns your folder structure into a navigable graph. TanStack Router reads the src/routes directory and generates a fully typed route tree, so every Link, useParams and useSearch call is checked at compile time.',
    authorId: 'u1',
    tags: ['routing', 'dx'],
    views: 1284,
  },
  {
    id: 'p2',
    title: 'Type-Safe Search Params',
    excerpt: 'validateSearch turns the query string into real TypeScript.',
    body: 'Instead of parsing URLSearchParams by hand, validateSearch lets you hand-roll a validator function that returns a fully typed object. Combine it with loaderDeps to refetch only when the parsed search actually changes.',
    authorId: 'u2',
    tags: ['routing', 'typescript'],
    views: 942,
  },
  {
    id: 'p3',
    title: 'Deferred Data and Await',
    excerpt: 'Render the fast parts first, stream in the slow parts later.',
    body: 'Loaders can return promises without awaiting them. Pair that with <Suspense> and <Await> in your component to show a fast shell immediately while slower data streams in behind it.',
    authorId: 'u3',
    tags: ['performance', 'suspense'],
    views: 2031,
  },
  {
    id: 'p4',
    title: 'Blocking Navigation Safely',
    excerpt: 'useBlocker stops users from losing unsaved work.',
    body: 'useBlocker lets you intercept a navigation attempt with a predicate function. Combine it with a confirm dialog so users never lose an in-progress edit by accident.',
    authorId: 'u4',
    tags: ['forms', 'ux'],
    views: 731,
  },
  {
    id: 'p5',
    title: 'Splat Routes for File Browsers',
    excerpt: 'Catch-all segments make tree-like UIs trivial.',
    body: 'A splat route (files/$.tsx) captures the entire remaining path as a single _splat param, which is perfect for modeling nested folder structures without hand-writing a route per depth level.',
    authorId: 'u5',
    tags: ['routing'],
    views: 512,
  },
  {
    id: 'p6',
    title: 'Protecting Routes with beforeLoad',
    excerpt: 'Pathless layout routes are a clean place to gate access.',
    body: 'A pathless layout route like _auth.tsx can run a beforeLoad check on every child route and redirect unauthenticated users to /login, carrying the original destination along as a search param.',
    authorId: 'u6',
    tags: ['auth', 'routing'],
    views: 1560,
  },
  {
    id: 'p7',
    title: 'Code-Splitting Routes with .lazy.tsx',
    excerpt: 'Ship less JavaScript on first load.',
    body: 'Splitting a route into a `.tsx` shell (loader, params) and a `.lazy.tsx` component keeps route configuration eager while the actual UI code is fetched on demand, shrinking your initial bundle.',
    authorId: 'u7',
    tags: ['performance', 'bundling'],
    views: 884,
  },
  {
    id: 'p8',
    title: 'Loader Caching with staleTime',
    excerpt: 'Avoid refetching data you already have.',
    body: 'Every route loader result is cached. Setting staleTime tells the router how long that cached result is considered fresh, so navigating back to a route within the window skips the network entirely.',
    authorId: 'u8',
    tags: ['performance', 'caching'],
    views: 673,
  },
  {
    id: 'p9',
    title: 'Programmatic Redirects',
    excerpt: 'Throwing redirect() from a loader or beforeLoad.',
    body: 'Instead of returning JSX that redirects on mount, TanStack Router lets you throw a redirect() object directly from a loader or beforeLoad hook, short-circuiting the render entirely.',
    authorId: 'u9',
    tags: ['routing'],
    views: 398,
  },
  {
    id: 'p10',
    title: 'Custom 404 and Error Boundaries',
    excerpt: 'Per-route notFoundComponent and errorComponent.',
    body: 'You can define a notFoundComponent and errorComponent per route, or fall back to the root defaults. Throwing notFound() from a loader triggers the nearest notFoundComponent automatically.',
    authorId: 'u10',
    tags: ['dx', 'error-handling'],
    views: 1120,
  },
  {
    id: 'p11',
    title: 'Preloading on Intent',
    excerpt: 'Fetch data before the click even lands.',
    body: 'Setting defaultPreload to "intent" tells the router to kick off a route\'s loader as soon as the user hovers or focuses a Link, so the navigation feels instant by the time they actually click.',
    authorId: 'u11',
    tags: ['performance'],
    views: 455,
  },
  {
    id: 'p12',
    title: 'Nested Layouts with Outlet',
    excerpt: 'Share chrome between a group of routes.',
    body: 'A route.tsx file paired with a directory creates a layout route: it renders its own <Outlet /> so every child route in that directory shares the same wrapping UI, like a posts sidebar or tab bar.',
    authorId: 'u12',
    tags: ['routing', 'layout'],
    views: 289,
  },
  {
    id: 'p13',
    title: 'Scroll Restoration Done Right',
    excerpt: 'Coming back to a list should feel seamless.',
    body: 'Enabling scrollRestoration on the router means navigating back to a scrolled list restores your exact scroll position, instead of dumping you back at the top of the page.',
    authorId: 'u1',
    tags: ['ux'],
    views: 204,
  },
  {
    id: 'p14',
    title: 'Router Devtools for Debugging',
    excerpt: 'See the whole route tree and match state live.',
    body: 'TanStackRouterDevtools renders a floating panel showing the current route match, pending navigations, and the full route tree, which is invaluable when a nested layout is not rendering what you expect.',
    authorId: 'u2',
    tags: ['dx', 'debugging'],
    views: 660,
  },
  {
    id: 'p15',
    title: 'Context-Aware Loaders',
    excerpt: 'Passing auth and API clients through router context.',
    body: 'createRootRouteWithContext lets you type a context object (like { auth, api }) that every loader and beforeLoad in the tree can read from its second argument, without any prop drilling.',
    authorId: 'u3',
    tags: ['architecture', 'typescript'],
    views: 812,
  },
]

function delay<T>(value: T): Promise<T> {
  const ms = 300 + Math.floor(Math.random() * 500)
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export async function fetchPosts(): Promise<Post[]> {
  return delay(posts)
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  return delay(posts.find((p) => p.id === id))
}

export interface UsersQuery {
  page: number
  sort: 'name' | 'email'
  filter: string
}

export interface UsersPage {
  items: User[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const USERS_PAGE_SIZE = 4

export async function fetchUsers(query: UsersQuery): Promise<UsersPage> {
  let items = users.slice()

  if (query.filter.trim()) {
    const needle = query.filter.trim().toLowerCase()
    items = items.filter(
      (u) => u.name.toLowerCase().includes(needle) || u.email.toLowerCase().includes(needle),
    )
  }

  items = items.sort((a, b) => a[query.sort].localeCompare(b[query.sort]))

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE))
  const page = Math.min(Math.max(1, query.page), totalPages)
  const start = (page - 1) * USERS_PAGE_SIZE
  const pageItems = items.slice(start, start + USERS_PAGE_SIZE)

  return delay({ items: pageItems, total, page, pageSize: USERS_PAGE_SIZE, totalPages })
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export async function fetchSlowStats(): Promise<{ totalViews: number; avgViews: number }> {
  const ms = 1200 + Math.floor(Math.random() * 800)
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
  return new Promise((resolve) =>
    setTimeout(() => resolve({ totalViews, avgViews: Math.round(totalViews / posts.length) }), ms),
  )
}

export interface ChartDatum {
  label: string
  value: number
}

export function getViewsChartData(): ChartDatum[] {
  return posts.map((p) => ({ label: p.title.split(' ').slice(0, 2).join(' '), value: p.views }))
}
