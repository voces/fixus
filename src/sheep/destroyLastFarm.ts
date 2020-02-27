
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { spawnCoin } from "../misc/coins";

const DESTROY_LAST_FARM_ABILITY_TYPE = FourCC( "A00D" );

// ===========================================================================
// Trigger: sheepDestroyLastFarm
// ===========================================================================

const destroyLastFarmAction = (): void => {

	if ( GetSpellAbilityId() !== DESTROY_LAST_FARM_ABILITY_TYPE ) return;

	const farm = GetBuilding( GetOwningPlayer( GetTriggerUnit() ) );
	KillUnit( farm );
	spawnCoin( farm );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, destroyLastFarmAction );

} );
