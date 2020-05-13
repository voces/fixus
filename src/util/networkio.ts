
import { stringify, parse, Value } from "./json";
import { addScriptHook, W3TS_HOOK, File } from "@voces/w3ts";
import { wrappedTriggerAddAction, emitLog } from "util/emitLog";
import { forEachPlayer, timeout } from "util/temp";
import { isPlayingPlayer } from "util/player";
import { TriggerRegisterPlayerEventAll } from "shared";

type Options = {
	body?: string;
	headers?: Record<string, string>;
	noResponse?: boolean;
}
type Request = {
	callback?: ( response: Value ) => void;
	fetcher: player | null;
	options: Options | null | undefined;
	requestId: number;
	response: string;
	timer: timer | null;
	tries: 0;
	url: string;
}

/**
 * How many times we check if a response has been written.
 */
const MAX_TRIES = 10;

/**
 * Whether messages are prefixed with a `-`. We can determine this from the
 * version, which should never be negative.
 */
let prefixed = false;

/**
 * Exponential backoff algorithm.
 * @param tries The nth try.
 */
const calcInterval = ( tries: number ): number =>
	60 * ( tries + 1.3 ** tries ) / 1000;

const activeRequests: Record<number, Request> = {};

const networkedPlayers: player[] = [];
const playerVersions: Map<player, number> = new Map();

/**
 * A queue that builds up while we're still fetching proxy versions at the very
 * beginning (`ready=true`).
 */
const queue: Array<[
	string,
	Options | null | undefined,
	( ( response: Value ) => void ) | undefined,
]> = [];

/**
 * Whether all players have fetched their proxy versions yet.
 */
let ready = false;

const supportsNoResponse = ( player: player ): boolean => {

	const version = playerVersions.get( player );
	return version != null ? version >= 2 : false;

};

/**
 * Writes `contents` to `path`
 * @param path The path of the file to write. All files are written to
 *             %DOCUMENTS%/Warcraft III/CustomMapData
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

	if ( request.fetcher !== GetLocalPlayer() ) return;

	const path =
		`networkio/responses/${request.requestId}-${request.tries ++}.txt`;
	const rawResponse = File.read( path );
	const response = rawResponse == null ?
		null :
		prefixed ?
			rawResponse.slice( 1 ) :
			rawResponse;

	// No response; try again if we have attempts remaining
	if ( response == null && request.tries < MAX_TRIES ) {

		BlzSendSyncData( "networkio-meta", request.requestId.toString() );
		return;

	}

	// We have something!

	// Command to clear the request and response files.
	writeFile(
		`networkio/requests/${request.requestId}.txt`,
		stringify( { url: "proxy://clear" } ) ?? "",
	);

	// Hack because tstl injects nil as the first param since `callback` is on
	// an object. This technically means `callback` is invoked with the same
	// value twice.

	const stringifiedResponse = response == null ? "null" : response;

	const parts = Math.ceil( stringifiedResponse.length / 240 );
	for ( let i = 1, n = 0; n < stringifiedResponse.length; i ++, n += 240 ) {

		const content = stringifiedResponse.slice( n, n + 240 );
		BlzSendSyncData(
			"networkio",
			`${request.requestId}-${i}/${parts}-${content}`,
		);

	}

};

let fetcherOverride: player | null = null;
/**
 * Forces a player to make a fetching request instead of a random networked
 * player.
 * @param player Player to make the fetch request.
 * @param callback Block of code in which the fetch override is enforced.
 */
const withFetcher = <T>( player: player, callback: () => T ): T => {

	const oldFetcherOverride = fetcherOverride;
	fetcherOverride = player;
	const result = callback();
	fetcherOverride = oldFetcherOverride;
	return result;

};

const getFetcher = (): player | null => {

	const r = GetRandomInt( 0, networkedPlayers.length - 1 );
	return fetcherOverride || networkedPlayers[ r ];

};

const makeRequest = ( request: Request ): void => {

	// Immediately resolve if there is no fetcher
	if ( ! request.fetcher ) {

		if ( request.callback ) request.callback( null );
		return;

	}

	// Make sure the response is empty if we're starting over
	request.response = "";

	if ( GetLocalPlayer() === request.fetcher )
		writeFile(
			`networkio/requests/${request.requestId}.txt`,
			stringify( { url: request.url, ...request.options } ) ?? "",
		);

	if ( request.timer )
		TimerStart(
			request.timer,
			calcInterval( request.tries ),
			false,
			() => checkForResponse( request ),
		);

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
	options?: Options | null,
	callback?: ( response: Value ) => void,
): void => {

	// Queue requests until we have everyone
	if ( ! ready && url.indexOf( "proxy://" ) !== 0 ) {

		queue.push( [ url, options, callback ] );
		return;

	}

	const fetcher = getFetcher();

	// No fetcher, just return null
	if ( ! fetcher ) {

		if ( callback ) callback( null );
		return;

	}

	if ( ! callback && supportsNoResponse( fetcher ) ) {

		if ( ! options ) options = {};
		options.noResponse = true;

	}

	const request: Request = {
		callback,
		fetcher,
		options,
		requestId: requestId ++,
		response: "",
		timer: options && options.noResponse ? null : CreateTimer(),
		tries: 0,
		url,
	};

	activeRequests[ request.requestId ] = request;

	makeRequest( request );

};

const onReady = (): void => {

	ready = true;
	queue.forEach( args => fetch( ...args ) );

};

export const parseSyncData = ( syncData: string ): {
	requestId: number;
	chunk: number;
	totalChunks: number;
	data: string;
} => {

	let requestId = - 1;
	let chunk = - 1;
	let totalChunks = - 1;
	let data = "";

	let lastIndex = 0;
	for ( let i = 0; i < syncData.length; i ++ )
		if ( syncData[ i ] === "-" ) {

			if ( requestId === - 1 ) {

				requestId = tonumber( syncData.slice( lastIndex, i ) ) ?? 0;
				lastIndex = i + 1;

			} else if ( totalChunks === - 1 ) {

				totalChunks = tonumber( syncData.slice( lastIndex, i ) ) ?? 0;
				data = syncData.slice( i + 1 );
				break;

			}

		} else if ( syncData[ i ] === "/" ) {

			chunk = tonumber( syncData.slice( lastIndex, i ) ) ?? 0;
			lastIndex = i + 1;

		}

	return { requestId, chunk, totalChunks, data };

};

const completeRequest = ( request: Request ): void => {

	if ( request.timer ) DestroyTimer( request.timer );

	const response = parse( request.response );
	const callback = request.callback ?
		request.callback.bind( response ) :
		null;
	delete activeRequests[ requestId ];

	if ( callback )
		try {

			callback( response );

		} catch ( err ) {

			emitLog( `networkio sync request=${requestId} callback`, err );

		}

};

const onSync = (): void => {

	const { requestId, chunk, totalChunks, data } = parseSyncData(
		BlzGetTriggerSyncData(),
	);

	const request = activeRequests[ requestId ];
	request.response += data;

	if ( chunk !== totalChunks ) return;

	completeRequest( request );

};

const onMetaSync = (): void => {

	const requestId = tonumber( BlzGetTriggerSyncData() ) ?? 0;
	const request = activeRequests[ requestId ];

	if ( request.timer )
		TimerStart(
			request.timer,
			calcInterval( request.tries ),
			false,
			() => checkForResponse( request ),
		);

};

const onLeave = (): void => {

	const leaver = GetTriggerPlayer();

	const playerIndex = networkedPlayers.indexOf( leaver );
	if ( playerIndex >= 0 )
		networkedPlayers.splice( playerIndex, 1 );

	Object.values( activeRequests ).forEach( request => {

		if ( request.fetcher !== leaver ) return;

		// proxy://version is for the specific fetcher
		if ( request.url.startsWith( "proxy://version" ) ) {

			request.response = "";
			return completeRequest( request );

		}

		// Destroy the timer if it exists (we'll use a new one)
		if ( request.timer ) DestroyTimer( request.timer );

		// Pick a new fetcher and re-issue the request
		request.fetcher = getFetcher();
		makeRequest( request );

	} );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	// Trigger for syncing data from the fetcher to everyone else
	let t = CreateTrigger();
	forEachPlayer( p =>
		BlzTriggerRegisterPlayerSyncEvent( t, p, "networkio", false ) );
	wrappedTriggerAddAction( t, "networkio sync", onSync );

	// Trigger for syncing meta data, such as for rescheduling timers
	t = CreateTrigger();
	forEachPlayer( p =>
		BlzTriggerRegisterPlayerSyncEvent( t, p, "networkio-meta", false ) );
	wrappedTriggerAddAction( t, "networkio sync meta", onMetaSync );

	// Trigger for removing a player from networkedPlayers if they leave
	t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	wrappedTriggerAddAction( t, "networkio player leave", onLeave );

	// A magic function to determine which players have a proxy
	let outstanding = 0;
	timeout( "networkio fetch proxy", 0, () => forEachPlayer( p => {

		if ( ! isPlayingPlayer( p ) ) return;
		outstanding ++;
		withFetcher( p, () =>
			fetch( "proxy://version", null, version => {

				if ( version != null && typeof version === "number" ) {

					if ( version < 0 ) {

						prefixed = true;
						version *= - 1;

					}

					networkedPlayers.push( p );
					playerVersions.set( p, version );

				}

				if ( -- outstanding === 0 )
					onReady();

			} ),
		);

	} ) );

} );
