
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

// globals from FileIO:
// Enable this if you want to allow the system to read files generated in patch 1.30 or below.
// NOTE: For this to work properly you must edit the 'Amls' ability and change the levels to 2
// as well as typing something in "Level 2 - Text - Tooltip - Normal" text field.
//
// Enabling this will also cause the system to treat files written with .write("") as empty files.
//
// This setting is really only intended for those who were already using the system in their map
// prior to patch 1.31 and want to keep old files created with this system to still work.
// endglobals from FileIO

const s__File_AbilityCount = 10;
const s__File_PreloadLimit = 200;
let s__File_Counter = 0;
const s__File_List: Array<number> = [ 0 ];
const s__File_AbilityList: Array<number> = [];
const s__File_filename: Array<string> = [];
const s__File_buffer: Array<string | null> = [];
// // let s__File_ReadEnabled: boolean;

/**
 * Opens a file and returns a number that acts as an index for other functions
 */
export const openFile = ( filename: string ): number => {

	let _this = s__File_List[ 0 ];

	if ( _this === 0 ) {

		_this = s__File_Counter + 1;
		s__File_Counter = _this;

	} else s__File_List[ 0 ] = s__File_List[ _this ];

	s__File_filename[ _this ] = filename;
	s__File_buffer[ _this ] = null;

	return _this;

};

/**
 * Writes to a file index the passed contents
 */
export const writeFile = ( _this: number, contents: string, writeOnly = false ): number => {

	let len = StringLength( contents );

	s__File_buffer[ _this ] = null;

	// Check if the string is empty. If null, the contents will be cleared.
	if ( contents === "" ) len = len + 1;

	// Begin to generate the file
	PreloadGenClear();
	PreloadGenStart();

	if ( writeOnly )

		for ( let i = 0; i < len; i += s__File_PreloadLimit ) {

			const chunk = SubString( contents, i, i + s__File_PreloadLimit );
			Preload( chunk );

		}

	else {

		const prefix = "-";

		for ( let i = 0, c = 0; i < len; i += s__File_PreloadLimit, c ++ ) {

			const chunk = SubString( contents, i, i + s__File_PreloadLimit );
			Preload( "\" )\ncall BlzSetAbilityIcon(" + I2S( s__File_AbilityList[ c ] ) + ", \"" + prefix + chunk + "\")\n//" );

		}

		Preload( "\" )\nendfunction\nfunction a takes nothing returns nothing\n //" );

	}

	PreloadGenEnd( s__File_filename[ _this ] );

	return _this;

};

const s__File_readPreload = ( _this: number ): string | null => {

	const original: Array<string> = [];
	let output = "";

	for ( let i = 0; i < s__File_AbilityCount; i ++ )
		original[ i ] = BlzGetAbilityIcon( s__File_AbilityList[ i ] );

	// Execute the preload file
	Preloader( s__File_filename[ _this ] );

	// Read the output
	for ( let i = 0; i < s__File_AbilityCount; i ++ ) {

		// Make sure the tooltip has changed
		let chunk = BlzGetAbilityIcon( s__File_AbilityList[ i ] );

		if ( chunk === original[ i ] ) {

			if ( i === 0 && output === "" ) return null;
			return output;

		}

		// Check if the file is an empty string or null
		if ( i === 0 ) {

			if ( SubString( chunk, 0, 1 ) !== "-" ) return null;
			chunk = SubString( chunk, 1, StringLength( chunk ) );

		}

		// Remove the prefix
		if ( i > 0 ) chunk = SubString( chunk, 1, StringLength( chunk ) );

		// Restore the tooltip and append the chunk
		BlzSetAbilityIcon( s__File_AbilityList[ i ], original[ i ] );

		output = output + chunk;

	}

	return output;

};

export const closeFile = ( _this: number ): void => {

	if ( s__File_buffer[ _this ] != null ) {

		writeFile( _this, ( s__File_readPreload( _this ) || "" ) + s__File_buffer[ _this ] );
		s__File_buffer[ _this ] = null;

	}

	s__File_List[ _this ] = s__File_List[ 0 ];
	s__File_List[ 0 ] = _this;

};

const s__File_readEx = ( _this: number, close: boolean ): string | null => {

	let output = s__File_readPreload( _this );
	const buf = s__File_buffer[ _this ];

	if ( close ) closeFile( _this );

	if ( output == null ) return buf;

	if ( buf != null ) output = output + buf;

	return output;

};

export const readAndCloseFile = ( _this: number ): string | null =>
	s__File_readEx( _this, true );

addScriptHook( W3TS_HOOK.MAIN_BEFORE, (): void => {

	// We can't use a single ability with multiple levels because
	// tooltips return the first level's value if the value hasn't
	// been set. This way we don't need to edit any object editor data.
	s__File_AbilityList[ 0 ] = FourCC( "Amls" );
	s__File_AbilityList[ 1 ] = FourCC( "Aroc" );
	s__File_AbilityList[ 2 ] = FourCC( "Amic" );
	s__File_AbilityList[ 3 ] = FourCC( "Amil" );
	s__File_AbilityList[ 4 ] = FourCC( "Aclf" );
	s__File_AbilityList[ 5 ] = FourCC( "Acmg" );
	s__File_AbilityList[ 6 ] = FourCC( "Adef" );
	s__File_AbilityList[ 7 ] = FourCC( "Adis" );
	s__File_AbilityList[ 8 ] = FourCC( "Afbt" );
	s__File_AbilityList[ 9 ] = FourCC( "Afbk" );

} );

