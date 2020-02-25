
import { registerCommand } from "util/commands";
import { isSolo } from "core/init";
import { forEachPlayer } from "util/temp";
import { log } from "util/log";

// ===========================================================================
registerCommand( {
	command: "grant gold",
	category: "solo",
	description: "Gives everyone some gold.",
	alias: "gg",
	args: [ { name: "amount", type: "number", required: true } ],
	fn: ( { gold }: {gold: number | null} ): void => {

		log( "gold", gold );

		if ( ! isSolo() ) return;

		const goldAmount = gold || 1000;

		forEachPlayer( p => {

			AdjustPlayerStateBJ( goldAmount, p, PLAYER_STATE_RESOURCE_GOLD );

		} );

	},
} );

registerCommand( {
	command: "grant lumber",
	category: "solo",
	description: "Gives everyone some lumber.",
	alias: "gl",
	args: [ { name: "amount", type: "number", required: false } ],
	fn: ( { lumber }: {lumber: number | null} ): void => {

		if ( ! isSolo() ) return;

		const lumberAmount = lumber || 1000;

		forEachPlayer( p => AdjustPlayerStateBJ( lumberAmount, p, PLAYER_STATE_RESOURCE_LUMBER ) );

	},
} );
