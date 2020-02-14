
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

const PRELOAD_UNIT_TYPE = FourCC( "zsmc" );
let preloadUnit: unit;

export const AbilityRangePreload = ( start: number, end: number ): void => {

	if ( end < start ) [ start, end ] = [ end, start ];

	for ( let i = start; i <= end; i ++ )
		UnitAddAbility( preloadUnit, i );

};

// ===========================================================================

addScriptHook( W3TS_HOOK.MAIN_BEFORE, (): void => {

	preloadUnit = CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), PRELOAD_UNIT_TYPE, 0, 0, 0 );
	UnitApplyTimedLife( preloadUnit, 0, 0.001 );
	ShowUnit( preloadUnit, false );
	UnitAddAbility( preloadUnit, FourCC( "Aloc" ) );

} );
