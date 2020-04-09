
import { TriggerRegisterPlayerUnitEventAll, fillArray, fillArrayFn, DOLLY_TYPE } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";

const dollyTimer: Array<timer> = [];
const dollyTimerDialog: Array<timerdialog> = [];
const KATAMA_TYPE = FourCC( "n002" );

const dollyClick: Array<number> = fillArray( bj_MAX_PLAYERS, 0 );
let katama = true;

// ===========================================================================
// Trigger: eggDolly
// ===========================================================================

const Trig_eggDolly_Actions = (): void => {

	const player = GetTriggerPlayer();
	const playerId = GetPlayerId( player );
	dollyClick[ playerId ] ++;

	if ( dollyClick[ playerId ] > 10 ) {

		let e = AddSpecialEffectTarget( "Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Human\\HumanLargeDeathExplode\\HumanLargeDeathExplode.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Abilities\\Weapons\\Mortar\\MortarMissile.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Orc\\OrcSmallDeathExplode\\OrcSmallDeathExplode.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );

		if ( katama ) {

			katama = false;
			CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), KATAMA_TYPE, GetUnitX( GetTriggerUnit() ), GetUnitY( GetTriggerUnit() ), GetUnitFacing( GetTriggerUnit() ) + 180 );

		}

		KillUnit( GetTriggerUnit() );
		DisplayTimedTextToPlayer( player, 0, 0, 5, "You killed Dolly! You've been placed in time out!" );

		if ( player === GetLocalPlayer() ) {

			TimerDialogDisplay( dollyTimerDialog[ playerId ], true );
			EnableUserControl( false );

		}

		TimerDialogSetTitle( dollyTimerDialog[ playerId ], "Time out ends in..." );
		TimerStart( dollyTimer[ playerId ], 15, false, () => { /* do nothing */ } );

		PolledWait( 5 );

		if ( player === GetLocalPlayer() ) {

			EnableUserControl( true );
			TimerDialogDisplay( dollyTimerDialog[ playerId ], false );

		}

	}

};

const Trig_eggDolly_Tick = (): void => {

	dollyClick.forEach( ( _, index ) => dollyClick[ index ] -- );

	if ( GetPlayerUnitTypeCount( Player( PLAYER_NEUTRAL_PASSIVE ), DOLLY_TYPE ) === 0 )
		CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), DOLLY_TYPE, - 256, - 768, 270 );

};

const Trig_eggDolly_isDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === DOLLY_TYPE;

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterPlayerUnitEventAll( t, EVENT_PLAYER_UNIT_SELECTED, Condition( Trig_eggDolly_isDolly ) );
	wrappedTriggerAddAction( t, "dolly select", Trig_eggDolly_Actions );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 1, true );
	wrappedTriggerAddAction( t, "dolly tick", Trig_eggDolly_Tick );

	fillArrayFn( bj_MAX_PLAYERS, () => CreateTimer(), dollyTimer );
	fillArrayFn( bj_MAX_PLAYERS, i => CreateTimerDialog( dollyTimer[ i ] ), dollyTimerDialog );

} );
