
import { MMD } from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "w3ts";

export const mmd = new MMD();

mmd.defineEvent( "kill", "killingType", "dyingType", "killingPlayer", "dyingPlayer" );
mmd.defineEvent( "item", "item", "player", "unit", "event" );

const logKill = ( killingUnit: unit, dyingUnit: unit ): void =>
	mmd.logEvent(
		"kill",
		GetUnitName( killingUnit ),
		GetUnitName( dyingUnit ),
		GetPlayerName( GetOwningPlayer( killingUnit ) ),
		GetPlayerName( GetOwningPlayer( dyingUnit ) ),
	);

const logItem = ( item: item, unit: unit, event: "acquire" | "use" | "lose" ): void =>
	mmd.logEvent(
		"item",
		GetItemName( item ),
		GetPlayerName( GetOwningPlayer( unit ) ),
		GetUnitName( unit ),
		event,
	);

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, (): void => {

		if ( ! IsUnitType( GetDyingUnit(), UNIT_TYPE_STRUCTURE ) )
			logKill( GetKillingUnit(), GetDyingUnit() );

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, (): void => logItem( GetManipulatedItem() ) );

} );
