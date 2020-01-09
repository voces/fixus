import { s__wisp_type } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: sheepWispLeave
// ===========================================================================

const Trig_sheepWispLeave_Actions = (): void => {

	if ( GetUnitTypeId( GetTriggerUnit() ) === s__wisp_type )

		SetUnitPosition( GetTriggerUnit(), - 256, - 832 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterLeaveRectSimple( t, gg_rct_Pen );
	TriggerAddAction( t, Trig_sheepWispLeave_Actions );

} );
