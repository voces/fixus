
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";
import { timeout } from "util/temp";
import { getterSetterFunc, wolfTeam } from "shared";

export type GAME_STATES = "init" | "team-selection" | "beat" | "start" | "play" | "ended";
export type TransitionInformation = {remaining: number; title: string}

export const transitionsFrom = {} as Record<GAME_STATES, () => TransitionInformation>;
let gameTimer: timer;
let gameTimerDialog: timerdialog;

export const gameState: ( newState?: GAME_STATES ) => GAME_STATES = getterSetterFunc( "init" as GAME_STATES );

export const updateGameTimer = ( { remaining, title }: TransitionInformation ): void => {

	PauseTimer( gameTimer );
	TimerStart( gameTimer, remaining, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( gameTimerDialog, title );
	TimerDialogDisplay( gameTimerDialog, true );

};

export const transitionGame = (): void => {

	const state = gameState();
	const transition = transitionsFrom[ state ];
	if ( transition ) updateGameTimer( transition() );
	else throw `no transition for ${transition}`;

};

export const shareControlWithAllies = ( player: player ): void => {

	const isWolf = IsPlayerInForce( player, wolfTeam );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( isWolf === IsPlayerInForce( Player( i ), wolfTeam ) ) {

			SetPlayerAllianceStateAllyBJ( Player( i ), player, true );
			SetPlayerAllianceStateBJ( player, Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );

		}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	gameTimer = CreateTimer();

	const t = CreateTrigger();
	TriggerRegisterTimerExpireEvent( t, gameTimer );
	wrappedTriggerAddAction( t, "gameTimer expired", transitionGame );

	timeout( "game states init", 0.1, transitionGame );
	gameTimerDialog = CreateTimerDialog( gameTimer );

} );

