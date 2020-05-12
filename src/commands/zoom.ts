
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wolfTeam, sheepTeam, wispTeam } from "shared";
import { registerCommand } from "./registerCommand";
import { localPlayerSettings, saveLocalPlayerSettings } from "util/localPlayerSettings";

// ===========================================================================
// Trigger: miscZoom
// ===========================================================================

const adjustZoom = ( zoom: number ): number => {

	const isWolf = IsPlayerInForce( GetLocalPlayer(), wolfTeam );

	// A zoom was not passed, pull from player default
	if ( zoom === 0 )
		zoom = isWolf ?
			localPlayerSettings.zooms.wolf :
			localPlayerSettings.zooms.sheep;

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

	zoom = adjustZoom( zoom ?? 0 );

	if ( GetLocalPlayer() === player ) {

		// Zoom out
		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );

		// Update local value
		let changed = false;
		if ( isWolf || isSheep )
			if ( isWolf ) {

				if ( localPlayerSettings.zooms.wolf !== zoom ) {

					localPlayerSettings.zooms.wolf = zoom;
					changed = true;

				}

			} else {

				if ( localPlayerSettings.zooms.sheep !== zoom ) {

					localPlayerSettings.zooms.sheep = zoom;
					changed = true;

				}

			}

		// Update persisted value
		if ( changed )
			saveLocalPlayerSettings( player );

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

	// Zoom to sheep zoome for now
	SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, localPlayerSettings.zooms.sheep ?? 1650, 0 );

} );
