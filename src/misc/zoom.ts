
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wolfTeam } from "shared";
import { s__File_close, s__File_write, s__File_open, s__File_readAndClose } from "./fileIO";
import { registerCommand } from "util/commands";

const sheepZoom: Array<number> = [];
const wolfZoom: Array<number> = [];

// ===========================================================================
// Trigger: miscZoom
// ===========================================================================

const action = ( { zoom = 0 }: {zoom: number} ): void => {

	const playerId = GetPlayerId( GetTriggerPlayer() );

	if ( zoom === 0 )
		zoom = IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ?
			wolfZoom[ playerId ] :
			sheepZoom[ playerId ];

	if ( zoom <= 0 ) zoom = 1650;

	while ( zoom <= 400 ) zoom *= 10;

	if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) wolfZoom[ playerId ] = zoom;
	else sheepZoom[ playerId ] = zoom;

	if ( GetLocalPlayer() === GetTriggerPlayer() ) {

		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );
		s__File_close( s__File_write( s__File_open( "fixus/zooms.txt" ), R2S( sheepZoom[ playerId ] ) + " " + R2S( wolfZoom[ playerId ] ) ) );

	}

};

// ===========================================================================
registerCommand( {
	command: "zoom",
	category: "misc",
	alias: "z",
	description: "Sets the camera zoom to the passed amount.",
	args: [ { name: "zoom", type: "number", required: false } ],
	fn: action,
} );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const zooms = ( s__File_readAndClose( s__File_open( "fixus/zooms.txt" ) ) || "" ).split( " " );
	const playerId = GetPlayerId( GetLocalPlayer() );

	sheepZoom[ playerId ] = S2R( zooms[ 0 ] || "" );
	if ( sheepZoom[ playerId ] === 0 )
		sheepZoom[ playerId ] = 1650;

	wolfZoom[ playerId ] = S2R( zooms[ 1 ] || "" );
	if ( wolfZoom[ playerId ] === 0 )
		wolfZoom[ playerId ] = 1650;

	SetCameraField(
		CAMERA_FIELD_TARGET_DISTANCE,
		IsPlayerInForce( GetLocalPlayer(), wolfTeam ) ? wolfZoom[ playerId ] : sheepZoom[ playerId ],
		0,
	);

} );
