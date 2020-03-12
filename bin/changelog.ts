
import { promises as fs } from "fs";
import { lexer } from "marked";

interface Version {
	title: string;
	content: string[];
}

const listBullet = [ "•", "-", "∙" ];

export const generateTs = async (): Promise<string> => {

	const data = await fs.readFile( "CHANGELOG.md", { encoding: "utf-8" } );

	const versions: Array<Version> = [];
	const tokens = lexer( data );
	let version: Version = { title: "", content: [] };
	let listDepth = - 1;
	for ( const token of tokens )
		switch ( token.type ) {

			case "heading": {

				if ( token.depth === 1 ) {

					version = { title: token.text, content: [] };
					versions.push( version );

				} else version.content.push( token.text );

				break;

			} case "list_item_start": version.content.push( "  ".repeat( listDepth ) + listBullet[ listDepth ] + " " ); break;
			case "list_item_end": break;
			case "list_start": listDepth ++; break;
			case "list_end": listDepth --; break;
			case "text": version.content[ version.content.length - 1 ] += token.text.replace( /"/g, "\\\"" ); break;
			case "space": break;
			default: console.log( "Unhandled token", token );

		}

	const code =
		"\n// DO NOT MODIFY DIRECTLY. Execute `npm run build:changelog` instead.\n\n" +
		"export const changelog = [\n" +
		versions.map( v => `\t{ title: "${v.title}", content: [\n${v.content.map( c => `\t\t"${c}",` ).join( "\n" )}` + "\n\t].join( \"\\n\" ) },\n" ).join( "" ) +
		"];\n";

	return code;

};

// write to a file if being invoked directly
if ( process.argv[ 1 ].endsWith( "changelog.ts" ) )
	generateTs().then( content => fs.writeFile( "src/misc/changelog.ts", content ) );

