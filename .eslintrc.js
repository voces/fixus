
module.exports = {
	extends: [
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"verit"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"no-undef": 0,
		"@typescript-eslint/camelcase": 0,
		// "@typescript-eslint/strict-boolean-expressions": 2
	},
	// overrides: [{
	// 	files: ["src/**/*.ts"],
	// 	parserOptions: { project: "./tsconfig.json" },
	// }]
	// files: ["src/**/*.ts"],
	// excludedFiles: "**/*.spec.ts",
};
