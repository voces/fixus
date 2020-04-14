
import { defineEvent, defineNumberValue, defineStringValue, setPlayerFlag, emitCustom } from "./w3mmd";
import { addScriptHook, W3TS_HOOK } from "w3ts";
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
import { getRemainingTime, gameState } from "game/states/common";

const structuresBuilt = fillArray( bj_MAX_PLAYERS, 0 );
const unitsKilled = fillArray( bj_MAX_PLAYERS, 0 );
const deaths = fillArray( bj_MAX_PLAYERS, 0 );

// events
const logAcquire = defineEvent( "acquire", "{0} acquired {1}", "player", "item" );
const logKill = defineEvent( "kill", "{0} killed {1}", "killer", "killed" );
const logDeath = defineEvent( "death", "{0} killed by {1}", "killed", "killer" );
const logSave = defineEvent( "save", "{0} saved {1}", "sheep", "wisp" );

// values

const logBonus = defineNumberValue( "bonus", "none", "none", "real" );

// sheep values
const updateFarmsBuilt = defineNumberValue( "farms built", "high", "none" );
const updateSaves = defineNumberValue( "saves", "high", "none" );
const updateSheepDeaths = defineNumberValue( "sheep deaths", "low", "none" );
const updateSheepGold = defineNumberValue( "sheep gold", "high", "none" );
const updateSheepMaxLevel = defineNumberValue( "sheep max level", "high", "none" );
const updateSheepSpecialization = defineStringValue( "sheep specialization", "none" );
const updateUnitsKilledAsSheep = defineNumberValue( "units killed as sheep", "high", "none" );

// wolf values
const updateFarmsKilled = defineNumberValue( "farms killed", "high", "none" );
const updateWolfDeaths = defineNumberValue( "wolf deaths", "low", "none" );
const updateWolfGold = defineNumberValue( "wolf gold", "high", "none" );
const updateSheepKilled = defineNumberValue( "sheep killed", "high", "none" );
const updateWolfLevel = defineNumberValue( "wolf level", "high", "none" );

const repo = compiletime( () => {

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const url = require( "url" );
	const repo = url.parse( require( "../../../package.json" ).repository.url );
	return repo.pathname.slice( 1 ).replace( ".git", "" );

} );
const version = compiletime( () => {

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const fs = require( "fs" );
	const file = fs.readFileSync( "CHANGELOG.md", { encoding: "utf-8" } );
	return file.split( "\n" )[ 1 ].split( " " )[ 2 ];

} );
const build = compiletime( () => new Date().toISOString() );
emitCustom( "version", repo );
emitCustom( "version", version );
emitCustom( "build", build );

let currentWolfGoldFactor = 1;
/**
 * Adjusts bonuses when -wolf gold is used. Algorithm weights towards more gold
 * earlier in the game. Reset param is meant for testing.
 * @param gold Amount of gold that was given.
 * @param reset Boolean on whether to reset the stateful factor.
 */
export const onWolfGoldBonus = ( gold: number, reset?: boolean ): number => {

	if ( reset ) {

		currentWolfGoldFactor = 1;
		return 1;

	}

	const remaining = gameState() === "play" ? getRemainingTime() : 25 * 60;
	const denom = 16 / Math.max( remaining - 120, 0 ) ** 1.5 * 10000 * 20;
	const maxFactor = 1 + 2500 ** 0.5 / denom;
	const factor = gold ** 0.5 / denom;

	if ( maxFactor < currentWolfGoldFactor )
		return currentWolfGoldFactor;

	if ( currentWolfGoldFactor + factor > maxFactor )
		currentWolfGoldFactor = maxFactor;
	else
		currentWolfGoldFactor += factor;

	return currentWolfGoldFactor;

};

export const endGameStats = ( winner: "sheep" | "wolves", desynced: boolean ): void => {

	try {

		const wolfLossBonus = currentWolfGoldFactor;
		const sheepWinFactor = wolfLossBonus;
		const wolfWinBonus = 1 / currentWolfGoldFactor;
		const sheepLossFactor = wolfWinBonus;

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

			const player = Player( i );

			if (
				GetPlayerController( player ) !== MAP_CONTROL_USER ||
				GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_EMPTY
			) continue;

			if ( IsPlayerInForce( player, wolfTeam ) ) {

				// wolf values
				updateFarmsKilled( player, unitsKilled[ i ] );
				updateWolfDeaths( player, deaths[ i ] );
				updateWolfGold( player, GetPlayerState( player, PLAYER_STATE_GOLD_GATHERED ) );
				updateSheepKilled( player, saveskills[ i ] );
				updateWolfLevel( player, GetHeroLevel( wolfUnit( player ) ) );

			} else {

				// sheep values
				updateFarmsBuilt( player, structuresBuilt[ i ] );
				updateSaves( player, saveskills[ i ] );
				updateSheepDeaths( player, deaths[ i ] );
				updateSheepGold( player, GetPlayerState( player, PLAYER_STATE_GOLD_GATHERED ) );
				updateSheepMaxLevel( player, playerSpecializations[ i ].maxLevel );
				const playerSpecialization = playerSpecializations[ i ].specialization;
				if ( playerSpecialization != null )
					updateSheepSpecialization( player, specializationNames.get( playerSpecialization ) || "unknown" );
				updateUnitsKilledAsSheep( player, unitsKilled[ i ] );

			}

			if ( isSandbox() ) {

				setPlayerFlag( player, "practicing" );
				continue;

			}

			if ( desynced ) continue;

			if ( IsPlayerInForce( player, wolfTeam ) )

				if ( winner === "wolves" ) {

					setPlayerFlag( player, "winner" );
					logBonus( player, ( 1.5 - GetPlayerHandicap( player ) * 0.5 ) * wolfWinBonus );

				} else {

					setPlayerFlag( player, "loser" );
					logBonus( player, ( 0.5 + GetPlayerHandicap( player ) * 0.5 ) * wolfLossBonus );

				}

			else if ( winner === "sheep" ) {

				setPlayerFlag( player, "winner" );
				logBonus( player, ( 2 - GetPlayerHandicap( player ) ) * sheepWinFactor );

			} else {

				setPlayerFlag( player, "loser" );
				logBonus( player, GetPlayerHandicap( player ) * sheepLossFactor );

			}

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
