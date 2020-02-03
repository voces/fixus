
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { readAndCloseFile, openFile } from "./fileIO";
import { wolfTeam } from "shared";
import { log } from "util/log";

// const elos =

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const localElos = ( readAndCloseFile( openFile( "fixus/elo.txt" ) ) || "" ).split( " " ).map( v => S2R( v ) );
	const localPlayerId = GetPlayerId( GetLocalPlayer() );

	const localElo = ( IsPlayerInForce( GetLocalPlayer(), wolfTeam ) ? localElos[ 1 ] : localElos[ 0 ] ) || 1000;

	const gc = InitGameCache( "EloSync" );
	StoreReal( gc, "elo", I2S( localPlayerId ), localElo );
	SyncStoredReal( gc, "elo", I2S( localPlayerId ) );
	TriggerSyncReady();

	const elos: Record<string, number> = {};

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		elos[ i ] = GetStoredReal( gc, "elo", I2S( i ) );

	log( elos );

} );
