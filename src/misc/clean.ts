
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: miscClean
// ===========================================================================

const action = (): void => {

	if ( IsUnitType( GetTriggerUnit(), UNIT_TYPE_HERO ) !== false ) return;

	TriggerSleepAction( 5 );
	RemoveUnit( GetTriggerUnit() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, action );

} );
