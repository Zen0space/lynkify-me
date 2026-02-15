import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import next from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
    { ignores: [".next/", "out/", "dist/", "build/", "node_modules/", "next-env.d.ts"] },
    js.configs.recommended,
    ...ts.configs.recommended,
    ...ts.configs.stylistic,
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
            import: importPlugin,
            "@next/next": next,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                console: "readonly",
                process: "readonly",
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                fetch: "readonly",
                URL: "readonly",
                URLSearchParams: "readonly",
                FormData: "readonly",
                Headers: "readonly",
                Request: "readonly",
                Response: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                NodeJS: "readonly",
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...next.configs.recommended.rules,
            ...next.configs["core-web-vitals"].rules,

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",

            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/consistent-type-definitions": "off",

            "import/order": "off",
            "no-console": "off",

            "jsx-a11y/label-has-associated-control": "warn",
            "jsx-a11y/no-autofocus": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
        },
        settings: {
            react: { version: "detect" },
            next: { version: "detect" },
        },
    },
];

export default eslintConfig;