
import { addScriptHook, W3TS_HOOK, File } from "@voces/w3ts";
import { wolfTeam, sheepTeam, wispTeam } from "shared";
import { registerCommand } from "./registerCommand";

let sheepZoom = 1650;
let wolfZoom = 1650;

// ===========================================================================
// Trigger: miscZoom
// ===========================================================================

const adjustZoom = ( zoom: number ): number => {

	const isWolf = IsPlayerInForce( GetLocalPlayer(), wolfTeam );

	// A zoom was not passed, pull from palyer default
	if ( zoom === 0 )
		zoom = isWolf ?
			wolfZoom :
			sheepZoom;

	// No player default, use constant default
	if ( zoom === 0 )
		zoom = 1650;

	// An invalid zoom was passed, use constant default
	if ( zoom <= 0 ) zoom = 1650;

	// A short zoom was passed, so lengthen (23 -> 230 -> 2300)
	while ( zoom <= 400 ) zoom *= 10;

	return zoom;

};

export const zoom = ( zoom?: number ): void => {

	const player = GetTriggerPlayer();
	const isWolf = IsPlayerInForce( player, wolfTeam );
	const isSheep = IsPlayerInForce( player, sheepTeam ) || IsPlayerInForce( player, wispTeam );

	zoom = adjustZoom( zoom || 0 );

	if ( GetLocalPlayer() === player ) {

		// Zoom out
		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );

		// Update local value
		let changed = false;
		if ( isWolf || isSheep )
			if ( isWolf ) {

				if ( wolfZoom !== zoom ) {

					wolfZoom = zoom;
					changed = true;

				}

			} else {

				if ( sheepZoom !== zoom ) {

					sheepZoom = zoom;
					changed = true;

				}

			}

		// Update persisted value
		if ( changed )
			File.write( "fixus/zooms.txt", `${sheepZoom} ${wolfZoom}` );

	}

};

// ===========================================================================
registerCommand( {
	command: "zoom",
	category: "misc",
	alias: "z",
	description: "Sets the camera zoom to the passed amount.",
	args: [ { name: "zoom", type: "number", required: false } ],
	fn: ( { zoom: zoomArg }: {zoom: number} ) => zoom( zoomArg ),
} );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const zooms = File.read( "fixus/zooms.txt" ).replace( "fail", "" ).split( " " );

	sheepZoom = adjustZoom( S2R( zooms[ 0 ] || "" ) );
	wolfZoom = adjustZoom( S2R( zooms[ 1 ] || "" ) );

	// Zoom to sheep zoome for now
	SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, sheepZoom, 0 );

} );
