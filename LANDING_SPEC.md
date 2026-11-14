# Prompt — Classtra public landing page redesign

> Paste everything below into Claude Code, opened in `~/Documents/Classtra/design-rework/classtra-landing` (Fedora Linux). It is self-contained.

---

## Role
You are a senior front-end engineer and UI designer with Apple-level taste. Build the **new public marketing website** of Classtra, as a **separate standalone project**, to match the spec below. It is not part of the Classtra app code.

## Context
- **Product:** Classtra, a management app for private training/support centers in Algeria (soutien scolaire, BAC prep, formation). Made by Nuestra-Tech.
- **Audience:** center owners, mostly 40+ years old, who don't trust software much and value in-person help. The page must feel **trustworthy and premium**, like an Apple product page.
- **Languages:** French (default), English and Arabic (read right to left). The visitor chooses with the FR · EN · عربي switch in the navbar; the choice is remembered. All texts live in `src/i18n/fr.ts`, `en.ts` and `ar.ts`, and those files are the source of truth for copy. Register: formal ("nous" / "vous" in French, formal English, Modern Standard Arabic). The French quoted in the sections below is the earlier draft and is kept only as a guide to what each section says.
- **Stack (new project, already created with Vite React + TypeScript):** React + Vite + TypeScript, Tailwind CSS v4, shadcn/ui, Motion (framer-motion), Magic UI. One page, no router needed (anchor links only).
- **The Classtra app is a different project.** This site only has the front end of the account page (sign in and create an account, see section 11). The forms are not connected yet: connecting them to the Classtra API is a later step.

## Step 0: project setup (do this first, then show me the result)
The folder already contains a fresh Vite + React + TypeScript project. Set it up:
1. `git init`, plus a first commit "Fresh Vite project", so I have a backup point.
2. Tailwind CSS v4 with the `@tailwindcss/vite` plugin, and `@import "tailwindcss";` in `src/index.css`.
3. The `@/` path alias in `tsconfig.json`, `tsconfig.app.json` and `vite.config.ts` (add `@types/node` as a dev dependency).
4. shadcn/ui: `pnpm dlx shadcn@latest init`, with the default style and CSS variables on.
5. Add the Magic UI registry to `components.json`: `"registries": { "@magicui": "https://magicui.design/r/{name}.json" }`.
6. Install `motion` and `material-symbols`.
7. Run `pnpm dev`, check that the empty page loads, and tell me. **Then wait for my OK** before building the page.

## Hard rules
0. **LOCAL ONLY. Do not push, deploy or publish anything.**
   - No `git push`, no remote, no Vercel/Hostinger deploy.
   - Commits only when I ask (except the step 0 backup commit).
   - When done, give me the localhost URL (`pnpm dev`) and **stop**.
1. **This project is only the marketing website.** Never touch, import or copy anything from the Classtra app project.
2. Before each big step, **list the files you will create or change and wait for my OK.**
3. Put SEO meta in `index.html`: `<html lang="fr">`, title "Classtra — Gestion de centre", a description about inscriptions, présences, paiements and attestations for centres de formation in Algeria, `og:locale` fr_DZ.
4. Split into small components under `src/components/landing/`: `Navbar`, `Hero`, `HeroCards`, `ParallaxLayers`, `ChalkText`, `ChalkPath`, `Problems`, `Features`, `Roles`, `HowItWorks`, `Pricing`, `FAQ`, `ContactCTA`, `Footer`, plus a shared `Glass` wrapper and an `Icon` component. Put all texts, prices and contacts in `src/siteConfig.ts`.

## Tools to use
- **Apple Design skill (`emilkowalski/skills`, installed in `.claude/skills`):** follow it for all motion, transitions, hover/press feedback, the pinned hero and the parallax. It should feel fluid and physical, the way Apple builds it. For layout, colors and copy, this spec wins. If the **Animation Performance** skill is installed, run it at the end to check scrolling on mobile.
- **Magic UI (free, MIT, open source) through the shadcn MCP:** the `@magicui` registry is configured in `components.json`. Use it for animated parts:
  - `bento-grid` for Features
  - `blur-fade` for section reveals
  - `number-ticker` for the pricing switch
  - `animated-beam` (optional) for the chalk path
  - `magic-card` (cursor spotlight) for the tile glow

  Install with `pnpm dlx shadcn@latest add @magicui/<name>`.
  - **Every Magic UI component must be restyled** to the tokens, fonts and glass rules below. Never keep its default colors, fonts or gradients.
  - Use **only free, open-source components** (shadcn/ui + Magic UI free). No paid "Pro" templates, no 21st.dev, no API keys.
  - If a component needs a new package (e.g. `motion`), tell me before installing it.
- **shadcn MCP:** for basic parts only (Button, Input, Select, Accordion, Sheet).
- Everything is installed **locally only** (rule 0).

## Palette: "Tableau" (blackboard)
Use these tokens only (define them as Tailwind v4 `@theme` tokens in `src/index.css`):

| Token | Hex | Use |
|---|---|---|
| `board` | `#1F3D34` | Dark sections (hero, problems, features, roles, contact, footer). Add a faint chalk grid: 1px lines `rgba(244,241,234,.04)` every 48px |
| `chalk` | `#F4F1EA` | Light sections (how it works, pricing, FAQ) and text on board |
| `ink` | `#1C1C1A` | Text on chalk, text on yellow |
| `accent` | `#F2B705` (school-bus yellow) | **The only loud color.** Primary buttons, key words in headlines, icons on board, best-value plan, "Pensé pour l'Algérie" tile |
| `muted-on-board` | `#D4DDD6` | Secondary text on board |
| `muted-on-chalk` | `#4A5650` | Secondary text on chalk |
| status tags | Paid `#CDEBD9` · Partial `#FBE7A6` · Late `#F6CFC6` | Small pills, always with `ink` text |

Rules:
- **Yellow buttons always use `ink` text, never white.** White on yellow fails contrast.
- No purple, no blue-purple gradients, no neon. Yellow covers ~10% of the page.

## Glass: Apple-style, used everywhere
The whole page is built from frosted glass panels floating over the board green or chalk, like Apple's Liquid Glass.

- **Dark glass (on board):** `background: rgba(244,241,234,.08)`, `backdrop-filter: blur(24px) saturate(170%)`, `border: 1px solid rgba(244,241,234,.18)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 24px 60px rgba(0,0,0,.28)`.
- **Light glass (on chalk):** `background: rgba(255,255,255,.55)`, same blur, `border: 1px solid rgba(255,255,255,.85)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 20px 50px rgba(31,61,52,.12)`.
- **Something must sit behind the glass, or the blur shows nothing.** Place 2–3 large, very blurred circles per section (yellow `#F2B705` at 15–35% opacity, light green `#3F7A66` / `#7FB39E`), with `filter: blur(90px)` and `pointer-events: none`.
- Glass goes on: navbar (floating pill), cards, bento tiles, pricing cards, FAQ items, icon chips, secondary buttons, form card, badges.
- **Readability safeguards (must have):**
  - Text contrast ≥ 4.5:1 on every glass surface. Test the lightest spot behind each card.
  - `@supports not (backdrop-filter: blur(1px))` → solid fallback: board glass `#2A4A40`, chalk glass `rgba(255,255,255,.9)`.
  - `@media (prefers-reduced-transparency: reduce)` → same solid fallback.
  - **Performance:** on screens below 768px, lower the blur to 12px and drop the outer shadow. Never nest more than 2 glass layers.
- Corner radius: 22–40px on cards, pill (`rounded-full`) on buttons and badges. Icon chips: 52px squares with 16px radius.

## Typography
- **Headings, prices, step numbers, logo wordmark, FAQ questions:** **Stardos Stencil** 700 (Google Fonts), letter-spacing −0.01em, line-height ~1.05.
  `<link href="https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`
- **Everything else** (body, buttons, labels, inputs, FAQ answers): **Inter**, 18px minimum, line-height 1.6. Never use Stardos Stencil for small text.
- **The chalk slogan** ("ELEVATE YOUR SCHOOL With CLASSTRA", above the Problems section, in English in every language): **Playfair Display** Italic 700. Used nowhere else.
- **Arabic:** see "Right-to-left (Arabic)".
- Sizes: H1 `clamp(46px, 6vw, 80px)` · H2 `clamp(34px, 4.4vw, 56px)` · H3 24–38px · eyebrows 14px uppercase, tracking .06em.

## Icons: Google Material Symbols Rounded, filled
- `material-symbols` (installed in step 0): `import "material-symbols/rounded.css"` in `src/main.tsx`.
- `<Icon name size />` renders `<span className="material-symbols-rounded" aria-hidden="true">` with `font-variation-settings: 'FILL' 1, 'wght' 500` (filled, Apple SF-Symbols feel).
- Icons on board use `accent` inside a dark-glass chip. Don't use lucide on this site.
- Names: logo `school` · mobile menu `menu` · pricing note `verified` · badge `location_on` · CTA `arrow_forward` · secondary CTA `play_circle` · trust chips `handyman`, `groups`, `support_agent` · problems `close` · features `payments`, `fact_check`, `person_add`, `workspace_premium`, `calendar_month`, `contact_phone`, `flag` · roles `monitoring`, `support_agent`, `co_present` · form button `call` · checklist `check_circle` · FAQ `expand_more` · pricing note `verified`.

## Page structure and exact copy

### 1. Navbar: minimal, Apple-style
- A slim floating dark-glass pill, centered, max-width ~760px, sticky. About 56px tall.
- Left: small yellow logo chip (`school` icon) + "Classtra" (Stardos 21px).
- Centre: "Fonctionnalités" and "Tarifs" (text links). Right: the language switch (FR · EN · عربي), the light/dark switch, "Se connecter" (glass outline pill, opens the account page on its sign-in tab) and "Créer un compte" (solid chalk pill with ink text, opens it on its sign-up tab). The pill is up to ~1080px wide.
- Solid and outline: the main action of the bar ("Créer un compte") is the solid chalk pill, the secondary one ("Se connecter") is glass. Yellow is not used in the navbar. The demonstration CTA lives in the hero and the contact section only.
- Links: 15px Inter 500, `muted-on-board`, pill-shaped hover background `rgba(244,241,234,.08)`.
- Below 1024px: logo + "Se connecter" + (from 640px) "Créer un compte" + a menu button whose three bars fold into a cross. It opens an extra-glassy panel with the 2 links, "Créer un compte" (on phones), the language switch and the light/dark switch.

### 2. Hero (board): centered, Apple-style
- Everything centered, max-width ~900px for the text:
  - Glass badge with `location_on`: "Conçu en Algérie, pour les centres de formation"
  - H1 (centered, up to 2 lines): "Votre centre de formation, **enfin sous contrôle.**" ← "enfin sous contrôle." in yellow, with the **chalk-writing intro** (see Motion)
  - Sub: "Inscriptions, présences, paiements et attestations au même endroit. Pour le directeur, le secrétariat et les formateurs."
  - Buttons: "Demander une démo →" (yellow) · "Voir les fonctions" (glass, `play_circle`, scrolls to `#features`)
  - Trust chips (glass): Installation sur place · Formation de votre équipe · Support gratuit toute l'année
- Below the text: the **floating glass cards** composition, full content width (`HeroCards` component). These are 5–6 dark-glass cards at different depths, slightly overlapping like a layered scene:
  - Back layer: "Tableau de bord" KPI card (Élèves actifs 248 · Présence 94% · Payé ce mois 74% in yellow) + a small 6-bar chart
  - Middle layer: attendance card "Présences · BAC Maths" (Dim ✓ Lun ✓ Mar ✕ Mer ✓ Jeu empty) and payments card (Amina B. Payé · Yacine K. 2ᵉ tranche · Sara M. En retard)
  - Front layer: small cards for a printed receipt ("Reçu · 2 500 DA"), a certificate ("Attestation · Anglais B1") and a notification ("3 paiements en retard")
  - A tiny "Données d'exemple" label under the scene
- This scene is **pinned** while scrolling (see Motion).

### 3. Problems (board)
H2 "Fini les cahiers, les fichiers Excel et les paiements oubliés." Then 3 glass cards:
- ~~Qui n'a pas payé ce mois-ci ?~~ → La liste des retards en un clic.
- ~~Le cahier de présence perdu~~ → L'appel en 30 secondes, sauvegardé.
- ~~Attestations faites à la main~~ → Imprimées prêtes, avec votre logo.

**Strike-through on scroll:** each card enters with the problem text visible. A hand-drawn yellow chalk line (SVG path, slightly wobbly, rough chalk texture) draws across it over 0.5s. Then the solution fades up below it in Stardos. The cards trigger one after another.

### 4. Features (`#features`, board): glass bento with mini live UI
Eyebrow "Fonctionnalités" · H2 "Tout ce dont un centre a besoin."
Each tile has an icon chip, title and one sentence, **plus a tiny working piece of the app** that animates once when it scrolls into view:
- **Paiements & relances** (full width): "Suivez les tranches, les retards et imprimez les reçus. Votre chiffre du mois d'un coup d'œil." The mini UI is 3 payment rows with tags (Payé / 2ᵉ tranche / En retard). The "En retard" row pulses softly once.
- **Présences**: "L'appel par groupe, depuis le téléphone du formateur." The mini UI is 5 student names whose check marks tick one by one.
- **Inscriptions**: "Une fiche claire par élève, de la première visite à la fin de la formation." The mini UI is a small student card (avatar initials, name, group, phone).
- **Attestations**: "Générées automatiquement, prêtes à imprimer." The mini UI is a tiny certificate that slides out like it's being printed.
- **Groupes & salles**: "Plannings par groupe, formateur et salle, sans conflit d'horaires." The mini UI is a 5-day mini calendar with colored blocks.
- **Suivi des prospects**: "Chaque appel et chaque visite, jusqu'à l'inscription." The mini UI is 3 small columns (Appel → Visite → Inscrit) with one dot moving across.
- **Pensé pour l'Algérie** (solid yellow tile, ink text): "En français, paiements en dinars, adapté aux centres d'ici." It shows a "2 500 DA" chip and a "Français" chip.

**Hover / tap: lift + glow.** The tile lifts 3px. A soft yellow radial light (about 220px, 18% opacity) follows the cursor across the glass, using CSS variables `--x`/`--y` set on pointermove. The glass edge brightens a little. Desktop only; on touch screens, only the lift.

### 5. Roles (board): tabs with preview
H2 "Chacun voit ce qui le concerne. Rien de plus." (second sentence in `#AFC2B7`).
- A glass **segmented control** (Apple-style pill with a sliding yellow-tinted thumb) with 3 tabs: Directeur · Secrétariat · Formateurs
- Below it, a large dark-glass preview panel that cross-fades (0.3s) to show what that person sees:
  - **Directeur:** "Chiffres, revenus et vue d'ensemble de chaque groupe." Shows revenue this month, occupancy per group (bars) and late payments count.
  - **Secrétariat:** "Inscriptions, encaissements, reçus et appels aux parents." Shows today's payments list with an "Encaisser" button and a "Nouvelle inscription" button.
  - **Formateurs:** "Leurs groupes, leur planning et l'appel en classe." Shows today's group, a student checklist and a "Valider l'appel" button.
- Keyboard accessible (arrow keys switch tabs, `role="tablist"`).

### 6. How it works (`#how`, chalk): chalk path
Eyebrow "Comment ça marche" · H2 "On vient chez vous. On installe. On forme votre équipe."
3 light-glass step cards with big board-green Stardos numbers:
1. Vous faites la demande: "Remplissez le formulaire. On vous appelle dans la journée."
2. On installe sur place: "On importe vos élèves et on forme votre secrétariat dans votre centre."
3. Vous gérez sereinement: "Et si besoin, notre équipe vous répond du matin au soir, gratuitement, toute l'année."

**Chalk path:** a hand-drawn, slightly wavy yellow chalk line (SVG, rough texture) connects card 1 → 2 → 3. It **draws itself as the user scrolls** (stroke-dashoffset linked to scroll progress). Each card lights up (its border turns yellow) when the line reaches it. Desktop: horizontal path. Mobile: vertical path on the left with the cards stacked.

### 7. Pricing (`#pricing`, chalk): toggle switch
Eyebrow "Tarifs" · H2 "Des prix clairs. Sans surprise." · "Toutes les fonctionnalités dans chaque formule."
Two columns (stacked on mobile):
- **Left: one big pricing card** (board-green with the chalk grid and a 3px yellow ring):
  - Top: a glass **segmented switch**: Mensuel · 6 mois · Annuel. **Default: Annuel.**
  - The price animates (number rolls/crossfades, 0.4s) when switching:
    - Mensuel: **7 500 DA** / mois · "Pour commencer sans engagement."
    - 6 mois: **40 000 DA** · "Une année scolaire en un seul paiement."
    - Annuel: **75 000 DA** / an · badge "Le plus avantageux" · "Vous économisez 15 000 DA par rapport au mensuel."
  - Yellow button: "Choisir [plan]" → scrolls to `#contact` and preselects the plan in the form.
- **Right: "Inclus dans chaque formule" checklist** (light glass), each line with a yellow `check_circle`:
  - Jusqu'à 600 élèves
  - Installation sur place
  - Import de vos élèves
  - Formation de votre équipe
  - Support gratuit toute l'année
  - Mises à jour incluses
  - Sauvegardes automatiques
- At the bottom of the checklist card, one line about the only extra charge: "Plus de 600 élèves ? 5 500 DA par tranche de 500 élèves en plus." (every plan includes up to 600 students).
- Under both: a centered line with a `verified` icon: "Installation, import de vos élèves et formation sur place inclus. Aucun frais caché." **There is NO setup fee.**

### 8. FAQ (`#faq`, chalk): glass accordion
One item open at a time, smooth height animation (0.3s), and a `expand_more` icon that rotates.
- "Je ne suis pas à l'aise avec l'informatique. C'est compliqué ?" → "Non. On installe tout et on forme votre équipe sur place, dans votre centre."
- "Mes données sont-elles en sécurité ?" → "Oui. Chaque utilisateur a son propre mot de passe, chacun ne voit que ce qui le concerne, vos données sont sauvegardées automatiquement et ne sont jamais partagées ni vendues."
- "Ça marche sur téléphone ?" → "Oui, sur ordinateur, tablette et téléphone."
- "Comment je paie ?" → "En espèces ou par BaridiMob. D'autres moyens de paiement arrivent bientôt."

### 9. Contact (`#contact`, board): form only
A big dark-glass block:
- **Left:** H2 "Prêt à reprendre le **contrôle** de votre centre ?" ("contrôle" in yellow) + "Laissez vos coordonnées. On vous appelle et on passe vous faire une démonstration."
- **Right:** a light-glass form:
  - Fields: Nom du centre, Votre nom, Téléphone, Wilaya (select, 58 wilayas), Formule (visible select: Mensuel / 6 mois / Annuel with prices, preselected by the pricing switch and kept in sync with it), Mode de paiement (two choices: "Espèces · En main propre" and "Paiement électronique · Bientôt disponible"; electronic payment is not integrated yet).
  - Board-green button "Être rappelé" with the `call` icon.
  - Validation: react-hook-form + zod. Phone has 10 digits starting with 05, 06 or 07.
  - After submit, show a success state inside the card ("Merci ! On vous appelle très vite.").
  - There is no backend yet: on submit, `console.log` the data and add a clear `TODO: connect to Classtra API`. Show the success state anyway.
- **No floating WhatsApp button and no sticky bar anywhere on the page.**

### 10. Footer (board): full Apple-style
A thin chalk divider, then 4 columns (2×2 on mobile), small Inter text (14px, `muted-on-board`), column titles in chalk 600:
- **Produit:** Fonctionnalités · Comment ça marche · Tarifs · Questions (anchor links)
- **Entreprise:** À propos de Nuestra-Tech · Demander une démo (→ `#contact`)
- **Contact:** `[TÉLÉPHONE]` · `[EMAIL]` · `[INSTAGRAM]` · `[FACEBOOK]` (all from `siteConfig.ts`)
- **Légal:** Mentions légales · Politique de confidentialité. These link to `#` for now; add a `TODO` and list them in your summary. Don't write legal text.

Bottom row: "Classtra" (Stardos) + "Un produit Nuestra-Tech · Conçu en Algérie" on the left, "© 2026 Nuestra-Tech" on the right.

### 11. Account page (board): sign in and create an account
Opened by the two navbar buttons (addresses `#/connexion` and `#/inscription`). One page, two tabs, using the same sliding-thumb control as the Roles tabs, so the visitor can switch from one form to the other at any time. The form sits on a paper card (light glass by day, dark glass by night), like the contact form. A "← Découvrir Classtra" link goes back to the landing page. On this page the navbar only shows the logo, the language switch and the light/dark switch.
- **Connexion:** Adresse e-mail, Mot de passe (with a show/hide eye), "Se connecter", "Mot de passe oublié ?".
- **Créer votre compte:** *Votre établissement*: Nom de l'établissement, Type d'établissement (Centre de formation, Centre de soutien scolaire, École privée, École de langues, Autre), Wilaya (58). *Votre compte de directeur*: Nom complet, Adresse e-mail, Téléphone mobile (10 digits starting with 05, 06 or 07), Mot de passe (10 characters minimum, with 1 capital letter and 1 digit). Then the terms line (conditions générales de vente, politique de confidentialité) and "Créer mon compte".
- Front end only for now: the forms validate, then show a short notice. Each has a `TODO` where the Classtra API call goes. **A password is never logged, stored in the browser or kept after the call.**

## Dark mode: "the blackboard at night"
A light/dark switch sits in the navbar (a moon by day, a sun by night); the choice is remembered. Light mode is the design described in this document. Dark mode follows the same rules, with a deeper palette:

| Token | Light | Dark |
|---|---|---|
| `board` | `#1F3D34` | `#132C26` |
| `paper` (the chalk sections and form cards) | `#F4F1EA` | `#0E201B` |
| text on paper | `#1C1C1A` | `#F4F1EA` |
| secondary text on paper | `#4A5650` | `#C4D0C8` |
| `paper-strong` (eyebrows, step numbers, icons on paper) | `#1F3D34` | `#9CCBB6` (mint chalk) |
| main button on paper | board with chalk text | chalk with ink text |

- Yellow `#F2B705` stays the only loud colour, always with ink text. Chalk stays the text colour on board.
- The paper sections keep their own tone (deeper than the board), so the page still alternates between two tones. By night they use dark glass and the chalk grid instead of the paper grain.
- Changing mode spreads the new colours out in a circle from the switch (View Transitions API). Without support, or with reduced motion, the mode simply changes.

## Right-to-left (Arabic)
- `<html dir="rtl">`: the layout mirrors (navbar, grids, the step order, the chalk path, the form). Arrows that mean "next" or "back" are mirrored too.
- Fonts: **Reem Kufi** for headings and **IBM Plex Sans Arabic** for text. No letter-spacing on Arabic, and more line height. The logo text "Classtra." keeps Stardos Stencil in every language.
- Chalk writing draws Arabic word by word, because Arabic letters join.
- Numbers such as "2 500" use a narrow no-break space so they are not reordered.
- The Arabic texts were written by a non-native author: **have a native speaker review `src/i18n/ar.ts` before going live.**

## Background depth: layered parallax
Every board and chalk section has **3 depth layers**:
1. **Far:** the chalk grid (board) or a subtle paper grain (chalk). It moves at **0.2×** scroll speed.
2. **Middle:** 2–3 big blurred light orbs (yellow `#F2B705` 15–35%, greens `#3F7A66` / `#7FB39E`). They move at **0.5×** scroll speed and drift very slowly (20–30s loops).
3. **Front:** glass content at normal speed.

Implementation: framer-motion `useScroll` + `useTransform`, `transform: translate3d` only, `will-change: transform` on the layers, all layers `pointer-events: none`. **Never animate blur or box-shadow on scroll.**

## Motion: Apple calm
General feel: smooth, slow, physical. Nothing bounces or flashes. Use ease `[0.22, 1, 0.36, 1]` everywhere.

- **Page load: chalk-writing intro.**
  - The H1 fades in, except "enfin sous contrôle.", which is **written in chalk**: an SVG text stroke animation (stroke-dasharray/dashoffset) in yellow, ~1.2s.
  - The stroke gets a subtle chalk-grain texture (SVG `feTurbulence` + `feDisplacementMap`, very light).
  - The yellow fill fades in at the end.
  - The rest of the hero (sub, buttons, chips, cards) fades up 0.2s after.
  - Total time is under 2s, and the user can scroll during it.
- **Pinned hero cards.**
  - The floating-cards scene is `position: sticky` for **~100vh** of scroll (mobile: ~50vh).
  - While pinned, it starts tilted back (`rotateX(18deg) scale(0.9)`, perspective 1200px) and straightens to flat (`rotateX(0) scale(1)`).
  - The 3 card layers separate in depth: back layer 0.6×, middle 0.8×, front 1×, plus a slight sideways spread.
  - Then it un-pins and scrolls away normally.
- **Section reveals:** titles and cards fade up (16px, 0.6s) with a 0.06s stagger, once only.
- **Section-specific motion:** problems strike-through, bento mini-UI, chalk path and pricing number roll, each described in its section.
- **Hover:** glass cards lift 2–3px. Buttons press-scale to 0.98. No other hover effects.
- **No counting-number animations** except the pricing switch.
- **`prefers-reduced-motion: reduce`:** no parallax, no pinning, no chalk drawing (show the final state). Use simple fades only.

## Mobile: same experience, lighter
- Same sections, same effects, but:
  - blur 12px instead of 24px
  - no outer shadows on glass
  - parallax at half strength
  - hero pin ~50vh
  - no cursor glow (touch)
  - bento mini-UI animations still play
- Target: smooth scrolling on a mid-range Android phone (test with Chrome DevTools CPU 4× slowdown).
- Annuel is the default in the pricing switch (already the default everywhere).

## Responsive
- Breakpoints: 375 / 768 / 1280+.
- On mobile everything is single column and CTAs are full width.
- No horizontal scroll at 375px.

## Accessibility
- Use real `<button>`, `<a>`, `<label>`. Focus rings: 3px yellow outline with a 3px offset.
- Text contrast ≥ 4.5:1 everywhere, including on glass.
- `aria-label` on icon-only buttons.

## Done when
- [ ] Matches the spec section by section, with all copy in French as given
- [ ] Only the Tableau tokens are used, yellow stays rare, and yellow buttons have dark text
- [ ] Glass is everywhere, with fallbacks for no-blur and reduced-transparency
- [ ] Chalk intro, pinned hero cards, parallax layers, strike-through, chalk path, roles tabs and pricing switch all work, and all turn off with reduced motion
- [ ] Looks right at 375 / 768 / 1440, and scrolls smoothly on a mid-range phone
- [ ] `pnpm check` and `pnpm build` pass
- [ ] Nothing pushed or deployed: everything stays in this local folder, viewable on localhost
- [ ] Short summary for me: files changed, Magic UI / shadcn components used, placeholders left to fill (footer contacts, legal pages)
