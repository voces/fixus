
import "test/w3api";
import { stringify, parse } from "./json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testRoundTrip = ( name: string, value: any ): void =>
	it( name, () => expect( parse( stringify( value ) || "" ) ).toEqual( value ) );

describe( "string", () => {

	testRoundTrip( "empty string", "" );
	testRoundTrip( "simple string", "abc" );
	testRoundTrip( "escaped string", "And he said, \"Hello, World!\"" );

	it( "actual escaped string", () => {

		expect( stringify( "\\\"" ) ).toEqual( "\"\\\\\\\"\"" );
		expect( stringify( stringify( "\\\"" ) ) ).toEqual( "\"\\\"\\\\\\\\\\\\\\\"\\\"\"" );

		expect( parse( "\"\\\\\\\"\"" ) ).toEqual( "\\\"" );

	} );

} );

testRoundTrip( "number", 123.456 );

describe( "booleans", () => {

	testRoundTrip( "true", true );
	testRoundTrip( "false", false );

} );

testRoundTrip( "null", null );

describe( "object", () => {

	testRoundTrip( "empty object", {} );
	testRoundTrip( "simple object", { a: "apple", b: 17, c: true } );
	testRoundTrip( "complex object", { a: { b: { c: true } } } );
	it( "crazy white space", () => expect( parse( `
{
	 "a"   :     7   ,   "b":[   true  , false,  7 ,
[]  ]
	
}
	` ) ).toEqual( { a: 7, b: [ true, false, 7, []] } ) );
	it( "non-stringifiable values are omitted", () =>
		expect( stringify( { a: 0, b: undefined, c: (): void => { /* do nothing */ }, d: 1 } ) )
			.toEqual( "{\"a\":0,\"d\":1}" ) );

} );

describe( "array", () => {

	it( "empty array parse", () => expect( parse( "[]" ) ).toEqual( [] ) );
	// Lua can't tell the difference between an empty object and an empty array
	it( "empty array stringify", () => expect( stringify( [] ) ).toEqual( "{}" ) );
	testRoundTrip( "simple array", [ 3, 4, "a" ] );
	testRoundTrip( "complex array", [[ 1, [ 2 ]], [ 3 ], 4 ] );
	it( "crazy white space", () => expect( parse( `
[
	 "a"    ,
	 "b","c",[
	 7]
	
	]
	` ) ).toEqual( [ "a", "b", "c", [ 7 ]] ) );
	it( "non-stringifiable values are replaced with null", () =>
		expect( stringify( [ 0, undefined, (): void => { /* do nothing */ }, 1 ] ) )
			.toEqual( "[0,null,null,1]" ) );

} );

testRoundTrip( "smoke", { a: [ 7, true, { b: "c" }, null ], null: 4 } );
