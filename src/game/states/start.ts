
import { sheeps, SHEEP_TYPE, sheepTeam } from "shared";
import {
	gameState,
	shareControlWithAllies,
	TransitionInformation,
	transitionsFrom,
} from "./common";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { isComputer, isPlayingPlayer } from "util/player";

const initialSpawns: Array<{x: number; y: number}> = [];

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

/**
 * Spawns sheep
 */
const sheepStart = (): TransitionInformation => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )

		if (
			IsPlayerInForce( Player( i ), sheepTeam ) &&
			(
				isComputer( Player( i ) ) ||
				isPlayingPlayer( Player( i ) )
			)

		)
			spawnSheep( i );

		// pan camera back to wolf spawn
		else if ( GetLocalPlayer() === Player( i ) )
			PanCameraToTimed( - 256, - 1024, 0 );

	gameState( "start" );
	return { remaining: 10, title: "Wolves in..." };

};
transitionsFrom[ "beat" ] = sheepStart;

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
