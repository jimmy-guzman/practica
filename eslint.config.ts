import { defineConfig } from "@jimmy.codes/eslint-config";

export default defineConfig({
  overrides: [{ rules: { "no-magic-numbers": "off" } }],
});
