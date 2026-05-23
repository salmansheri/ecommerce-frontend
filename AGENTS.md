# AGENTS.md

## Stack

React 19 + TypeScript + Vite + TanStack Start (SSR) / Router + Tailwind CSS v4 + shadcn/ui (new-york, Zinc) + Netlify

Package manager: `pnpm`. Path alias: `@/*` → `src/*`.

## Commands

- Dev (port 3000): `pnpm dev`
- Build: `pnpm build`
- Preview: `pnpm preview`
- Test (Vitest): `pnpm test`
- Lint: `pnpm lint` / Format: `pnpm format` / Both: `pnpm check`
- OpenAPI codegen: `pnpm openapi-ts`

## Quality Gate Order

1. `pnpm check`
2. `pnpm test`
3. `pnpm build`

## State Management

Both stores use **zustand** (NOT `@tanstack/store`):
- Cart: `src/lib/cart-store.ts` (persisted to localStorage key `"cart-store"`)
- Auth: `src/lib/auth-store.ts` (persisted to localStorage key `"auth-store"`)

Header rendered in `src/routes/__root.tsx` shell (outside route transitions).

## OpenAPI Codegen

- Spec: `hey-api/openapi.json`
- Config: `openapi-ts.config.ts` — generates TypeScript client + TanStack Query hooks into `src/generated/`
- Regenerate: `pnpm openapi-ts`
- Client config (base URL, credentials): `src/hey-api.ts`
- Base URL default: `http://localhost:8080/api/v1` (override via `VITE_BACKEND_API_URL`)
- Usage pattern: import `*Options` for queries / `*Mutation()` for mutations from `@/generated/@tanstack/react-query.gen.ts`

## Generated / Build Artifacts

| Path | Source | Do Not Edit |
|---|---|---|
| `src/routeTree.gen.ts` | TanStack Router | ✓ |
| `src/generated/*` | OpenAPI codegen | ✓ |
| `.tanstack/`, `.vinxi/` | Build cache | ✓ |
| `src/styles.css` | Tailwind | ✓ (ignored by Biome) |

## Environment

- `VITE_BACKEND_API_URL` — backend API base URL (default: `http://localhost:8080/api/v1`)
- Auth store persisted to `localStorage` key `"auth-store"`

## Deployment

Netlify (`netlify.toml`): build outputs to `dist/client`.

## Component & Hook Conventions

- shadcn components in `src/components/ui/` — add new ones with `pnpm dlx shadcn@latest add <component>`
- `cn()` utility: `src/lib/utils.ts` (clsx + tailwind-merge)
- TanStack Query hooks in `src/hooks/*/` — wrap generated `*Options` / `*Mutation()` calls
- UI uses `lucide-react` icons and `sonner` for toasts
- Currency: INR (`src/lib/utils.ts` `formatNumberToCurrency`)

## Demo Files

Files in `src/routes/demo/` and `src/data/` are starter template scaffolding — safe to delete.

## Biome

- Indent: tabs, Quotes: double
- Runs on `**/src/**/*`, `.vscode/`, `index.html`, `vite.config.ts`
- Ignores `routeTree.gen.ts`, `styles.css`
- Auto-import organization on save (`.vscode/settings.json`)
