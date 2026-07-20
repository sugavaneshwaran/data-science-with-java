import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: PostsLayout,
})

function PostsLayout() {
  return (
    <div className="page">
      <h1 className="page-title">Posts</h1>
      <p className="page-description">
        This whole section is a nested layout route (<code>posts/route.tsx</code>). It renders its
        own <code>&lt;Outlet /&gt;</code>, so <code>/posts</code> and <code>/posts/$postId</code>{' '}
        both share this heading and the breadcrumb below.
      </p>
      <p className="breadcrumb">
        <Link to="/posts">All posts</Link>
      </p>
      <Outlet />
    </div>
  )
}
