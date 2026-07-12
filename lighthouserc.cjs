/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: 'out',
      startServerCommand: 'npx serve out -p 4000',
      url: [
        'http://localhost:4000',
        'http://localhost:4000/legal/aviso-legal.html',
        'http://localhost:4000/legal/cookies.html',
        'http://localhost:4000/legal/privacidad.html',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertMatrix: [
        {
          /* Fase 1 — aviso temprano (margen de 0.20 sobre el objetivo) */
          matchingUrlPattern: '.*',
          assertions: {
            'categories:performance': ['warn', { minScore: 0.85 }],
            'categories:accessibility': ['warn', { minScore: 0.85 }],
            'categories:best-practices': ['warn', { minScore: 0.85 }],
            'categories:seo': ['warn', { minScore: 0.85 }],
          },
        },
        {
          /* Fase 2 — límite obligatorio (objetivos CLAUDE.md) + CWV */
          matchingUrlPattern: '.*',
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'categories:accessibility': ['error', { minScore: 0.95 }],
            'categories:best-practices': ['error', { minScore: 0.9 }],
            'categories:seo': ['error', { minScore: 0.9 }],
            'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
            'largest-contentful-paint': ['warn', { maxNumericValue: 3500 }],
            'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
            'total-blocking-time': ['warn', { maxNumericValue: 300 }],
          },
        },
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
