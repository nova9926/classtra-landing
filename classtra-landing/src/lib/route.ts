import { useSyncExternalStore } from 'react'
import { ROUTES } from '@/siteConfig'

// The site has two "pages": the landing page and the account page (sign in / create an account).
// The page is chosen from the address: "#/connexion" and "#/inscription" open the account page,
// anything else (including the section links like "#pricing") is the landing page.

export type Route = 'home' | 'login' | 'signup'

function current(): Route {
  const hash = window.location.hash
  if (hash === ROUTES.login) return 'login'
  if (hash === ROUTES.signup) return 'signup'
  return 'home'
}

const subscribe = (listener: () => void) => {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

export const useRoute = () => useSyncExternalStore(subscribe, current)
