
import { addScriptHook, W3TS_HOOK } from "w3ts";

let mmds: MMD[] = [];
let initialized = false;
const M_KEY_VAL = "val:";
const M_KEY_CHK = "chk:";
let timer: timer;

/**
 * A simple hashing function
 */
const checksum = ( message: string, seed: number ): number => {

	const n = message.length;
	let m = n + seed;
	for ( let i = 0; i < n; i ++ )
		m = m * 41 * message[ i ].charCodeAt( 0 );

	return m;

};

/**
 * Checks if the player is both a user and playing
 */
const isUserHere = ( player: player ): boolean =>
	GetPlayerController( player ) === MAP_CONTROL_USER &&
	GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING;

/**
 * Cleans the mesasge for W3MMD consumption
 * Replaces " " with "\ " and "\" with "\\"
 */
const clean = ( message: string ): string =>
	message.split( " " ).join( "\\ " ).split( "\\" ).join( "\\\\" );

export enum MMDFlag {
	drawer = "drawer",
	loser = "loser",
	winner = "winner",
	leaver = "leaver",
	practicing = "practicing"
}

export class MMD {

	key = 0;
	cache: gamecache | null = null;

	constructor() {

		if ( initialized ) this.initialize();
		else mmds.push( this );

	}

	/**
	 * Runs after the main function
	 */
	initialize(): void {

		FlushGameCache( InitGameCache( "MMD.Dat" ) );
		this.cache = InitGameCache( "MMD.Dat" );

		// 1 is both the minimum and current version
		this.send( "init version 1 1" );

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( isUserHere( Player( i ) ) )
				this.send( `init pid ${i} ${clean( GetPlayerName( Player( i ) ) )}` );

	}

	/**
	 * Sends out a message for replay consumption
	 */
	private send( message: string ): void {

		const key = this.key ++;

		if ( ! this.isSender() ) return;
		if ( ! this.cache ) return;

		StoreInteger( this.cache, M_KEY_VAL + key, message, checksum( message, key ) );
		StoreInteger( this.cache, M_KEY_CHK + key, I2S( key ), checksum( message, key ) );
		SyncStoredInteger( this.cache, M_KEY_VAL + key, message );
		SyncStoredInteger( this.cache, M_KEY_CHK + key, I2S( key ) );

	}

	/**
	 * Checks if the local player should be sending the message
	 */
	private isSender(): boolean {

		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( isUserHere( Player( i ) ) )
				return GetLocalPlayer() === Player( i );

		return false;

	}

	/**
	 * Defines an event.
	 * @param name The name of the event. E.g.: `"killed"`.
	 * @param format The format of the event. E.g.: `"{0} (1) killed {2} (3)"`.
	 * @param args The arguments of the event. E.g.: `[ "pid:killer", "killerUnit", "pid:"killed", "killedUnit" ]`
	 */
	defineEvent( name: string, format: string, ...args: string[] ): void {

		this.send( `DefEvent ${clean( name )} ${args.map( arg => clean( arg ) ).join( " " )} ${clean( format )}` );

	}

	/**
	 * Emits an event.
	 * @param name The name of the event. E.g.: `"killed"`.
	 * @param args The arguments of the event. E.g.: `[ I2S( GetPlayerId( GetOwningPlayer( GetKillingUnit() ) ) ), GetUnitName( GetKillingUnit() ), I2S( GetPlayerId( GetOwningPlayer( GetKilledUnit() ) ) ), GetUnitName( GetKilledUnit() ) ]`
	 */
	logEvent( name: string, ...args: string[] ): void {

		this.send( `Event ${clean( name )} ${args.map( arg => clean( arg ) ).join( " " )}` );

	}

	flagPlayer( player: player, flag: MMDFlag ): void {

		this.send( `FlagP ${GetPlayerId( player )} ${flag}` );

	}

}

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	mmds.forEach( w => w.initialize() );

	initialized = true;
	mmds = [];

	timer = CreateTimer();
	TimerStart(timer, GetRandomInt())

} );
