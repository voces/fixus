
import { colorizedName, displayToPlayer } from "util/player";
import { registerCommand } from "./registerCommand";

// todo: test this
const action = ( { player: receiver, amount = Infinity }: {player: player; amount?: number} ): void => {

	if (
		! IsPlayerAlly( GetTriggerPlayer(), receiver ) ||
		GetPlayerSlotState( receiver ) !== PLAYER_SLOT_STATE_PLAYING ||
		GetTriggerPlayer() === receiver
	)
		return;

	const playerLumber = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER );

	if ( amount > playerLumber || amount <= 0 )
		amount = playerLumber;

	if ( amount === 0 ) return;

	displayToPlayer( receiver, `${colorizedName( GetTriggerPlayer() )} gave you ${amount} lumber.` );
	displayToPlayer( GetTriggerPlayer(), `${amount} lumber given to ${colorizedName( receiver )}` );
	AdjustPlayerStateBJ( amount, receiver, PLAYER_STATE_RESOURCE_LUMBER );
	AdjustPlayerStateBJ( - amount, GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER );

};

// ===========================================================================
registerCommand( {
	command: "lumber",
	category: "misc",
	description: "Gives the passed player some of your lumber. " +
		"If no lumber argument is passed, gives them all of your lumber.",
	alias: "l",
	args: [
		{ name: "player", type: "player" },
		{ name: "amount", type: "number", required: false },
	],
	fn: action,
} );
