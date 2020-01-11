
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { color } from "../shared";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscControl
// ===========================================================================

const action = ( { player }: {player: player} ): void => {

	if (
		! ( IsPlayerAlly( GetTriggerPlayer(), player ) &&
		GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING )
	)
		return;

	const playerId = GetPlayerId( player );

	// Grant control
	SetPlayerAllianceStateBJ( GetTriggerPlayer(), player, bj_ALLIANCE_ALLIED_ADVUNITS );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control given to " + color[ playerId ] + GetPlayerName( player ) + "|r." );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, `Control given to ${color[ playerId ]}${GetPlayerName( player )}|r.` );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void =>
	registerCommand( {
		command: "control",
		alias: "a",
		args: [ { name: "player", type: "player" } ],
		fn: action,
	} ),
);
