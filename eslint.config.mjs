import next from "eslint-config-next";

/**
 * Base Next config + ajustes:
 * - Desativa "react/no-unescaped-entities" (aspas dentro de texto JSX)
 * - Baixa "@typescript-eslint/no-unused-vars" para aviso
 */
export default [
  ...next,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" }
      ],
    },
  },
];
