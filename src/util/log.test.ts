
import "../test/w3api";
import { log } from "./log";
import { getGame } from "w3api/dist";

it( "smoke", () => {

	log( "a", 7, true, [ "b", { c: false } ] );
	const game = getGame();

	expect( game.log.length ).toEqual( bj_MAX_PLAYERS );
	expect( game.log[ 0 ].message.replace( /(\|cff\w{6}|\|r)/g, "" ) )
		.toEqual( "\"a\" 7 true [ \"b\", { c: false } ]" );

} );
