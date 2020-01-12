
import { colorize } from "./colorize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = ( ...args: Array<any> ): void =>
	BJDebugMsg( args.map( v => {

		if ( typeof v === "string" ) return colorize.string( `"${v}"` );
		if ( typeof v === "number" ) return colorize.number( v );
		if ( typeof v === "boolean" ) return colorize.boolean( v );

		return `[${typeof v}]`;

	} ).join( " " ) );
