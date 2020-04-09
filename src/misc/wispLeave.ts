
import { WISP_TYPE } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";

// ===========================================================================
// Trigger: sheepWispLeave
// ===========================================================================

const Trig_sheepWispLeave_Actions = (): void => {

	if ( GetUnitTypeId( GetTriggerUnit() ) !== WISP_TYPE ) return;
	SetUnitX( GetTriggerUnit(), - 256 );
	SetUnitY( GetTriggerUnit(), - 832 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterLeaveRectSimple( t, gg_rct_Pen );
	wrappedTriggerAddAction( t, "wisp leave", Trig_sheepWispLeave_Actions );

} );
