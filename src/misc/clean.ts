
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: miscClean
//
// Work
// ===========================================================================
// TESH.scrollpos=0
// TESH.alwaysfold=0
const Trig_miscClean_Actions = (): void => {

	if ( IsUnitType( GetTriggerUnit(), UNIT_TYPE_HERO ) === false ) {

		TriggerSleepAction( 5 );
		RemoveUnit( GetTriggerUnit() );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, Trig_miscClean_Actions );

} );
