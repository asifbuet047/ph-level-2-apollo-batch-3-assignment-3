import js from "@eslint/js";
export default [
  js.configs.recommended,
  {
    ignores: ["node_modules"], // Ignore the node_modules folder
  },
  {
    files: ["**/*.js"], // Target all JS files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Specify ES modules
    },
    rules: {
      "no-console": "off", // Allow console logs in Node.js
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Style
      //semi: ["error", "always"], // Require semicolons
      //quotes: ["error", "single"], // Enforce single quotes
    },
  },
];
