
import { colorize } from "./colorize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = ( v: any ): boolean => {

	if ( typeof v !== "object" ) return false;

	// Lua uses 1 as the starter index
	return Object.keys( v ).every( ( v, index ) => S2I( v ) === index + 1 || S2I( v ) === index ) &&
		( v[ 0 ] !== undefined || v[ 1 ] !== undefined );

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userdataType = ( userdata: Record<string, any> ): string => {

	const typeString = userdata.toString();
	return typeString.slice( 0, typeString.indexOf( ":" ) );

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const termToString = ( v: any, color = true ): string => {

	if ( typeof v === "string" ) return color ? colorize.string( `"${v}"` ) : v;
	if ( typeof v === "number" ) return color ? colorize.number( v ) : v.toString();
	if ( typeof v === "boolean" ) return color ? colorize.boolean( v ) : v.toString();

	if ( isArray( v ) ) {

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const arr = v as Array<any>;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return `[ ${arr.map( ( v: any ) => termToString( v ) ).join( ", " )} ]`;

	}

	if ( typeof v === "object" )
		return `{ ${Object.entries( v ).map( ( [ key, value ] ) => `${key}: ${termToString( value )}` ).join( ", " )} }`;

	const type = userdataType( v );

	switch ( type ) {

		case "player": return `Player ${termToString( { id: GetPlayerId( v ), name: GetPlayerName( v ) } )}`;
		case "unit": return `Unit ${termToString( { name: GetUnitName( v ), owner: GetOwningPlayer( v ) } )}`;
		default: return `[${type}]`;

	}

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = ( ...args: Array<any> ): void =>
	BJDebugMsg( args.map( v => termToString( v ) ).join( " " ) );
