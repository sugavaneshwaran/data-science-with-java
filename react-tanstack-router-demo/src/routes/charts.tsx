import { createFileRoute } from '@tanstack/react-router'

// This file is the eager "shell" for the /charts route: path config, any
// loader/beforeLoad, etc. The actual component implementation lives in
// charts.lazy.tsx and is fetched as a separate JS chunk only when this
// route is visited.
export const Route = createFileRoute('/charts')({})
