import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...pluginQuery.configs["flat/recommended"],
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "prefer-arrow-callback": ["warn"],
      "@typescript-eslint/no-unused-vars": ["off"],
    },
  }),
];

export default eslintConfig;
