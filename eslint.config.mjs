import eslint from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", ".nx/**", "**/.next/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "apps/*" },
        { type: "api-kernel", pattern: "libs/api/shared-kernel" },
        { type: "shared", pattern: "libs/shared/*" },
      ],
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["app", "api-kernel", "shared"] },
            { from: "api-kernel", allow: ["api-kernel", "shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.config.{js,mjs,cjs}"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
);
