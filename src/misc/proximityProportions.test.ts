
import "../test/w3api";
import { normalize, proximityProportions } from "./proximityProportions";
import { wolfTeam, WOLF_TYPE } from "../shared";

describe( "normalize", () => {

	it( "sample 1", () => expect( normalize(
		[ 1, 1, 1, 1, 1 ],
	) ).toEqual(
		[ 1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5 ],
	) );

	it( "sample 2", () => expect( normalize(
		[ 1, 2, 3, 4, 5 ],
	) ).toEqual(
		[ 1 / 15, 2 / 15, 3 / 15, 4 / 15, 5 / 15 ],
	) );

} );

describe( "proximityProportions", () => {

	// describe( "sheep", () => {} );

	describe( "wolves", () => {

		let wolf: unit;

		beforeEach( () => {

			ForceAddPlayer( wolfTeam, Player( 8 ) );
			wolf = CreateUnit( Player( 8 ), WOLF_TYPE, 256, 256, 270 );

		} );

		it( "solo", () => {

			expect( Array.from( proximityProportions(
				{ x: 0, y: 0 },
				{ gold: 125, experience: 100 },
				Player( 8 ),
			).entries() ) )
				.toEqual( [[ Player( 8 ), { gold: 125, experience: 100, lumber: 0 } ]] );

		} );

		it( "even", () => {

			ForceAddPlayer( wolfTeam, Player( 9 ) );
			const wolf2 = CreateUnit( Player( 9 ), WOLF_TYPE, - 256, - 256, 270 );

			const entries = Array.from( proximityProportions(
				{ x: 0, y: 0 },
				{ gold: 125, experience: 100 },
				Player( 8 ),
			).entries() );

			ForceRemovePlayer( wolfTeam, Player( 9 ) );
			RemoveUnit( wolf2 );

			expect( entries )
				.toEqual( [
					// floating points make player 8 an epsilon further, so gold is ~62.4999 etc
					[ Player( 8 ), { gold: 62, experience: 50, lumber: 0 } ],
					[ Player( 9 ), { gold: 63, experience: 50, lumber: 0 } ],
				] );

		} );

		it( "spread", () => {

			ForceAddPlayer( wolfTeam, Player( 9 ) );
			const wolf2 = CreateUnit( Player( 9 ), WOLF_TYPE, 1024, 1024, 270 );
			ForceAddPlayer( wolfTeam, Player( 10 ) );
			const wolf3 = CreateUnit( Player( 10 ), WOLF_TYPE, 4096, 4096, 270 );

			const entries = Array.from( proximityProportions(
				{ x: 0, y: 0 },
				{ gold: 125, experience: 100 },
				Player( 8 ),
			).entries() );

			ForceRemovePlayer( wolfTeam, Player( 9 ) );
			RemoveUnit( wolf2 );
			ForceRemovePlayer( wolfTeam, Player( 10 ) );
			RemoveUnit( wolf3 );

			expect( entries )
				.toEqual( [
					[ Player( 8 ), { gold: 52, experience: 42, lumber: 0 } ],
					[ Player( 9 ), { gold: 43, experience: 34, lumber: 0 } ],
					[ Player( 10 ), { gold: 30, experience: 24, lumber: 0 } ],
				] );

		} );

		afterEach( () => {

			ForceRemovePlayer( wolfTeam, Player( 8 ) );
			RemoveUnit( wolf );

		} );

	} );

} );
