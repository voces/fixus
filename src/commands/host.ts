
import { getHost } from "@voces/w3ts";
import { registerCommand } from "./registerCommand";
import { sheepTeam } from "shared";
import { colorizedName } from "util/player";

export const getController = (): player => {

	const host = getHost()?.handle;

	if (
		host &&
		GetPlayerSlotState( host ) === PLAYER_SLOT_STATE_PLAYING
	)
		return host;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )
			return Player( i );

	// this can't happen
	throw "No players!";

};

export const getSheepController = (): player => {

	const host = getHost()?.handle;

	if (
		host &&
		GetPlayerSlotState( host ) === PLAYER_SLOT_STATE_PLAYING &&
		IsPlayerInForce( host, sheepTeam )
	)
		return host;

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
