
import { stringify, parse, Value } from "./json";
import { readAndCloseFile, openFile } from "./fileIO";

type Options = {headers?: Record<string, string>; body?: string}
type Request = {
	callback: ( response: Value ) => void;
	requestId: number | null;
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
	writeFile( `networkio/requests/${request.requestId}.txt`, "\"clear\"" );

	DestroyTimer( request.timer );

	// Hack because tstl injects nil as the first param since `callback` is on
	// an object. This technically means `callback` is invoked with the same
	// value twice.

	if ( response != null ) {

		const parsedResponse = parse( response );
		const callback = request.callback.bind( parsedResponse );
		callback( parsedResponse );

	} else {

		const callback = request.callback.bind( response );
		callback( null );

	}

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

	const request: Request = {
		callback,
		requestId: requestId ++,
		timer: CreateTimer(),
		tries: 0,
	};

	writeFile(
		`networkio/requests/${request.requestId}.txt`,
		stringify( {
			url,
			...options,
		} ),
	);

	TimerStart(
		request.timer,
		calcInterval( request.tries ),
		false,
		() => checkForResponse( request ),
	);

};
