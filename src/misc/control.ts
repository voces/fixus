
import { registerCommand } from "util/commands";
import { colorizedName } from "util/player";

// ===========================================================================
// Trigger: miscControl
// ===========================================================================

const action = ( { player }: {player: player} ): void => {

	if (
		! ( IsPlayerAlly( GetTriggerPlayer(), player ) &&
		GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING )
	)
		return;

	// Grant control
	SetPlayerAllianceStateBJ( GetTriggerPlayer(), player, bj_ALLIANCE_ALLIED_ADVUNITS );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, `Control given to ${colorizedName( player )}.` );

};

// ===========================================================================
registerCommand( {
	command: "control",
	category: "misc",
	description: "Grants the passed player control of your units.",
	alias: "c",
	args: [ { name: "player", type: "player" } ],
	fn: action,
} );
