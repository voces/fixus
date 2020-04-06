
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { WISP_TYPE } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";

// ===========================================================================
// Trigger: miscSmartSave
// ===========================================================================

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
	wrappedTriggerAddAction( t, "smart save", Trig_miscSmartSave_Actions );

} );
