
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: miscDollyMove
// ===========================================================================
const Trig_miscDollyMove_Conditions = (): boolean => {

	if ( ! ( GetUnitTypeId( GetTriggerUnit() ) === FourCC( "nshf" ) ) )

		return false;

	return true;

};

const Trig_miscDollyMove_Actions = (): void => {

	IssueImmediateOrderBJ( GetTriggerUnit(), "stop" );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SELL_ITEM );
	TriggerAddCondition( t, Condition( Trig_miscDollyMove_Conditions ) );
	TriggerAddAction( t, Trig_miscDollyMove_Actions );

} );
