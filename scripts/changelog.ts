import { Lexer, type Tokens } from "npm:marked@^14";

type Version = { title: string; content: string[] };

const listBullets = [ "•", "-", "∙" ];

const renderList = ( list: Tokens.List, depth: number ): string[] => {

	const out: string[] = [];
	for ( const item of list.items ) {

		const inlineParts: string[] = [];
		const nested: Tokens.List[] = [];
		for ( const t of item.tokens )
			if ( t.type === "list" ) nested.push( t as Tokens.List );
			else if ( "text" in t && typeof t.text === "string" ) inlineParts.push( t.text );

		out.push(
			"  ".repeat( depth ) + listBullets[ depth ] + " " +
			inlineParts.join( "" ).replace( /\n\s*/g, " " ).replace( /"/g, "\\\"" ),
		);
		for ( const child of nested )
			out.push( ...renderList( child, depth + 1 ) );

	}
	return out;

};

export const generateTs = async (): Promise<string> => {

	const data = await Deno.readTextFile( "docs/CHANGELOG.md" );

	const versions: Version[] = [];
	let version: Version = { title: "", content: [] };
	for ( const token of Lexer.lex( data ) )
		if ( token.type === "heading" ) {

			if ( token.depth === 1 ) {

				version = { title: token.text, content: [] };
				versions.push( version );

			} else version.content.push( token.text );

		} else if ( token.type === "list" )
			version.content.push( ...renderList( token as Tokens.List, 0 ) );

	return "\n// DO NOT MODIFY DIRECTLY. Execute `deno task build:changelog` instead.\n\n" +
		"export const changelog = [\n" +
		versions.map( ( v ) =>
			`\t{ title: "${v.title}", content: [\n${v.content.map( ( c ) => `\t\t"${c}",` ).join( "\n" )}` +
			"\n\t].join( \"\\n\" ) },\n"
		).join( "" ) +
		"];\n";

};

if ( import.meta.main )
	await Deno.writeTextFile( "src/misc/changelog.ts", await generateTs() );
