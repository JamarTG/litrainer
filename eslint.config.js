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
  }
);
