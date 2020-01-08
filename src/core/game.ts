
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	gameState,
	sheepTeam,
	sheeps,
	InStr,
	wolfTeam,
	wolves,
	countHere,
	endGame,
	myTimer,
	myTimerDialog,
	s__sheep_type,
	s__wolf_type,
} from "../shared";
import { reloadMultiboard } from "../misc/multiboard";

const s__wolf_item1 = FourCC( "ratf" );
const s__wolf_item2 = FourCC( "ratc" );
const s__wolf_item3 = FourCC( "rat9" );
const s__wolf_item4 = FourCC( "rat6" );
const s__wolf_itemGlobal = FourCC( "mcou" );

// ===========================================================================
// Trigger: coreGame
// ===========================================================================
// TESH.scrollpos=41
// TESH.alwaysfold=0
const Trig_coreGame_Actions = (): void => {

	let i: number;
	let n: number;

	if ( gameState() === "init" ) {

		TimerDialogDisplay( myTimerDialog, false );
		i = 0;

		while ( true ) {

			if ( i === 12 ) break;

			if ( IsPlayerInForce( Player( i ), sheepTeam ) && GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING ) {

				sheeps[ i ] = CreateUnit( Player( i ), s__sheep_type, GetStartLocationX( i ), GetStartLocationY( i ), 270 );

				if ( GetLocalPlayer() === Player( i ) ) {

					ClearSelection();
					SelectUnit( sheeps[ i ], true );
					PanCameraToTimed( GetStartLocationX( i ), GetStartLocationY( i ), 0 );

				}

				if ( InStr( GetPlayerName( Player( i ) ), "Grim" ) >= 0 ) {

					AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", sheeps[ i ], "origin" );
					AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", sheeps[ i ], "origin" );

				}

				if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER ) {

					n = 0;

					while ( true ) {

						if ( n === 12 ) break;

						if ( IsPlayerInForce( Player( n ), sheepTeam ) ) {

							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_CONTROL, true );

						}

						n = n + 1;

					}

				}

			}

			i = i + 1;

		}

		gameState( "start" );
		// todo: should be nullable
		TimerStart( myTimer, 20, false, () => { /* do nothing */ } );
		TimerDialogSetTitle( myTimerDialog, "Wolves in..." );
		TimerDialogDisplay( myTimerDialog, true );
		reloadMultiboard();

	} else if ( gameState() === "start" ) {

		TimerDialogDisplay( myTimerDialog, false );
		i = 0;

		while ( true ) {

			if ( i === 12 ) break;

			if ( IsPlayerInForce( Player( i ), wolfTeam ) && GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_EMPTY ) {

				wolves[ i ] = CreateUnit( Player( i ), s__wolf_type, GetStartLocationX( i ), GetStartLocationY( i ), 270 );
				UnitAddItem( wolves[ i ], CreateItem( s__wolf_itemGlobal, GetStartLocationX( i ), GetStartLocationY( i ) ) );

				if ( countHere( wolfTeam ) === 1 )

					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item1, GetStartLocationX( i ), GetStartLocationY( i ) ) );

				else if ( countHere( wolfTeam ) === 2 )

					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item2, GetStartLocationX( i ), GetStartLocationY( i ) ) );

				else if ( countHere( wolfTeam ) === 3 )

					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item3, GetStartLocationX( i ), GetStartLocationY( i ) ) );

				else if ( countHere( wolfTeam ) === 4 )

					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item4, GetStartLocationX( i ), GetStartLocationY( i ) ) );

				if ( InStr( GetPlayerName( Player( i ) ), "Grim" ) >= 0 ) {

					AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", wolves[ i ], "origin" );
					AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", wolves[ i ], "head" );

				}

				if ( GetLocalPlayer() === Player( i ) ) {

					ClearSelection();
					SelectUnit( wolves[ i ], true );
					PanCameraToTimed( - 256, - 1024, 0 );

				}

				if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER ) {

					n = 0;

					while ( true ) {

						if ( n === 12 ) break;

						if ( IsPlayerInForce( Player( n ), wolfTeam ) ) {

							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_CONTROL, true );

						}

						n = n + 1;

					}

				}

			}

			i = i + 1;

		}

		gameState( "play" );
		// should be nullable
		TimerStart( myTimer, 1500, false, () => { /* do nothing */ } );
		TimerDialogSetTitle( myTimerDialog, "Sheep win in..." );
		TimerDialogDisplay( myTimerDialog, true );

	} else if ( gameState() === "play" )

		endGame( 0 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, myTimer );
	TriggerAddAction( t, Trig_coreGame_Actions );

} );
