
import { colorizedName, displayToPlayer } from "util/player";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscGold
// ===========================================================================

// todo: test this
const action = ( { player: receiver, amount = Infinity }: {player: player; amount?: number} ): void => {

	if (
		! IsPlayerAlly( GetTriggerPlayer(), receiver ) ||
		GetPlayerSlotState( receiver ) !== PLAYER_SLOT_STATE_PLAYING ||
		GetTriggerPlayer() === receiver
	)
		return;

	let playerGold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

	// Minimum 2; 1 gold 1 tax
	if ( playerGold < 2 ) return;

	// allow for 1/3rd tax
	playerGold = Math.floor( playerGold * 3 / 4 );

	if ( amount > playerGold || amount <= 0 )
		amount = playerGold;

	const tax = Math.ceil( amount / 3 );

	if ( amount === 0 ) return;

	const amountSt = I2S( amount );
	displayToPlayer( receiver, `${colorizedName( GetTriggerPlayer() )} gave you ${amountSt} gold.` );
	displayToPlayer( GetTriggerPlayer(), `${amountSt} gold given to ${colorizedName( receiver )} (${I2S( tax )} exclusive tax)` );
	AdjustPlayerStateSimpleBJ( receiver, PLAYER_STATE_RESOURCE_GOLD, amount );
	AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, - amount - tax );

};

// ===========================================================================
registerCommand( {
	command: "gold",
	category: "misc",
	description: "Gives the passed player some of your gold. " +
		"If no gold argument is passed, gives them all of your gold. " +
		"A 33% tax is levied on transfered gold.",
	alias: "g",
	args: [
		{ name: "player", type: "player" },
		{ name: "amount", type: "number", required: false },
	],
	fn: action,
} );
