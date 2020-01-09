
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	sheepTeam,
	goldFactor,
	countHereReal,
	wolfTeam,
	saveskills,
} from "../shared";

// ===========================================================================
// Trigger: miscGoldTick
// ===========================================================================

const filterActiveUsers = (): boolean => GetPlayerController( GetFilterPlayer() ) !== MAP_CONTROL_COMPUTER && GetPlayerSlotState( GetFilterPlayer() ) !== PLAYER_SLOT_STATE_LEFT;

const Trig_miscGoldTick_Actions = (): void => {

	let i = 0;
	let n: number;
	let t: number;
	let f: force;

	while ( true ) {

		if ( i === 12 ) break;

		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor() );

		else {

			t = countHereReal( wolfTeam );

			if ( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) > 0 && t > 0 && ModuloInteger( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ), t ) === 0 && ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_LEFT ) ) {

				n = 0;
				f = CreateForce();
				ForceEnumAllies( f, Player( i ), Condition( filterActiveUsers ) );

				while ( true ) {

					if ( n === 12 ) break;

					if ( IsPlayerInForce( Player( n ), f ) )

						SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) / t );

					n = n + 1;

				}

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, 0 );
				DestroyForce( f );

			}

		}

		i = i + 1;

	}

};

const Trig_miscSavingTick_Actions = (): void => {

	let i = 0;

	while ( true ) {

		if ( i === 12 ) break;

		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

			if ( saveskills[ i ] >= 25 ) {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 8 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

			} else {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor() * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

			}

		else

			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor() );

		i = i + 1;

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 2, true );
	TriggerAddAction( t, Trig_miscGoldTick_Actions );
	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 4, true );
	TriggerAddAction( t, Trig_miscSavingTick_Actions );

} );
