// Tiny mock auth store. Module-level state + a subscribe function so React
// components can opt into re-rendering via useSyncExternalStore-style hooks
// if they want to, while router loaders can just read the state directly.

export interface AuthUser {
  username: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
}

let state: AuthState = {
  isAuthenticated: false,
  user: null,
}

type Listener = (state: AuthState) => void

const listeners = new Set<Listener>()

function emit() {
  for (const listener of listeners) listener(state)
}

export const auth = {
  getState(): AuthState {
    return state
  },
  login(username: string) {
    state = { isAuthenticated: true, user: { username } }
    emit()
  },
  logout() {
    state = { isAuthenticated: false, user: null }
    emit()
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

export type Auth = typeof auth
