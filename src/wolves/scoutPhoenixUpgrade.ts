
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wolves } from "shared";

const s__ScoutPhoenixUpgrade__data_upgradeId = FourCC( "R004" );
const s__ScoutPhoenixUpgrade__data_abilityId = FourCC( "A00B" );

// library ScoutPhoenixUpgrade:

const ScoutPhoenixUpgrade__EnablePhoenix = ( u: unit ): void => {

	UnitAddAbilityBJ( s__ScoutPhoenixUpgrade__data_abilityId, u );
	BlzUnitHideAbility( u, s__ScoutPhoenixUpgrade__data_abilityId, true );

};

const ScoutPhoenixUpgrade__OnResearch = (): void => {

	if ( GetResearched() === s__ScoutPhoenixUpgrade__data_upgradeId )

		ScoutPhoenixUpgrade__EnablePhoenix( wolves[ GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) ) ] );

};

const ScoutPhoenixUpgrade__Init = (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_RESEARCH_FINISH );
	TriggerAddAction( t, ScoutPhoenixUpgrade__OnResearch );

};

export const ScoutPhoenixUpgrade_onSpawn = ( u: unit ): void => {

	if ( GetPlayerTechResearched( GetOwningPlayer( u ), s__ScoutPhoenixUpgrade__data_upgradeId, true ) )

		ScoutPhoenixUpgrade__EnablePhoenix( u );

};

// library ScoutPhoenixUpgrade ends

addScriptHook( W3TS_HOOK.MAIN_AFTER, ScoutPhoenixUpgrade__Init );
