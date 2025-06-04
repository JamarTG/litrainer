import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
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
  rules: {}
});
