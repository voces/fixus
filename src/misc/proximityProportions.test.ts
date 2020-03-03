
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

			const entries = Array.from( proximityProportions(
				{ x: 0, y: 0 },
				{ gold: 125, experience: 100 },
				Player( 8 ),
			).entries() );

			expect( entries.map( v => [ v[ 0 ].playerId, v[ 1 ] ] ) )
				.toEqual( [[ 8, { gold: 125, experience: 100, lumber: 0 } ]] );

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

			expect( entries.map( v => [ v[ 0 ].playerId, v[ 1 ] ] ) )
				.toEqual( [
					[ 8, { gold: 63, experience: 50, lumber: 0 } ],
					[ 9, { gold: 62, experience: 50, lumber: 0 } ],
				] );

		} );

		it( "spread", () => {

			ForceAddPlayer( wolfTeam, Player( 9 ) );
			const wolf2 = CreateUnit( Player( 9 ), WOLF_TYPE, 1024, 1024, 270 );
			ForceAddPlayer( wolfTeam, Player( 10 ) );
			const wolf3 = CreateUnit( Player( 10 ), WOLF_TYPE, 4096, 4096, 270 );
			ForceAddPlayer( wolfTeam, Player( 11 ) );
			const wolf4 = CreateUnit( Player( 11 ), WOLF_TYPE, 8192, 8192, 270 );

			const entries = Array.from( proximityProportions(
				{ x: 0, y: 0 },
				{ gold: 125, experience: 100 },
				Player( 8 ),
			).entries() );

			ForceRemovePlayer( wolfTeam, Player( 9 ) );
			RemoveUnit( wolf2 );
			ForceRemovePlayer( wolfTeam, Player( 10 ) );
			RemoveUnit( wolf3 );
			ForceRemovePlayer( wolfTeam, Player( 11 ) );
			RemoveUnit( wolf4 );

			expect( entries.map( v => [ v[ 0 ].playerId, v[ 1 ] ] ) )
				.toEqual( [
					[ 8, { gold: 48, experience: 38, lumber: 0 } ], // old : 35.2%
					[ 9, { gold: 37, experience: 30, lumber: 0 } ], // old : 21.6%
					[ 10, { gold: 24, experience: 20, lumber: 0 } ], // old: 21.6%
					[ 11, { gold: 16, experience: 12, lumber: 0 } ], // old: 21.6%
				] );

		} );

		afterEach( () => {

			ForceRemovePlayer( wolfTeam, Player( 8 ) );
			RemoveUnit( wolf );

		} );

	} );

} );
