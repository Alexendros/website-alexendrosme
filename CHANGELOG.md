# Changelog

Todos los cambios destacables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog 1.1.0](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [SemVer 2.0.0](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido

- **Modo claro/oscuro** (Tarea 7): soporte completo `prefers-color-scheme` + toggle manual (System/Light/Dark) con persistencia localStorage. Tokens OKLCH light mode calculados perceptualemente (hue 85 superficies, hue 315 texto, contraste ≥4.5:1 WCAG AA). ThemeProvider + ThemeToggle (Radix Popover, iconos Monitor/Sun/Moon). Script anti-FOUC inline en `<head>`.
- **Banner anti-monetización** (Tarea 5): aviso superior fijo "Este espacio es libre de dinero. Sin anuncios, sin afiliados, sin tracking. Lo comercial vive en alexendros.dev". Descartable (localStorage), respeta `prefers-reduced-motion`, animación slide-down/up, glass effect con `--ax-glass-*` tokens.
- **Enlace a alexendros.dev** (Tarea 8): nav desktop "Productos" + footer "Hub de productos → alexendros.dev" con icono ExternalLink, `target="_blank" rel="noopener noreferrer"`.
- **Tags firmados + GitHub Releases** (Tarea 6): workflow `release.yml` con `workflow_dispatch`, GPG signing en runner self-hosted, `softprops/action-gh-release@v2`, artifacts `out/**/*`.

### Corregido

- **CHANGELOG.md** (Tarea 1): URLs repo actualizadas `Alexendros/website-alexendrosme` → `Iniciativas-Alexendros/website-alexendrosme` (líneas 98-101).
- **CI unificado v4** (Tarea 2): `actions/checkout@v4`, `setup-node@v4` con `node-version-file: .nvmrc`, `upload-artifact@v4`, `concurrency` + `cancel-in-progress`, `workflow_dispatch` con selector runner (ubuntu-latest/self-hosted), job `runner-health` (conectividad, recursos, broker), job `smoke` (schedule `*/30 * * * *`), jobs dinámicos según dispatch input.
- **package.json engines.node** (Tarea 3): `>=24` → `>=22` (alineado con `.nvmrc` = 22).
- **Error pages 404/500** (Tarea 4): verificación confirmada — `app/not-found.tsx` y `app/error.tsx` ya existen y son válidos.

### Cambiado

- `app/styles/tokens/colors.css`: añadidos tokens light mode vía `@media (prefers-color-scheme: light)` y `[data-theme="light"]` overrides.
- `app/styles/tokens/index.css`: capa semántica shadcn reactiva a tema (media query + data-theme).
- `app/styles/tokens/spacing.css`: removido `color-scheme: dark` hardcoded.
- `app/layout.tsx`: envuelto en `<ThemeProvider>`, script anti-FOUC, `viewport.colorScheme: "dark light"`, clase `dark` removida de `<html>`.
- `components/nav.tsx`: integrado `<ThemeToggle />`, añadido enlace "Productos" (desktop-only).
- `components/footer.tsx`: añadido enlace "Hub de productos → alexendros.dev".
- `app/styles/components.css`: estilos `.anti-monetization-banner`, `.desktop-only`, utilidades glass.

### Añadido

- `components/theme-provider.tsx`: proveedor SSR-safe de tema.
- `components/theme-toggle.tsx`: selector 3 estados (Sistema/Claro/Oscuro).
- `components/anti-monetization-banner.tsx`: banner descartable anti-monetización.
- `tests/visual-regression.spec.ts`: 36 capturas (Home + aviso-legal × 2 temas × 3 viewports × baseline/compare).
- `tests/anti-monetization-banner.spec.ts`: 7 tests E2E (visibilidad, dismiss, persistencia, reduced-motion, link attrs, z-index, glass).
- `.github/workflows/release.yml`: release manual con tags GPG firmados.
- `docs/superpowers/plans/2026-07-12-alexendrosme-improvements-plan.md`: plan tareas 1-4.
- `docs/superpowers/plans/2026-07-12-alexendrosme-improvements-5-8-architectural-plan.md`: plan arquitectural tareas 5-8.

## [0.3.0] — 2026-05-09 · SPA landing v2

### Añadido

- **SPA one-page**: tres secciones ancla (`#biografia`, `#misiones`, `#experiencias`) con smooth scroll, `scroll-margin-top` e IntersectionObserver para active nav state.
- **Atmósfera Vergina Imperial v0.2.2**: cuatro capas CSS (`haze`, `spark`, `dust`, `vignette`) con animación `atm-drift`, respeta `prefers-reduced-motion`.
- **FAB Convócame**: mailto + Telegram (en preparación) + Matrix (próximamente). Popover Radix, foco-trap nativo, Escape devuelve foco al trigger.
- **FAB Mis aliados**: Claude AI + Proton + Playlist (TBD). Popover Radix con `rel="sponsored nofollow"`.
- **Redirects 308** en `vercel.json` para las 6 rutas legacy (`/autobiografia→/#biografia`, `/proyectos→/#misiones`, `/experiencia→/#experiencias`, `/contacto→/`, `/bitacora→/`, `/uses→/#experiencias`).
- **Legales pedagógicas** (4-bloques: esencial / detalle / derechos / texto formal): aviso-legal, privacidad, cookies. Sin botones de aceptación (no hay cookies de terceros).
- **Tests E2E Playwright** (46 passed, 0 failed): smoke, skip-link, FABs, anchors, responsive, axe-core WCAG 2.1 AA sobre 4 rutas × 3 viewports.
- **CI job `e2e`** en GitHub Actions (pnpm install → playwright install → test, artefacto de fallo).
- `components/ui/popover.tsx`: Popover Radix shadcn-style sobre `radix-ui`.
- `lib/contact.ts`: `buildMailto()` + tipos de estado de contacto.

### Cambiado

- `components/nav.tsx`: eliminadas rutas `/bitacora`, `/uses`, `/contacto`, `/proyectos`, `/autobiografia`, `/experiencia`. Nav reducido a 3 anchors. Logo hace `scrollTo(top:0, smooth)`.
- `lib/site.ts`: `siteConfig.nav` reducido; añadidos `siteConfig.contact` y `siteConfig.referrals`.
- `components/footer.tsx`: enlace de afiliados apunta a `#experiencias` (anchor SPA); eliminado enlace muerto `/experiencia#recomendaciones`.
- `app/layout.tsx`: integra `<Atmosphere />` y `pb-28 md:pb-0` en `<main>` para el FAB.
- `vercel.json`: añadidos 6 redirects permanentes.
- `app/styles/components.css`: añadidos `.mission-card`, `.referral-item`, `.atm*`, `.fab-stack`, `.fab-btn`, `.fab-item*`, `.fab-divider`, `.fab-section-label`.
- `app/styles/motion.css`: añadido `@keyframes atm-drift` + override `prefers-reduced-motion` para `.atm*`.

### Eliminado

- Rutas `/autobiografia`, `/bitacora`, `/contacto`, `/experiencia`, `/proyectos`, `/uses` (seis carpetas `app/<ruta>/`).
- `app/uses/redirect-client.tsx` (client component huérfano).

### Documentación

- `docs/auditoria-tecnica-2026-04-14.md`: renombrado desde `AUDITORÍA TÉCNICA alexendros.md` + nota de snapshot histórico superseded.
- `docs/AUDIT-REPORT.md`: ya existente en main.

### Eliminado

- (pendiente)

### Corregido

- (pendiente)

### Seguridad

- (pendiente)

## [0.2.0] - 2026-06-27

### Added

- Design system completo con 75+ tokens CSS con prefijo `--ax-*`
- `DESIGN.md` con documentación YAML frontmatter + markdown del sistema de diseño
- Tokens: colores (5 semánticos + 3 neutrales + accent), motion (3 durations + 3 easings), spacing (radius, z-index, layout)
- Triple cadena de aliases: `--ax-accent` → `--ax-brand-primary` → `--primary` (shadcn)
- DOCUMENTATION.md: guía de uso de tokens en componentes

### Changed

- Migración completa de tokens `--*` a `--ax-*` en 27 archivos (256 ocurrencias)
- `package.json`: name → `website-alexendrosme`, version → `0.2.0`, license → MIT
- CI workflow: pnpm → npm (pnpm incompatible con entorno)
- Repo renombrado: `mi-website-personal` → `website-alexendrosme`
- 22 referencias actualizadas en 16 archivos de documentación

### Fixed

- `gray-matter` build crash: pin `js-yaml@~3.14.1` (v5.x eliminó `safeLoad`)
- npm override para resolver vulnerabilidad moderada en postcss

## [0.1.0] — 2026-MM-DD

### Añadido

- Versión inicial del repositorio con canon de documentación aplicado.

[Sin publicar]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/releases/tag/v0.1.0
