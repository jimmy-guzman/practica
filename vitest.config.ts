// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
