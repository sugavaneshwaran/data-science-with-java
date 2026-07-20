import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchPosts, getUserById } from '../../api/mockData'

export const Route = createFileRoute('/posts/')({
  loader: () => fetchPosts(),
  // Cached loader data is considered fresh for 30s: navigating away and back
  // within that window skips the network call entirely (watch the devtools
  // or the network tab to confirm).
  staleTime: 30_000,
  pendingComponent: PostsPending,
  component: PostsIndex,
})

function PostsPending() {
  return <p className="pending">Loading posts…</p>
}

function PostsIndex() {
  const posts = Route.useLoaderData()

  return (
    <div>
      <div className="callout">
        <strong>Loader caching:</strong> this route's loader has <code>staleTime: 30_000</code>.
        Navigate to a post and back within 30 seconds and the list won't refetch.
      </div>
      <ul className="list-plain">
        {posts.map((post) => {
          const author = getUserById(post.authorId)
          return (
            <li key={post.id} className="card">
              <div className="post-row">
                <Link to="/posts/$postId" params={{ postId: post.id }}>
                  {post.title}
                </Link>
                <span className="views">{post.views.toLocaleString()} views</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>
                {post.excerpt} — <em>{author?.name ?? 'Unknown author'}</em>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
