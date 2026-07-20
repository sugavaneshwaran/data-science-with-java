import { useState } from 'react'
import { createFileRoute, useBlocker } from '@tanstack/react-router'

export const Route = createFileRoute('/editor')({
  component: EditorPage,
})

const INITIAL_DRAFT = ''

function EditorPage() {
  const [draft, setDraft] = useState(INITIAL_DRAFT)
  const isDirty = draft !== INITIAL_DRAFT

  // shouldBlockFn runs on every navigation attempt (link click, back/forward,
  // programmatic navigate). Returning true blocks it and puts the blocker
  // into "blocked" status; withResolver:true gives us proceed()/reset().
  const blocker = useBlocker({
    shouldBlockFn: () => isDirty,
    withResolver: true,
    enableBeforeUnload: () => isDirty,
  })

  return (
    <div className="page">
      <h1 className="page-title">
        Draft editor
        {isDirty && <span className="dirty-dot" title="Unsaved changes" />}
      </h1>
      <p className="page-description">
        Type something below, then try clicking away in the sidebar. <code>useBlocker</code> with
        a <code>shouldBlockFn</code> intercepts the navigation and shows a confirm UI right here
        instead of letting it through. It also guards a real tab close via{' '}
        <code>enableBeforeUnload</code>.
      </p>

      <div className="field">
        <label htmlFor="draft">Draft content</label>
        <textarea
          id="draft"
          rows={8}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Start typing to make this page 'dirty'…"
        />
      </div>

      <button onClick={() => setDraft(INITIAL_DRAFT)} disabled={!isDirty}>
        Discard changes
      </button>

      {blocker.status === 'blocked' && (
        <div className="blocker-banner">
          <span>You have unsaved changes. Leave this page anyway?</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="danger" onClick={blocker.proceed}>
              Leave without saving
            </button>
            <button onClick={blocker.reset}>Stay on page</button>
          </div>
        </div>
      )}
    </div>
  )
}
