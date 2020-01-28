
import { colorize } from "./colorize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = ( v: any ): boolean => {

	if ( typeof v !== "object" ) return false;
	return Object.keys( v ).every( ( v, index ) => parseInt( v ) === index );

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const termToString = ( v: any ): string => {

	if ( typeof v === "string" ) return colorize.string( `"${v}"` );
	if ( typeof v === "number" ) return colorize.number( v );
	if ( typeof v === "boolean" ) return colorize.boolean( v );

	if ( isArray( v ) ) {

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const arr = v as Array<any>;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return `[ ${arr.map( ( v: any ) => termToString( v ) ).join( ", " )} ]`;

	}

	if ( typeof v === "object" )
		return `{ ${Object.entries( v ).map( ( [ key, value ] ) => `${key}: ${termToString( value )}` ).join( ", " )} }`;

	return `[${typeof v }]`;

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = ( ...args: Array<any> ): void =>
	BJDebugMsg( args.map( v => termToString( v ) ).join( " " ) );
