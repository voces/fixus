
module.exports = {
	globals: { "ts-jest": { tsConfig: "tsconfig.test.json" } },
	moduleDirectories: [ "node_modules", "src" ],
	moduleFileExtensions: [ "ts", "js" ],
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.js$": "babel-jest",
	},
	testEnvironment: "node",
	testRegex: "(/(src|scripts)/.*\\.test)\\.ts$",
	transformIgnorePatterns: [],
};
