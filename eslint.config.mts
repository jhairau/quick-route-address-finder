import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  {
    files: ["./src/**/*.ts"],
    extends: [tseslint.configs.recommended, tseslint.configs.eslintRecommended],
    languageOptions: { globals: globals.node },
  },
]);
