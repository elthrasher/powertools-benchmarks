import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: { include: ['src'] },
    deps: {
      inline: ['vitest-mock-process'],
    },
  },
});
