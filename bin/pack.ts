
import { promises as fs } from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const asyncExecFile = promisify( execFile );

const mpqEditor = process.env.MPQ_EDITOR;

const cwd = process.cwd().replace( /\/mnt\/([a-z])\//, ( _, drive ) => drive.toUpperCase() + ":/" );

if ( ! mpqEditor ) {

	console.error( new Error( "Environmental variable 'MPQ_EDITOR' is unset. You should set it to the path of your MPQ Editor, available at http://www.zezula.net/en/mpq/download.html" ) );
	process.exit( 1 );

}

fs.readFile( "./maps/fixus.w3x/war3map.wts", { encoding: "utf-8" } ).then( async contents => {

	const match = contents.match( /Fixus (\d+)/ );
	if ( ! match ) {

		console.error( new Error( "Could not version in war3map.wts" ) );
		process.exit( 1 );

	}

	const version = match[ 1 ];
	const rawPath = path.join( process.cwd(), "dist", `Ultimate Sheep Tag Fixus ${version}.w3x` );
	const packPath = path.join( cwd, "dist", `Ultimate Sheep Tag Fixus ${version}.w3x` );

	try {

		await fs.unlink( rawPath );

	} catch ( err ) { /* do nothing */ }

	await asyncExecFile( mpqEditor, [ "new", packPath ] );
	await asyncExecFile( mpqEditor, [ "add", packPath, path.join( cwd, "dist", "fixus.w3x" ) ] );

} );
