
import { WOLF_TYPE, s__wolf_blacktype, s__wolf_imbatype, wws, s__wolf_wwtype, wolves } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const wwTimer: Array<timer> = [];
const wwTimerDialog: Array<timerdialog> = [];
const s__wolf_wwitem = FourCC( "I003" );

// ===========================================================================
// Trigger: wolfWhiteWolf
// ===========================================================================

const Trig_wolfWhiteWolf_Actions = (): void => {

	let x: number;
	let y: number;
	let f: number;
	let p: player;
	let original: unit;
	let ww: unit;

	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_wwitem ) {

		RemoveItem( GetManipulatedItem() );
		original = GetTriggerUnit();
		x = GetUnitX( original );
		y = GetUnitY( original );
		f = GetUnitFacing( original );
		p = GetOwningPlayer( original );

		if ( GetUnitTypeId( original ) === WOLF_TYPE || GetUnitTypeId( original ) === s__wolf_blacktype || GetUnitTypeId( original ) === s__wolf_imbatype ) {

			// Freeze wolf unit
			PauseUnit( original, true );
			SetUnitOwner( original, Player( PLAYER_NEUTRAL_PASSIVE ), false );
			SetUnitX( original, - 6144 );
			SetUnitY( original, - 6656 );
			wws[ GetPlayerId( p ) ] = original;

			// Create the White Wolf
			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
			wolves[ GetPlayerId( p ) ] = ww;
			SelectUnitForPlayerSingle( ww, p );

			// Start the timer
			// todo: should be nullable
			TimerStart( wwTimer[ GetPlayerId( p ) ], 60, false, () => { /* do nothing */ } );
			TimerDialogSetTitle( wwTimerDialog[ GetPlayerId( p ) ], "Changing in..." );

			if ( GetLocalPlayer() === p )

				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], true );

			TriggerSleepAction( 60 );

			// Clear the timer

			if ( GetLocalPlayer() === p )

				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], false );

			// Remove the white wolf
			x = GetUnitX( ww );
			y = GetUnitY( ww );
			f = GetUnitFacing( ww );
			RemoveUnit( ww );

			// Restore the wolf unit
			wolves[ GetPlayerId( p ) ] = original;
			PauseUnit( original, false );
			SetUnitOwner( original, p, false );
			SetUnitPosition( original, x, y );
			SelectUnitForPlayerSingle( original, p );

		} else {

			RemoveUnit( original );
			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
			UnitApplyTimedLife( ww, FourCC( "BTLF" ), 150 );
			SelectUnitForPlayerSingle( ww, p );

		}

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let i = 0;
	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, Trig_wolfWhiteWolf_Actions );

	while ( true ) {

		if ( i === 12 ) break;
		wwTimer[ i ] = CreateTimer();
		wwTimerDialog[ i ] = CreateTimerDialog( wwTimer[ i ] );
		i = i + 1;

	}

} );
