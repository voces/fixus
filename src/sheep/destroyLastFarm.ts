
import { addScriptHook, W3TS_HOOK } from "w3ts";

const s__sheep_xability = FourCC( "A00D" );

// ===========================================================================
// Trigger: sheepDestroyLastFarm
// ===========================================================================

const Trig_sheepDestroyLastFarm_Actions = (): void => {

	if ( GetSpellAbilityId() === s__sheep_xability )

		KillUnit( GetBuilding( GetOwningPlayer( GetTriggerUnit() ) ) );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, Trig_sheepDestroyLastFarm_Actions );

} );
