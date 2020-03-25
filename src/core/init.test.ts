
import "../test/w3api";
import { argHelp, commandHelp } from "./init";

describe( "argHelp", () => {

	it( "works for required", () =>
		expect( argHelp( { name: "arg", required: true } ) )
			.toEqual( "<arg>" ),
	);

	it( "works for optional", () =>
		expect( argHelp( { name: "arg", required: false } ) )
			.toEqual( "[arg]" ),
	);

	it( "required is implicit", () =>
		expect( argHelp( { name: "arg" } ) )
			.toEqual( "<arg>" ),
	);

} );

describe( "commandHelp", () => {

	it( "simple", () =>
		expect( commandHelp( {
			category: "misc",
			command: "command",
			description: "some help info",
			fn: () => { /* do nothing */ },
		} ) ).toEqual( "-command\nsome help info" ),
	);

	it( "with an arg", () =>
		expect( commandHelp( {
			category: "misc",
			command: "command",
			description: "some help info",
			fn: () => { /* do nothing */ },
			args: [ { name: "arg1" } ],
		} ) ).toEqual( "-command <arg1>\nsome help info" ),
	);

	it( "with some args", () =>
		expect( commandHelp( {
			category: "misc",
			command: "command",
			description: "some help info",
			fn: () => { /* do nothing */ },
			args: [
				{ name: "arg1" },
				{ name: "arg2" },
				{ name: "arg3", required: false },
			],
		} ) ).toEqual( "-command <arg1> <arg2> [arg3]\nsome help info" ),
	);

} );
