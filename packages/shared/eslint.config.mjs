import js from "@eslint/js";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
    { ignores: ["dist/", "node_modules/"] },
    js.configs.recommended,
    ...ts.configs.recommended,
    ...ts.configs.stylistic,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/consistent-type-definitions": "off",
        },
    },
];

export default eslintConfig;
