import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["**/*.css", "**/*.cjs", "**/build/**", "**/public/**", "**/dist/**"]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.recommended,
  {
    name: "litrainer lint",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
      parserOptions: {
        project: false
      }
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
    }
  },
  {
    name: "forbid-legacy-imports",
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      "src/state/store.ts",
      "src/state/slices/**/*",
      "src/state/hooks/**/*",
      "src/services/lichess.ts",
      "src/shared/lib/text.ts",
      "src/shared/lib/material.ts",
      "src/shared/lib/move.ts",
      "src/features/analysis-engine/lib/index.ts",
      "src/redux/**/*",
      "src/libs/**/*"
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/redux/*"],
              message: "Use @/state/* imports instead of @/redux/*"
            },
            {
              group: ["@/libs/*"],
              message: "Use @/services/*, @/shared/*, or feature-owned modules instead of @/libs/*"
            }
          ]
        }
      ]
    }
  }
);
