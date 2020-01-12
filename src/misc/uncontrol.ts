
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { color } from "shared";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscUncontrol
// ===========================================================================

// todo: test this
const action = ( { player }: {player: player} ): void => {

	if (
		! ( IsPlayerAlly( GetTriggerPlayer(), player ) &&
		GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING )
	)
		return;

	const playerId = GetPlayerId( player );

	// Remove control
	SetPlayerAllianceStateBJ( GetTriggerPlayer(), player, bj_ALLIANCE_ALLIED_VISION );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control taken from " + color[ playerId ] + GetPlayerName( player ) + "|r." );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void =>
	registerCommand( {
		command: "uncontrol",
		alias: "uc",
		args: [ { name: "player", type: "player" } ],
		fn: action,
	} ),
);
