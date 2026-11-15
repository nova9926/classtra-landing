import type { PlanId } from '@/i18n/types'

// Everything that is the same in every language. The texts are in src/i18n/{fr,en,ar}.ts.

export const BRAND = {
  name: 'Classtra',
  wordmark: 'Classtra.', // the logo text, with its full stop
  company: 'Nuestra-Tech',
}

/** Prices in Algerian dinars. Change a price here and it changes everywhere, in every language. */
export const PRICES: Record<PlanId, number> = {
  mensuel: 7500,
  semestre: 40000,
  annuel: 75000,
}

export const DEFAULT_PLAN: PlanId = 'annuel'

/** Numbers are written the Algerian way in every language: "75 000". */
export const formatNumber = (n: number) => new Intl.NumberFormat('fr-FR').format(n)

/** The two tabs of the account page. */
export const ROUTES = { login: '#/connexion', signup: '#/inscription', home: '#top' }
