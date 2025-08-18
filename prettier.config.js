module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  printWidth: 120,
  plugins: ["@ianvs/prettier-plugin-sort-imports", ],
  importOrderParserPlugins: ["importAssertions", "typescript", "jsx"],
};
