
import "../../../../test/w3api";
import { forceTeams, getTeams } from "./getTeams";

const increasingSort = ( a: number, b: number ): number => a - b;

describe( "forceTeams", () => {

	it( "both desire sheep", () => {

		const sheep = [ Player( 0 ), Player( 1 ) ];
		const wolves: Array<player> = [];

		forceTeams(
			sheep,
			wolves,
			1,
			new Map( [[ Player( 0 ), 1 ], [ Player( 1 ), 0 ]] ),
		);

		expect( sheep.map( p => p.playerId ) ).toEqual( [ 1 ] );
		expect( wolves.map( p => p.playerId ) ).toEqual( [ 0 ] );

	} );

	it( "one desires sheep, one desires wolf", () => {

		const sheep = [ Player( 1 ) ];
		const wolves = [ Player( 0 ) ];

		forceTeams(
			sheep,
			wolves,
			1,
			new Map( [[ Player( 0 ), 1 ], [ Player( 1 ), 0 ]] ),
		);

		expect( sheep.map( p => p.playerId ) ).toEqual( [ 1 ] );
		expect( wolves.map( p => p.playerId ) ).toEqual( [ 0 ] );

	} );

	it( "both desire wolf", () => {

		const sheep: Array<player> = [];
		const wolves = [ Player( 0 ), Player( 1 ) ];

		forceTeams(
			sheep,
			wolves,
			1,
			new Map( [[ Player( 0 ), 1 ], [ Player( 1 ), 0 ]] ),
		);

		expect( sheep.map( p => p.playerId ) ).toEqual( [ 1 ] );
		expect( wolves.map( p => p.playerId ) ).toEqual( [ 0 ] );

	} );

} );

describe( "getTeams", () => {

	const samples: Array<{
		name: string;
		preferences: ["sheep" | "wolf" | "none", number][];
		sheep: number[];
		wolves: number[];
	}> = [ {
		name: "simple 12",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4, 5, 6, 7 ],
		wolves: [ 8, 9, 10, 11 ],
	}, {
		name: "simple 8",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a none to sheep",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "none", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a none to wolf",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "none", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a sheep to wolf",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 1 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a wolf to sheep",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "wolf", - 1 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
			[ "wolf", 0 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a bunch to wolf",
		preferences: [
			[ "sheep", 0 ],
			[ "sheep", 1 ],
			[ "sheep", 2 ],
			[ "sheep", 3 ],
			[ "sheep", 4 ],
			[ "sheep", 5 ],
			[ "sheep", 6 ],
			[ "none", - 10 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "moving a bunch to sheep",
		preferences: [
			[ "wolf", 0 ],
			[ "wolf", 1 ],
			[ "wolf", 2 ],
			[ "wolf", 3 ],
			[ "none", 40 ],
			[ "wolf", 5 ],
			[ "wolf", 6 ],
			[ "wolf", 7 ],
		],
		sheep: [ 0, 1, 2, 3, 4 ],
		wolves: [ 5, 6, 7 ],
	}, {
		name: "smoke",
		preferences: [
			[ "sheep", 5 ],
			[ "sheep", 1 ],
			[ "sheep", 2 ],
			[ "sheep", - 1 ],
			[ "sheep", 0 ],
			[ "sheep", 0 ],
			[ "wolf", - 13 ],
			[ "sheep", 0 ],
			[ "wolf", - 15 ],
			[ "sheep", 0 ],
			[ "sheep", - 2 ],
			[ "sheep", 0 ],
		],
		sheep: [ 1, 3, 4, 5, 7, 9, 10, 11 ],
		wolves: [ 0, 2, 6, 8 ],
	} ];

	samples.forEach( ( { name, preferences, sheep: sheepExpected, wolves: wolvesExpected } ) =>
		it( name, () => {

			const map = new Map(
				preferences.map( ( [ preference, netPreference ], i ) =>
					[ Player( i ), { preference, netPreference } ] ),
			);
			const { sheep, wolves } = getTeams( map );

			expect( sheep.map( p => p.playerId ).sort( increasingSort ) ).toEqual( sheepExpected );
			expect( wolves.map( p => p.playerId ).sort( increasingSort ) ).toEqual( wolvesExpected );

		} ) );

} );
