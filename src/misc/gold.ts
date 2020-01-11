
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { colorizedName, displayToPlayer } from "util/player";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscGold
// ===========================================================================

const action = ( { player: receiver, amount }: {player: player; amount?: number} ): void => {

	if (
		! IsPlayerAlly( GetTriggerPlayer(), receiver ) ||
		GetPlayerSlotState( receiver ) !== PLAYER_SLOT_STATE_PLAYING ||
		GetTriggerPlayer() === receiver
	)
		return;

	if ( amount === undefined )
		amount = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

	else {

		if ( isNaN( amount ) || amount <= 0 ) return;
		amount = Math.min( amount, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) );

	}

	const amountSt = amount.toString();
	displayToPlayer( receiver, `${colorizedName( GetTriggerPlayer() )} gave you ${amountSt} gold.` );
	displayToPlayer( GetTriggerPlayer(), `${amountSt} gold given to ${colorizedName( receiver )}` );
	AdjustPlayerStateSimpleBJ( receiver, PLAYER_STATE_RESOURCE_GOLD, amount );
	AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, - amount );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void =>
	registerCommand( {
		command: "gold",
		alias: "g",
		args: [
			{ name: "player", type: "player" },
			{ name: "amount", type: Number, required: false },
		],
		fn: action,
	} ),
);
