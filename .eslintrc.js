const tseslint = require("typescript-eslint");

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:compat/recommended",
    "prettier",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: `${__dirname}/tsconfig.app.json`,
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "compat",
    "unicorn",
    "sonarjs",
    "react",
    "react-hooks",
  ],
  ignorePatterns: [".eslintrc.js", "*.d.ts"],
  settings: {
    polyfills: [
      "fetch",
      "Map",
      "Set",
      "Promise",
      "Symbol",
      "String",
      "Array",
      "Math",
      "Object",
      "URL",
      "URLSearchParams",
    ],
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
  },
};
