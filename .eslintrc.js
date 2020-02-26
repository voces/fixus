
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
		"eqeqeq": ["error", "always", {"null": "never"}],
		"no-unused-vars": 0,
		"@typescript-eslint/no-unused-vars": 2,
		"no-extra-parens": 0,
		"@typescript-eslint/no-extra-parens": ["error"]
		// "@typescript-eslint/strict-boolean-expressions": 2
	},
};
