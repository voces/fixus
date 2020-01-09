
import { TriggerRegisterPlayerUnitEventAll, fillArray } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const dollyTimer: Array<timer> = [];
const dollyTimerDialog: Array<timerdialog> = [];
const s__sheep_dolly = FourCC( "nshf" );
const s__sheep_katama = FourCC( "n002" );

const dollyClick: Array<number> = fillArray( bj_MAX_PLAYERS, 0 );
let katama = true;

// ===========================================================================
// Trigger: eggDolly
// ===========================================================================

const Trig_eggDolly_Actions = (): void => {

	let e: effect;
	const playerId = GetPlayerId( GetTriggerPlayer() );
	dollyClick[ playerId ] = dollyClick[ playerId ] + 1;

	if ( dollyClick[ playerId ] > 10 ) {

		e = AddSpecialEffectTarget( "Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Human\\HumanLargeDeathExplode\\HumanLargeDeathExplode.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Abilities\\Weapons\\Mortar\\MortarMissile.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );
		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Orc\\OrcSmallDeathExplode\\OrcSmallDeathExplode.mdx", GetTriggerUnit(), "origin" );
		DestroyEffect( e );

		if ( katama ) {

			katama = false;
			CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_katama, GetUnitX( GetTriggerUnit() ), GetUnitY( GetTriggerUnit() ), GetUnitFacing( GetTriggerUnit() ) + 180 );

		}

		KillUnit( GetTriggerUnit() );
		DisplayTimedTextToPlayer( GetTriggerPlayer(), 0, 0, 5, "You killed Dolly! You've been placed in time out!" );
		// todo: should be nullable
		TimerStart( dollyTimer[ playerId ], 15, false, () => { /* do nothing */ } );
		TimerDialogSetTitle( dollyTimerDialog[ playerId ], "Time out ends in..." );

		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

			TimerDialogDisplay( dollyTimerDialog[ playerId ], true );
			EnableUserControl( false );

		}

		TriggerSleepAction( 15 );

		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

			EnableUserControl( true );
			TimerDialogDisplay( dollyTimerDialog[ playerId ], false );

		}

	}

};

const Trig_eggDolly_Tick = (): void => {

	let i = 0;

	while ( true ) {

		if ( i === 12 ) break;

		if ( dollyClick[ i ] > 0 )

			dollyClick[ i ] = dollyClick[ i ] - 1;

		i = i + 1;

	}

	if ( GetPlayerUnitTypeCount( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly ) === 0 )

		CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly, - 256, - 768, 270 );

};

const Trig_eggDolly_isDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__sheep_dolly;

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterPlayerUnitEventAll( t, EVENT_PLAYER_UNIT_SELECTED, Condition( Trig_eggDolly_isDolly ) );
	TriggerAddAction( t, Trig_eggDolly_Actions );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 1, true );
	TriggerAddAction( t, Trig_eggDolly_Tick );

	let i = 0;
	while ( true ) {

		if ( i === 12 ) break;
		dollyTimer[ i ] = CreateTimer();
		dollyTimerDialog[ i ] = CreateTimerDialog( dollyTimer[ i ] );
		i = i + 1;

	}

} );
