
import "../test/global.ts"
import { registerCommand } from "./commands";

describe( "abc", () => {

	it( "123", () => {

		const action = ( { angle }: {angle: number} ): void => {

			expect( angle ).toEqual( 270.01 );
			// console.log( angle );

		};

		registerCommand( {
			command: "angle",
			alias: "a",
			args: [ { name: "angle", type: Number } ],
			fn: action,
		} );

	} );

} );
