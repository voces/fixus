
import "test/w3api";
import { getGame } from "w3api";
import { debounce } from "./debounce";
import { repeat } from "test/util";

it( "works", () => {

	const fn = jest.fn();
	const debounced = debounce( { threshold: 3, duration: 5 }, fn );
	repeat( 5, () => debounced( "a" ) );

	expect( fn ).toHaveBeenCalledTimes( 3 );

	getGame().tickFor( 5 );
	repeat( 5, () => debounced( "a" ) );

	expect( fn ).toHaveBeenCalledTimes( 6 );

} );
