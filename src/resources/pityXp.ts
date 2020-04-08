
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { forEachPlayer } from "util/temp";
import { wolfTeam, wolfUnit } from "shared";
import { wrapFunction } from "util/emitLog";

let timer: timer;
let amount = 50;

let pityAction = (): void => { /* do nothing */ };

const startTimer = ( short = false ): void =>
	TimerStart( timer, short ? 60 : 180, true, pityAction );

pityAction = wrapFunction( "pity action", (): void => {

	forEachPlayer( p => {

		if ( IsPlayerInForce( p, wolfTeam ) )
			AddHeroXP( wolfUnit( p ), amount, true );

	} );

	amount += 25;
	startTimer( true );

} );

export const onSheepDeath = (): void => {

	amount = 50;
	startTimer();

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	timer = CreateTimer();
	startTimer();

} );
