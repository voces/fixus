
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { goldFactor } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";

// ===========================================================================
// Trigger: wolfLumber
// ===========================================================================

const Trig_wolfLumber_Actions = (): void => {

	if ( GetHeroLevel( GetTriggerUnit() ) >= 3 )
		AdjustPlayerStateBJ( 2 * goldFactor(), GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_HERO_LEVEL );
	wrappedTriggerAddAction( t, "lumber hero level", Trig_wolfLumber_Actions );

} );
