import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Configuracao "flat" do ESLint 9. Mesmas regras do antigo .eslintrc.cjs.
export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    settings: { react: { version: "18.2" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^React$" }],
      "react/prop-types": "off",
      "react/display-name": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // Arquivos de configuracao rodam no Node, nao no navegador.
    files: ["*.config.js"],
    languageOptions: { globals: globals.node },
  },
];
