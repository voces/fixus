
import "../../../test/w3api";
import { spiralX, spiralY } from "./factoryFarm";

const coords = ( n: number ): {x: number; y: number} => ( { x: spiralX( n ), y: spiralY( n ) } );

describe( "spiral", () => {

	it( "run through it", () => {

		expect( coords( 1 ) ).toEqual( { x: 0, y: - 0 } );
		expect( coords( 2 ) ).toEqual( { x: 1, y: 0 } );
		expect( coords( 3 ) ).toEqual( { x: 1, y: 1 } );
		expect( coords( 4 ) ).toEqual( { x: 0, y: 1 } );
		expect( coords( 5 ) ).toEqual( { x: - 1, y: 1 } );
		expect( coords( 6 ) ).toEqual( { x: - 1, y: 0 } );
		expect( coords( 7 ) ).toEqual( { x: - 1, y: - 1 } );
		expect( coords( 8 ) ).toEqual( { x: 0, y: - 1 } );
		expect( coords( 9 ) ).toEqual( { x: 1, y: - 1 } );
		expect( coords( 10 ) ).toEqual( { x: 2, y: - 1 } );
		expect( coords( 11 ) ).toEqual( { x: 2, y: 0 } );
		expect( coords( 12 ) ).toEqual( { x: 2, y: 1 } );
		expect( coords( 13 ) ).toEqual( { x: 2, y: 2 } );
		expect( coords( 14 ) ).toEqual( { x: 1, y: 2 } );
		expect( coords( 15 ) ).toEqual( { x: 0, y: 2 } );
		expect( coords( 16 ) ).toEqual( { x: - 1, y: 2 } );
		expect( coords( 17 ) ).toEqual( { x: - 2, y: 2 } );
		expect( coords( 18 ) ).toEqual( { x: - 2, y: 1 } );
		expect( coords( 19 ) ).toEqual( { x: - 2, y: 0 } );
		expect( coords( 20 ) ).toEqual( { x: - 2, y: - 1 } );
		expect( coords( 21 ) ).toEqual( { x: - 2, y: - 2 } );
		expect( coords( 22 ) ).toEqual( { x: - 1, y: - 2 } );
		expect( coords( 23 ) ).toEqual( { x: 0, y: - 2 } );
		expect( coords( 24 ) ).toEqual( { x: 1, y: - 2 } );
		expect( coords( 25 ) ).toEqual( { x: 2, y: - 2 } );
		expect( coords( 26 ) ).toEqual( { x: 3, y: - 2 } );

	} );

} );
