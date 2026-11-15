import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { ar } from '@/i18n/ar'
import { en } from '@/i18n/en'
import { fr, type Content } from '@/i18n/fr'
import type { Lang } from '@/i18n/types'

// The visitor's two choices: language and light/dark mode.
// Both are remembered on their device and applied to <html> (lang, dir, data-theme),
// which is what the CSS in index.css reacts to.

export type Theme = 'light' | 'dark'
type Prefs = { lang: Lang; theme: Theme }

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'fr', label: 'FR' },
  { id: 'en', label: 'EN' },
  { id: 'ar', label: 'عربي' },
]

const contents: Record<Lang, Content> = { fr, en, ar }
const STORE = { lang: 'classtra-lang', theme: 'classtra-theme' }

function read(): Prefs {
  let lang: Lang = 'fr' // French is the default; the visitor's choice is remembered after that
  let theme: Theme = 'light'
  try {
    const storedLang = localStorage.getItem(STORE.lang)
    if (storedLang === 'fr' || storedLang === 'en' || storedLang === 'ar') lang = storedLang
    if (localStorage.getItem(STORE.theme) === 'dark') theme = 'dark'
  } catch {
    // Private browsing can block storage: the defaults are fine.
  }
  // A link can choose the language or the mode: "?lang=ar", "?theme=dark".
  const params = new URLSearchParams(window.location.search)
  const linkLang = params.get('lang')
  if (linkLang === 'fr' || linkLang === 'en' || linkLang === 'ar') lang = linkLang
  const linkTheme = params.get('theme')
  if (linkTheme === 'light' || linkTheme === 'dark') theme = linkTheme
  return { lang, theme }
}

let prefs = read()
const listeners = new Set<() => void>()

/** Writes the choices onto the page itself. */
function apply() {
  const root = document.documentElement
  root.lang = prefs.lang
  root.dir = prefs.lang === 'ar' ? 'rtl' : 'ltr'
  root.dataset.theme = prefs.theme
  const { meta } = contents[prefs.lang]
  document.title = meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  // The browser's own toolbar follows the board colour of the current mode.
  const board = getComputedStyle(root).getPropertyValue('--color-board').trim()
  if (board) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', board)
}

function update(next: Partial<Prefs>) {
  prefs = { ...prefs, ...next }
  try {
    localStorage.setItem(STORE.lang, prefs.lang)
    localStorage.setItem(STORE.theme, prefs.theme)
  } catch {
    // Not remembered, but still applied for this visit.
  }
  apply()
  listeners.forEach((listener) => listener())
}

apply() // before the first render, so the page never flashes in the wrong language or mode

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const usePrefs = () => useSyncExternalStore(subscribe, () => prefs)

/** The texts in the visitor's language. */
export const useContent = () => contents[usePrefs().lang]

export const setLang = (lang: Lang) => update({ lang })

/**
 * Switches between light and dark. Where the browser supports it, the new mode spreads
 * out in a circle from the button that was pressed (see "theme-reveal" in index.css).
 * Reduced motion, or an older browser: the mode simply changes.
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const theme: Theme = prefs.theme === 'dark' ? 'light' : 'dark'
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || calm) {
    update({ theme })
    return
  }
  const root = document.documentElement
  root.style.setProperty('--reveal-x', `${origin?.x ?? window.innerWidth / 2}px`)
  root.style.setProperty('--reveal-y', `${origin?.y ?? 0}px`)
  // flushSync: React must have redrawn before the browser takes its "after" picture.
  document.startViewTransition(() => flushSync(() => update({ theme })))
}
