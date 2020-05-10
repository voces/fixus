
import { wws, WHITE_WOLF_TYPE, wolves, fillArrayFn } from "shared";
import { addScriptHook, W3TS_HOOK, getElapsedTime } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";
import { removeQuickShop } from "../wolves/quickShops";
import { onSummon } from "util/event";

const wwTimer: Array<timer> = [];
const wwTimerDialog: Array<timerdialog> = [];
const WHITE_WOLF_ITEM_TYPE = FourCC( "I003" );
const summonTimes: Map<unit, number> = new Map();

// ===========================================================================
// Trigger: wolfWhiteWolf
// ===========================================================================

const onUnitPickupItem = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) !== WHITE_WOLF_ITEM_TYPE ) return;

	RemoveItem( GetManipulatedItem() );
	let original = GetTriggerUnit();
	let x = GetUnitX( original );
	let y = GetUnitY( original );
	let f = GetUnitFacing( original );
	const p = GetOwningPlayer( original );
	const pId = GetPlayerId( p );

	// White wolf is a hero (wolf)
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

		PolledWait( 60 );

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

		return;

	}

	// White wolf is a summoned unit

	const timeOfWW = getElapsedTime();
	const unitSummonedAtTime = summonTimes.get( original ) || timeOfWW;
	const unitSummonedDuration = timeOfWW - unitSummonedAtTime;
	const unitSummonedRemaining = 300 - unitSummonedDuration;
	const wwDuration = 65 + unitSummonedRemaining * 0.2;

	removeQuickShop( original );
	RemoveUnit( original );
	const ww = CreateUnit( p, WHITE_WOLF_TYPE, x, y, f );
	UnitApplyTimedLife( ww, FourCC( "BTLF" ), wwDuration );
	SelectUnitForPlayerSingle( ww, p );

};

const onUnitSummon = (): void => {

	// When Mirror Image is used, this gets called n+1 times, where the +1 has
	// no summoned unit
	const summonedUnit = GetSummonedUnit();
	if ( summonedUnit != null )
		summonTimes.set( summonedUnit, getElapsedTime() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	fillArrayFn( bj_MAX_PLAYERS, () => CreateTimer(), wwTimer );
	fillArrayFn( bj_MAX_PLAYERS, i => CreateTimerDialog( wwTimer[ i ] ), wwTimerDialog );

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	wrappedTriggerAddAction( t, "white wolf pickup", onUnitPickupItem );

	onSummon( "white wolf", onUnitSummon );

} );
