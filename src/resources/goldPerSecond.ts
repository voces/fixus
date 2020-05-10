
import { Timer, addScriptHook, W3TS_HOOK, getElapsedTime } from "@voces/w3ts";
import { localPlayerSettings, saveLocalPlayerSettings } from "util/localPlayerSettings";

const BIN_RESOLUTION = 0.5;
const WINDOW = 12;

let gpsFrame: framehandle;

const bins: number[] = [];
let lastSecond = 0;

/**
 * Formats a decimal for user display. E.g.: 1.75, 10.8, 101.
 * @param number Value to format
 */
const formatDisplay = ( number: number ): string => {

	if ( number < 10 ) return ( Math.round( number * 100 ) / 100 ).toString().slice( 0, 4 );
	if ( number < 100 ) return ( Math.round( number * 10 ) / 10 ).toString().slice( 0, 4 );
	return Math.round( number * 1 ).toString().slice( 0, 3 );

};

const updateDisplay = (): void => {

	// clean up old bins; this means we keep a certain window in memory
	// (12 seconds)
	while ( bins.length > WINDOW / BIN_RESOLUTION )
		bins.shift();

	const sum = bins.reduce( ( sum, value ) => sum + value, 0 );
	const denom = bins.length;
	const average = sum / denom;

	BlzFrameSetText( gpsFrame, `GPS: ${formatDisplay( average )}` );

};

export const adjustPlayerGold = ( player: player, goldAmount: number ): void => {

	AdjustPlayerStateBJ( goldAmount, player, PLAYER_STATE_RESOURCE_GOLD );

	// We only care our income
	if ( goldAmount < 0 || player !== GetLocalPlayer() ) return;

	const now = Math.floor( getElapsedTime() );

	// advance bins until now
	while ( now > lastSecond ) {

		bins.push( 0 );
		lastSecond ++;

	}

	bins[ bins.length - 1 ] += goldAmount;

};

export const toggleGps = ( player: player ): void => {

	// Everything here is local
	if ( player !== GetLocalPlayer() ) return;

	localPlayerSettings.showGps = ! localPlayerSettings.showGps;
	BlzFrameSetVisible( gpsFrame, localPlayerSettings.showGps );
	saveLocalPlayerSettings( player );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const parent = BlzGetOriginFrame( ORIGIN_FRAME_GAME_UI, 0 );
	gpsFrame = BlzCreateFrameByType( "TEXT", "GoldPerSecondFrame", parent, "", 0 );
	BlzFrameSetAbsPoint( gpsFrame, FRAMEPOINT_CENTER, 0.455, 0.56125 );
	BlzFrameSetTextColor( gpsFrame, 0xc0c231 );
	BlzFrameSetVisible( gpsFrame, localPlayerSettings.showGps );

	new Timer().start( BIN_RESOLUTION, true, updateDisplay );

} );
