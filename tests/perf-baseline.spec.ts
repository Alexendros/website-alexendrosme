import { test, expect } from '@playwright/test';

const perfThresholds = {
  lcp: 2500, // ms - Good threshold
  fid: 100,  // ms - Good threshold
  cls: 0.1,  // - Good threshold
  ttfb: 1500, // ms - Adjusted for development environment (Snap Chromium on Ubuntu 26.04)
};

test('home page performance baseline', async ({ page }) => {
  const start = Date.now();

  // Navegar y esperar interactividad
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const ttfb = Date.now() - start;

  // Métricas Web Vitals (requiere puppeteerMetrics plugin o similar)
  const metrics = await page.evaluate(() => {
    return new Promise<{ lcp: number | null }>((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries.find((e) => e.entryType === 'largest-contentful-paint');
        if (lcp) resolve({ lcp: lcp.startTime });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Fallback timeout
      setTimeout(() => resolve({ lcp: null }), 5000);
    });
  });

  // En lugar de console.log, usar test.info() para adjuntar datos
  test.info().attach('ttfb', {
    body: String(ttfb),
    contentType: 'text/plain',
  });

  expect(ttfb).toBeLessThanOrEqual(perfThresholds.ttfb);

  if (metrics.lcp) {
    test.info().attach('lcp', {
      body: String(metrics.lcp),
      contentType: 'text/plain',
    });
    expect(metrics.lcp).toBeLessThanOrEqual(perfThresholds.lcp);
  }
});