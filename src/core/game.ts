
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import {
	countHere,
	gameState,
	SHEEP_TYPE,
	sheeps,
	sheepTeam,
	wispTeam,
	WOLF_TYPE,
	wolfTeam,
	wolves,
} from "shared";
import { reloadMultiboard } from "misc/multiboard";
import { MMD__DefineEvent, MMD__LogEvent } from "../stats/w3mmd";
import { endGameStats } from "../stats/mmd";
import { isSandbox } from "./init";
import { emitLog } from "../util/emitLog";

let gameTimer: timer;
let gameTimerDialog: timerdialog;
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

export const flagDesync = (): void => {

	if ( desynced || gameEnded ) return;

	MMD__DefineEvent( "desync", "There was a desync" );
	MMD__LogEvent( "desync" );

	desynced = true;

};

const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
// Ends the game, awarding wins/loses and other W3MMD data
export const endGame = ( winner: "sheep" | "wolves" ): void => {

	// Don't run these actions again
	if ( gameEnded ) return;

	gameEnded = true;

	TimerDialogDisplay( gameTimerDialog, false );
	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, "Fixus by |CFF959697Chakra|r\nJoin the community at http://tiny.cc/sheeptag\nUpload replays to https://wc3stats.com/upload" );
	TimerStart( gameTimer, 15, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, "Ending in..." );
	TimerDialogDisplay( gameTimerDialog, true );

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

	PolledWait( 15 );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), wolfTeam ) )

			if ( winner === "wolves" ) CustomVictoryBJ( Player( i ), true, true );
			else CustomDefeatBJ( Player( i ), defeatString );

		else if ( winner === "sheep" ) CustomVictoryBJ( Player( i ), true, true );
		else CustomDefeatBJ( Player( i ), defeatString );

};

const shareControlWithAllies = ( player: player ): void => {

	const isWolf = IsPlayerInForce( player, wolfTeam );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if (
			// passed player and iterated player are wolf
			isWolf && IsPlayerInForce( Player( i ), wolfTeam ) ||
			// passed player and iterated player are sheep or wisp
			! isWolf && (
				IsPlayerInForce( Player( i ), sheepTeam ) ||
				IsPlayerInForce( Player( i ), wispTeam )
			)
		) {

			SetPlayerAlliance( player, Player( i ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
			SetPlayerAlliance( player, Player( i ), ALLIANCE_SHARED_CONTROL, true );

		}

};

/**
 * Spawns sheep
 */
const initToStart = (): void => {

	TimerDialogDisplay( gameTimerDialog, false );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), sheepTeam ) || GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_PLAYING ) continue;

		sheeps[ i ] = CreateUnit( Player( i ), SHEEP_TYPE, initialSpawns[ i ].x, initialSpawns[ i ].y, 270 );

		if ( GetLocalPlayer() === Player( i ) ) {

			ClearSelection();
			SelectUnit( sheeps[ i ], true );
			PanCameraToTimed( initialSpawns[ i ].x, initialSpawns[ i ].y, 0 );

		}

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER )
			shareControlWithAllies( Player( i ) );

	}

	gameState( "start" );
	// todo: should be nullable
	TimerStart( gameTimer, 10, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, "Wolves in..." );
	TimerDialogDisplay( gameTimerDialog, true );
	reloadMultiboard();

};

/**
 * Spawns wolves
 */
const startToPlay = (): void => {

	TimerDialogDisplay( gameTimerDialog, false );

	const starterItem = starterItemMap[ countHere( wolfTeam ) ];
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if (
			(
				// they aren't a wolf player
				! IsPlayerInForce( Player( i ), wolfTeam ) ||
				// they're not here
				GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_EMPTY
			) &&
			// and we're not debugging
			( ! isSandbox() || i !== 8 )
		) continue;

		wolves[ i ] = CreateUnit( Player( i ), WOLF_TYPE, GetStartLocationX( i ), GetStartLocationY( i ), 270 );
		UnitAddItem( wolves[ i ], CreateItem( STARTER_ITEM_TYPE, GetStartLocationX( i ), GetStartLocationY( i ) ) );
		if ( starterItem != null ) // null if sandbox
			UnitAddItem( wolves[ i ], CreateItem( starterItem, GetStartLocationX( i ), GetStartLocationY( i ) ) );

		if ( GetLocalPlayer() === Player( i ) ) {

			ClearSelection();
			SelectUnit( wolves[ i ], true );
			PanCameraToTimed( - 256, - 1024, 0 );

		}

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER )
			shareControlWithAllies( Player( i ) );

	}

	gameState( "play" );
	// should be nullable
	TimerStart( gameTimer, 1500, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, "Sheep win in..." );
	TimerDialogDisplay( gameTimerDialog, true );

};

const action = (): void => {

	switch ( gameState() ) {

		case "init": return initToStart();
		case "start": return startToPlay();
		case "play": return endGame( "sheep" );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	gameTimer = CreateTimer();

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, gameTimer );
	TriggerAddAction( t, () => {

		try {

			action();

		} catch ( err ) {

			emitLog( "gameTimer expired", err );

		}

	} );

	const SHEEP_SIZE_OFFSET = 100;
	const MAX_X = GetRectMaxX( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MAX_Y = GetRectMaxY( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MIN_X = GetRectMinX( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET + 440; // :( constant seems off
	const MIN_Y = GetRectMinY( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET;

	gameTimerDialog = CreateTimerDialog( gameTimer );
	TimerStart( gameTimer, 3, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, "Starting in..." );
	TimerDialogDisplay( gameTimerDialog, true );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), sheepTeam ) ) continue;

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

	}

} );
