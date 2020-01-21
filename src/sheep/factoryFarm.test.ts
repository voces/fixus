
const SquareRoot = ( n: number ): number => Math.sqrt( n );
const Pow = ( n: number, u: number ): number => n ** u;

const spiralX = ( n: number ): number => {

	const k = Math.ceil( ( SquareRoot( n ) - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = Pow( t, 2 );
	t = t - 1;
	console.log( "spiralX", 0, { k, t, m } );

	if ( n >= m - t ) return k - ( m - n );
	else m = m - t;
	console.log( "spiralX", 1, { k, t, m } );

	if ( n >= m - t ) return - k;
	else m = m - t;
	console.log( "spiralX", 2, { k, t, m } );

	if ( n >= m - t ) return - k + ( m - n );
	return k;

};

const spiralY = ( n: number ): number => {

	const k = Math.ceil( ( SquareRoot( n ) - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = Pow( t, 2 );
	t = t - 1;

	if ( n >= m - t ) return - k;
	else m = m - t;

	if ( n >= m - t ) return - k + ( m - n );
	else m = m - t;

	if ( n >= m - t ) return k;
	return k - ( m - n - t );

};

const coords = ( n: number ): {x: number; y: number} => ( { x: spiralX( n ), y: spiralY( n ) } );

describe( "spiral", () => {

	it( "run through it", () => {

		// expect( coords( 1 ) ).toEqual( { x: 0, y: - 0 } );
		// expect( coords( 2 ) ).toEqual( { x: 1, y: 0 } );
		// expect( coords( 3 ) ).toEqual( { x: 1, y: 1 } );
		// expect( coords( 4 ) ).toEqual( { x: 0, y: 1 } );
		// expect( coords( 5 ) ).toEqual( { x: - 1, y: 1 } );
		// expect( coords( 6 ) ).toEqual( { x: - 1, y: 0 } );
		// expect( coords( 7 ) ).toEqual( { x: - 1, y: - 1 } );
		// expect( coords( 8 ) ).toEqual( { x: 0, y: - 1 } );
		expect( coords( 9 ) ).toEqual( { x: 1, y: - 1 } );
		// expect( coords( 10 ) ).toEqual( { x: 2, y: - 1 } );
		// expect( coords( 11 ) ).toEqual( { x: 2, y: 0 } );
		// expect( coords( 12 ) ).toEqual( { x: 2, y: 1 } );
		// expect( coords( 13 ) ).toEqual( { x: 2, y: 2 } );
		// expect( coords( 14 ) ).toEqual( { x: 1, y: 2 } );
		// expect( coords( 15 ) ).toEqual( { x: 0, y: 2 } );
		// expect( coords( 16 ) ).toEqual( { x: - 1, y: 2 } );
		// expect( coords( 17 ) ).toEqual( { x: - 2, y: 2 } );
		// expect( coords( 18 ) ).toEqual( { x: - 2, y: 1 } );
		// expect( coords( 19 ) ).toEqual( { x: - 2, y: 0 } );
		// expect( coords( 20 ) ).toEqual( { x: - 2, y: - 1 } );
		// expect( coords( 21 ) ).toEqual( { x: - 2, y: - 2 } );
		// expect( coords( 22 ) ).toEqual( { x: - 1, y: - 2 } );
		// expect( coords( 23 ) ).toEqual( { x: 0, y: - 2 } );
		// expect( coords( 24 ) ).toEqual( { x: 1, y: - 2 } );
		// expect( coords( 25 ) ).toEqual( { x: 2, y: - 2 } );
		// expect( coords( 26 ) ).toEqual( { x: 3, y: - 2 } );

	} );

} );
