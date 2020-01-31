
import { TriggerRegisterPlayerChatEventAll } from "../shared";
import { log } from "./log";
import { addScriptHook, W3TS_HOOK } from "w3ts";

type Arg = {
	name: string;
	required?: boolean;
	// todo: add a function type, allowing the user to define their own transformer
	type?: "number"
		| "string"
		| "player";
}

type Command<T> = {
	command: string;
	alias?: string;
	args?: Array<Arg>;
	fn: ( this: void, args: T, words: Array<string> ) => void;
}

let ready = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pendingRegistrations: Command<any>[] = [];
const _registerCommand = <T>(
	{ command, alias, args = [], fn }:
	{
		command: string;
		alias?: string;
		args?: Array<Arg>;
		fn: ( this: void, args: T, words: Array<string> ) => void;
	},
): void => {

	const t = CreateTrigger();

	let requiredArgs = 0;
	for ( ;
		requiredArgs < args.length &&
			( args[ requiredArgs ].required || args[ requiredArgs ].required === undefined );
		requiredArgs ++
	) { /* do nothing */ }
	const triggerWords = [ command ];
	if ( alias ) triggerWords.push( alias );

	const triggerCommands = triggerWords.map( w => `-${w}` );
	triggerCommands.forEach( triggerCommand =>
		TriggerRegisterPlayerChatEventAll(
			t,
			`${triggerCommand}${requiredArgs > 0 ? " " : ""}`,
			args.length === 0,
		) );

	TriggerAddAction( t, () => {

		try {

			const str = GetEventPlayerChatString();

			// with args, make sure the trigger leads
			const triggerWord = triggerWords.find( triggerWord => str.indexOf( triggerWord ) === 1 ); // we do 1 to skip the -
			if ( ! triggerWord ) return;
			const offset = triggerWord.split( " " ).length;

			const words = str.split( " " );

			// Build our args object
			let argsObject: T;
			try {

				argsObject = Object.fromEntries( args.map( ( { name, type }, i ) => {

					const word = words[ i + offset ];
					if ( word === "" || word === undefined ) return [ name, undefined ];
					if ( type )
						switch ( type ) {

							case "number": return [ name, S2R( word ) ];
							case "player": {

								const playerId = S2I( word ) - 1;
								if ( playerId < 0 || playerId > bj_MAX_PLAYERS ) {

									DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Invalid player number. Use 1-24." );
									throw "invalid-player";

								}

								return [ name, Player( playerId ) ];

							}

						}

					return [ name, word ];

				} ) );

			} catch ( err ) {

				if ( err === "invalid-player" ) return;
				throw err;

			}

			fn( argsObject, [ words.slice( 0, offset ).join( " " ), ...words.slice( offset ) ] );

		} catch ( err ) {

			log( err );

		}

	} );

};

export const registerCommand = <T>( command: Command<T> ): void => {

	if ( ready ) return _registerCommand( command );
	pendingRegistrations.push( command );

};

export const main = (): void => {

	ready = true;
	pendingRegistrations.forEach( r => _registerCommand( r ) );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, main );
