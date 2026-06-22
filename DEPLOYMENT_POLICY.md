# Política de Despliegue

## Proceso de Despliegue

### 1. Pre-deploy Checklist
- [ ] Todos los tests pasan (`npm run lint && npm run typecheck && npm run test:e2e`)
- [ ] Baseline de a11y no tiene regresiones
- [ ] Baseline de performance no degrada >10%
- [ ] Changelog actualizado
- [ ] PR revisado y aprobado por mínimo 1 peer

### 2. Despliegue
```bash
# Merge a main
git checkout main
git pull origin main

# Build y test
npm run build
npm run test:e2e

# Deploy (según hosting)
vercel --prod
# o
npm run deploy
```

### 3. Post-deploy Validations
- [ ] Site responde con 200 en todas las páginas
- [ ] Lighthouse CI pasa (si configurado)
- [ ] A11y check manual rápida (teclado + screen reader)
- [ ] Verificar logs de errores (Sentry o similar)

### 4. Rollback Procedure
```bash
# Si hay fallos críticos:
vercel rollback [deployment-url]
# o revertir commit y redeploy
```

## Ambientes
- **Staging:** alexendros-me-staging.vercel.app
- **Producción:** alexendros.me