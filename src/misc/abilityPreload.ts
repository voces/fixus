
import { addScriptHook, W3TS_HOOK } from "w3ts";

// globals from AbilityPreload:
const AbilityPreload__PreloadUnitRawcode = FourCC( "zsmc" );
// This is the rawcode for "Sammy!". It is never used and has no model,
// which makes an ideal preloading unit. Change it if you want to.
let AbilityPreload__PreloadUnit: unit;
// endglobals from AbilityPreload

// library AbilityPreload:
// ===========================================================================
// Information:
// ==============
//
//      Preloading removes the noticeable delay the first time an ability
//  is loaded in a game. If an ability was not already on a pre-placed unit
//  or a unit that was created during initialization, preloading is needed
//  to prevent a delay.
//
// ===========================================================================
// AbilityPreload API:
// =====================
//
//  AbilityPreload(abilityid) :
//        Call this before any time has elapsed to preload a specific
//     ability. If debug mode is enabled, you will see an error message
//     if you call this after initialization, or if you try to preload
//     an ability that does not exist. Will inline to a UnitAddAbility
//     call if debug mode is disabled.
//
//  AbilityRangePreload(start, end) :
//        Same as AbilityPreload, but preloads a range of abilities.
//      It will iterates between the two rawcode values and preload
//      every ability along the way. It will not show an error message
//      for non-existent abilities.
//
// ===========================================================================
// Configuration:
// ================

// ===========================================================================

export const AbilityRangePreload = ( start: number, end: number ): void => {

	let i = 1;

	if ( start > end )

		i = - 1;

	while ( true ) {

		if ( start > end ) break;
		UnitAddAbility( AbilityPreload__PreloadUnit, start );
		start = start + i;

	}

};

// ===========================================================================

addScriptHook( W3TS_HOOK.MAIN_BEFORE, (): void => {

	AbilityPreload__PreloadUnit = CreateUnit( Player( 15 ), AbilityPreload__PreloadUnitRawcode, 0, 0, 0 );
	UnitApplyTimedLife( AbilityPreload__PreloadUnit, 0, 0.001 );
	ShowUnit( AbilityPreload__PreloadUnit, false );
	UnitAddAbility( AbilityPreload__PreloadUnit, FourCC( "Aloc" ) );

} );

// library AbilityPreload ends
