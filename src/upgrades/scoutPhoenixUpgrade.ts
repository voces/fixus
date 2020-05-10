
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wolves } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";

const RESEARCH_TYPE = FourCC( "R004" );
const ABILITY_TYPE = FourCC( "A00B" );

const enablePhoenix = ( u: unit ): void => {

	UnitAddAbilityBJ( ABILITY_TYPE, u );
	BlzUnitHideAbility( u, ABILITY_TYPE, true );

};

const onResearch = (): void => {

	if ( GetResearched() === RESEARCH_TYPE )
		enablePhoenix( wolves[ GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) ) ] );

};

export const onSpawn = ( u: unit ): void => {

	if ( GetPlayerTechResearched( GetOwningPlayer( u ), RESEARCH_TYPE, true ) )
		enablePhoenix( u );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_RESEARCH_FINISH );
	wrappedTriggerAddAction( t, "phoenix research", onResearch );

} );
