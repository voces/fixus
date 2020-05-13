
import { execFile } from "child_process";
import { loadJsonFile, logger, compileMap } from "./utils";

const gameExecutable = process.env.WAR3_PATH;

if ( gameExecutable == null ) {

	console.error( new Error( "Environmental variable 'WAR3_PATH' is unset. You should set it to the path of your WarCraft 3 executable." ) );
	process.exit( 1 );

}

const config = loadJsonFile( "config.json" );
const result = compileMap( config );

if ( ! result ) {

	logger.error( "Failed to compile map." );
	process.exit( 1 );

}

const cwd = process.cwd();
const filename = `${cwd.replace( "/mnt/c/", "C://" )}/dist/${config.mapFolder}`;

logger.info( `Launching map "${filename.replace( /\\/g, "/" )}"...` );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
execFile( gameExecutable, [ "-loadfile", filename, ...config.launchArgs ], ( err: any ) => {

	if ( err?.code === "ENOENT" )
		logger.error( `No such file or directory "${gameExecutable}". Make sure environmental variable 'WAR3_PATH' is configured properly.` );

} );
