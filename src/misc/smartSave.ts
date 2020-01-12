
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { WISP_TYPE } from "shared";

// ===========================================================================
// Trigger: miscSmartSave
// ===========================================================================
// todo: test this
const Trig_miscSmartSave_Actions = (): void => {

	const attacked = GetOrderTargetUnit();

	if (
		OrderId2StringBJ( GetIssuedOrderId() ) === "smart" &&
		IsUnitAlly( GetTriggerUnit(), GetOwningPlayer( attacked ) ) &&
		GetUnitTypeId( attacked ) === WISP_TYPE
	)
		IssueTargetOrder( GetTriggerUnit(), "attack", attacked );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER );
	TriggerAddAction( t, Trig_miscSmartSave_Actions );

} );
