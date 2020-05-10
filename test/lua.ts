
globalThis.tonumber = parseFloat;
globalThis.string = {
	gsub: ( s: string, pattern: string, repl: string | Record<string, string> | string | Record<string, string> | ( ( ...matches: string[] ) => string ), n?: number ): [string, number] => {

		if ( typeof repl !== "string" )
			throw new Error( "non-string `repl` on string.gsub not implemented" );

		return [ s.replace( new RegExp( pattern, "g" ), repl ), n ?? 0 ];

	},
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
