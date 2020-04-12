
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	sheepTeam,
	goldFactor,
	countHereReal,
	wolfTeam,
	saveskills,
	wispTeam,
} from "shared";
import { isPlayingPlayer, hasLeft, isComputer } from "util/player";
import { wrappedTriggerAddAction } from "util/emitLog";
import { adjustPlayerGold } from "./goldPerSecond";

const SAVING_FARM_TYPE = FourCC( "ohun" );
const HIDDEN_SAVING_FARM_TYPE = FourCC( "otbk" );
const BETTER_SAING_FARM_TYPE = FourCC( "h009" );
const SUPER_SAVING_FARM_TYPE = FourCC( "h00A" );

// ===========================================================================
// Trigger: miscGoldTick
// ===========================================================================

const Trig_miscGoldTick_Actions = (): void => {

	const wolves = countHereReal( wolfTeam );
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		const player = Player( i );

		// Give sheep their simple gold tick
		if ( IsPlayerInForce( player, sheepTeam ) && GetPlayerController( player ) !== MAP_CONTROL_NONE ) {

			adjustPlayerGold( player, goldFactor() );
			continue;

		}

		// Redistribute
		const playerGold = GetPlayerState( player, PLAYER_STATE_RESOURCE_GOLD );

		if (
			playerGold > 0 &&
			wolves > 0 &&
			ModuloInteger( playerGold, wolves ) === 0 &&
			( isComputer( player ) || hasLeft( player ) )
		) {

			for ( let n = 0; n < bj_MAX_PLAYERS; n ++ ) {

				const player2 = Player( n );
				if ( ! IsPlayerAlly( player, player2 ) || ! isPlayingPlayer( player2 ) ) continue;
				adjustPlayerGold( player2, playerGold / wolves );

			}

			SetPlayerState( player, PLAYER_STATE_RESOURCE_GOLD, 0 );

		}

	}

};

const Trig_miscSavingTick_Actions = (): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		const player = Player( i );
		if ( GetPlayerController( player ) === MAP_CONTROL_NONE ) continue;

		// This might change if we let wolves get saving farms
		if ( IsPlayerInForce( player, sheepTeam ) ) {

			let amount = goldFactor() * (
				GetPlayerUnitTypeCount( player, SAVING_FARM_TYPE ) +
				GetPlayerUnitTypeCount( player, HIDDEN_SAVING_FARM_TYPE ) +
				2 * GetPlayerUnitTypeCount( player, BETTER_SAING_FARM_TYPE ) +
				4 * GetPlayerUnitTypeCount( player, SUPER_SAVING_FARM_TYPE )
			);

			if ( saveskills[ i ] >= 25 ) amount *= 2;

			adjustPlayerGold( player, amount );

		} else if ( IsPlayerInForce( player, wispTeam ) )
			adjustPlayerGold( player, goldFactor() );

	}

};

const wolfTickActions = (): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		const player = Player( i );

		if ( IsPlayerInForce( player, wolfTeam ) )
			adjustPlayerGold( player, goldFactor() );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 2, true );
	wrappedTriggerAddAction( t, "gold tick - 2", Trig_miscGoldTick_Actions );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 4, true );
	wrappedTriggerAddAction( t, "gold tick - 4", Trig_miscSavingTick_Actions );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 3, true );
	wrappedTriggerAddAction( t, "gold tick - 3", wolfTickActions );

} );
