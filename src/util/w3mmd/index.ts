
import { defineEvent, defineNumberValue, defineStringValue, setPlayerFlag, emitCustom } from "./w3mmd";
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
} from "shared";
import { emitLog, wrappedTriggerAddAction } from "util/emitLog";
import { playerSpecializations, specializationNames } from "abilities/sheep/specialization";
import { onDeath, onConstructionStart } from "util/event";

const structuresBuilt = fillArray( bj_MAX_PLAYERS, 0 );
const unitsKilled = fillArray( bj_MAX_PLAYERS, 0 );
const deaths = fillArray( bj_MAX_PLAYERS, 0 );

// events
const logAcquire = defineEvent( "acquire", "{0} acquired {1}", "player", "item" );
const logKill = defineEvent( "kill", "{0} killed {1}", "killer", "killed" );
const logDeath = defineEvent( "death", "{0} killed by {1}", "killed", "killer" );
const logSave = defineEvent( "save", "{0} saved {1}", "sheep", "wisp" );

// values

// sheep
const updateFarmsBuilt = defineNumberValue( "farms built", "int", "high", "none" );
const updateSaves = defineNumberValue( "saves", "int", "high", "none" );
const updateSheepDeaths = defineNumberValue( "sheep deaths", "int", "low", "none" );
const updateSheepGold = defineNumberValue( "sheep gold", "int", "high", "none" );
const updateSheepMaxLevel = defineNumberValue( "sheep max level", "int", "high", "none" );
const updateSheepSpecialization = defineStringValue( "sheep specialization", "none" );
const updateUnitsKilledAsSheep = defineNumberValue( "units killed as sheep", "int", "high", "none" );

// wolves
const updateFarmsKilled = defineNumberValue( "farms killed", "int", "high", "none" );
const updateWolfDeaths = defineNumberValue( "wolf deaths", "int", "low", "none" );
const updateWolfGold = defineNumberValue( "wolf gold", "int", "high", "none" );
const updateSheepKilled = defineNumberValue( "sheep killed", "int", "high", "none" );
const updateWolfLevel = defineNumberValue( "wolf level", "int", "high", "none" );

// todo: don't hardcode these
emitCustom( "repo", "voces/fixus" );
emitCustom( "version", "11" );

export const endGameStats = ( winner: "sheep" | "wolves", desynced: boolean ): void => {

	try {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )

			if (
				GetPlayerController( Player( i ) ) === MAP_CONTROL_USER &&
				[ PLAYER_SLOT_STATE_PLAYING, PLAYER_SLOT_STATE_LEFT ].includes( GetPlayerSlotState( Player( i ) ) )
			) {

				if ( IsPlayerInForce( Player( i ), wolfTeam ) ) {

					// wolf values
					updateFarmsKilled( Player( i ), "set", unitsKilled[ i ] );
					updateWolfDeaths( Player( i ), "set", deaths[ i ] );
					updateWolfGold( Player( i ), "set", GetPlayerState( Player( i ), PLAYER_STATE_GOLD_GATHERED ) );
					updateSheepKilled( Player( i ), "set", saveskills[ i ] );
					updateWolfLevel( Player( i ), "set", GetHeroLevel( wolfUnit( Player( i ) ) ) );

				} else {

					// sheep values
					updateFarmsBuilt( Player( i ), "set", structuresBuilt[ i ] );
					updateSaves( Player( i ), "set", saveskills[ i ] );
					updateSheepDeaths( Player( i ), "set", deaths[ i ] );
					updateSheepGold( Player( i ), "set", GetPlayerState( Player( i ), PLAYER_STATE_GOLD_GATHERED ) );
					updateSheepMaxLevel( Player( i ), "set", playerSpecializations[ i ].maxLevel );
					const playerSpecialization = playerSpecializations[ i ].specialization;
					if ( playerSpecialization != null )
						updateSheepSpecialization( Player( i ), specializationNames.get( playerSpecialization ) || "unknown" );
					updateUnitsKilledAsSheep( Player( i ), "set", unitsKilled[ i ] );

				}

				if ( isSandbox() )
					setPlayerFlag( Player( i ), "practicing" );

				else if ( ! desynced )
					if ( IsPlayerInForce( Player( i ), wolfTeam ) )

						if ( winner === "wolves" ) setPlayerFlag( Player( i ), "winner" );
						else setPlayerFlag( Player( i ), "loser" );

					else if ( winner === "sheep" ) setPlayerFlag( Player( i ), "winner" );
					else setPlayerFlag( Player( i ), "loser" );

			}

	} catch ( err ) {

		emitLog( "endGameStats", err );

	}

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	onDeath( "mmd", (): void => {

		// ignore deaths that don't have a killer
		if (
			GetKillingUnit() == null ||
			GetDyingUnit() == null
		)
			return;

		// only record saves when TKing
		if ( IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetDyingUnit() ) ) ) {

			if ( GetUnitTypeId( GetDyingUnit() ) === WISP_TYPE )
				logSave(
					GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
					GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
				);

			return;

		}

		// sheep or wolf death
		if ( isUnitSheep( GetDyingUnit() ) || isUnitWolf( GetDyingUnit() ) ) {

			deaths[ GetPlayerId( GetOwningPlayer( GetDyingUnit() ) ) ] ++;
			// we emit two events for parsable graphs
			logKill(
				GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
				GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
			);
			logDeath(
				GetPlayerName( GetOwningPlayer( GetDyingUnit() ) ),
				GetPlayerName( GetOwningPlayer( GetKillingUnit() ) ),
			);

			return;

		}

		// generic unit kills (structures, wards, golems, etc)
		unitsKilled[ GetPlayerId( GetOwningPlayer( GetKillingUnit() ) ) ] ++;

	} );

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	wrappedTriggerAddAction( t, "mmd acquire", (): void =>
		logAcquire(
			GetPlayerName( GetOwningPlayer( GetTriggerUnit() ) ),
			GetItemName( GetManipulatedItem() ),
		) );

	onConstructionStart( "mmd", (): void => {

		const playerIndex = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
		structuresBuilt[ playerIndex ] ++;

	} );

} );
