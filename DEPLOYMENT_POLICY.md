# Política de Despliegue

## Proceso de Despliegue

### 1. Pre-deploy Checklist

- [ ] Todos los tests pasan (`npm run lint && npm run typecheck && npm run test`)
- [ ] Baseline de a11y no tiene regresiones
- [ ] Baseline de performance no degrada >10%
- [ ] PR revisado y aprobado

### 2. Despliegue

```bash
# Merge a main
git checkout main
git pull origin main

# Build y test
npm run build
npm run test

# Deploy via Vercel CLI
vercel --prod
```

### 3. Post-deploy Validations

- [ ] Site responde con 200 en todas las páginas
- [ ] Lighthouse CI pasa
- [ ] A11y check manual (teclado + screen reader)
- [ ] Verificar logs de errores

### 4. Rollback Procedure

```bash
# Si hay fallos críticos:
vercel rollback [deployment-url]
# o revertir commit y redeploy
```

## Ambientes

- **Staging:** dev.alexendros.me
- **Producción:** alexendros.me
