// @ts-check

import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import * as eslintPluginImport from "eslint-plugin-import";
import playwright from "eslint-plugin-playwright";
import eslintPluginReact from "eslint-plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const { configs: typescriptConfigs } = typescript;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      // Turn on the below ones after fixing them
      "@typescript-eslint/no-floating-promises": "off",
      "no-console": "off",
      "@typescript-eslint/await-thenable": "off",
      "playwright/expect-expect": "off",
      "playwright/no-conditional-in-test": "off",
      "playwright/no-skipped-test": "off",
      "playwright/no-page-pause": "off",
      "playwright/no-wait-for-timeout": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "playwright/valid-describe-callback": "off",
      "playwright/no-useless-await": "off",
      "playwright/valid-title": "off",
      "playwright/prefer-web-first-assertions": "off", // important
      "playwright/no-force-option": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "playwright/valid-expect": "off",
      "playwright/no-wait-for-selector": "off",
      "playwright/no-networkidle": "off", // important
      "playwright/no-element-handle": "off",
      "playwright/no-eval": "off",
      "playwright/no-conditional-expect": "off",
    },
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "/extensions",
      "/test-reports",
      "/test-results",
      "!**/eslint.config.js",
      "/node_modules",
    ],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
      import: eslintPluginImport,
      react: eslintPluginReact,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // project: true,
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        alias: {
          map: [["@fixtures", "./libs/"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
