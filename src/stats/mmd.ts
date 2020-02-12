
import { MMD__DefineEvent, MMD__LogEvent } from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const logKill = ( killingUnit: unit, dyingUnit: unit ): void =>
	MMD__LogEvent(
		"kill",
		I2S( GetUnitTypeId( killingUnit ) ),
		I2S( GetUnitTypeId( dyingUnit ) ),
		GetPlayerName( GetOwningPlayer( killingUnit ) ),
		GetPlayerName( GetOwningPlayer( dyingUnit ) ),
	);

const logItem = ( event: "picked up" | "dropped"| "used" | "pawned" | "sell", item: item, unit: unit ): void =>
	MMD__LogEvent(
		"item",
		I2S( GetItemTypeId( item ) ),
		GetPlayerName( GetOwningPlayer( unit ) ),
		I2S( GetUnitTypeId( unit ) ),
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
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SELL_ITEM );
	TriggerAddAction( t, (): void => logItem( "sell", GetSoldItem(), GetBuyingUnit() ) );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PAWN_ITEM );
	TriggerAddAction( t, (): void => logItem( "pawned", GetSoldItem(), GetSellingUnit() ) );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0, false );
	TriggerAddAction( t, () => {

		MMD__DefineEvent( "kill", "{2:player} ({0}) killed {3:player} ({1})", "killingType", "dyingType", "pid:killingPlayer", "pid:dyingPlayer" );
		MMD__DefineEvent( "item", "{1:player} ({2}) {3} {0}", "item", "pid:player", "unit", "event" );

	} );

} );
