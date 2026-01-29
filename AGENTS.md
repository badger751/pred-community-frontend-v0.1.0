# AGENTS GUIDE
Repository support notes for autonomous agents working in `/mnt/data/pred-community-frontend-recent-changes`.
Follow existing patterns; do not disturb user local changes.

## Quick Setup
- Node/npm: uses npm with `package-lock.json`; prefer npm over pnpm/yarn.
- Install: `npm install` from repo root.
- Env: requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` for Supabase client.
- Start dev server: `npm run dev` (Vite, opens on default port 5173 unless changed).
- Preview production build: `npm run preview` (after build).
- Use local storage for Supabase auth session (see `src/lib/supabaseClient.ts`).

## Commands (build/lint/test)
- `npm run dev`: Vite dev server with HMR; respects `vite.config.ts` polling.
- `npm run build`: type-checks via `tsc -b` then builds with Vite.
- `npm run lint`: ESLint flat config (`eslint.config.js`) over all files; no autofix by default.
- `npm run preview`: serves built assets.
- Single-file lint: `npx eslint src/path/to/File.tsx`.
- Tests: no test runner configured. If you add Vitest, run `npx vitest path/to/file.test.ts --watch=false` for a single test; document new scripts if created.
- CI: none found; keep commands local and reproducible.

## Project Layout
- `src/main.tsx`: React root + Supabase auth bootstrap + toast wiring.
- `src/App.tsx`: Router tree, ProtectedRoute usage, hydration gating.
- `src/components/ProtectedRoute.tsx`: Auth/role guard with verbose logging and smart redirects.
- `src/components/AuthListener.tsx`, `src/components/ErrorBoundary.tsx`, UI shells like `Header.tsx`, `Sidebar.tsx`, `VerificationModal.tsx`.
- `src/pages/*`: feature pages for talent/org onboarding, dashboards, auth flows.
- `src/stores/*.ts`: Zustand stores (`authStore`, onboarding stores) for global state.
- `src/lib/api.ts`: Axios instance with Supabase token injection + 401 handling.
- `src/lib/supabaseClient.ts`: Supabase client configuration and headers.
- Styles: `src/index.css` (global) and feature CSS like `auth.css`.

## Tooling & Config
- TypeScript: strict mode, bundler module resolution, `noEmit` builds; `tsconfig.app.json` targets ES2022 + DOM, JSX `react-jsx`.
- ESLint: flat config extends `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-react-hooks` recommended, `eslint-plugin-react-refresh` Vite preset; global ignores `dist`.
- Module type: `package.json` sets `"type": "module"`; uses ES modules everywhere.
- Vite: React plugin plus Tailwind v4 via `@tailwindcss/vite`; dev server uses file polling (interval 300ms) to help Docker/VMs.
- Tailwind: imported via `src/index.css`; utility classes + some custom CSS coexist.
- No Cursor or Copilot rule files detected.

## Imports & Organization
- Keep import order logical: external packages first, then aliases/locals, then styles.
- Use relative paths from feature folders; no path aliases configured.
- Prefer type-only imports with the `type` modifier (e.g., `import { type ReactNode } from "react"`).
- Stick to consistent quote style within the touched file (both single and double appear; match local choice).
- Avoid default exports for stores/utilities unless existing file uses them; components are default-exported.
- Do not introduce namespace imports unless needed; destructure hooks/components explicitly.

## Types & State
- TypeScript strictness enforced; satisfy `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`.
- Define lightweight interfaces in the closest file when scope is local; share shapes via dedicated store or lib when reused.
- Zustand stores: see `src/stores/authStore.ts` for pattern (typed state, methods defined inline). Keep actions stable and avoid capturing stale state.
- For Supabase data, coerce roles to lowercase strings; preserve existing normalization approach.
- Prefer `ReactNode` for children props; mark optional props with `?` rather than unioning with `undefined`.
- Keep derived booleans (e.g., `isAuthenticated`) in store state in sync with session updates.

## React Patterns
- Functional components only; hooks for lifecycle.
- Use Suspense-like hydration gate: `AppBootstrap` returns `null` until `isHydrated`.
- Protect private routes with `ProtectedRoute`; pass `allowedRoles` when role-specific.
- Console logging is used liberally for auth/role debugging—preserve or extend meaningfully, but avoid noisy logs in tight loops.
- When adding effects, include dependencies; silence only with clear justification.
- Toasts: use `react-hot-toast` already configured in `main.tsx`; prefer toasts for user-facing success/error instead of `alert`.

## Routing & Navigation
- Router lives in `src/App.tsx` using `BrowserRouter` and nested `Routes`.
- Public routes: `/`, `/login`, `/signup`, `/organization-signup`, `/organization-signin`, `/forgot-password`, `/reset-password`, `/home`.
- Protected routes wrap pages via `ProtectedRoute`; redirect logic relies on store state and Supabase roles.
- Onboarding flows have dedicated paths (`/talent-onboarding`, `/organization-onboarding-*`, etc.); preserve case sensitivity used in code.
- When adding routes, wire both to component and any role checks; maintain consistent comment blocks separating public/protected sections.

## Auth Flow (Supabase)
- Supabase client configured in `src/lib/supabaseClient.ts` with auto-refresh + persistent sessions in `localStorage`.
- `main.tsx` bootstraps auth once on load, fetching session then calling `authStore.bootstrapAuth()`; if no session, `clearAuth()` marks hydrated.
- `supabase.auth.onAuthStateChange` listens for sign-in/out/refresh and re-bootstrap.
- `useAuthStore.bootstrapAuth` fetches `profiles.role` to set `user.roles`; errors set `isHydrated` true to prevent blocking UI.
- Logout clears store and `localStorage` `access_token`; 401 responses from API also trigger logout.
- New auth flows should not bypass store; update store then navigate.

## HTTP & API
- Use `src/lib/api.ts` axios instance for backend calls; it auto-attaches Supabase access token and logs out on 401.
- Base URL defaults to `/api`; adjust per-service only when required.
- Prefer async/await with try/catch; surface errors via toasts or inline UI messaging.
- Avoid duplicating auth header logic; reuse interceptor pipeline.
- For Supabase table access, prefer server-side RLS safe patterns; always handle `error` objects.

## Error Handling & Logging
- Wrap async actions in try/catch; log with contextual messages (see `authStore` and login flows).
- User-facing errors: show concise text in UI, optionally toast; avoid leaking raw error strings from Supabase unless user-actionable.
- System logs: keep `console.log`/`console.error` with prefixes like `[ProtectedRoute]` for filterability.
- On loading guards, return early with spinners/placeholders instead of rendering partial content.

## Styling
- Tailwind utilities plus custom CSS (e.g., `auth.css`, `index.css`); keep class naming consistent with existing patterns.
- Avoid introducing new global styles unless necessary; scope styles to components when possible.
- Maintain accessible color contrast; current palette uses grays/blues; align additions accordingly.
- Fonts default to system sans in `index.css`; keep consistent unless design requires change.
- Prefer flex/grid utilities over inline styles; when inline styles are used (e.g., loaders), keep them minimal and readable.

## Forms & UX
- Inputs often managed via `useState`; validate required fields before calling Supabase.
- Disable submit buttons while loading; mirror pattern from `Login` page.
- Preserve navigation decisions based on onboarding completion (see `/talent-dashboard-v2` vs `/TalentOnboarding`).
- Keep copywriting concise and consistent with existing text.

## Data & Roles
- Roles normalized to lowercase strings; treat `organization`/`org`/`organisation` as equivalent in `ProtectedRoute`.
- Onboarding completion flags stored in per-role tables; route decisions depend on `onboarding_completed` value.
- When adding profile fields, ensure both onboarding and dashboard consumers stay in sync.

## Assets & Static Files
- Public assets (logos, icons) referenced via absolute paths (`/Logo.svg`, `/google.png`); keep paths valid for Vite dev/production.
- For new assets, place under `public/` to avoid import overhead.
- Maintain alt text on images for accessibility.

## Testing Status
- No automated tests in repo. Before adding, align with Vite/Vitest defaults and TypeScript setup.
- To run a single test once tests exist: `npx vitest path/to/file.test.ts --watch=false` or `npx vitest testName -t "name"`.
- Until tests are added, rely on lint + manual verification of critical flows (auth, onboarding, role redirects).

## Git & Workflow
- Do not amend or force-push; follow repository commit style once observed from history.
- Keep unrelated changes untouched; avoid resetting user work.
- When adding scripts/config, update this file with new commands or rules.

## How to Extend
- Add new pages under `src/pages` and register in `src/App.tsx` routes.
- Create shared components under `src/components`; export defaults; keep prop types explicit.
- For new global state, create a new store in `src/stores`; follow `create<Store>` with typed state and actions.
- For API additions, extend `src/lib/api.ts` or create per-domain modules that import the shared axios instance.
- Document any new environment variables and ensure Vite prefix `VITE_` for client access.

## Build Checks Before Shipping
- Run `npm run lint` to catch TypeScript/ESLint issues.
- Run `npm run build` to ensure type correctness and successful Vite build.
- Manually sanity-check auth flows (login, Google OAuth, onboarding redirects) when touched.

## Cursor/Copilot Rules
- None detected (`.cursor/rules`, `.cursorrules`, `.github/copilot-instructions.md` absent as of this writing). Update this section if they are added.

## Closing Notes
- Maintain consistency with existing comments and section dividers in files (`/* -------------------------------------------------- */`).
- Keep auth the single source of truth in `useAuthStore`; avoid duplicating session state elsewhere.
- Respect case-sensitive routes already in use (e.g., `/TalentOnboarding`).
- Keep responses and redirects user-friendly; avoid leaving users on blank screens during hydration.
- Update AGENTS.md whenever workflow/tooling changes so future agents stay in sync.
