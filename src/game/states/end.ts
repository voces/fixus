
import { defineEvent } from "w3ts-w3mmd";
import { TransitionInformation, updateGameTimer, transitionsFrom, gameState } from "./common";
import { endGameStats } from "misc/stats";
import { sheepTeam, sheeps, wolfTeam } from "shared";
import { timeout } from "util/temp";
import { colorize } from "util/colorize";

let desynced = false;
const logDesync = defineEvent( "desync", "There was a desync" );
export const flagDesync = (): void => {

	if ( desynced || gameState() === "ended" ) return;

	logDesync();
	desynced = true;

};

const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
// Ends the game, awarding wins/loses and other W3MMD data
const _endGame = ( winner: "sheep" | "wolves" ): void => {

	// Don't run these actions again
	if ( gameState() === "ended" ) return;
	gameState( "ended" );

	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, [
		`Fixus by ${colorize.gray( "Chakra" )}`,
		`Join the community at ${colorize.sheepblue( "http://tiny.cc/sheeptag" )}`,
		`Upload replays to ${colorize.sheepblue( "https://wc3stats.com/upload" )}`,
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

	timeout( "end", 15, () => {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( IsPlayerInForce( Player( i ), wolfTeam ) )

				if ( winner === "wolves" ) CustomVictoryBJ( Player( i ), true, true );
				else CustomDefeatBJ( Player( i ), defeatString );

			else if ( winner === "sheep" ) CustomVictoryBJ( Player( i ), true, true );
			else CustomDefeatBJ( Player( i ), defeatString );

	} );

};

const endGameTimerSettings = { remaining: 15, title: "Ending in..." };

/**
 * Ends the game.
 * @param winner The team that is the winner.
 */
export const endGame = ( winner: "sheep" | "wolves" ): void => {

	_endGame( winner );
	updateGameTimer( endGameTimerSettings );

};

transitionsFrom[ "play" ] = (): TransitionInformation => {

	_endGame( "sheep" );
	return endGameTimerSettings;

};

