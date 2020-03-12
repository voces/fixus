
import { emitLog } from "../util/emitLog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = ( v: any ): boolean => {

	if ( typeof v !== "object" || v == null ) return false;

	// Lua uses 1 as the starter index
	return Object.keys( v ).every( ( v, index ) => tonumber( v ) === index + 1 || tonumber( v ) === index ) &&
		( v[ 0 ] !== undefined || v[ 1 ] !== undefined );

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = ( v: any ): string => {

	if ( typeof v === "string" ) return `"${v}"`;
	if ( typeof v === "number" ) return v.toString();
	if ( typeof v === "boolean" ) return v.toString();

	if ( isArray( v ) ) {

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const arr = v as Array<any>;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return `[ ${arr.map( ( v: any ) => stringify( v ) ).join( ", " )} ]`;

	}

	if ( typeof v === "object" && v != null )
		return `{ ${Object.entries( v ).map( ( [ key, value ] ) => `"${key}": ${stringify( value )}` ).join( ", " )} }`;

	if ( v === undefined ) return "undefined";
	if ( v == null ) return "null";

	return `[${typeof v }]`;

};

export type Value = string | number | boolean | undefined | null | Value[] | {[key: string]: Value};
const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];

const openings: Record<string, string> = {
	"\"": "\"",
	"[": "]",
	"{": "}",
};

const stack: string[] = [];

/**
 * Parses a JSON string. Can return many values: array, object, number, string,
 * boolean, null, undefined, etc.
 */
let parse = ( string: string ): Value => string;

const parseArray = ( string: string ): Value[] => {

	const output: Value[] = [];
	if ( string.length < 3 ) return output;
	const valueStr = string.slice( 1, string.length - 1 );
	let start = 0;
	for ( let i = 0; i <= valueStr.length; i ++ ) {

		if ( stack[ stack.length - 1 ] === "\\ " ) {

			stack.pop();
			continue;

		} else if ( valueStr[ i ] === "\\ " )
			stack.push( "\\ " );

		if (
			stack[ stack.length - 1 ] === valueStr[ i ] && stack[ stack.length - 1 ] !== "\"" ||
			stack[ stack.length - 1 ] === valueStr[ i ] && valueStr[ i ] === "\""
		)
			stack.pop();

		else if ( openings[ valueStr[ i ] ] && stack[ stack.length - 1 ] !== "\"" )
			stack.push( openings[ valueStr[ i ] ] );

		if ( stack.length === 0 && valueStr[ i ] === "," || i === valueStr.length ) {

			const curVal = parse( valueStr.slice( start, i ) );
			output.push( curVal );
			start = i + 1;

		}

	}
	return output;

};

const parseObj = ( string: string ): {[key: string]: Value} => {

	const output: {[key: string]: Value} = {};
	if ( string.length < 3 ) return output;
	const valueStr = string.slice( 1, string.length - 1 );
	let start = 0;
	let key = "";
	let val;
	for ( let i = 0; i <= valueStr.length; i ++ ) {

		if ( stack[ stack.length - 1 ] === "\\ " ) {

			stack.pop();
			continue;

		} else if ( valueStr[ i ] === "\\ " )
			stack.push( "\\ " );

		if (
			stack[ stack.length - 1 ] === valueStr[ i ] && stack[ stack.length - 1 ] !== "\"" ||
			stack[ stack.length - 1 ] === valueStr[ i ] && valueStr[ i ] === "\""
		)
			stack.pop();

		else if ( openings[ valueStr[ i ] ] && stack[ stack.length - 1 ] !== "\"" )
			stack.push( openings[ valueStr[ i ] ] );

		if ( stack.length === 0 ) {

			if ( valueStr[ i ] === ":" ) {

				const trimmed = valueStr.slice( start, i ).trim();
				key = trimmed.slice( 1, trimmed.length - 1 );
				start = i + 1;

			}

			if ( valueStr[ i ] === "," || i === valueStr.length ) {

				val = parse( valueStr.slice( start, i ) );
				start = i + 1;
				if ( key.length > 0 )
					output[ key ] = val;

			}

		}

	}
	return output;

};

parse = ( string: string ): Value => {

	string = string.trim();

	try {

		if ( string[ 0 ] === "\"" ) return string.slice( 1, string.length - 1 );
		if ( string === "true" ) return true;
		if ( string === "false" ) return false;
		if ( string === "undefined" ) return undefined;
		if ( string === "null" ) return null;
		if ( numbers.includes( string[ 0 ] ) ) return tonumber( string );
		if ( string[ 0 ] === "[" ) return parseArray( string );
		if ( string[ 0 ] === "{" ) return parseObj( string );

	} catch ( err ) {

		emitLog( "json parse error", err );

	}

	return string;

};

export { parse };
