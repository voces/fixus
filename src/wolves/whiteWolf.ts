
import { wws, WHITE_WOLF_TYPE, wolves, fillArrayFn } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const wwTimer: Array<timer> = [];
const wwTimerDialog: Array<timerdialog> = [];
const WHITE_WOLF_ITEM_TYPE = FourCC( "I003" );

// ===========================================================================
// Trigger: wolfWhiteWolf
// ===========================================================================

// todo: test whether hitting level 10 breaks this
const Trig_wolfWhiteWolf_Actions = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) === WHITE_WOLF_ITEM_TYPE ) {

		RemoveItem( GetManipulatedItem() );
		let original = GetTriggerUnit();
		let x = GetUnitX( original );
		let y = GetUnitY( original );
		let f = GetUnitFacing( original );
		const p = GetOwningPlayer( original );
		const pId = GetPlayerId( p );

		if ( IsUnitType( GetTriggerUnit(), UNIT_TYPE_HERO ) ) {

			// Freeze wolf unit
			PauseUnit( original, true );
			SetUnitOwner( original, Player( PLAYER_NEUTRAL_PASSIVE ), false );
			SetUnitX( original, - 6144 );
			SetUnitY( original, - 6656 );
			wws[ pId ] = original;

			// Create the White Wolf
			const ww = CreateUnit( p, WHITE_WOLF_TYPE, x, y, f );
			wolves[ pId ] = ww;
			SelectUnitForPlayerSingle( ww, p );

			// Start the timer
			// todo: should be nullable
			TimerStart( wwTimer[ pId ], 60, false, () => { /* do nothing */ } );
			TimerDialogSetTitle( wwTimerDialog[ pId ], "Changing in..." );

			if ( GetLocalPlayer() === p )
				TimerDialogDisplay( wwTimerDialog[ pId ], true );

			TriggerSleepAction( 60 );

			// Clear the timer

			if ( GetLocalPlayer() === p )
				TimerDialogDisplay( wwTimerDialog[ pId ], false );

			// Remove the white wolf
			x = GetUnitX( ww );
			y = GetUnitY( ww );
			f = GetUnitFacing( ww );
			RemoveUnit( ww );

			// Restore the wolf unit
			original = wws[ pId ];
			wolves[ pId ] = original;
			PauseUnit( original, false );
			SetUnitOwner( original, p, false );
			SetUnitPosition( original, x, y );
			SelectUnitForPlayerSingle( original, p );

		} else {

			RemoveUnit( original );
			const ww = CreateUnit( p, WHITE_WOLF_TYPE, x, y, f );
			UnitApplyTimedLife( ww, FourCC( "BTLF" ), 150 );
			SelectUnitForPlayerSingle( ww, p );

		}

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, Trig_wolfWhiteWolf_Actions );

	fillArrayFn( bj_MAX_PLAYERS, () => CreateTimer(), wwTimer );
	fillArrayFn( bj_MAX_PLAYERS, i => CreateTimerDialog( wwTimer[ i ] ), wwTimerDialog );

} );
