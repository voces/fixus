
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: sheepFarmSelfDestruct
// ===========================================================================

const Trig_sheepFarmSelfDestruct_Actions = (): void => {

	KillUnit( GetTriggerUnit() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_TRAIN_START );
	TriggerAddAction( t, Trig_sheepFarmSelfDestruct_Actions );

} );

