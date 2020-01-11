
module.exports = {
	globals: { "ts-jest": { tsConfig: "tsconfig.json" } },
	moduleFileExtensions: [ "ts", "js" ],
	transformIgnorePatterns: [],
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.js$": "babel-jest",
	},
	testRegex: "(/src/.*\\.test)\\.[tj]s$",
	testEnvironment: "node",
};
