
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

const DESTROY_LAST_FARM_ABILITY_TYPE = FourCC( "A00D" );

// ===========================================================================
// Trigger: sheepDestroyLastFarm
// ===========================================================================

const destroyLastFarmAction = (): void => {

	if ( GetSpellAbilityId() === DESTROY_LAST_FARM_ABILITY_TYPE )
		KillUnit( GetBuilding( GetOwningPlayer( GetTriggerUnit() ) ) );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, destroyLastFarmAction );

} );
