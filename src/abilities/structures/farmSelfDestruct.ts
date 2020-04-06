
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { spawnCoin } from "../../resources/coins";
import { wrappedTriggerAddAction } from "util/emitLog";

// ===========================================================================
// Trigger: sheepFarmSelfDestruct
// ===========================================================================

const Trig_sheepFarmSelfDestruct_Actions = (): void => {

	KillUnit( GetTriggerUnit() );
	spawnCoin( GetTriggerUnit() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_TRAIN_START );
	wrappedTriggerAddAction( t, "self destruct", Trig_sheepFarmSelfDestruct_Actions );

} );
