# CLAUDE.md — mi-website-personal

<proyecto>
Sitio web personal **alexendros.me** de Alejandro Domingo Agustí. Repo público
(`github.com/Alexendros/mi-website-personal`), separado del monorepo el 2026-04-11.

Propósito ACTUAL (tras reconversión 2026-06): espacio personal **libre de dinero**
— ideológico/filosófico/nacional/social. Sin venta, sin afiliados, sin analytics,
sin tracking, sin cookies de captación. La arquitectura (static export, cero JS
innecesario) ES el argumento del manifiesto.

Diferencia con **website-alexendrosdev** (sibling en `personal/`, dominio
`alexendros.dev`): el `.dev` es el espacio COMERCIAL (productos, servicios,
dashboards, Stripe/Supabase). El `.me` deliberadamente NO vende y redirige lo
comercial al `.dev`. No mezclar copy ni lógica entre ambos.

(Nota histórica: el `.me` nació como "campo de pruebas de branding/landing
comercial"; ese rol quedó OBSOLETO con la reconversión antidinero.)
</proyecto>

<stack>
- **Framework**: Next.js 16 (App Router) · React 19 · TypeScript strict (`noUncheckedIndexedAccess`).
  OJO: `README.md` y `ARCHITECTURE.md` aún dicen "Next.js 15" (stale); `package.json` manda → **next ^16.2.9**.
- **UI**: Tailwind CSS v4 (CSS-first) · shadcn/ui inline en `components/ui/` (6: badge, button, card, popover, separator, sheet) · `radix-ui` · iconos `lucide-react` + `simple-icons`.
- **Design tokens**: Vergina Imperial v0.2.2 · oklch dark-first · `app/styles/*.css` (`globals.css` = índice de imports).
- **Fonts**: Geist Sans + Mono self-hosted (`public/fonts/`) · Inter (next/font/google) para hero.
- **Build**: `output: "export"` → HTML estático en `out/`. SIN backend, API routes, middleware, auth ni DB.
- **Deploy**: Vercel (region mad1, static export/CDN). DNS en Hostinger. Security headers en `vercel.json` (CSP estricta, HSTS preload, X-Frame-Options DENY).
- **Calidad**: ESLint flat + Prettier 3 + depcheck + ts-prune. CI GitHub Actions (typecheck+lint+build). Dependabot.
- **Tests**: Playwright (`tests/a11y.spec.ts`, `landing.spec.ts`, `responsive.spec.ts`) con `@axe-core/playwright` (WCAG 2.1 AA). Lighthouse CI (`lighthouserc.cjs`).
- **Tooling**: pnpm@10.33.0 · Node >=24.

### Comandos reales (package.json)
```bash
pnpm dev            # next dev --turbopack (localhost:3000)
pnpm build          # next build → out/ (static export)
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint .
pnpm format         # prettier --write
pnpm format:check
pnpm deadcode:deps  # depcheck
pnpm deadcode:exports # ts-prune
pnpm test:e2e       # playwright test
pnpm test:e2e:ui    # playwright test --ui
```
</stack>

<estado>
- **Desarrollo ACTIVO**. 69 commits (2026-04-11 → último **2026-06-15**). Working tree limpio, `main` al día con origin.
- **En producción** en `alexendros.me` (apex + www vía Vercel, preview por PR).
- **Reconversión antidinero en curso** (desde 2026-06-07): purga comercial ejecutada (Fase 1+2 hechas: afiliados/venta/sello "pro" fuera, licencia CC BY-NC-SA 4.0, footer con sello €Ç anticomercial). Plan en `docs/reconversion-me.md` y `docs/adr/0002-reconversion-me-antidinero.md`.
- **Funcional (inferido, sin ejecutar)**: SÍ. Evidencia: pnpm-lock.yaml presente, build static export configurado, CI verde histórico, Lighthouse 99/96/100/100 (TASKS.md 2026-04-13), Playwright a11y 12/12 (2026-06-13), sitio reportado live con HTTP/2 200. Madurez alta para su tamaño (one-pager).
</estado>

<arquitectura>
One-pager + páginas legales. Entrypoints: `app/layout.tsx` (metadata, fonts, JSON-LD, nav, footer) y `app/page.tsx` (hero + biografía + misiones + StackMarquee + experiencias).

```
app/
  globals.css            (importa app/styles/*.css)
  styles/                (tokens, base, typography, components, utilities, motion, breakpoints, print)
  layout.tsx             (raíz: metadata, fonts, JSON-LD, nav, footer)
  page.tsx               (ONE-PAGER)
  error.tsx · not-found.tsx · icon.svg · apple-icon.tsx
  legal/                 (layout + aviso-legal[LSSI Art.10] · privacidad[RGPD] · cookies[AEPD])
components/
  nav.tsx · footer.tsx · atmosphere.tsx · particle-bg.tsx · stack-marquee.tsx · contact-fab.tsx
  ui/                    (shadcn inline)
lib/
  utils.ts (cn) · site.ts (siteConfig) · contact.ts · structured-data.ts (JSON-LD)
public/                  (fonts/ · og/ · robots.txt · sitemap.xml)
docs/                    (adr/, CHANGELOG.md, reconversion-me.md, auditorías)
tests/                   (Playwright)
```

JSON-LD Person + WebSite en `lib/structured-data.ts` (consumido por layout). Sitemap/robots estáticos en `public/`.
</arquitectura>

<pendiente>
- **`/ideas` (MDX) + `content/ideas/`**: el "departamento de contenido" es el siguiente gran paso de la reconversión. NO existe aún: `content/` mencionado en README ("en construcción") y TASKS.md §8, pero **no hay directorio `content/` en el árbol** (verificado).
- Biografía/autobiografía marcadas "En construcción" en `app/page.tsx` (líneas 17, 109).
- Pieza divulgativa de cookies (capa manifiesto + capa formal) — pendiente (TASKS.md §8).
- Menores: proteger `main` en GitHub; enviar sitemap a Search Console + IndexNow; preview OG; Calendly embed en contacto; analytics privacy-first con consentimiento (NO activar sin consentimiento).
- OBSOLETO: rutas `/about`, `/projects`, `/uses`, `/contact`, `/herramientas` de TASKS §4-§5 NO existen (la app es one-pager); ignorar esos items.
- Docs desincronizados: `README.md` y `ARCHITECTURE.md` dicen "Next.js 15" (real: 16) y `ARCHITECTURE.md` menciona Sentry/telemetría/`next/image` que no aplican al static export sin tracking.
- `ROADMAP.md` es plantilla vacía (placeholders).
</pendiente>

<notas>
### Reglas absolutas
- TypeScript `strict`. **Prohibido `any`**, `@ts-ignore`, `as any`.
- Server Components por defecto; `"use client"` solo para interactividad browser.
- **NO** API routes, middleware ni backend. **NO** formularios que envíen a servidor (usar mailto/Calendly).
- **NO** reintroducir deps `@repo/*` — la app es standalone.
- **NO** activar analytics/tracking sin consentimiento explícito (hoy: cero tracking, parte del manifiesto).
- Colores SOLO vía CSS vars de `app/styles/tokens.css` (Vergina Imperial). No hardcodear oklch en componentes. Helper `cn()` en `lib/utils.ts`.
- Commits: nunca a `main` directo → feature branch + PR.
- **Repo público**: nunca secrets/tokens/`.env*`/`.claude/settings.local.json`/paths internos. Único dato personal: NIF en `/legal/aviso-legal` (LSSI Art.10) + email `contacto@alexendros.me`.
- No referenciar clientes, proyectos privados ni nombres internos del ecosistema `.dev` en archivos versionados.
- CSP en `vercel.json` usa `'unsafe-inline'` (script/style): riesgo aceptado (hydration Next + JSON-LD + Tailwind v4 inline; sin input de usuario ni backend).

### CWV obligatorios
LCP < 2.0s desktop / < 2.5s mobile · INP < 200ms · CLS < 0.1 · Lighthouse > 90.
Test de 5 segundos: quién es, qué construye, para quién — sin scroll.

### Tono (repo público)
Promocional pero honesto: mostrar decisiones, no vender. El `.me` no monetiza; lo comercial es del `.dev`.

### Ecosistema
Registro global en `~/.claude/PROYECTOS.md` (actualizar en hitos). Sibling comercial: `personal/website-alexendrosdev` (`alexendros.dev`).
</notas>
