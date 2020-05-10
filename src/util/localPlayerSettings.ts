
import { File, addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { stringify, parse } from "./json";
import { swapQuotes } from "./strings";

export const localPlayerSettings = {
	// version should only be incremented for backwards incompatible changes
	// and should include migrations for upgrading
	version: 1,
	zooms: {
		sheep: 1650,
		wolf: 1650,
	},
	showGps: false,
};

/**
 * Saves to disk the player settings.
 * @param player The player we should be performing the save for. Note passing
 * in `GetLocalPlayer()` will save for everyone.
 */
export const saveLocalPlayerSettings = ( player: player ): void => {

	if ( player && player !== GetLocalPlayer() ) return;

	const contents = stringify( localPlayerSettings );

	if ( typeof contents !== "string" )
		throw "unable to stringify localPlayerSettings";

	File.write(
		"fixus/settings.txt",
		swapQuotes( contents ),
	);

};

/** Prior to Fixus 11, we had a single zooms file with space-deliminated
 * files. */
const loadOldFormat = (): Partial<typeof localPlayerSettings> | undefined => {

	const rawZooms = File.read( "fixus/zooms.txt" );
	if ( rawZooms != null ) {

		const oldZooms = rawZooms
			.slice( 1 ) // old format of file saving prefixed with a `-`
			.split( " " );

		return {
			zooms: {
				sheep: S2R( oldZooms[ 0 ] || "1650" ),
				wolf: S2R( oldZooms[ 1 ] || "1650" ),
			},
		};

	}

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const raw = File.read( "fixus/settings.txt" );

	const json = raw == null ? loadOldFormat() : parse( swapQuotes( raw ) );

	if ( json ) Object.assign( localPlayerSettings, json );

} );
