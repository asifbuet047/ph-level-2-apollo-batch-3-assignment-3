import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin"; // Import the plugin
export default [
  {
    ignores: ["node_modules", "dist"], // Ignore the node_modules folder
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest", // Supports modern ECMAScript
      sourceType: "module", // Supports ES modules
      parser: typescriptParser,
    },
    rules: {
      "no-console": "off", // Allow console logs in Node.js
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule
      "@typescript-eslint/no-unsafe-member-access": "off", // Ignore
      "@typescript-eslint/no-unused-vars": "off",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin, // Define the plugin object
    },
  },
];
