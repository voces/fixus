
import { addScriptHook, MapPlayer, onHostDetect, W3TS_HOOK } from "@voces/w3ts";
import { registerCommand } from "./registerCommand";
import { sheepTeam } from "shared";
import { colorizedName } from "util/player";

let detectedHost: player | undefined;
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	onHostDetect( () => {

		detectedHost = MapPlayer.fromLocal().handle;

	} );

} );

export const getController = (): player => {

	if (
		detectedHost &&
		GetPlayerSlotState( detectedHost ) === PLAYER_SLOT_STATE_PLAYING
	)
		return detectedHost;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )
			return Player( i );

	// this can't happen
	throw "No players!";

};

export const getSheepController = (): player => {

	if (
		detectedHost &&
		GetPlayerSlotState( detectedHost ) === PLAYER_SLOT_STATE_PLAYING &&
		IsPlayerInForce( detectedHost, sheepTeam )
	)
		return detectedHost;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if (
			GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING &&
			IsPlayerInForce( Player( i ), sheepTeam )
		)
			return Player( i );

	// this can't happen
	throw "No players!";

};

const action = (): void => {

	const host = getController();
	const sheepHost = getSheepController();

	DisplayTextToPlayer(
		GetTriggerPlayer(),
		0,
		0,
		host === sheepHost ?

			`The host is ${colorizedName( host )}.` :

			`The host is ${colorizedName( host )} and ` +
			`the sheep host is ${colorizedName( sheepHost )}.`,
	);

};

// ===========================================================================
registerCommand( {
	command: "host",
	category: "host",
	description: "Displays who the host and sheep host are.",
	fn: action,
} );
