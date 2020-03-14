
import {
	MMD__DefineEvent,
	MMD__LogEvent,
	MMD_DefineValue,
	MMD_FLAG_LOSER,
	MMD_FLAG_WINNER,
	MMD_FlagPlayer,
	MMD_GOAL_HIGH,
	MMD_GOAL_LOW,
	MMD_GOAL_NONE,
	MMD_OP_SET,
	MMD_SUGGEST_NONE,
	MMD_TYPE_INT,
	MMD_TYPE_STRING,
	MMD_UpdateValueInt,
	MMD_UpdateValueString,
} from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import {
	fillArray,
	isSandbox,
	isUnitSheep,
	isUnitWolf,
	saveskills,
	WISP_TYPE,
	wolfTeam,
	wolfUnit,
} from "../shared";
import { emitLog, wrappedTriggerAddAction } from "../util/emitLog";
import { playerSpecializations, specializationNames } from "../sheep/specialization";

const structuresBuilt = fillArray( bj_MAX_PLAYERS, 0 );
const unitsKilled = fillArray( bj_MAX_PLAYERS, 0 );
const deaths = fillArray( bj_MAX_PLAYERS, 0 );

export const endGameStats = ( winner: "sheep" | "wolves", desynced: boolean ): void => {

	try {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )

			if (
				GetPlayerController( Player( i ) ) === MAP_CONTROL_USER &&
				[ PLAYER_SLOT_STATE_PLAYING, PLAYER_SLOT_STATE_LEFT ].includes( GetPlayerSlotState( Player( i ) ) )
			) {

				if ( IsPlayerInForce( Player( i ), wolfTeam ) ) {

					// wolf values
					MMD_UpdateValueInt( "farms killed", Player( i ), MMD_OP_SET, unitsKilled[ i ] );
					MMD_UpdateValueInt( "wolf deaths", Player( i ), MMD_OP_SET, deaths[ i ] );
					MMD_UpdateValueInt( "wolf gold", Player( i ), MMD_OP_SET, GetPlayerState( Player( i ), PLAYER_STATE_GOLD_GATHERED ) );
					MMD_UpdateValueInt( "sheep killed", Player( i ), MMD_OP_SET, saveskills[ i ] );
					MMD_UpdateValueInt( "wolf level", Player( i ), MMD_OP_SET, GetHeroLevel( wolfUnit( Player( i ) ) ) );

				} else {

					// sheep values
					MMD_UpdateValueInt( "farms built", Player( i ), MMD_OP_SET, structuresBuilt[ i ] );
					MMD_UpdateValueInt( "saves", Player( i ), MMD_OP_SET, saveskills[ i ] );
					MMD_UpdateValueInt( "sheep deaths", Player( i ), MMD_OP_SET, deaths[ i ] );
					MMD_UpdateValueInt( "sheep gold", Player( i ), MMD_OP_SET, GetPlayerState( Player( i ), PLAYER_STATE_GOLD_GATHERED ) );
					MMD_UpdateValueInt( "sheep max level", Player( i ), MMD_OP_SET, playerSpecializations[ i ].maxLevel );
					const playerSpecialization = playerSpecializations[ i ].specialization;
					if ( playerSpecialization != null )
						MMD_UpdateValueString( "sheep specialization", Player( i ), specializationNames.get( playerSpecialization ) || "unknown" );
					MMD_UpdateValueInt( "units killed as sheep", Player( i ), MMD_OP_SET, unitsKilled[ i ] );

				}

				if ( ! desynced && ! isSandbox() )
					if ( IsPlayerInForce( Player( i ), wolfTeam ) )

						if ( winner === "wolves" ) MMD_FlagPlayer( Player( i ), MMD_FLAG_WINNER );
						else MMD_FlagPlayer( Player( i ), MMD_FLAG_LOSER );

					else if ( winner === "sheep" ) MMD_FlagPlayer( Player( i ), MMD_FLAG_WINNER );
					else MMD_FlagPlayer( Player( i ), MMD_FLAG_LOSER );

			}

	} catch ( err ) {

		emitLog( "endGameStats", err );

	}

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	wrappedTriggerAddAction( t, "mmd death", (): void => {

		// ignore deaths that don't have a killer
		if (
			GetKillingUnit() == null ||
			GetDyingUnit() == null
		)
			return;

		// only record saves when TKing
		if ( IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetDyingUnit() ) ) ) {

			if ( GetUnitTypeId( GetDyingUnit() ) === WISP_TYPE )
				MMD__LogEvent(
					"save",
					GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
					GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
				);

			return;

		}

		// sheep or wolf death
		if ( isUnitSheep( GetDyingUnit() ) || isUnitWolf( GetDyingUnit() ) ) {

			deaths[ GetPlayerId( GetOwningPlayer( GetDyingUnit() ) ) ] ++;
			// we emit two events for parsable graphs
			MMD__LogEvent(
				"kill",
				GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
				GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
			);
			MMD__LogEvent(
				"death",
				GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
				GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
			);

			return;

		}

		// generic unit kills (structures, wards, golems, etc)
		unitsKilled[ GetPlayerId( GetOwningPlayer( GetKillingUnit() ) ) ] ++;

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	wrappedTriggerAddAction( t, "mmd acquire", (): void => MMD__LogEvent(
		"acquire",
		GetPlayerName( GetOwningPlayer( GetTriggerUnit() ) ),
		GetItemName( GetManipulatedItem() ) ),
	);

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0, false );
	wrappedTriggerAddAction( t, "mmd delay init", () => {

		MMD__DefineEvent( "acquire", "{0} acquired {1}", "player", "item" );
		MMD__DefineEvent( "kill", "{0} killed {1}", "killer", "killed" );
		MMD__DefineEvent( "death", "{0} killed by {1}", "killed", "killer" );
		MMD__DefineEvent( "save", "{0} saved {1}", "sheep", "wisp" );

		// sheep
		MMD_DefineValue( "farms built", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "saves", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "sheep deaths", MMD_TYPE_INT, MMD_GOAL_LOW, MMD_SUGGEST_NONE );
		MMD_DefineValue( "sheep gold", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "sheep max level", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "sheep specialization", MMD_TYPE_STRING, MMD_GOAL_NONE, MMD_SUGGEST_NONE );
		MMD_DefineValue( "units killed as sheep", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );

		// wolves
		MMD_DefineValue( "farms killed", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "wolf deaths", MMD_TYPE_INT, MMD_GOAL_LOW, MMD_SUGGEST_NONE );
		MMD_DefineValue( "wolf gold", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "sheep killed", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );
		MMD_DefineValue( "wolf level", MMD_TYPE_INT, MMD_GOAL_HIGH, MMD_SUGGEST_NONE );

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_START );
	wrappedTriggerAddAction( t, "mmd construct", (): void => {

		const playerIndex = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
		structuresBuilt[ playerIndex ] ++;

	} );

} );
