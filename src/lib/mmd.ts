
import { MMD } from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "w3ts";

export const mmd = new MMD();

mmd.defineEvent( "kill", "{2:player} ({0}) killed {3:player} ({1})", "killingType", "dyingType", "pid:killingPlayer", "pid:dyingPlayer" );
mmd.defineEvent( "item", "{1:player} ({2}) {3} {0}", "item", "pid:player", "unit", "event" );

const logKill = ( killingUnit: unit, dyingUnit: unit ): void =>
	mmd.logEvent(
		"kill",
		GetUnitName( killingUnit ),
		GetUnitName( dyingUnit ),
		I2S( GetPlayerId( GetOwningPlayer( killingUnit ) ) ),
		I2S( GetPlayerId( GetOwningPlayer( dyingUnit ) ) ),
	);

const logItem = ( event: "picked up" | "dropped"| "used" | "pawned" | "sell", item: item, unit: unit ): void =>
	mmd.logEvent(
		"item",
		GetItemName( item ),
		I2S( GetPlayerId( GetOwningPlayer( unit ) ) ),
		GetUnitName( unit ),
		event,
	);

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, (): void => {

		if ( ! IsUnitType( GetDyingUnit(), UNIT_TYPE_STRUCTURE ) && GetKillingUnit() && GetDyingUnit() )
			logKill( GetKillingUnit(), GetDyingUnit() );

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, (): void => logItem( "picked up", GetManipulatedItem(), GetTriggerUnit() ) );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DROP_ITEM );
	TriggerAddAction( t, (): void => logItem( "dropped", GetManipulatedItem(), GetTriggerUnit() ) );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, (): void => logItem( "used", GetManipulatedItem(), GetTriggerUnit() ) );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, (): void => logItem( "sell", GetSoldItem(), GetBuyingUnit() ) );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, (): void => logItem( "pawned", GetSoldItem(), GetSellingUnit() ) );

} );
