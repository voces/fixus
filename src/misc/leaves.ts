
import { addScriptHook, W3TS_HOOK, getElapsedTime } from "@voces/w3ts";
import {
	countHere,
	mainUnit,
	sheepTeam,
	TriggerRegisterPlayerEventAll,
	wispTeam,
	wolfTeam,
} from "shared";
import { reloadMultiboard } from "util/multiboard";
import { isPlayingPlayer, colorizedName } from "util/player";
import { wrappedTriggerAddAction } from "util/emitLog";
import { setPlayerFlag } from "w3ts-w3mmd";
import { flagDesync, endGame } from "game/states/end";
import { gameState } from "game/states/common";
import { adjustPlayerGold } from "resources/goldPerSecond";

let lastLeave = 0;

// ===========================================================================
// Trigger: miscLeaves
// ===========================================================================

const isSameTeam = ( a: player, b: player ): boolean =>
	IsPlayerInForce( a, wolfTeam ) === IsPlayerInForce( b, wolfTeam );

const onLeave = (): void => {

	// Remove main unit if sheep or wisp
	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) || IsPlayerInForce( GetTriggerPlayer(), wispTeam ) )
		RemoveUnit( mainUnit( GetTriggerPlayer() ) );

	const f = CreateForce();

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( isSameTeam( GetTriggerPlayer(), Player( i ) ) && isPlayingPlayer( Player( i ) ) && GetTriggerPlayer() !== Player( i ) )
			ForceAddPlayer( f, Player( i ) );

	// Divy out resources
	const gold = Math.floor( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) / Math.max( countHere( f ), 1 ) );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), f ) ) {

			SetPlayerAllianceStateBJ( GetTriggerPlayer(), Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );
			DisplayTextToPlayer( Player( i ), 0, 0, `${colorizedName( GetTriggerPlayer() )} gave you ${gold} gold.` );
			adjustPlayerGold( Player( i ), gold );

		}

	SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, 0 );
	DestroyForce( f );

	// Update name
	SetPlayerName( GetTriggerPlayer(), "|r" + GetPlayerName( GetTriggerPlayer() ) );
	reloadMultiboard();

	// desync detection
	const time = getElapsedTime();
	if ( time + 1 <= lastLeave )
		flagDesync();
	lastLeave = time;

	// End game if last
	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) && countHere( sheepTeam ) === 1 )
		endGame( "wolves" );

	else if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) && countHere( wolfTeam ) === 1 )
		endGame( "sheep" );

	else if ( gameState() !== "ended" )
		setPlayerFlag( GetTriggerPlayer(), "leaver" );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	wrappedTriggerAddAction( t, "leaves", onLeave );

} );
