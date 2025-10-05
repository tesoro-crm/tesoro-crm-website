import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error"
    },
    languageOptions: {
      globals: {
        ...astro.configs["flat/recommended"][0].languageOptions.globals,
        location: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly"
      }
    }
  }
);
