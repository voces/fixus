
import { defineEvent } from "stats/w3mmd";
import { TransitionInformation, updateGameTimer, transitionsFrom } from "./common";
import { endGameStats } from "stats/mmd";
import { sheepTeam, sheeps, wolfTeam } from "shared";
import { timeout } from "util/temp";

let desynced = false;
let gameEnded = false;

export const isGameEnded = (): boolean => gameEnded;

export const flagDesync = (): void => {

	if ( desynced || gameEnded ) return;

	defineEvent( "desync", "There was a desync" )();

	desynced = true;

};

const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
const endGameTimerSettings = { remaining: 15, title: "Ending in..." };
// Ends the game, awarding wins/loses and other W3MMD data
export const endGame = ( winner: "sheep" | "wolves" ): TransitionInformation => {

	updateGameTimer( endGameTimerSettings );

	// Don't run these actions again
	if ( gameEnded ) return endGameTimerSettings;

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

	return endGameTimerSettings;

};
transitionsFrom[ "play" ] = (): TransitionInformation => endGame( "sheep" );

