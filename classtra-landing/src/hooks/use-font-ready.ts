import { useEffect, useState } from 'react'

/**
 * True once the given font is ready, e.g. `useFontReady('700 1em "Stardos Stencil"')`.
 * Pass a sample of the text when it is not in Latin letters.
 * Chalk writing waits for it so the letters are not drawn in a fallback font.
 * Gives up waiting after 0.8s, so a slow connection never blocks the page.
 */
export function useFontReady(font: string, sample?: string) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const go = () => setReady(true)
    // The sample text makes the browser load the right part of the font (e.g. Arabic letters).
    document.fonts.load(font, sample).then(go, go)
    const timeout = setTimeout(go, 800)
    return () => clearTimeout(timeout)
  }, [font, sample])
  return ready
}
