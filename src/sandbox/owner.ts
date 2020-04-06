
import { registerCommand } from "commands/registerCommand";
import { isSandbox } from "shared";
import { forEachSelectedUnit } from "util/temp";

const prevOwner: Record<number, player> = {};

const action = ( { player }: {player: player | null} ): void => {

	if ( ! isSandbox() ) return;

	forEachSelectedUnit( GetTriggerPlayer(), u => {

		const newOwner = player ||
			( GetOwningPlayer( u ) === GetTriggerPlayer() ?
				prevOwner[ GetHandleId( u ) ] :
				GetTriggerPlayer() );

		prevOwner[ GetHandleId( u ) ] = GetOwningPlayer( u );

		SetUnitOwner( u, newOwner, false );

	} );

};

// ===========================================================================
registerCommand( {
	command: "owner",
	category: "sandbox",
	description: "Sets the selected units' owner to the passed player.",
	alias: "o",
	args: [ { name: "player", type: "player", required: false } ],
	fn: action,
} );
