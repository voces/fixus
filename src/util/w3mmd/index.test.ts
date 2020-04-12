
import "test/w3api";
import { onWolfGoldBonus } from "./index";
import { getRemainingTime } from "game/states/common";

jest.mock(
	"game/states/common",
	() => ( {
		gameState: (): "play" => "play",
		getRemainingTime: jest.fn(),
	} ),
);

describe( "onWolfGoldBonus", () => {

	const tests: [number, ...{gold: number; time: number}[]][] = [
		// base, no gold
		[ 1.00, { gold: 0, time: 0 } ],
		// 100 gold
		[ 1.16, { gold: 100, time: 0 } ],
		[ 1.15, { gold: 100, time: 60 } ],
		[ 1.14, { gold: 100, time: 60 * 2 } ],
		[ 1.11, { gold: 100, time: 60 * 5 } ],
		[ 1.07, { gold: 100, time: 60 * 10 } ],
		[ 1.03, { gold: 100, time: 60 * 15 } ],
		[ 1.01, { gold: 100, time: 60 * 20 } ],
		[ 1.00, { gold: 100, time: 60 * 23 } ],
		// higher amounts
		[ 1.21, { gold: 200, time: 60 } ],
		[ 1.34, { gold: 500, time: 60 } ],
		[ 1.47, { gold: 1000, time: 60 } ],
		[ 1.75, { gold: 2500, time: 60 } ],
		[ 1.75, { gold: 10000, time: 60 } ],
		// max at different times
		[ 1.55, { gold: 2500, time: 60 * 5 } ],
		[ 1.34, { gold: 2500, time: 60 * 10 } ],
		[ 1.04, { gold: 2500, time: 60 * 20 } ],
		// multiple goldings
		[ 1.27, { gold: 100, time: 0 }, { gold: 100, time: 60 * 5 } ],
		[ 1.25, { gold: 100, time: 60 }, { gold: 100, time: 60 * 6 } ],
		[ 1.23, { gold: 100, time: 60 * 2 }, { gold: 100, time: 60 * 7 } ],
		[ 1.18, { gold: 100, time: 60 * 5 }, { gold: 100, time: 60 * 10 } ],
		[ 1.10, { gold: 100, time: 60 * 10 }, { gold: 100, time: 60 * 15 } ],
		[ 1.04, { gold: 100, time: 60 * 15 }, { gold: 100, time: 60 * 20 } ],
	];

	afterEach( () => {

		onWolfGoldBonus( 0, true );

	} );

	tests.forEach( ( [ expected, ...goldings ] ) => {

		it( JSON.stringify( goldings ), () => {

			let actual = 1;

			goldings.forEach( ( { gold, time } ) => {

				( getRemainingTime as jest.Mock ).mockReturnValueOnce( 25 * 60 - time );
				actual = onWolfGoldBonus( gold );

			} );

			expect( actual ).toBeCloseTo( expected );

		} );

	} );

} );
