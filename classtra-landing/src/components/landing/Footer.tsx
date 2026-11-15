import { useContent } from '@/lib/prefs'
import { BRAND } from '@/siteConfig'

const linkClass = 'rounded-sm text-muted-on-board transition-colors hover:text-chalk'

/** §10: thin chalk divider, 4 columns (2×2 on phones), then the brand row. */
export function Footer() {
  const { footer } = useContent()
  const { product, company, contact, legal } = footer.columns
  const linkColumns = [product, company]

  return (
    <footer className="mx-auto w-full max-w-[1120px] text-sm">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-chalk/15 pt-10 md:grid-cols-4">
        {linkColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
            <p className="font-semibold text-chalk">{column.title}</p>
            {column.links.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}

        {/* Placeholders until the real contacts are known (see the language files in src/i18n). */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-chalk">{contact.title}</p>
          {[contact.phone, contact.email, contact.instagram, contact.facebook].map((item) => (
            <span key={item} className="text-muted-on-board">
              {item}
            </span>
          ))}
        </div>

        <nav aria-label={legal.title} className="flex flex-col gap-3">
          <p className="font-semibold text-chalk">{legal.title}</p>
          {legal.links.map((link) => (
            <a key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-chalk/10 pt-6 text-[0.8125rem] text-soft-on-board">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span dir="ltr" className="font-brand text-[1.375rem] leading-none font-bold text-chalk">
            {BRAND.wordmark}
          </span>
          <span>{footer.tagline}</span>
        </div>
        <span>{footer.copyright}</span>
      </div>
    </footer>
  )
}
