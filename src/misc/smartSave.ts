
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { s__wisp_type } from "shared";

// ===========================================================================
// Trigger: miscSmartSave
// ===========================================================================

const Trig_miscSmartSave_Actions = (): void => {

	const attacked = GetOrderTargetUnit();

	if ( OrderId2StringBJ( GetIssuedOrderId() ) === "smart" && IsUnitAlly( GetTriggerUnit(), GetOwningPlayer( attacked ) ) && GetUnitTypeId( attacked ) === s__wisp_type )

		IssueTargetOrder( GetTriggerUnit(), "attack", attacked );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER );
	TriggerAddAction( t, Trig_miscSmartSave_Actions );

} );
