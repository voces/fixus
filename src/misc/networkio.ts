
import { stringify, parse, Value } from "./json";
import { readAndCloseFile, openFile } from "./fileIO";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "../util/emitLog";
import { forEachPlayer } from "../util/temp";
import { isPlayingPlayer } from "../util/player";
import { TriggerRegisterPlayerEventAll } from "../shared";

type Options = {headers?: Record<string, string>; body?: string}
type Request = {
	callback: ( response: Value ) => void;
	requestId: number;
	response: string;
	timer: timer;
	tries: 0;
}

// How many times we check if a response has been written.
const MAX_TRIES = 10;

/**
 * Exponential backoff algorithm.
 * @param tries The nth try.
 */
const calcInterval = ( tries: number ): number =>
	60 * ( tries + 1.3 ** tries ) / 1000;

const activeRequests: Record<number, Request> = {};

const networkedPlayers: player[] = [];

/**
 * Writes `contents` to `path`
 * @param path The path of the file to write. All files are written to %DOCUMENTS%/Warcraft III/CustomMapData
 * @param contents The text to write to the file.
 */
const writeFile = ( path: string, contents: string ): void => {

	PreloadGenClear();
	PreloadGenStart();
	Preload( contents );
	PreloadGenEnd( path );

};

/**
 * Checks if we've received a response to our request. If we have received a
 * response, we'll fire off the callback. If we have not, and we have remaining
 * attempts, we'll start a timer to check again later. Otherwise, we consider
 * the request failed and re-write the request with a clear command.
 * @param request The request to check the response for.
 */
const checkForResponse = ( request: Request ): void => {

	const path = `networkio/responses/${request.requestId}-${request.tries ++}.txt`;
	const response = readAndCloseFile( openFile( path ) );

	// No response; try again if we have attempts remaining
	if ( response == null && request.tries < MAX_TRIES )
		return TimerStart(
			request.timer,
			calcInterval( request.tries ),
			false,
			() => checkForResponse( request ),
		);

	// We have something!

	// Command to clear the request and response files.
	writeFile( `networkio/requests/${request.requestId}.txt`, stringify( { url: "proxy://clear" } ) );

	// Hack because tstl injects nil as the first param since `callback` is on
	// an object. This technically means `callback` is invoked with the same
	// value twice.

	const stringifiedResponse = response == null ? "null" : response;

	const parts = Math.ceil( stringifiedResponse.length / 240 );
	for ( let i = 0, n = 0; n < stringifiedResponse.length; i ++, n += 240 )
		BlzSendSyncData( "networkio", `${request.requestId}-${i + 1}/${parts}-${stringifiedResponse.slice( n, n + 240 )}` );

};

let fetcherOverride: player | null = null;
const withFetcher = <T>( player: player, callback: () => T ): T => {

	const oldFetcherOverride = fetcherOverride;
	fetcherOverride = player;
	const result = callback();
	fetcherOverride = oldFetcherOverride;
	return result;

};

// Used for unique file naming.
let requestId = 0;

/**
 * Makes a network request. If the request completes, the callback is invoked
 * with it. If it fails, the callback is invoked with null.
 * @param url The URL of the request.
 * @param options Additional options for the request.
 * @param callback A function to invoke on completion of the request.
 */
export const fetch = (
	url: string,
	options: Options | null,
	callback: ( response: Value ) => void,
): void => {

	const r = GetRandomInt( 0, networkedPlayers.length - 1 );
	const fetcher = fetcherOverride || networkedPlayers[ r ];

	const request: Request = {
		callback,
		requestId: requestId ++,
		response: "",
		timer: CreateTimer(),
		tries: 0,
	};

	activeRequests[ request.requestId ] = request;

	if ( GetLocalPlayer() !== fetcher ) return;

	writeFile(
		`networkio/requests/${request.requestId}.txt`,
		stringify( { url, ...options } ),
	);

	TimerStart(
		request.timer,
		calcInterval( request.tries ),
		false,
		() => checkForResponse( request ),
	);

};

export const parseSyncData = ( syncData: string ): {requestId: number; chunk: number; totalChunks: number; data: string} => {

	let requestId = - 1;
	let chunk = - 1;
	let totalChunks = - 1;
	let data = "";

	let lastIndex = 0;
	for ( let i = 0; i < syncData.length; i ++ )
		if ( syncData[ i ] === "-" ) {

			if ( requestId === - 1 ) {

				requestId = tonumber( syncData.slice( lastIndex, i ) ) || 0;
				lastIndex = i + 1;

			} else if ( totalChunks === - 1 ) {

				totalChunks = tonumber( syncData.slice( lastIndex, i ) ) || 0;
				data = syncData.slice( i + 1 );

			}

		} else if ( syncData[ i ] === "/" ) {

			chunk = tonumber( syncData.slice( lastIndex, i ) ) || 0;
			lastIndex = i + 1;

		}

	return { requestId, chunk, totalChunks, data };

};

const onSync = (): void => {

	const { requestId, chunk, totalChunks, data } = parseSyncData( BlzGetTriggerSyncData() );

	const request = activeRequests[ requestId ];
	request.response += data;

	if ( chunk !== totalChunks ) return;

	DestroyTimer( request.timer );

	const response = parse( request.response );
	const callback = request.callback.bind( response );
	delete activeRequests[ requestId ];

	callback( response );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	// Trigger for syncing data from the fetcher to everyone else
	let t = CreateTrigger();
	forEachPlayer( p => BlzTriggerRegisterPlayerSyncEvent( t, p, "networkio", false ) );
	wrappedTriggerAddAction( t, "networkio sync", onSync );

	// Trigger for removing a player from networkedPlayers if they leave
	t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	wrappedTriggerAddAction( t, "networkio player leave", () => {

		const playerIndex = networkedPlayers.indexOf( GetTriggerPlayer() );
		if ( playerIndex >= 0 )
			networkedPlayers.splice( playerIndex, 1 );

	} );

	// A magic function to determine which players have a proxy
	forEachPlayer( p => {

		if ( ! isPlayingPlayer( p ) ) return;
		withFetcher( p, () => {

			fetch( "proxy://version", null, version => {

				if ( version == null ) return;

				networkedPlayers.push( p );

			} );

		} );

	} );

} );
