
module.exports = {
	extends: [
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"verit"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: `./tsconfig.json`
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/no-extra-parens": ["error"],
		"@typescript-eslint/no-unused-vars": 2,
		"@typescript-eslint/strict-boolean-expressions": ["error", {"allowNullable": true, "allowSafe": true}],
		"eqeqeq": ["error", "always", {"null": "never"}],
		"no-extra-parens": 0,
		"no-restricted-globals": ["error", {"name": "TriggerAddAction", message: "Use wrappedTriggerAddAction"}],
		"no-undef": 0,
		"no-unused-vars": 0,
		"no-undefined": ["error"]
	},
};
