
import { wolfTeam, sheepTeam } from "shared";
import { forEachPlayerUnit } from "util/temp";
import { colorizedName } from "util/player";
import { registerCommand } from "./registerCommand";
import { getHost } from "w3ts";

// ===========================================================================
// Trigger: sheepCommands
// ===========================================================================

const cheapStructureFilter = Condition( () =>
	IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) &&
	BlzGetUnitIntegerField( GetFilterUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) < 5,
);

const structureFilter = Condition( () =>IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) );

registerCommand( {
	command: "destroy",
	category: "sheep",
	description: "Destroys all of your farms that have a bounty less than 5.",
	alias: "d",
	fn: (): void => {

		if ( ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )
			forEachPlayerUnit( GetTriggerPlayer(), RemoveUnit, cheapStructureFilter );

	},
} );

registerCommand( {
	command: "destroy all",
	category: "sheep",
	description: "Destroys all of your farms.",
	alias: "dall",
	fn: (): void => {

		if ( ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )
			forEachPlayerUnit( GetTriggerPlayer(), RemoveUnit, structureFilter );

	},
} );

const getController = (): player => {

	const host = getHost()?.handle;

	if ( host && IsPlayerInForce( host, sheepTeam ) )
		return host;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if (
			GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING &&
			IsPlayerInForce( Player( i ), sheepTeam )
		)
			return Player( i );

	// this can't happen
	throw "No players!";

};

registerCommand( {
	command: "wolf gold",
	category: "host",
	description: "Gives each wolf X gold.",
	alias: "wg",
	args: [ { name: "amount", type: "number", required: false } ],
	fn: ( { amount }: {amount?: number} ): void => {

		if ( getController() !== GetTriggerPlayer() ) return;

		amount = amount || 100;

		DisplayTextToPlayer(
			GetLocalPlayer(),
			0,
			0,
			`${colorizedName( GetTriggerPlayer() )} gave the shepherds ${amount} gold!`,
		);

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( IsPlayerInForce( Player( i ), wolfTeam ) )
				AdjustPlayerStateSimpleBJ( Player( i ), PLAYER_STATE_RESOURCE_GOLD, amount );

	},
} );

registerCommand( {
	command: "destroy all farms",
	category: "host",
	description: "Destroys all farms that have a bounty less than 5.",
	fn: (): void => {

		if ( getController() !== GetTriggerPlayer() ) return;

		DisplayTextToPlayer(
			GetLocalPlayer(),
			0,
			0,
			colorizedName( GetTriggerPlayer() ) + " has destroyed all the farms!",
		);

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			forEachPlayerUnit( Player( i ), RemoveUnit, cheapStructureFilter );

	},
} );
