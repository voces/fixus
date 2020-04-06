
import { isSandbox } from "shared";
import { forEachPlayer } from "util/temp";
import { registerCommand } from "commands/registerCommand";

// ===========================================================================
registerCommand( {
	command: "grant gold",
	category: "sandbox",
	description: "Gives everyone some gold.",
	alias: "gg",
	args: [ { name: "amount", type: "number", required: false } ],
	fn: ( { amount }: {amount: number | null} ): void => {

		if ( ! isSandbox() ) return;

		const goldAmount = amount || 1000;

		forEachPlayer( p => AdjustPlayerStateBJ( goldAmount, p, PLAYER_STATE_RESOURCE_GOLD ) );

	},
} );

registerCommand( {
	command: "grant lumber",
	category: "sandbox",
	description: "Gives everyone some lumber.",
	alias: "gl",
	args: [ { name: "amount", type: "number", required: false } ],
	fn: ( { amount }: {amount: number | null} ): void => {

		if ( ! isSandbox() ) return;

		const lumberAmount = amount || 6;

		forEachPlayer( p => AdjustPlayerStateBJ( lumberAmount, p, PLAYER_STATE_RESOURCE_LUMBER ) );

	},
} );
