import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  // Base JS recommended
  js.configs.recommended,

  // TypeScript files
  ...tseslint.configs.recommended,

  // Vue files (vue3-recommended includes the vue parser)
  ...pluginVue.configs["flat/recommended"],

  // Prettier (disables conflicting rules)
  prettier,

  // Global settings
  {
    plugins: {
      prettier: pluginPrettier
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "prettier/prettier": "error"
    }
  },

  // Vue files: use TS parser inside <script>
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"]
      }
    },
    rules: {
      "vue/no-undef-components": [
        "error",
        {
          ignorePatterns: ["router-link", "router-view", "font-awesome-icon"]
        }
      ],
      "vue/component-name-in-template-casing": ["warn", "kebab-case", { registeredComponentsOnly: false }],
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },

  // TS files
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },

  // Ignore build output and scripts
  {
    ignores: ["dist/**", "node_modules/**", "scripts/**", "*.d.ts"]
  }
];
