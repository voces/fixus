
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { colorizedName, displayToPlayer } from "util/player";
import { registerCommand } from "util/commands";
import { log } from "util/log";

// ===========================================================================
// Trigger: miscGold
// ===========================================================================

// todo: test this
const action = ( { player: receiver, amount = Infinity }: {player: player; amount?: number} ): void => {

	log( "miscGold", "start", amount );

	if (
		! IsPlayerAlly( GetTriggerPlayer(), receiver ) ||
		GetPlayerSlotState( receiver ) !== PLAYER_SLOT_STATE_PLAYING ||
		GetTriggerPlayer() === receiver
	)
		return;

	const playerGold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

	if ( amount > playerGold || amount <= 0 )
		amount = playerGold;

	log( "miscGold", amount );

	const amountSt = I2S( amount );
	displayToPlayer( receiver, `${colorizedName( GetTriggerPlayer() )} gave you ${amountSt} gold.` );
	displayToPlayer( GetTriggerPlayer(), `${amountSt} gold given to ${colorizedName( receiver )}` );
	AdjustPlayerStateSimpleBJ( receiver, PLAYER_STATE_RESOURCE_GOLD, amount );
	AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, - amount );
	log( "miscGold", "end" );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void =>
	registerCommand( {
		command: "gold",
		alias: "g",
		args: [
			{ name: "player", type: "player" },
			{ name: "amount", type: "number", required: false },
		],
		fn: action,
	} ),
);
