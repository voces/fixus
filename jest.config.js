
module.exports = {
	globals: { "ts-jest": { tsConfig: "tsconfig.test.json" } },
	moduleFileExtensions: [ "ts", "js" ],
	transformIgnorePatterns: [],
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.js$": "babel-jest",
	},
	testRegex: "(/(src|bin)/.*\\.test)\\.ts$",
	testEnvironment: "node",
};
