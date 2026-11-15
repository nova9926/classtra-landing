# Classtra — site vitrine

The public marketing website of Classtra (management app for private training centres in
Algeria), by Nuestra-Tech. A landing page and an account page (sign in / create an account),
in French, English and Arabic, with a light and a dark mode. This project is separate from the
Classtra app.

The full brief is in [LANDING_SPEC.md](LANDING_SPEC.md). The approved look is the static
snapshot in [docs/design-reference.html](docs/design-reference.html).

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # TypeScript + ESLint
pnpm build      # production build in dist/
```

Stack: React + Vite + TypeScript, Tailwind CSS v4, shadcn/ui, Magic UI, Motion.

## Where things are

| What | Where |
|---|---|
| All texts, in each language | `src/i18n/fr.ts`, `en.ts`, `ar.ts` |
| Prices and other values shared by all languages | `src/siteConfig.ts` |
| Language and light/dark choice | `src/lib/prefs.ts` |
| Landing page or account page (from the address) | `src/lib/route.ts` |
| Colours, fonts, glass styles | `src/index.css` |
| The sections, in page order | `src/App.tsx` and `src/components/landing/` |
| The account page and its two forms | `src/components/auth/` |
| shadcn/ui and Magic UI parts (restyled) | `src/components/ui/` |
| Page title, description, fonts, icon list | `index.html` |

To change a price, edit `src/siteConfig.ts`. To change a sentence, edit it in the three
language files: they must keep the same shape, and `pnpm check` fails if one is missing a text.
The yearly saving ("15 000 DA") is written in the texts, so update it there when prices change.

A link can open the site in a given language or mode: `?lang=ar`, `?lang=en`, `?theme=dark`.

To use a new icon, add its name to `icon_names` in `index.html` (alphabetical order). The icon
font only contains the icons listed there.

## Still to fill in

All of these are marked `TODO` in the code.

- **Contact form:** it only logs the request to the browser console. Connect it to the Classtra
  API in `src/components/landing/ContactCTA.tsx`.
- **Sign in and create an account:** front end only. Connect `LoginForm.tsx` and `SignupForm.tsx`
  in `src/components/auth/` to the Classtra API. Never log or store a password.
- **"Mot de passe oublié ?"** and the two legal links under the sign-up form do nothing yet.
- **Arabic:** have a native speaker review `src/i18n/ar.ts`.
- **Electronic payment:** offered in the form as "Bientôt disponible"; not integrated.
- **Extra students:** the period of the 5 500 DA charge (per month, per plan, or once) is not
  stated yet (`pricing.extraStudents` in each language file).
- **Footer contacts:** `[TÉLÉPHONE]`, `[EMAIL]`, `[INSTAGRAM]`, `[FACEBOOK]`.
- **Footer links:** "À propos de Nuestra-Tech", "Mentions légales" and "Politique de
  confidentialité" go to `#`. The legal texts are not written.

## Rules

Local only: nothing is pushed or deployed from this folder.
