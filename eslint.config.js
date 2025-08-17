import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { 
    ignores: [
      "dist",
      "node_modules",
      ".git",
      ".cache",
      ".vscode",
      ".npm",
      "local_backup",
      "**/.*",
      "Applications/**",
      "Desktop/**",
      "Documents/**",
      "Downloads/**",
      "Pictures/**",
      "Movies/**",
      "Music/**",
      "Public/**",
      "Sites/**",
      "Library/**"
    ] 
  },
  {
    ...js.configs.recommended,
    files: ["src/**/*.{js,jsx}", "*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];