import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { name: 'home', path: '/' },
  { name: 'aviso-legal', path: '/legal/aviso-legal' },
  { name: 'privacidad', path: '/legal/privacidad' },
  { name: 'cookies', path: '/legal/cookies' },
];

for (const { name, path } of pages) {
  test.describe(`a11y baseline · ${name}`, () => {
    test('baseline completo guardado', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Guardar baseline en archivo JSON
      expect(results.violations).toHaveLength(0);

      // Exportar métricas para comparación futura
      const metrics = {
        violations: results.violations.length,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
      };

      // En lugar de console.log, usar test.info() para adjuntar datos
      test.info().attach(`baseline-${name}`, {
        body: JSON.stringify(metrics, null, 2),
        contentType: 'application/json',
      });
    });
  });
}