
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { reloadMultiboard } from "misc/multiboard";
import { defineEvent } from "../../stats/w3mmd";
import { endGameStats } from "../../stats/mmd";
import { addQuickShop } from "wolves/quickShops";
import { timeout } from "../../util/temp";
import { TransitionInformation, transitions, gameState } from "./common";
import {
	countHere,
	isSandbox,
	SHEEP_TYPE,
	sheeps,
	sheepTeam,
	WOLF_TYPE,
	wolfTeam,
	wolves,
} from "shared";
import "./teamSelection";

let desynced = false;
let gameEnded = false;

const STARTER_ITEM_TYPE = FourCC( "mcou" ); // everyone gets this
const ONE_WOLF_ITEM_TYPE = FourCC( "ratf" );
const TWO_WOLF_ITEM_TYPE = FourCC( "ratc" );
const THREE_WOLF_ITEM_TYPE = FourCC( "rat9" );
const FOUR_WOLF_ITEM_TYPE = FourCC( "rat6" );

const starterItemMap: Record<number, number> = {
	1: ONE_WOLF_ITEM_TYPE,
	2: TWO_WOLF_ITEM_TYPE,
	3: THREE_WOLF_ITEM_TYPE,
	4: FOUR_WOLF_ITEM_TYPE,
};

const initialSpawns: Array<{x: number; y: number}> = [];

// ===========================================================================
// Trigger: coreGame
// ===========================================================================

export const isGameEnded = (): boolean => gameEnded;

export const flagDesync = (): void => {

	if ( desynced || gameEnded ) return;

	defineEvent( "desync", "There was a desync" )();

	desynced = true;

};

const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
// Ends the game, awarding wins/loses and other W3MMD data
export const endGame = ( winner: "sheep" | "wolves" ): TransitionInformation => {

	// Don't run these actions again
	if ( gameEnded ) return { remaining: 15, title: "Ending in..." };

	gameEnded = true;

	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, [
		"Fixus by |CFF959697Chakra|r",
		"Join the community at http://tiny.cc/sheeptag",
		"Upload replays to https://wc3stats.com/upload",
	].join( "\n" ) );

	endGameStats( winner, desynced );

	if ( winner === "sheep" )
		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			// todo: save the wisps!
			if ( IsPlayerInForce( Player( i ), sheepTeam ) ) {

				SetUnitInvulnerable( sheeps[ i ], true );
				BlzSetUnitBaseDamage( sheeps[ i ], 9999, 0 );
				SetUnitMoveSpeed( sheeps[ i ], 522 );
				BlzSetUnitRealField( sheeps[ i ], UNIT_RF_SIGHT_RADIUS, 5000 );

			}

	timeout( 15, () => {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( IsPlayerInForce( Player( i ), wolfTeam ) )

				if ( winner === "wolves" ) CustomVictoryBJ( Player( i ), true, true );
				else CustomDefeatBJ( Player( i ), defeatString );

			else if ( winner === "sheep" ) CustomVictoryBJ( Player( i ), true, true );
			else CustomDefeatBJ( Player( i ), defeatString );

	} );

	return { remaining: 15, title: "Ending in..." };

};
transitions[ "play" ] = (): TransitionInformation => endGame( "sheep" );

const shareControlWithAllies = ( player: player ): void => {

	const isWolf = IsPlayerInForce( player, wolfTeam );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( isWolf === IsPlayerInForce( Player( i ), wolfTeam ) ) {

			SetPlayerAlliance( player, Player( i ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
			SetPlayerAlliance( player, Player( i ), ALLIANCE_SHARED_CONTROL, true );

		}

};

const spawnSheep = ( index: number ): void => {

	const player = Player( index );

	sheeps[ index ] = CreateUnit( player, SHEEP_TYPE, initialSpawns[ index ].x, initialSpawns[ index ].y, 270 );

	if ( GetLocalPlayer() === player ) {

		ClearSelection();
		SelectUnit( sheeps[ index ], true );
		PanCameraToTimed( initialSpawns[ index ].x, initialSpawns[ index ].y, 0 );

	}

	if ( GetPlayerController( player ) !== MAP_CONTROL_USER || GetPlayerSlotState( player ) !== PLAYER_SLOT_STATE_PLAYING )
		shareControlWithAllies( player );

};

const spawnFakeSheep = (): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( IsPlayerInForce( Player( i ), wolfTeam ) || sheeps[ i ] != null ) continue;

		ForceAddPlayer( sheepTeam, Player( i ) );
		spawnSheep( i );
		return;

	}

};

/**
 * Spawns sheep
 */
const sheepStart = (): TransitionInformation => {

	let sheepSize = 0;
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), sheepTeam ) || GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_PLAYING ) continue;

		sheepSize ++;
		spawnSheep( i );

	}

	if ( sheepSize <= 1 && isSandbox() )
		spawnFakeSheep();

	reloadMultiboard();

	gameState( "start" );
	return { remaining: 10, title: "Wolves in..." };

};
transitions[ "team-selection" ] = sheepStart;

const spawnWolf = ( index: number, starterItem: number ): void => {

	const player = Player( index );

	wolves[ index ] = CreateUnit( player, WOLF_TYPE, GetStartLocationX( index ), GetStartLocationY( index ), 270 );
	UnitAddItem( wolves[ index ], CreateItem( STARTER_ITEM_TYPE, GetStartLocationX( index ), GetStartLocationY( index ) ) );
	UnitAddItem( wolves[ index ], CreateItem( starterItem, GetStartLocationX( index ), GetStartLocationY( index ) ) );
	addQuickShop( wolves[ index ] );

	if ( GetLocalPlayer() === player ) {

		ClearSelection();
		SelectUnit( wolves[ index ], true );
		PanCameraToTimed( - 256, - 1024, 0 );

	}

	if ( GetPlayerController( player ) !== MAP_CONTROL_USER || GetPlayerSlotState( player ) !== PLAYER_SLOT_STATE_PLAYING )
		shareControlWithAllies( player );

	reloadMultiboard();

};

const spawnFakeWolf = (): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) continue;

		ForceAddPlayer( wolfTeam, Player( i ) );
		spawnWolf( i, starterItemMap[ 1 ] );
		return;

	}

};

/**
 * Spawns wolves
 */
const wolfStart = (): TransitionInformation => {

	const starterItem = starterItemMap[ countHere( wolfTeam ) ];
	let wolfSize = 0;
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), wolfTeam ) || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_EMPTY ) continue;

		wolfSize ++;
		spawnWolf( i, starterItem );

	}

	if ( wolfSize === 0 && isSandbox() )
		spawnFakeWolf();

	gameState( "play" );
	return { remaining: 1500, title: "Sheep win in..." };

};
transitions[ "start" ] = wolfStart;

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const SHEEP_SIZE_OFFSET = 100;
	const MAX_X = GetRectMaxX( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MAX_Y = GetRectMaxY( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MIN_X = GetRectMinX( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET + 440; // :( constant seems off
	const MIN_Y = GetRectMinY( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		while ( ! initialSpawns[ i ] ) {

			const randomDistanceFromEdge = GetRandomInt( 0, 15 ) * 64;
			const edge = GetRandomInt( 1, 4 );
			let x, y;
			if ( edge === 1 ) {

				x = MAX_X - randomDistanceFromEdge;
				y = GetRandomReal( MIN_Y, MAX_Y );

			} else if ( edge === 2 ) {

				x = MIN_X + randomDistanceFromEdge;
				y = GetRandomReal( MIN_Y, MAX_Y );

			} else if ( edge === 3 ) {

				x = GetRandomReal( MIN_X, MAX_X );
				y = MIN_Y + randomDistanceFromEdge;

			} else {

				x = GetRandomReal( MIN_X, MAX_X );
				y = MAX_Y - randomDistanceFromEdge;

			}

			if ( ! IsTerrainPathable( x, y, PATHING_TYPE_BUILDABILITY ) &&
				! IsTerrainPathable( x, y, PATHING_TYPE_WALKABILITY ) ) {

				initialSpawns[ i ] = { x, y };
				if ( GetLocalPlayer() === Player( i ) )
					PanCameraToTimed( x, y, 0 );

			}

		}

} );
