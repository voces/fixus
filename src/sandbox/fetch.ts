
import { registerCommand } from "util/commands";
import { log } from "util/log";
import { fetch } from "misc/networkio";

// ===========================================================================
registerCommand( {
	command: "fetch",
	category: "sandbox",
	description: "Makes a network request.",
	alias: "f",
	args: [ { name: "url", required: false } ],
	fn: ( _, words ): void => {

		const url = words.slice( 1 ).join( " " );

		fetch( url, null, r => log( r ) );

	},
} );
