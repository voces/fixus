
import { registerCommand } from "util/commands";
import { colorizedName } from "util/player";

// ===========================================================================
// Trigger: miscUncontrol
// ===========================================================================

const action = ( { player }: {player: player} ): void => {

	if (
		! ( IsPlayerAlly( GetTriggerPlayer(), player ) &&
		GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING )
	)
		return;

	// Remove control
	SetPlayerAllianceStateBJ( GetTriggerPlayer(), player, bj_ALLIANCE_ALLIED_VISION );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, `Control taken from ${colorizedName( player )}.` );

};

// ===========================================================================

registerCommand( {
	command: "uncontrol",
	alias: "uc",
	args: [ { name: "player", type: "player" } ],
	fn: action,
} );
