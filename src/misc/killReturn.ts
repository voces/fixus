
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { goldFactor, SmallText, mainUnit } from "shared";

// ===========================================================================
// Trigger: miscKillReturn
// ===========================================================================

const Trig_miscKillReturn_Actions = (): void => {

	const gold = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) * goldFactor();
	const xp = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE ) * goldFactor();

	if ( GetKillingUnit() !== null && IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetTriggerUnit() ) ) === false ) {

		if ( gold > 0 ) {

			SetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD ) + gold );
			SmallText( gold, GetTriggerUnit(), 14, 0, 0 );

		}

		if ( xp > 0 ) {

			SetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ), GetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ) ) + xp, true );
			SmallText( xp, GetTriggerUnit(), 3, 16, - 32 );

		}

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, Trig_miscKillReturn_Actions );

} );
