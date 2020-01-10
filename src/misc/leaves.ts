
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	color,
	wolfTeam,
	countHere,
	sheepTeam,
	wispTeam,
	mainUnit,
	endGame,
	TriggerRegisterPlayerEventAll,
} from "../shared";
import { reloadMultiboard } from "./multiboard";
import { isPlayingPlayer } from "util/player";

// ===========================================================================
// Trigger: miscLeaves
// ===========================================================================

const isSameTeam = ( a: player, b: player ): boolean =>
	IsPlayerInForce( a, wolfTeam ) === IsPlayerInForce( b, wolfTeam );

const Trig_miscLeaves_Actions = (): void => {

	let i = 0;
	const gold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) / i; // divide by zero
	const f = CreateForce();

	while ( true ) {

		if ( i === 12 ) break;

		if ( isSameTeam( GetTriggerPlayer(), Player( i ) ) && isPlayingPlayer( Player( i ) ) )

			ForceAddPlayer( f, Player( i ) );

		i = i + 1;

	}

	// Divy out resources
	i = countHere( f );

	if ( i > 1 )

		i = i - 1;

	i = 0;

	while ( true ) {

		if ( i === 12 ) break;

		if ( IsPlayerInForce( Player( i ), f ) ) {

			SetPlayerAllianceStateBJ( GetTriggerPlayer(), Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );
			DisplayTextToPlayer( Player( i ), 0, 0, color[ GetPlayerId( GetTriggerPlayer() ) ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + gold );

		}

		i = i + 1;

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
