
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { DOLLY_TYPE } from "shared";

// ===========================================================================
// Trigger: miscDollyMove
// ===========================================================================

// todo: test this
const Trig_miscDollyMove_Conditions = (): boolean =>
	GetUnitTypeId( GetTriggerUnit() ) === DOLLY_TYPE;

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
