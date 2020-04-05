
import { execSync } from "child_process";
import * as fs from "fs-extra";
import * as path from "path";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

/**
 * Formatter for log messages.
 */
const loggerFormatFunc = printf( ( { level, message, timestamp } ) => `[${timestamp.replace( "T", " " ).split( "." )[ 0 ]}] ${level}: ${message}` );

/**
 * The logger object.
 */
export const logger = createLogger( {
	transports: [
		new transports.Console( {
			format: combine(
				format.colorize(),
				timestamp(),
				loggerFormatFunc,
			),
		} ),
		new transports.File( {
			filename: "project.log",
			format: combine(
				timestamp(),
				loggerFormatFunc,
			),
		} ),
	],
} );

/**
 * Load an object from a JSON file.
 * @param fname The JSON file
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadJsonFile = ( fname: string ): any => {

	try {

		return JSON.parse( fs.readFileSync( fname ).toString() );

	} catch ( e ) {

		logger.error( e.toString() );
		return {};

	}

};

/**
 * Convert a Buffer to ArrayBuffer
 * @param buf
 */
export const toArrayBuffer = ( b: Buffer ): ArrayBuffer => {

	const ab = new ArrayBuffer( b.length );
	const view = new Uint8Array( ab );
	for ( let i = 0; i < b.length; ++ i )
		view[ i ] = b[ i ];

	return ab;

};

/**
 * Convert a ArrayBuffer to Buffer
 * @param ab
 */
export const toBuffer = ( ab: ArrayBuffer ): Buffer => {

	const buf = Buffer.alloc( ab.byteLength );
	const view = new Uint8Array( ab );
	for ( let i = 0; i < buf.length; ++ i )
		buf[ i ] = view[ i ];

	return buf;

};

/**
 * Recursively retrieve a list of files in a directory.
 * @param dir The path of the directory
 */
export const getFilesInDirectory = ( dir: string ): string[] => {

	const files: string[] = [];
	fs.readdirSync( dir ).forEach( file => {

		const fullPath = path.join( dir, file );
		if ( fs.lstatSync( fullPath ).isDirectory() ) {

			const d = getFilesInDirectory( fullPath );
			for ( const n of d )
				files.push( n );

		} else
			files.push( fullPath );

	} );
	return files;

};

/**
 * Replaces all instances of the include directive with the contents of the specified file.
 * @param contents war3map.lua
 */
export const processScriptIncludes = ( contents: string ): string => {

	const regex = /include\(([^)]+)\)/gm;
	let matches;
	while ( ( matches = regex.exec( contents ) ) != null ) {

		const filename = matches[ 1 ].replace( /"/g, "" ).replace( /'/g, "" );
		const fileContents = fs.readFileSync( filename );
		contents = contents.substr( 0, regex.lastIndex - matches[ 0 ].length ) + "\n" + fileContents + "\n" + contents.substr( regex.lastIndex );

	}
	return contents;

};

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compileMap = ( config: any ): boolean => {

	if ( ! config.mapFolder ) {

		logger.error( "Could not find key \"mapFolder\" in config.json" );
		return false;

	}

	const tsLua = "./dist/tstl_output.lua";

	if ( fs.existsSync( tsLua ) )
		fs.unlinkSync( tsLua );

	logger.info( "Transpiling TypeScript to Lua..." );
	execSync( "tstl -p tsconfig.map.json", { stdio: "inherit" } );

	if ( ! fs.existsSync( tsLua ) ) {

		logger.error( `Could not find "${tsLua}"` );
		return false;

	}

	logger.info( `Building "${config.mapFolder}"...` );
	fs.copySync( `./maps/${config.mapFolder}`, `./dist/${config.mapFolder}` );

	// Merge the TSTL output with war3map.lua
	const mapLua = `./dist/${config.mapFolder}/war3map.lua`;

	if ( ! fs.existsSync( mapLua ) ) {

		logger.error( `Could not find "${mapLua}"` );
		return false;

	}

	try {

		let contents = fs.readFileSync( mapLua ).toString() + fs.readFileSync( tsLua ).toString();
		contents = processScriptIncludes( contents );

		fs.writeFileSync( mapLua, contents );

	} catch ( err ) {

		logger.error( err.toString() );
		return false;

	}

	return true;

};
