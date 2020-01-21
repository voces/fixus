
import { colorizedName, displayToPlayer } from "util/player";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscGold
// ===========================================================================

const action = ( { player: receiver, amount = Infinity }: {player: player; amount?: number} ): void => {

	if (
		! IsPlayerAlly( GetTriggerPlayer(), receiver ) ||
		GetPlayerSlotState( receiver ) !== PLAYER_SLOT_STATE_PLAYING ||
		GetTriggerPlayer() === receiver
	)
		return;

	const playerGold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

	if ( amount > playerGold || amount <= 0 )
		amount = playerGold;

	if ( amount === 0 ) return;

	const amountSt = I2S( amount );
	displayToPlayer( receiver, `${colorizedName( GetTriggerPlayer() )} gave you ${amountSt} gold.` );
	displayToPlayer( GetTriggerPlayer(), `${amountSt} gold given to ${colorizedName( receiver )}` );
	AdjustPlayerStateSimpleBJ( receiver, PLAYER_STATE_RESOURCE_GOLD, amount );
	AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, - amount );

};

// ===========================================================================
registerCommand( {
	command: "gold",
	alias: "g",
	args: [
		{ name: "player", type: "player" },
		{ name: "amount", type: "number", required: false },
	],
	fn: action,
} );
