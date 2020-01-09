
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { goldFactor } from "shared";

// ===========================================================================
// Trigger: wolfLumber
// ===========================================================================

const Trig_wolfLumber_Actions = (): void => {

	if ( GetHeroLevel( GetTriggerUnit() ) >= 3 )

		SetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER ) + 2 * goldFactor() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_HERO_LEVEL );
	TriggerAddAction( t, Trig_wolfLumber_Actions );

} );
