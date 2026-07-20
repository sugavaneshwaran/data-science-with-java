import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchPostById, getUserById } from '../../api/mockData'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPostById(params.postId)
    if (!post) {
      throw notFound()
    }
    return post
  },
  pendingComponent: () => <p className="pending">Loading post…</p>,
  notFoundComponent: PostNotFound,
  errorComponent: PostError,
  component: PostDetail,
})

function PostDetail() {
  const post = Route.useLoaderData()
  const { postId } = Route.useParams()
  const author = getUserById(post.authorId)

  return (
    <div className="card">
      <p className="breadcrumb">
        Typed param: <code>postId = "{postId}"</code>
      </p>
      <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
        {post.title}
      </h2>
      <p style={{ color: 'var(--text-muted)' }}>By {author?.name ?? 'Unknown author'}</p>
      <p>{post.body}</p>
      <div>
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function PostNotFound() {
  return (
    <div className="not-found-box">
      <p className="code">404</p>
      <h3>Post not found</h3>
      <p className="page-description">
        The loader threw <code>notFound()</code> because no post matched this id.
      </p>
      <Link to="/posts">Back to posts</Link>
    </div>
  )
}

function PostError({ error }: { error: Error }) {
  return (
    <div className="error-box">
      <h2>Failed to load post</h2>
      <p>{error.message}</p>
    </div>
  )
}
