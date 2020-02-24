
import { registerCommand } from "util/commands";
import { isSolo } from "core/init";
import { forEachSelectedUnit } from "util/temp";

// ===========================================================================
// Trigger: miscControl
// ===========================================================================

const action = ( { player }: {player: player | null} ): void => {

	if ( ! isSolo() ) return;

	const newOwner = player || GetTriggerPlayer();

	forEachSelectedUnit( GetTriggerPlayer(), u => SetUnitOwner( u, newOwner, false ) );

};

// ===========================================================================
registerCommand( {
	command: "owner",
	category: "solo",
	description: "Sets the selected units' owner to the passed player.",
	alias: "o",
	args: [ { name: "player", type: "player", required: false } ],
	fn: action,
} );
