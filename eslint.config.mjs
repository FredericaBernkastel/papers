import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        // the .mjs configs sit outside tsconfig (allowJs is off), so give the
        // project service a default program for them rather than failing to parse
        projectService: { allowDefaultProject: ["*.mjs"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // `any` opts out of the type system entirely. `unknown` + a narrowing
      // check expresses "genuinely not known" without the blast radius.
      "@typescript-eslint/no-explicit-any": "error",

      // `as` silently disables checking on the value it is applied to. Prefer
      // `satisfies` (checks without widening), a declared type on the binding,
      // or a real narrowing predicate. Const assertions are still allowed:
      // `as const` only narrows literal types, it never asserts a shape.
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],

      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    // the generated MathML module is written by scripts/gen-math.ts
    files: ["src/generated/**"],
    rules: { "@typescript-eslint/no-unnecessary-condition": "off" },
  },
]);

export default eslintConfig;
