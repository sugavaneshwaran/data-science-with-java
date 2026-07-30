import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

const TABS = ['overview', 'specs', 'reviews'] as const
type Tab = (typeof TABS)[number]

interface DeepLinkSearch {
  tab: Tab
  // Comma-separated FAQ ids, e.g. "faq-1,faq-3". Empty string = none expanded.
  expanded: string
}

// Same hand-rolled validateSearch pattern as /users, but here the URL is
// carrying pure UI state (open tab, expanded rows) instead of a data query.
function validateSearch(search: Record<string, unknown>): DeepLinkSearch {
  const rawTab = typeof search.tab === 'string' ? search.tab : 'overview'
  const tab: Tab = (TABS as readonly string[]).includes(rawTab) ? (rawTab as Tab) : 'overview'
  const expanded = typeof search.expanded === 'string' ? search.expanded : ''
  return { tab, expanded }
}

export const Route = createFileRoute('/deep-linking')({
  validateSearch,
  component: DeepLinkingDemo,
})

const TAB_CONTENT: Record<Tab, { title: string; body: string }> = {
  overview: {
    title: 'Overview',
    body: 'This panel is a normal tabbed UI, except the active tab lives in the URL search param `tab` instead of local component state.',
  },
  specs: {
    title: 'Specs',
    body: 'Because the state is in the URL, refreshing the page, opening the link in a new tab, or sending it to someone else all reproduce this exact tab.',
  },
  reviews: {
    title: 'Reviews',
    body: 'Compare this to the Posts or Editor demos, where component state (form drafts, scroll position) is intentionally NOT deep-linkable.',
  },
}

const FAQS = [
  {
    id: 'faq-1',
    q: 'How is this different from the Users search-params demo?',
    a: 'Users syncs a data query (page/sort/filter) to the URL so the loader can react to it. This page syncs pure UI state — no loader involved — to show deep linking applies beyond data fetching.',
  },
  {
    id: 'faq-2',
    q: 'What happens if the URL has an invalid tab value?',
    a: 'validateSearch() falls back to "overview" for anything outside the known Tab union, so a hand-edited or stale URL never crashes the route.',
  },
  {
    id: 'faq-3',
    q: 'Why store expanded ids as a comma-separated string instead of an array?',
    a: "TanStack Router's default search serializer JSON-encodes non-primitive values, which is correct but produces an ugly URL. A comma-separated string keeps the query string human-readable, e.g. ?expanded=faq-1,faq-3.",
  },
  {
    id: 'faq-4',
    q: 'Does this survive a full page reload?',
    a: 'Yes — try it. Expand a couple of items, switch tabs, then reload the page (or open the "Copy link" URL in a fresh tab). The exact same view state comes back.',
  },
]

function DeepLinkingDemo() {
  const search = Route.useSearch()
  const [copied, setCopied] = useState(false)

  const expandedIds = search.expanded ? search.expanded.split(',').filter(Boolean) : []

  function expandedSearchFor(id: string): string {
    const isOpen = expandedIds.includes(id)
    const next = isOpen ? expandedIds.filter((x) => x !== id) : [...expandedIds, id]
    return next.join(',')
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="page">
      <h1 className="page-title">Deep linking</h1>
      <p className="page-description">
        Route params and search params (see the Users demo) already make every URL in this app
        deep-linkable. This page makes the pattern explicit by syncing <em>UI state</em> — which
        tab is open, which FAQ rows are expanded — into the URL instead of <code>useState</code>,
        so the exact view is shareable and survives a reload.
      </p>

      <div className="callout">
        <strong>Try it:</strong> switch tabs and expand a couple of FAQs below, then reload the
        page or copy the link and open it in a new tab. The same tab and expanded rows come back
        because they live in <code>search</code>, not component state.
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((tab) => (
          <Link
            key={tab}
            to="/deep-linking"
            search={{ ...search, tab }}
            role="tab"
            className={`tab${search.tab === tab ? ' active' : ''}`}
          >
            {TAB_CONTENT[tab].title}
          </Link>
        ))}
      </div>

      <div className="card tab-panel" role="tabpanel">
        <h3 className="card-title">{TAB_CONTENT[search.tab].title}</h3>
        <p style={{ color: 'var(--text-muted)' }}>{TAB_CONTENT[search.tab].body}</p>
      </div>

      <h3 style={{ marginTop: '2rem' }}>FAQ (multi-expand, also deep-linked)</h3>
      <div className="accordion">
        {FAQS.map((faq) => {
          const isOpen = expandedIds.includes(faq.id)
          return (
            <div key={faq.id} className="accordion-item">
              <Link
                to="/deep-linking"
                search={{ ...search, expanded: expandedSearchFor(faq.id) }}
                className="accordion-trigger"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="accordion-chevron">{isOpen ? '−' : '+'}</span>
              </Link>
              {isOpen && <div className="accordion-body">{faq.a}</div>}
            </div>
          )
        })}
      </div>

      <div className="toolbar" style={{ marginTop: '1.5rem' }}>
        <button type="button" className="primary" onClick={copyLink}>
          {copied ? 'Copied!' : 'Copy link to this view'}
        </button>
      </div>

      <p className="breadcrumb" style={{ marginTop: '1rem' }}>
        Current URL search: <code>{JSON.stringify(search)}</code>
      </p>
    </div>
  )
}
