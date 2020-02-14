
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

// ===========================================================================
// Trigger: miscFriendlyAttack
// ===========================================================================

const miscFriendlyAttack_Actions = (): void => {

	const attacked = GetTriggerUnit();

	if (
		IsUnitAlly( attacked, GetOwningPlayer( GetAttacker() ) ) &&
		IsUnitType( attacked, UNIT_TYPE_STRUCTURE )
	)
		KillUnit( attacked );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ATTACKED );
	TriggerAddAction( t, miscFriendlyAttack_Actions );

} );
