
import {
	MMD__DefineEvent,
	MMD__LogEvent,
	MMD_DefineValue,
	MMD_FLAG_LOSER,
	MMD_FLAG_WINNER,
	MMD_FlagPlayer,
	MMD_GOAL_HIGH,
	MMD_OP_SET,
	MMD_SUGGEST_NONE,
	MMD_TYPE_INT,
	MMD_UpdateValueInt,
} from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wolfTeam, saveskills } from "../shared";
import { log } from "../util/log";

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

export const endGameStats = ( winner: "sheep" | "wolves", desynced: boolean ): void => {

	try {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )

			if (
				GetPlayerController( Player( i ) ) === MAP_CONTROL_USER &&
				[ PLAYER_SLOT_STATE_PLAYING, PLAYER_SLOT_STATE_LEFT ].includes( GetPlayerSlotState( Player( i ) ) )
			) {

				if ( IsPlayerInForce( Player( i ), wolfTeam ) ) {

					MMD_UpdateValueInt( "kills", Player( i ), MMD_OP_SET, saveskills[ i ] );
					MMD_UpdateValueInt( "lumber", Player( i ), MMD_OP_SET, GetPlayerState( Player( i ), PLAYER_STATE_LUMBER_GATHERED ) );

				} else MMD_UpdateValueInt( "saves", Player( i ), MMD_OP_SET, saveskills[ i ] );
				MMD_UpdateValueInt( "gold", Player( i ), MMD_OP_SET, GetPlayerState( Player( i ), PLAYER_STATE_GOLD_GATHERED ) );

				if ( ! desynced )
					if ( IsPlayerInForce( Player( i ), wolfTeam ) )

						if ( winner === "wolves" ) MMD_FlagPlayer( Player( i ), MMD_FLAG_WINNER );
						else MMD_FlagPlayer( Player( i ), MMD_FLAG_LOSER );

					else if ( winner === "sheep" ) MMD_FlagPlayer( Player( i ), MMD_FLAG_WINNER );
					else MMD_FlagPlayer( Player( i ), MMD_FLAG_LOSER );

			}

	} catch ( err ) {

		log( err );

	}

};

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

		MMD_DefineValue( "kills", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "saves", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "gold", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "lumber", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );

	} );

} );
