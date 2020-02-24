
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import {
	wolfTeam,
	countHere,
	sheepTeam,
	wispTeam,
	mainUnit,
	TriggerRegisterPlayerEventAll,
} from "shared";
import { reloadMultiboard } from "./multiboard";
import { isPlayingPlayer, colorizedName } from "util/player";
import { endGame, flagDesync } from "../core/game";
import { emitLog } from "../util/emitLog";

let lastLeave = 0;

// ===========================================================================
// Trigger: miscLeaves
// ===========================================================================

const isSameTeam = ( a: player, b: player ): boolean =>
	IsPlayerInForce( a, wolfTeam ) === IsPlayerInForce( b, wolfTeam );

const Trig_miscLeaves_Actions = (): void => {

	try {

		// Remove main unit if sheep or wisp
		if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) || IsPlayerInForce( GetTriggerPlayer(), wispTeam ) )
			RemoveUnit( mainUnit( GetTriggerPlayer() ) );

		// Update name
		SetPlayerName( GetTriggerPlayer(), "|r" + GetPlayerName( GetTriggerPlayer() ) );
		reloadMultiboard();

		const f = CreateForce();

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
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

		// desync detection
		const time = TimerGetElapsed( bj_gameStartedTimer );
		if ( time + 1 <= lastLeave )
			flagDesync();
		lastLeave = time;

		// End game if last
		if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) && countHere( sheepTeam ) === 1 )
			endGame( "wolves" );

		else if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) && countHere( wolfTeam ) === 1 )
			endGame( "sheep" );

	} catch ( err ) {

		emitLog( "leaves", err );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	TriggerAddAction( t, Trig_miscLeaves_Actions );

} );
