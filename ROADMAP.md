# Personal Blog — Implementation Roadmap (React 19)

> A baby-step plan to build the Frontend Mentor **Personal blog** challenge with React 19.
> Written for both humans and AI assistants: every step has a stable ID, a goal, the files involved, concrete actions, hints, and a "Done when" checklist.

---

## How to use this document

**For humans**
- Work top to bottom. Finish a step's **Done when** checklist before moving on.
- Tick the box in the [Progress tracker](#progress-tracker) and make the suggested commit at the end of each step.
- **Decision points** (🔀) are choices the roadmap deliberately leaves to you. Pick one, then note it in the [Decisions log](#decisions-log).
- **Open questions** (❓) must be answered from the Figma file or by you before you start the step they block.

**For AI assistants**
- `AGENTS.md` is the authority on behaviour: guide, don't hand over finished code. Present trade-offs at 🔀 points and let the user choose.
- Refer to steps by ID (for example `S5.3`). Stay inside the current step unless the user asks to jump ahead.
- Treat the [Decisions log](#decisions-log) as binding. Don't reopen a decision unless the user does.
- If a step depends on design values (colours, spacing, breakpoints), ask the user for them. Don't invent them.
- Only CLI commands and config file names are spelled out here. Implementation code is the user's to write.

**Step template**

```
### S<phase>.<n> — Title
Goal · Files · Steps · Hints/gotchas · Done when · Commit
```

---

## Decisions log

| # | Topic | Decision | Notes |
|---|-------|----------|-------|
| D1 | Framework | **React 19 + Vite**, client-side SPA | No SSR. `data.json` is bundled at build time. |
| D2 | Language | **TypeScript** (strict) | |
| D3 | Routing | **React Router v7** (package `react-router`) using a **hash router** | Required for GitHub Pages with zero server config. URLs look like `/#/blog/<slug>`. |
| D4 | Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Design tokens live in `@theme`. Dark mode uses a custom variant tied to `data-theme`. |
| D5 | Markdown | **react-markdown + remark-gfm** | Renders React elements, not `innerHTML`, so there's no XSS sink. GFM is needed for tables. Callouts are handled with a custom `blockquote` component. |
| D6 | Tests | **Vitest + React Testing Library** (jsdom) | Tests are added alongside each feature. |
| D7 | Hosting | **GitHub Pages** via GitHub Actions | Repo `personal-blog`, so Vite `base` is `/personal-blog/`. |
| D8 | Repo layout | App lives in **`app/`**. `starter-code/` is a read-only reference | Delete `starter-code/` only at the very end (S10.4). |
| D9 | Newsletter | **React 19 `<form action>` + `useActionState` + `useFormStatus`** with a simulated async submit | No real backend. |
| D10 | Theme | **System preference by default, manual override saved in `localStorage`** | An inline script in `index.html` prevents a flash of the wrong theme. |
| D11 | Package manager | **npm** | Node 22 / npm 11 are installed. |
| D12 | Content source of truth | **`data.json`**, not the starter HTML | The starter HTML lists an article that isn't in the data. The preview image matches `data.json`. |
| D13+ | *(add your own as you resolve 🔀 points)* | | |

---

## Open questions

Answer these before the step in the "Blocks" column. Most can be read off the Figma file.

| ID | Question | Blocks |
|----|----------|--------|
| Q1 | Do you have the Figma file downloaded? You need the exact colour, typography, spacing and radius tokens, plus the breakpoints. | S3.3 |
| Q2 | What appears at the bottom of an article page in the design (newsletter sign-up, "back to blog", nothing)? | S7.4 |
| Q3 | Does the design syntax-highlight code blocks, or just use a monospaced, unhighlighted block? | S7.6 |
| Q4 | Which page(s) use `image-workspace-large.jpg` / `image-workspace-small.jpg`? (Likely About.) | S7.3 |
| Q5 | What are the social profile URLs (X, GitHub, LinkedIn, Frontend Mentor)? Real ones or `#` placeholders? | S7.1 |
| Q6 | Is the background pattern (`pattern-light.svg` / `pattern-dark.svg`) behind the whole page or only the content card? | S3.6 |
| Q7 | Should the header avatar link to Home? | S5.4 |

---

## Progress tracker

- **Phase 0 — Preparation**
  - [x] S0.1 Create a working branch
  - [ ] S0.2 Study the design and build a component inventory
  - [ ] S0.3 Extract design tokens into a notes file
- **Phase 1 — Scaffold**
  - [ ] S1.1 Scaffold the Vite + React + TS app in `app/`
  - [ ] S1.2 Strip the boilerplate
  - [ ] S1.3 Tighten TypeScript and lint settings
  - [ ] S1.4 Configure the base path for GitHub Pages
  - [ ] S1.5 Bring the assets and data across
- **Phase 2 — Testing harness**
  - [ ] S2.1 Install and configure Vitest + RTL
  - [ ] S2.2 Write a first smoke test
- **Phase 3 — Design system (Tailwind v4)**
  - [ ] S3.1 Install Tailwind v4
  - [ ] S3.2 Self-host the fonts
  - [ ] S3.3 Define design tokens in `@theme`
  - [ ] S3.4 Wire up the dark-mode variant
  - [ ] S3.5 Base / reset styles
  - [ ] S3.6 Page shell: background pattern + centred content card
- **Phase 4 — Theme switching**
  - [ ] S4.1 Pre-paint theme script in `index.html`
  - [ ] S4.2 Theme context + hook
  - [ ] S4.3 Theme toggle button
  - [ ] S4.4 Follow system changes when there's no override
  - [ ] S4.5 Theme tests
- **Phase 5 — Routing & layout**
  - [ ] S5.1 Install React Router and choose the router mode
  - [ ] S5.2 Route table + page stubs
  - [ ] S5.3 Root layout (header / main / footer)
  - [ ] S5.4 Header + primary navigation (desktop)
  - [ ] S5.5 Mobile navigation menu
  - [ ] S5.6 Footer
  - [ ] S5.7 Skip link, focus and scroll management
  - [ ] S5.8 Document titles per page
  - [ ] S5.9 Not-found route
  - [ ] S5.10 Routing tests
- **Phase 6 — Data layer**
  - [ ] S6.1 `Article` type
  - [ ] S6.2 Article repository functions
  - [ ] S6.3 Date formatting utility
  - [ ] S6.4 Data-layer tests
- **Phase 7 — Pages**
  - [ ] S7.1 Home page
  - [ ] S7.2 Blog list page
  - [ ] S7.3 About page
  - [ ] S7.4 Newsletter page + article detail shell
  - [ ] S7.5 Markdown rendering
  - [ ] S7.6 Markdown element styling (headings, lists, tables, code)
  - [ ] S7.7 Callouts (Tip / Warning / Information)
  - [ ] S7.8 Unknown slug handling
- **Phase 8 — Newsletter**
  - [ ] S8.1 Email validation utility (+ tests)
  - [ ] S8.2 Static form markup
  - [ ] S8.3 Form action with `useActionState`
  - [ ] S8.4 Pending state with `useFormStatus`
  - [ ] S8.5 Error and success messaging (accessible)
  - [ ] S8.6 Newsletter tests
- **Phase 9 — Polish & quality**
  - [ ] S9.1 Responsive pass (mobile → tablet → desktop)
  - [ ] S9.2 Hover and focus states audit
  - [ ] S9.3 Accessibility audit
  - [ ] S9.4 Performance pass
  - [ ] S9.5 Final code-quality pass
- **Phase 10 — Ship**
  - [ ] S10.1 GitHub Actions workflow for Pages
  - [ ] S10.2 Enable Pages and deploy
  - [ ] S10.3 Verify production
  - [ ] S10.4 Clean up the repo and write the README
  - [ ] S10.5 Submit to Frontend Mentor

---

## Target structure (end state)

Treat this as a guide; refine it as you go.

```
personal-blog/
├─ .github/workflows/deploy.yml     # S10.1
├─ app/
│  ├─ index.html                    # pre-paint theme script (S4.1)
│  ├─ vite.config.ts                # base path, tailwind plugin, vitest config
│  ├─ src/
│  │  ├─ main.tsx
│  │  ├─ router.tsx                 # route table (S5.2)
│  │  ├─ styles/index.css           # tailwind import, @theme, @font-face, base layer
│  │  ├─ assets/{fonts,images}/
│  │  ├─ data/articles.json         # copied from starter-code/data.json
│  │  ├─ features/
│  │  │  ├─ articles/               # types, repository, ArticleList, Markdown, Callout
│  │  │  ├─ theme/                  # ThemeProvider, useTheme, ThemeToggle
│  │  │  └─ newsletter/             # validateEmail, subscribe action, NewsletterForm
│  │  ├─ components/                # layout & shared UI: Header, Nav, Footer, SocialLinks…
│  │  ├─ pages/                     # HomePage, BlogPage, ArticlePage, AboutPage, NewsletterPage, NotFoundPage
│  │  ├─ lib/                       # formatDate, small helpers
│  │  └─ test/setup.ts
│  └─ package.json
├─ ROADMAP.md
└─ README.md
```

🔀 **Decision point (structure):** feature folders (above) vs. type folders (`components/`, `hooks/`, `utils/` only). Feature folders keep related code together as the app grows. Type folders are familiar and fine at this size. Choose one and log it as D13.

---

## Phase 0 — Preparation

### S0.1 — Create a working branch
- **Goal:** keep `master` deployable and practise a PR-style workflow.
- **Steps:**
  1. Create a branch such as `feat/react-app`. You can also use one branch per phase.
  2. Push the repo to GitHub as **`personal-blog`**. It must be public for free Pages hosting.
- **Gotcha:** don't touch the two existing `.gitignore` files. They stop the Figma design files from being uploaded, as the challenge requires.
- **Done when:**
  - [x] Remote exists and the branch is pushed.

### S0.2 — Study the design and build a component inventory
- **Goal:** know every UI piece before writing code.
- **Steps:**
  1. Open the Figma file and `preview.jpg`. Go through all 5 pages (Home, Blog, Article, About, Newsletter) in light and dark, at mobile, tablet and desktop sizes.
  2. List every repeated element: header, nav link (active and inactive), theme toggle, mobile menu, social icon button, article list item (with or without description), section heading with underline accent, text link, input, button, form message (error / success), callout (tip / warning / info), footer.
  3. For each element, write down its states: default, hover, focus-visible, active/current, disabled/pending, error.
- **Done when:**
  - [x] There's a written inventory, for example in a scratch file or a GitHub issue. Don't commit design files.

### S0.3 — Extract design tokens
- **Goal:** one place where every colour, font size, line height, spacing, radius and breakpoint is listed. **Answers Q1.**
- **Steps:**
  1. From the Figma style guide, record the colour palette (neutrals plus accent blue), the type scale (DM Sans sizes and weights, Fira Code for code), the spacing scale, radii, borders and shadows.
  2. Map each design-file colour to a **semantic role** for both themes, for example `surface`, `surface-card`, `text`, `text-muted`, `border`, `accent`. You'll use these in S3.3/S3.4.
  3. Record the breakpoints the design implies.
- **Hint:** semantic roles (`text-muted`) let one class work in both themes. Raw names (`neutral-600`) force you to write `dark:` variants everywhere.
- **Done when:**
  - [x] There's a token table with light and dark values for each role.

---

## Phase 1 — Scaffold

### S1.1 — Scaffold the app
- **Goal:** a running React 19 + TS app in `app/`.
- **Steps (from the repo root):**
  1. `npm create vite@latest app -- --template react-ts`
  2. `cd app` then `npm install`
  3. `npm run dev`, then open the URL it prints.
  4. Check that `package.json` lists `react` / `react-dom` at **^19**.
- **Done when:**
  - [x] The Vite starter page renders and the console has no errors.
- **Commit:** `chore: scaffold vite react-ts app`

### S1.2 — Strip the boilerplate
- **Goal:** a clean slate.
- **Steps:**
  1. Remove the demo counter, `App.css`, the demo logos and the `index.css` contents.
  2. Render a single `<h1>` from `App`.
  3. Set `<html lang="en">` and a real `<title>`, and point the favicon at the starter favicon (S1.5).
- **Done when:**
  - [ ] Only your own placeholder renders. `npm run build` and `npm run lint` both pass.
- **Commit:** `chore: remove vite boilerplate`

### S1.3 — Tighten TypeScript and lint settings
- **Goal:** catch mistakes early.
- **Steps:**
  1. In `tsconfig.app.json`, confirm `strict: true`. Consider adding `noUncheckedIndexedAccess`, which matters later when you look up articles by slug.
  2. Confirm `resolveJsonModule` is enabled so you can import `data.json`.
  3. Look through the generated `eslint.config.js`. 🔀 Optionally add Prettier, plus `eslint-plugin-jsx-a11y` for accessibility linting. Log your choice.
- **Done when:**
  - [ ] `npx tsc -b` and `npm run lint` both pass.

### S1.4 — Configure the base path for GitHub Pages
- **Goal:** asset URLs resolve under `https://<user>.github.io/personal-blog/`.
- **Steps:**
  1. In `vite.config.ts`, set `base` to `/personal-blog/`.
  2. Run `npm run build && npm run preview`, then check the app loads at `/personal-blog/`.
- **Hint:** the hash router (D3) handles routes, but **assets** still need the base path. Anything in `public/` must be referenced through `import.meta.env.BASE_URL`. Anything imported from `src/` is rewritten for you.
- **Done when:**
  - [ ] Preview works under the sub-path.

### S1.5 — Bring the assets and data across
- **Goal:** the app owns its assets. `starter-code/` stays untouched as a reference.
- **Steps:**
  1. Copy `starter-code/data.json` to `app/src/data/articles.json`.
  2. Copy the fonts and images into the app.
  3. 🔀 **Decision point — where do assets live?**
     - `src/assets/` (imported): Vite fingerprints the files for cache busting, a missing file breaks the build (good), and the base path is handled for you.
     - `public/` (referenced by URL): simpler paths, but no hashing, and you must prefix the base path yourself.
     - Common practice is `src/assets` for anything a component or CSS file references, and `public/` only for files that need a fixed URL, like the favicon.
  4. Copy only the font weights you need. The starter has already removed unused ones.
- **Done when:**
  - [ ] The files are in place, the choice is logged, and the favicon shows in the tab.
- **Commit:** `chore: add assets and article data`

---

## Phase 2 — Testing harness

### S2.1 — Install and configure Vitest + RTL
- **Steps:**
  1. `npm i -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event`
  2. Add a `test` block to `vite.config.ts`: `environment: 'jsdom'`, `globals` (your choice), and `setupFiles: './src/test/setup.ts'`. Reference the Vitest config types so TS accepts the block.
  3. In `src/test/setup.ts`, import the jest-dom matchers for Vitest, and run RTL `cleanup` after each test if you don't enable globals.
  4. Add the scripts `"test": "vitest"` and `"test:run": "vitest run"`.
- **Gotcha:** jsdom has no `window.matchMedia`. You'll need a small mock in the setup file before S4.5.
- **Docs:** https://vitest.dev/guide/ · https://testing-library.com/docs/react-testing-library/intro
- **Done when:**
  - [ ] `npm run test:run` runs, even if there are no tests yet.

### S2.2 — First smoke test
- **Goal:** prove the pipeline works.
- **Steps:**
  1. Write one test that renders `App` and finds the heading **by role**.
- **Hint:** query by role and accessible name (`getByRole('heading', { name: … })`). It's the RTL convention, and it tests accessibility for free.
- **Done when:**
  - [ ] There's one green test.
- **Commit:** `test: set up vitest and react testing library`

---

## Phase 3 — Design system (Tailwind v4)

### S3.1 — Install Tailwind v4
- **Steps:**
  1. `npm i -D tailwindcss @tailwindcss/vite`
  2. Add the Tailwind plugin to `vite.config.ts`.
  3. Create `src/styles/index.css` that imports Tailwind, and import it in `main.tsx`.
  4. Prove it works by adding a utility class to the `<h1>`.
- **Gotcha:** v4 is **CSS-first**. There's no `tailwind.config.js` by default. Configuration lives in CSS (`@theme`, `@custom-variant`, `@plugin`), so tutorials written for v3 will mislead you.
- **Docs:** https://tailwindcss.com/docs/installation/using-vite
- **Done when:**
  - [ ] Utility classes apply in dev.

### S3.2 — Self-host the fonts
- **Steps:**
  1. Write `@font-face` rules for DM Sans and Fira Code. 🔀 Use the variable `.ttf` files (one file, every weight) or the static weights. Converting to `.woff2` cuts the size a lot. Log your choice.
  2. Use `font-display: swap`.
  3. Register the families as theme font tokens (S3.3) so `font-sans` and `font-mono` use them.
- **Done when:**
  - [ ] DevTools → Network shows the fonts loading from your bundle, and the text renders in DM Sans.

### S3.3 — Define design tokens in `@theme`
- **Blocked by:** Q1.
- **Steps:**
  1. Add the raw palette from S0.3 as `--color-*` tokens.
  2. Add the semantic roles (`--color-surface`, `--color-text-muted`, …) that point at raw tokens through CSS custom properties. That way S3.4 only has to swap the semantic layer.
  3. Add font sizes and line heights, radii and breakpoints if they differ from Tailwind's defaults. Override or extend as needed.
- **Hint:** if you define semantic tokens as variables that themselves reference other variables, read up on the difference between `@theme` and `@theme inline` in the v4 docs.
- **Docs:** https://tailwindcss.com/docs/theme
- **Done when:**
  - [ ] Classes like `bg-surface` and `text-text-muted` work and match Figma in light mode.

### S3.4 — Dark-mode variant
- **Goal:** `dark:` styles follow a `data-theme="dark"` attribute on `<html>`, not the OS setting alone (D10).
- **Steps:**
  1. Declare a custom `dark` variant scoped to `[data-theme="dark"]`. This replaces v4's default `prefers-color-scheme` behaviour.
  2. Override the semantic colour variables under `[data-theme="dark"]`.
  3. Set `color-scheme` per theme so native controls and scrollbars match.
  4. Test it by setting the attribute by hand in DevTools.
- **Docs:** https://tailwindcss.com/docs/dark-mode
- **Done when:**
  - [ ] Flipping the attribute in DevTools switches the whole palette.

### S3.5 — Base / reset styles
- **Steps:**
  1. Put body font, colours and line height in a base layer. Tailwind's Preflight already resets most things.
  2. Add a global `:focus-visible` outline that matches the design. This is the baseline for S9.2.
  3. Respect `prefers-reduced-motion` for any transitions you add.
- **Done when:**
  - [ ] Body text matches Figma in both themes.

### S3.6 — Page shell: background pattern + centred content card
- **Blocked by:** Q6.
- **Steps:**
  1. Build the outer background with `pattern-light.svg` / `pattern-dark.svg`, swapping them per theme.
  2. Build the centred, bordered content column with a max width and the side borders shown in the preview.
- **Hint:** decide whether the pattern image is a CSS background (decorative, which is right here) or an `<img>`. Decorative images shouldn't reach the accessibility tree.
- **Done when:**
  - [ ] The empty shell matches the design at all three breakpoints in both themes.
- **Commit:** `feat: tailwind design system, fonts and page shell`

---

## Phase 4 — Theme switching

### S4.1 — Pre-paint theme script
- **Goal:** no flash of the wrong theme (FOUC) on load.
- **Steps:**
  1. In `app/index.html` `<head>`, add a tiny **inline, blocking** script. It reads the saved preference from `localStorage`, falls back to `matchMedia('(prefers-color-scheme: dark)')`, and sets `data-theme` on `<html>`.
  2. Wrap the storage access in `try/catch`. Private mode or blocked storage can throw.
- **Why:** React mounts after the CSS has painted. Setting the theme inside a React effect would show light mode for a frame.
- **Done when:**
  - [ ] With dark saved, a hard reload never flashes light. Test with DevTools CPU throttling.

### S4.2 — Theme context + hook
- **Steps:**
  1. Model the state: 🔀 two values (`'light' | 'dark'`, where saving any choice counts as an override), or three (`'light' | 'dark' | 'system'`). Two values match the single toggle button in the design. Log your choice.
  2. Create a context plus a provider whose initial state is read from the `data-theme` attribute S4.1 already set. Don't re-derive it.
  3. On change, update the attribute and `localStorage` together.
  4. Expose a `useTheme()` hook.
- **React 19 notes:**
  - You can render `<ThemeContext value={…}>` directly. `.Provider` is no longer needed.
  - `use(ThemeContext)` works as an alternative to `useContext`.
- **Done when:**
  - [ ] Calling the toggle from the console or a temporary button switches the theme and survives a reload.

### S4.3 — Theme toggle button
- **Steps:**
  1. Make a `<button type="button">` that shows the moon icon in light mode and the sun icon in dark mode, like the preview.
  2. Give it an accessible name. 🔀 Either use a static label with `aria-pressed`, or a dynamic label ("Switch to dark theme"). Discuss the trade-off and pick one.
  3. Hide the SVG icons from assistive tech.
- **Done when:**
  - [ ] It works by mouse and keyboard (Enter/Space), shows a visible focus ring, and a screen reader announces a meaningful name.

### S4.4 — Follow system changes when there's no override
- **Steps:**
  1. If nothing is saved, subscribe to `matchMedia` change events and follow the OS.
  2. Clean up the listener on unmount.
- **Done when:**
  - [ ] Switching the OS theme updates the page live until the user clicks the toggle.

### S4.5 — Theme tests
- **Cases to cover:** default comes from the system preference · the toggle flips `data-theme` · the choice persists to storage · a saved preference wins over the system one.
- **Done when:**
  - [ ] The tests are green, with `matchMedia` and `localStorage` handled in setup.
- **Commit:** `feat: theme switching with system default and persistence`

---

## Phase 5 — Routing & layout

### S5.1 — Install React Router and choose the router mode
- **Steps:**
  1. `npm i react-router`. In v7, everything imports from `react-router`. Don't install `react-router-dom`.
  2. 🔀 **Decision point — declarative vs data mode** (both are hash-based, per D3):
     - **Declarative** (`<HashRouter>` + `<Routes>`): fewest concepts.
     - **Data mode** (`createHashRouter` + `<RouterProvider>`): adds `<ScrollRestoration />`, `errorElement`, and optional loaders (for example, resolving an article by slug before render).
     - Data mode gives you scroll restoration for free, which you'll want in S5.7.
- **Docs:** https://reactrouter.com/start/modes
- **Done when:**
  - [ ] The mode is chosen and logged.

### S5.2 — Route table + page stubs
- **Routes:**

  | Path | Page |
  |------|------|
  | `/` | Home |
  | `/blog` | Blog list |
  | `/blog/:slug` | Article |
  | `/about` | About |
  | `/newsletter` | Newsletter |
  | `*` | Not found |

- **Steps:**
  1. Create a stub component per page (just an `<h1>`).
  2. Nest all routes under one layout route (S5.3).
- **Done when:**
  - [ ] Typing `/#/about` and the other paths in the URL bar shows each stub.

### S5.3 — Root layout
- **Steps:**
  1. The layout renders the shell from S3.6, then `<header>`, `<main id="main-content">` containing `<Outlet />`, then `<footer>`.
  2. Keep landmarks unique: one `<main>`, one primary `<nav>` with an accessible name if there's more than one nav.
- **Done when:**
  - [ ] The stubs render inside the shell.

### S5.4 — Header + primary navigation (desktop)
- **Blocked by:** Q7.
- **Steps:**
  1. Header contents: the avatar (`image-avatar.jpg`, with alt text that fits whether or not it's a link), the nav links Home / Blog / About / Newsletter, and the theme toggle.
  2. Use `NavLink`. It sets `aria-current="page"` automatically on the active link. Style the active state (the underline in the preview) by targeting that attribute, or with NavLink's `className` callback.
  3. Edge case: **Blog** should stay active on `/blog/:slug`. Check how NavLink's matching works (the `end` prop) for both `/` and `/blog`.
- **Done when:**
  - [ ] The active link is styled and announced, and Tab order is logical.

### S5.5 — Mobile navigation menu
- **Steps:**
  1. Below the design's breakpoint, hide the inline links and show the menu button (`icon-menu.svg` / `icon-menu-close.svg`).
  2. Use the **disclosure pattern**: a button with `aria-expanded` and `aria-controls`.
  3. Close it on Escape (and return focus to the button), on choosing a link, and on route change.
  4. 🔀 Should clicking outside close it? Should the panel be absolutely positioned (overlay) or push content down? Check Figma and decide.
- **Docs:** https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- **Done when:**
  - [ ] The menu can be fully operated by keyboard and the screen reader announces expanded/collapsed.

### S5.6 — Footer
- **Steps:**
  1. Add "Made with ❤️ and ☕", wrapping the emoji so screen readers read them sensibly. 🔀 Choose between `role="img"` + `aria-label`, or visually hidden text.
  2. Add the social icon links: give each an accessible name, and open them in the same tab or a new one (if new, tell the user).
  3. Build a **reusable `SocialLinks` component**, because the same set appears on Home (S7.1).
- **Done when:**
  - [ ] The footer matches the design and the links are named.

### S5.7 — Skip link, focus and scroll management
- **Steps:**
  1. **Skip link:** a "Skip to content" link that's visually hidden until focused.
     - ⚠️ **Hash-router gotcha:** a plain `href="#main-content"` changes the *route* (`/#main-content`). Make it move focus to `<main>` in a click handler (`main` needs `tabIndex={-1}`), or render it as a button.
  2. **Scroll:** going from one page to another should start at the top. That's `<ScrollRestoration />` in data mode, or a small effect on `location.pathname` in declarative mode.
  3. **Focus on route change:** 🔀 move focus to the new page's `<h1>` or `<main>`, or leave it on the link. Read about the trade-offs (screen-reader announcement versus keeping the user's place) and pick one.
- **Done when:**
  - [ ] Keyboard users can skip the nav on every page, and navigation starts at the top.

### S5.8 — Document titles per page
- **Steps:**
  1. **React 19:** render `<title>` (and `<meta name="description">`) directly inside each page component. React hoists them into `<head>`, so you don't need Helmet.
  2. Use a consistent pattern, for example `About | Paulina's blog`.
- **Done when:**
  - [ ] The tab title changes per route, including the article title on article pages.

### S5.9 — Not-found route
- **Steps:**
  1. A friendly 404 page with a link home, used by the `*` route and later by unknown slugs (S7.8).
- **Done when:**
  - [ ] `/#/does-not-exist` shows it.

### S5.10 — Routing tests
- **Cases to cover:** each route renders its heading · the active nav link has `aria-current="page"` · the mobile menu toggles `aria-expanded` and closes on Escape · an unknown route shows the 404.
- **Hint:** render the routes inside a `MemoryRouter` (or `createMemoryRouter`) in tests, so the hash URL doesn't matter there.
- **Commit:** `feat: routing, layout, navigation and footer`

---

## Phase 6 — Data layer

### S6.1 — `Article` type
- **Steps:**
  1. Write a type for each item in `articles.json`: `title`, `slug`, `publishedAt` (ISO string), `description`, `content` (Markdown).
  2. Decide whether to trust the JSON import's inferred type or assert/validate it against your type. 🔀 Options include a plain type assertion, a hand-written type guard, or a schema library (Zod/Valibot). The data is static and bundled, so think about how much safety is worth paying for. Log your choice.
- **Done when:**
  - [ ] The articles are typed everywhere they're used.

### S6.2 — Article repository functions
- **Goal:** components never touch the raw JSON. They call a small API.
- **Functions:**
  - `getAllArticles()`: sorted newest first. Sort explicitly rather than trusting the file order.
  - `getLatestArticles(n)`: used by Home, with `n = 5`.
  - `getArticleBySlug(slug)`: returns `Article | undefined`.
- **Hint:** this seam lets you swap to `fetch()` later without touching any UI.
- **Done when:**
  - [ ] The functions are exported from `features/articles`.

### S6.3 — Date formatting utility
- **Steps:**
  1. Format dates as "February 18, 2025" with `Intl.DateTimeFormat('en-US', …)`.
  2. Wrap them in `<time dateTime={publishedAt}>` wherever they're shown (semantic HTML).
- **⚠️ Gotcha:** `publishedAt` is **midnight UTC**. Formatted in a timezone west of UTC (for example the Americas), it shows the *previous day*. Set `timeZone: 'UTC'` in the formatter.
- **Done when:**
  - [ ] The date renders correctly no matter what timezone your machine uses.

### S6.4 — Data-layer tests
- **Cases to cover:** sort order · `getLatestArticles(5)` returns 5 in the right order · an unknown slug returns `undefined` · `formatDate` across the UTC-midnight edge case.
- **Commit:** `feat: typed article repository and date formatting`

---

## Phase 7 — Pages

### S7.1 — Home page
- **Blocked by:** Q5.
- **Steps:**
  1. Add the intro heading "Hi, I'm Paulina 👋" with the accent underline from the design, followed by the two paragraphs.
  2. Add `<SocialLinks />` from S5.6.
  3. Add a divider and the "Latest Articles" section heading (with its accent).
  4. Build a reusable **`ArticleList` / `ArticleListItem`** component: the title links to `/blog/:slug`, followed by the date. 🔀 Make the description optional via a prop (Blog shows it, Home doesn't), or build two components. Log your choice.
  5. Add a "View all articles" link to `/blog`.
- **Hint:** mark the article list up as a list (`<ul>`/`<li>`), and put a heading inside each item if the design treats titles as headings. Think about what a screen-reader user hears when jumping between headings.
- **Done when:**
  - [ ] The page matches the preview in both themes at all breakpoints.

### S7.2 — Blog list page
- **Steps:**
  1. Add the "My Articles" heading and the intro text.
  2. Reuse `ArticleList` with descriptions, showing all 8 articles.
- **Done when:**
  - [ ] All 8 render and every title navigates to its article.

### S7.3 — About page
- **Blocked by:** Q4.
- **Steps:**
  1. Port the content from `starter-code/about.html`: the headings, the paragraphs, and the lists of books and hobbies.
  2. If the workspace image belongs here, use `<picture>` with the small and large sources (or `srcset` + `sizes`), real `width`/`height` attributes to avoid layout shift, and meaningful alt text.
- **Done when:**
  - [ ] The content is complete and the image swaps correctly at the breakpoint.

### S7.4 — Newsletter page + article detail shell
- **Blocked by:** Q2.
- **Steps:**
  1. **Newsletter page:** port the copy from `starter-code/newsletter.html` and leave a placeholder where the form goes (Phase 8).
  2. **Article page:** read `slug` with `useParams` and call `getArticleBySlug`. Render it inside an `<article>`: the `<h1>` title, `<time>`, and a placeholder for the body.
  3. Add whatever the design shows at the end of an article (Q2).
- **Done when:**
  - [ ] Each article page shows the right title and date.

### S7.5 — Markdown rendering
- **Steps:**
  1. `npm i react-markdown remark-gfm`
  2. Wrap them in a `Markdown` component inside `features/articles`, so the rest of the app doesn't know which library you use.
  3. Enable `remark-gfm`. Several articles contain **tables**, which plain CommonMark doesn't support.
- **Security note:** react-markdown ignores raw HTML by default. Don't add `rehype-raw` unless you also sanitise, even though this is your own content. Know why.
- **Heading levels:** the article bodies use `##` and `###`, and the page's `<h1>` is the title, so the outline is already correct. Check this.
- **Docs:** https://github.com/remarkjs/react-markdown
- **Done when:**
  - [ ] All 8 articles render: headings, lists, bold/italic, horizontal rules (`---`), tables, code blocks and blockquotes.

### S7.6 — Markdown element styling
- **Blocked by:** Q3.
- **Steps:**
  1. 🔀 **Decision point — how to style the generated HTML:**
     - **`@tailwindcss/typography`** (`prose` classes, then customise to the tokens): fast, but you'll fight its defaults to match Figma.
     - **`components` prop mapping** (style each element: `h2`, `p`, `ul`, `table`, `code`…): full control, and it fits Tailwind well.
     - **Scoped CSS** for a wrapper class: plain CSS targeting the descendants.
  2. Code blocks: Fira Code, horizontal scroll inside the block (not the page), and distinct inline-code styling. Optional highlighting if Q3 says yes. Options are `rehype-highlight` or `shiki`. Watch the bundle size.
  3. Tables: wrap them in an `overflow-x: auto` container so they don't break the mobile layout.
- **Done when:**
  - [ ] All 8 articles match the design at 375 px and at desktop width, in both themes.

### S7.7 — Callouts (Tip / Warning / Information)
- **Context:** the data writes callouts as blockquotes whose first line is bold, like `> **Tip: …**`, `> **Warning: …**`, `> **Information: …**`. Icons are in `assets/images/icon-{tip,warning,info}.svg`.
- **Steps:**
  1. Override the `blockquote` renderer and detect the callout type from the leading bold text.
  2. 🔀 Detection approach: inspect the React children (fragile, but needs no dependency), or write a small **remark/rehype plugin** that tags the node with a `data-callout` attribute in the AST (more robust, and a good learning exercise). Log your choice.
  3. Render an icon (decorative) plus the title plus the body. Fall back to a plain blockquote for anything unrecognised.
  4. 🔀 Should the type be conveyed to screen readers beyond the visible text "Tip:"? Most likely the visible text is enough. Justify your choice.
- **Done when:**
  - [ ] All 5 callouts in the dataset (3 Tip, 1 Warning, 1 Information) render with the right icon and colour, and a plain blockquote still renders normally.

### S7.8 — Unknown slug handling
- **Steps:**
  1. If `getArticleBySlug` returns `undefined`, render the 404 page (or a data-mode loader can `throw` a 404 response caught by `errorElement`).
- **Done when:**
  - [ ] `/#/blog/nope` shows not-found, not a crash.
- **Tests (pages):** Home shows 5 articles · Blog shows 8 · an article page renders its title, a table and a callout · an unknown slug shows 404.
- **Commit:** `feat: home, blog, about and article pages with markdown`

---

## Phase 8 — Newsletter (React 19 actions)

### S8.1 — Email validation utility
- **Steps:**
  1. Write a pure function `validateEmail(value)` that returns either `null` or an error key: `'empty'` or `'invalid'`. Keeping it pure makes it trivial to test.
  2. 🔀 Choose a validation strategy and document it:
     - A pragmatic regex that requires something@something.tld. It's the common choice, but don't chase RFC 5322 completeness.
     - Mirror the browser's `type="email"` rules.
  3. Trim whitespace before validating.
- **Tests first** (TDD fits here): empty · whitespace only · missing `@` · missing domain · missing TLD · valid · valid with surrounding spaces.
- **Done when:**
  - [ ] The unit tests are green.

### S8.2 — Static form markup
- **Steps:**
  1. Add a visible `<label>` "Email Address", an `<input type="email" name="email" autoComplete="email">`, a submit button "Stay updated", and the helper text "Unsubscribe anytime…".
  2. Add `noValidate` on the `<form>` so *your* error messages show instead of the browser's bubbles. The challenge requires custom messages.
- **Done when:**
  - [ ] The form matches the design (default, hover and focus states).

### S8.3 — Form action with `useActionState`
- **Steps:**
  1. Write an async `subscribe(prevState, formData)` action: read the email, validate it, `await` a simulated delay (around 1 s) on success, then return the new state.
  2. Model the state as a **discriminated union**, for example `idle | error(message) | success(email)`. TS then makes you handle every case.
  3. Wire it up: `const [state, formAction] = useActionState(subscribe, initial)` and `<form action={formAction}>`.
- **⚠️ React 19 gotcha:** after an action completes, React **resets uncontrolled form fields**. On a validation error, the user would lose what they typed. Handle it on purpose: return the submitted value in the error state and feed it back as `defaultValue`, or make the input controlled. 🔀 Choose one and log the trade-off.
- **Docs:** https://react.dev/reference/react/useActionState · https://react.dev/reference/react-dom/components/form
- **Done when:**
  - [ ] Empty and invalid inputs show the right error, and a valid email reaches success after the delay.

### S8.4 — Pending state with `useFormStatus`
- **Steps:**
  1. Move the submit button into its own component that calls `useFormStatus()`. It **must be a child of the `<form>`** to work.
  2. While pending: disable it (or use `aria-disabled`, see the 🔀 below), change the label ("Subscribing…"), and stop double submits.
- 🔀 `disabled` removes the button from the tab order and can drop focus. `aria-disabled` keeps it focusable. Read up and decide.
- **Done when:**
  - [ ] The pending state is visible and a double click doesn't trigger two submits.

### S8.5 — Error and success messaging (accessible)
- **Steps:**
  1. **Error:** use the `icon-error.svg` styling from the design, set `aria-invalid="true"` on the input, and point `aria-describedby` at the error element's id. Move focus back to the input after an error.
  2. **Success:** use `icon-success.svg` with a message such as "You're subscribed! …" (check Figma). 🔀 Should the success message replace the form or appear beneath it?
  3. Announce status changes: put the message in a live region (`role="status"` for success, and decide between `role="alert"` and `aria-live` for errors). The live-region container must exist in the DOM *before* the message text is inserted.
  4. Clear the error once the user fixes the input and submits again.
- **Docs:** https://www.w3.org/WAI/tutorials/forms/notifications/
- **Done when:**
  - [ ] A screen reader (NVDA on Windows, or Narrator) announces both the error and the success.

### S8.6 — Newsletter tests
- **Cases to cover:** submitting empty shows the "empty" error · an invalid address shows the format error · an error sets `aria-invalid` and `aria-describedby` · a valid address shows the pending state, then success.
- **Hint:** make the simulated delay injectable, or use fake timers, so tests don't really wait a second. Wrap with `await` and `findBy…` queries for async UI.
- **Commit:** `feat: newsletter form with react 19 actions and validation`

---

## Phase 9 — Polish & quality

### S9.1 — Responsive pass
- Check every page at about 375 px, 768 px and 1440 px, plus odd widths in between and at 200 % zoom.
- Check that long article titles wrap and that code and tables scroll inside their own containers.
- Make sure nothing scrolls horizontally at the page level.

### S9.2 — Hover and focus states audit
- Work through the interactive elements from your S0.2 inventory: nav links, the toggle, the menu button, social icons, article titles, "View all articles", the input and the button.
- Each one needs hover **and** `:focus-visible` states that match the design and have enough contrast in both themes.

### S9.3 — Accessibility audit
- **Keyboard only:** complete every user story without a mouse (README list).
- **Screen reader:** NVDA or Narrator on the Home → Article → Newsletter flow.
- **Automated:** axe DevTools or Lighthouse on every route in both themes. Fix any contrast issues.
- **Check:** landmarks, heading order, link names, `lang`, and image alt text.
- **Reference:** https://www.w3.org/WAI/WCAG22/quickref/ (target AA)

### S9.4 — Performance pass
- Run `npm run build` and check the bundle size. Is react-markdown worth lazy-loading for the article route with `React.lazy`? 🔀 Measure first, then decide.
- Images: correct sizes, `loading="lazy"` below the fold, explicit dimensions.
- Fonts: consider `<link rel="preload">` for the main DM Sans file.
- Run Lighthouse in production preview mode.
- 🔀 Optional: try **React Compiler** (automatic memoisation in React 19). It's a learning opportunity, not a requirement here.

### S9.5 — Final code-quality pass
- Remove dead code and stray `console.log`s.
- Make names consistent and every export intentional.
- `npm run lint`, `npx tsc -b` and `npm run test:run` must all pass.
- **Commit:** `chore: polish, a11y and performance fixes`

---

## Phase 10 — Ship

### S10.1 — GitHub Actions workflow for Pages
- **File:** `.github/workflows/deploy.yml` at the **repo root**. GitHub only reads workflows from there.
- **Steps the workflow needs:**
  1. Trigger on push to `master` (plus manual `workflow_dispatch`).
  2. Permissions: `contents: read`, `pages: write`, `id-token: write`.
  3. Checkout, then set up Node 22 with an npm cache keyed on `app/package-lock.json`.
  4. In `app/`, run `npm ci`, then `npm run test:run`, then `npm run build`. Tests gate the deploy.
  5. Upload `app/dist` with `actions/upload-pages-artifact`, then deploy with `actions/deploy-pages`. Check each action's current major version.
- **Docs:** https://vite.dev/guide/static-deploy#github-pages · https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

### S10.2 — Enable Pages and deploy
- **Steps:**
  1. In the repo, go to **Settings → Pages → Source: GitHub Actions**.
  2. Merge your branch to `master` and watch the Actions run.

### S10.3 — Verify production
- Visit `https://<user>.github.io/personal-blog/`.
- Load a deep link like `/#/blog/<slug>` directly in a fresh tab.
- Check the theme persists across reloads, the fonts and images load (base path), the favicon shows, and there are no console errors.
- Run Lighthouse on the live URL.

### S10.4 — Clean up the repo and write the README
- **Steps:**
  1. Delete `starter-code/` once nothing references it. **Keep the root `.gitignore`**, and copy its design-file rules into `app/` if you want them in both places.
  2. Replace `README.md` using `README-template.md`: describe the stack and the decisions (link to this roadmap's Decisions log), what you learned, and give the live and repo URLs.
  3. Add a screenshot of your solution, not the provided `preview.jpg`.

### S10.5 — Submit to Frontend Mentor
- Submit the repo and live URLs.
- Ask specific feedback questions, for example about the callout plugin approach, `useActionState` reset handling, or focus management on route change.
- Share in the community **#finished-projects** channel: https://www.frontendmentor.io/community

---

## Appendix A — React 19 features this project uses

| Feature | Where |
|---------|-------|
| `<Context value>` without `.Provider`, `use(Context)` | S4.2 |
| Document metadata (`<title>`, `<meta>`) rendered in components | S5.8 |
| `<form action={fn}>` | S8.3 |
| `useActionState` | S8.3 |
| `useFormStatus` | S8.4 |
| Automatic form reset after actions (and handling it) | S8.3 |
| `ref` as a regular prop, no `forwardRef` (e.g. focusing `<main>` or the input) | S5.7, S8.5 |
| *(optional)* React Compiler | S9.4 |

## Appendix B — Requirements traceability (README user stories → steps)

| User story | Steps |
|------------|-------|
| Navigate to all pages by clicking or with the keyboard | S5.2–S5.7, S9.3 |
| Read all articles | S6.2, S7.2, S7.4–S7.8 |
| Select their colour theme | S4.1–S4.5 |
| Subscribe to the newsletter | S8.2–S8.4 |
| Error on empty or badly formatted email | S8.1, S8.3, S8.5 |
| Success message on valid submit | S8.3, S8.5 |
| Optimal layout per screen size | S3.6, S5.5, S7.6, S9.1 |
| Hover and focus states on all interactive elements | S3.5, S9.2 |

## Appendix C — Learning resources

- React 19 docs: https://react.dev/blog/2024/12/05/react-19
- React Router v7: https://reactrouter.com/home
- Tailwind CSS v4: https://tailwindcss.com/docs
- WAI-ARIA Authoring Practices (disclosure, live regions): https://www.w3.org/WAI/ARIA/apg/
- web.dev on dark mode and FOUC: https://web.dev/articles/prefers-color-scheme
- MDN on `Intl.DateTimeFormat`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- Code review from the community: https://www.frontendmentor.io/community
