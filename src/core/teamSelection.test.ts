
import "../test/w3api";
import { forceTeams } from "./teamSelection";

describe( "forceTeams", () => {

	const players: Array<player> = Array( 12 ).fill( 0 ).map( ( _, i ) => Player( i ) );

	describe( "sheep -> wolf", () => {

		it( "2 desired sheep", () => {

			const sheep = [];
			const wolves = [ players[ 0 ], players[ 1 ] ];

			forceTeams(
				sheep,
				wolves,
				1,
				- 1,
				new Map( [[ players[ 0 ], 1 ], [[ players[ 1 ], 0 ]]] ),
			);

			expect( sheep ).toEqual( players[ 0 ] );
			expect( wolves ).toEqual( players[ 1 ] );

		} );

	} );

} );
