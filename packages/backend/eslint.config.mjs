import js from "@eslint/js";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
    { ignores: ["dist/", "node_modules/", "prisma/"] },
    js.configs.recommended,
    ...ts.configs.recommended,
    ...ts.configs.stylistic,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: {
                console: "readonly",
                process: "readonly",
                NodeJS: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
            "@typescript-eslint/no-import-type-side-effects": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],
        },
    },
];

export default eslintConfig;
