
import { addScriptHook, W3TS_HOOK } from "w3ts";

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

// library FileIO:

export const s__File_open = ( filename: string ): number => {

	let _this = s__File_List[ 0 ];

	if ( _this === 0 ) {

		_this = s__File_Counter + 1;
		s__File_Counter = _this;

	} else s__File_List[ 0 ] = s__File_List[ _this ];

	s__File_filename[ _this ] = filename;
	s__File_buffer[ _this ] = null;

	return _this;

};

// // This is used to detect invalid characters which aren't supported in preload files.

export const s__File_write = ( _this: number, contents: string ): number => {

	let i = 0;
	let c = 0;
	let len = StringLength( contents );
	let lev = 0;
	const prefix = "-";
	let chunk: string;

	s__File_buffer[ _this ] = null;

	// Check if the string is empty. If null, the contents will be cleared.

	if ( contents === "" )

		len = len + 1;

	// Begin to generate the file
	PreloadGenClear();
	PreloadGenStart();

	while ( true ) {

		if ( i >= len ) break;

		lev = 0;

		chunk = SubString( contents, i, i + s__File_PreloadLimit );
		Preload( "\" )\ncall BlzSetAbilityTooltip(" + I2S( s__File_AbilityList[ c ] ) + ", \"" + prefix + chunk + "\", " + I2S( lev ) + ")\n//" );
		i = i + s__File_PreloadLimit;
		c = c + 1;

	}

	Preload( "\" )\nendfunction\nfunction a takes nothing returns nothing\n //" );
	PreloadGenEnd( s__File_filename[ _this ] );

	return _this;

};

const s__File_readPreload = ( _this: number ): string | null => {

	let i = 0;
	let lev = 0;
	const original: Array<string> = [];
	let chunk = "";
	let output = "";

	while ( true ) {

		if ( i === s__File_AbilityCount ) break;
		original[ i ] = BlzGetAbilityTooltip( s__File_AbilityList[ i ], 0 );
		i = i + 1;

	}

	// Execute the preload file
	Preloader( s__File_filename[ _this ] );

	// Read the output
	i = 0;

	while ( true ) {

		if ( i === s__File_AbilityCount ) break;

		lev = 0;

		// Read from ability index 1 instead of 0 if
		// backwards compatability is enabled

		// Make sure the tooltip has changed
		chunk = BlzGetAbilityTooltip( s__File_AbilityList[ i ], lev );

		if ( chunk === original[ i ] ) {

			if ( i === 0 && output === "" )

				return null;

			return output;

		}

		// Check if the file is an empty string or null

		if ( i === 0 ) {

			if ( SubString( chunk, 0, 1 ) !== "-" )

				return null;

			chunk = SubString( chunk, 1, StringLength( chunk ) );

		}

		// Remove the prefix

		if ( i > 0 )

			chunk = SubString( chunk, 1, StringLength( chunk ) );

		// Restore the tooltip and append the chunk
		BlzSetAbilityTooltip( s__File_AbilityList[ i ], original[ i ], lev );

		output = output + chunk;

		i = i + 1;

	}

	return output;

};

export const s__File_close = ( _this: number ): void => {

	if ( s__File_buffer[ _this ] !== null ) {

		s__File_write( _this, ( s__File_readPreload( _this ) || "" ) + s__File_buffer[ _this ] );
		s__File_buffer[ _this ] = null;

	}

	s__File_List[ _this ] = s__File_List[ 0 ];
	s__File_List[ 0 ] = _this;

};

const s__File_readEx = ( _this: number, close: boolean ): string | null => {

	let output = s__File_readPreload( _this );
	const buf = s__File_buffer[ _this ];

	if ( close )

		s__File_close( _this );

	if ( output === null )

		return buf;

	if ( buf !== null )

		output = output + buf;

	return output;

};

export const s__File_readAndClose = ( _this: number ): string | null => s__File_readEx( _this, true );

// Implemented from module FileIO__FileInit:
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

	// Backwards compatability check

	// Read check
	// s__File_ReadEnabled = s__File_readAndClose( s__File_write( s__File_open( "FileTester.pld" ), "FileIO_" ) ) === "FileIO_";

} );

// library FileIO ends

