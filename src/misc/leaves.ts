
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	wolfTeam,
	countHere,
	sheepTeam,
	wispTeam,
	mainUnit,
	endGame,
	TriggerRegisterPlayerEventAll,
} from "shared";
import { reloadMultiboard } from "./multiboard";
import { isPlayingPlayer, colorizedName } from "util/player";

// ===========================================================================
// Trigger: miscLeaves
// ===========================================================================

const isSameTeam = ( a: player, b: player ): boolean =>
	IsPlayerInForce( a, wolfTeam ) === IsPlayerInForce( b, wolfTeam );

const Trig_miscLeaves_Actions = (): void => {

	let i = 0;
	const f = CreateForce();

	for ( i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( isSameTeam( GetTriggerPlayer(), Player( i ) ) && isPlayingPlayer( Player( i ) ) && GetTriggerPlayer() !== Player( i ) )
			ForceAddPlayer( f, Player( i ) );

	// Divy out resources
	const gold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) / Math.max( countHere( f ), 1 );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), f ) ) {

			SetPlayerAllianceStateBJ( GetTriggerPlayer(), Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );
			DisplayTextToPlayer( Player( i ), 0, 0, `${colorizedName( GetTriggerPlayer() )} gave you ${I2S( gold )} gold.` );
			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + gold );

		}

	SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, 0 );
	DestroyForce( f );

	// Update name
	SetPlayerName( GetTriggerPlayer(), "|r" + GetPlayerName( GetTriggerPlayer() ) );
	reloadMultiboard();

	// Remove main unit if sheep or wisp
	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) || IsPlayerInForce( GetTriggerPlayer(), wispTeam ) )
		RemoveUnit( mainUnit( GetTriggerPlayer() ) );

	// End game if last
	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) && countHere( sheepTeam ) === 1 )
		endGame( 2 );

	else if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) && countHere( wolfTeam ) === 1 )
		endGame( 0 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	TriggerAddAction( t, Trig_miscLeaves_Actions );

} );
