"use strict"

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["import"],
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  rules: {
    "sort-imports": 0,
    "import/order": [2, { alphabetize: { order: "asc" } }],
  },
  parserOptions: { project: "./tsconfig.json" },
  ignorePatterns: [".eslintrc.*", "webpack.config.*"],
}
