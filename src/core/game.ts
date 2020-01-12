
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	gameState,
	sheepTeam,
	sheeps,
	wolfTeam,
	wolves,
	countHere,
	endGame,
	myTimer,
	myTimerDialog,
	SHEEP_TYPE,
	WOLF_TYPE,
	grimEffect,
	wispTeam,
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

const initToStart = (): void => {

	TimerDialogDisplay( myTimerDialog, false );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), sheepTeam ) || GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_PLAYING ) continue;

		sheeps[ i ] = CreateUnit( Player( i ), SHEEP_TYPE, GetStartLocationX( i ), GetStartLocationY( i ), 270 );

		if ( GetLocalPlayer() === Player( i ) ) {

			ClearSelection();
			SelectUnit( sheeps[ i ], true );
			PanCameraToTimed( GetStartLocationX( i ), GetStartLocationY( i ), 0 );

		}

		if ( GetPlayerName( Player( i ) ).indexOf( "Grim" ) >= 0 )
			grimEffect( sheeps[ i ] );

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER )
			shareControlWithAllies( Player( i ) );

	}

	gameState( "start" );
	// todo: should be nullable
	TimerStart( myTimer, 20, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( myTimerDialog, "Wolves in..." );
	TimerDialogDisplay( myTimerDialog, true );
	reloadMultiboard();

};

const startToPlay = (): void => {

	TimerDialogDisplay( myTimerDialog, false );

	const starterItem = starterItemMap[ countHere( wolfTeam ) ];
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ ) {

		if ( ! IsPlayerInForce( Player( i ), wolfTeam ) || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_EMPTY ) continue;

		wolves[ i ] = CreateUnit( Player( i ), WOLF_TYPE, GetStartLocationX( i ), GetStartLocationY( i ), 270 );
		UnitAddItem( wolves[ i ], CreateItem( STARTER_ITEM_TYPE, GetStartLocationX( i ), GetStartLocationY( i ) ) );
		UnitAddItem( wolves[ i ], CreateItem( starterItem, GetStartLocationX( i ), GetStartLocationY( i ) ) );

		if ( GetPlayerName( Player( i ) ).indexOf( "Grim" ) >= 0 )
			grimEffect( sheeps[ i ] );

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
		case "play": return endGame( 0 );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, myTimer );
	TriggerAddAction( t, action );

} );
