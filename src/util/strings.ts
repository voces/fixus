
const escapeCharacter = String.fromCharCode( 27 );
const escapedSelf = escapeCharacter + escapeCharacter;
const escapedQuote = escapeCharacter + "q";

/**
 * Swaps `'` for `"` and vice versa. Useful for saving JSON in a human-readable
 * format.
 */
export const swapQuotes = ( contents: string ): string => {

	contents = string.gsub( contents, escapeCharacter, escapedSelf )[ 0 ];
	contents = string.gsub( contents, "'", escapedQuote )[ 0 ];
	contents = string.gsub( contents, "\"", "'" )[ 0 ];
	contents = string.gsub( contents, escapedQuote, "\"" )[ 0 ];
	contents = string.gsub( contents, escapedSelf, escapeCharacter )[ 0 ];

	return contents;

};
