/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require( "fs-extra" );
const War3TSTLHelper = require( "war3tstlhelper" );
const execFile = require( "child_process" ).execFile;
const luamin = require( "luamin" );
const cwd = process.cwd();
const gameExecutable = process.env.WAR3_PATH;

// Parse configuration
let config = {};
try {

	config = JSON.parse( fs.readFileSync( "config.json" ) );

} catch ( e ) {

	return console.error( e );

}

// Handle the operation
const operation = process.argv[ 2 ];

switch ( operation ) {

	case "build": {

		const tsLua = "./dist/tstl_output.lua";

		if ( ! fs.existsSync( tsLua ) )
			return console.error( `Could not find "${tsLua}"` );

		console.log( `Building "${config.mapFolder}"...` );
		fs.copy( `./maps/${config.mapFolder}`, `./dist/${config.mapFolder}`, err => {

			if ( err )
				return console.error( err );

			// Merge the TSTL output with war3map.lua
			const mapLua = `./dist/${config.mapFolder}/war3map.lua`;

			if ( ! fs.existsSync( mapLua ) )
				return console.error( `Could not find "${mapLua}"` );

			try {

				let contents = fs.readFileSync( mapLua ) + fs.readFileSync( tsLua );
				if ( config.minifyScript ) {

					console.log( "Minifying script..." );
					contents = luamin.minify( contents.toString() );

				}
				fs.writeFileSync( mapLua, contents );

			} catch ( err ) {

				return console.error( err );

			}

			console.log( "Completed!" );

		} );

		break;

	} case "run": {

		const filename = `${cwd.replace( "/mnt/c/", "C://" )}/dist/${config.mapFolder}`;

		console.log( `Launching map "${filename.replace( /\\/g, "/" )}"...` );
		// console.log( config.gameExecutable, "-loadfile", filename, ...config.launchArgs );

		if ( ! gameExecutable ) {

			// Add-Content -Path $Profile.CurrentUserAllHosts -Value '$Env:WAR3_PATH = C:\Program Files (x86)/Warcraft III/x86_64/Warcraft III.exe'
			console.error( new Error( "Environmental variable 'WAR3_PATH' is unset. You should set it to the path of your WarCraft 3 executable." ) );
			process.exit( 1 );

		}

		execFile( gameExecutable, [ "-loadfile", filename, ...config.launchArgs ], err => {

			if ( err )
				if ( err.code === "ENOENT" ) {

					return console.error( `No such file or directory "${gameExecutable}". Make sure gameExecutable is configured properly in config.json.` );

				}

		} );

		break;

	} case "gen-defs": {

		// Create definitions file for generated globals
		const luaFile = `./maps/${config.mapFolder}/war3map.lua`;

		try {

			const contents = fs.readFileSync( luaFile, "utf8" );
			const parser = new War3TSTLHelper( contents );
			const result = parser.genTSDefinitions();
			fs.writeFileSync( "src/war3map.d.ts", result );

		} catch ( err ) {

			console.log( err );
			console.log( `There was an error generating the definition file for '${luaFile}'` );
			return;

		}

		break;

	}

}
