
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	countHere,
	endGame,
	gameState,
	grimEffect,
	myTimer,
	myTimerDialog,
	SHEEP_TYPE,
	sheeps,
	sheepTeam,
	wispTeam,
	WOLF_TYPE,
	wolfTeam,
	wolves,
} from "shared";
import { reloadMultiboard } from "misc/multiboard";

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

	TimerDialogDisplay( myTimerDialog, false );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), sheepTeam ) || GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_PLAYING ) continue;

		sheeps[ i ] = CreateUnit( Player( i ), SHEEP_TYPE, initialSpawns[ i ].x, initialSpawns[ i ].y, 270 );

		if ( GetLocalPlayer() === Player( i ) ) {

			ClearSelection();
			SelectUnit( sheeps[ i ], true );
			PanCameraToTimed( initialSpawns[ i ].x, initialSpawns[ i ].y, 0 );

		}

		if ( GetPlayerName( Player( i ) ).indexOf( "Grim" ) >= 0 )
			grimEffect( sheeps[ i ] );

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER )
			shareControlWithAllies( Player( i ) );

	}

	gameState( "start" );
	// todo: should be nullable
	TimerStart( myTimer, 10, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( myTimerDialog, "Wolves in..." );
	TimerDialogDisplay( myTimerDialog, true );
	reloadMultiboard();

};

/**
 * Spawns wolves
 */
const startToPlay = (): void => {

	TimerDialogDisplay( myTimerDialog, false );

	const starterItem = starterItemMap[ countHere( wolfTeam ) ];
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), wolfTeam ) || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_EMPTY ) continue;

		wolves[ i ] = CreateUnit( Player( i ), WOLF_TYPE, GetStartLocationX( i ), GetStartLocationY( i ), 270 );
		UnitAddItem( wolves[ i ], CreateItem( STARTER_ITEM_TYPE, GetStartLocationX( i ), GetStartLocationY( i ) ) );
		UnitAddItem( wolves[ i ], CreateItem( starterItem, GetStartLocationX( i ), GetStartLocationY( i ) ) );

		if ( GetPlayerName( Player( i ) ).indexOf( "Grim" ) >= 0 )
			grimEffect( wolves[ i ] );

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
	TimerStart( myTimer, 1500, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( myTimerDialog, "Sheep win in..." );
	TimerDialogDisplay( myTimerDialog, true );

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

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, myTimer );
	TriggerAddAction( t, action );

	const SHEEP_SIZE_OFFSET = 100;
	const MAX_X = GetRectMaxX( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MAX_Y = GetRectMaxY( bj_mapInitialPlayableArea ) - SHEEP_SIZE_OFFSET;
	const MIN_X = GetRectMinX( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET + 440; // :( constant seems off
	const MIN_Y = GetRectMinY( bj_mapInitialPlayableArea ) + SHEEP_SIZE_OFFSET;

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
