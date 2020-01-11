
import { print } from "recast";
import { parse } from "recast/parsers/typescript";
import * as glob from "fast-glob";
import { promises as fs } from "fs";

const prefix = "src/w3api";
const srcPath = `${prefix}/src`;
const distPath = `${prefix}/dist`;
glob( [ `${srcPath}/**/*.ts` ], { dot: true } ).then( async ( files: Array<string> ) => {

	if ( ! await fs.stat( distPath ).catch( () => false ) )
		await fs.mkdir( distPath );

	files.forEach( async file => {

		const contents = parse(
			await fs.readFile( file, "utf-8" ),
			// { parser: typescriptParser },
		);

		fs.writeFile(
			`${prefix}/dist${file.replace( `${prefix}/src`, "" )}`,
			print( contents ).code,
		);

	} );

} );
