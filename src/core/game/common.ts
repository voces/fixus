
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";
import { timeout } from "util/temp";
import { getterSetterFunc } from "shared";
import { log } from "util/log";

export type GAME_STATES = "init" | "start" | "play" | "team-selection";
export type TransitionInformation = {remaining: number; title: string}

export const transitions = {} as Record<GAME_STATES, () => TransitionInformation>;
let gameTimer: timer;
let gameTimerDialog: timerdialog;
export const gameState: ( newState?: GAME_STATES ) => GAME_STATES = getterSetterFunc( "init" as GAME_STATES );

const updateGameTimer = ( { remaining, title }: TransitionInformation ): void => {

	TimerStart( gameTimer, remaining, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, title );
	TimerDialogDisplay( gameTimerDialog, true );

};

export const transitionGame = (): void => {

	const state = gameState();
	log( "transitionGame", { state, transitions } );
	const transition = transitions[ state ];
	if ( transition ) updateGameTimer( transition() );
	else throw `no transition for ${transition}`;

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	gameTimer = CreateTimer();

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, gameTimer );
	wrappedTriggerAddAction( t, "gameTimer expired", transitionGame );

	log( "main" );
	timeout( 0.25, transitionGame );
	gameTimerDialog = CreateTimerDialog( gameTimer );

} );

