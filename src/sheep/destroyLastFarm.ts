
import { spawnCoin } from "../misc/coins";
import { onSpellCast } from "event";

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
onSpellCast( "destroy last farm", destroyLastFarmAction );
