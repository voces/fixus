
import { TriggerRegisterPlayerChatEventAll } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

export type Arg<T extends string | number> =
	{
		name: string;
		required?: boolean;
		default?: never;
		// todo: add a function type, allowing the user to define their own transformer
		type?: "number"
			| "string"
			| "player";
	} | {
		name: string;
		required?: false;
		default?: T;
		// todo: add a function type, allowing the user to define their own transformer
		type?: "number"
			| "string"
			| "player";
	};

export type Command<T> = {
	command: string;
	category: "sheep" | "wolf" | "host" | "misc" | "hidden" | "sandbox";
	alias?: string;
	description: string;
	args?: Array<Arg<string | number>>;
	fn: ( this: void, args: T, words: Array<string> ) => void;
}

export const isArgRequired = <T extends string | number>( arg: Arg<T> ): boolean =>
	( arg.required === undefined || arg.required ) && arg.default === undefined;

let ready = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commands: Command<any>[] = [];
const _registerCommand = <T>(
	{ command, alias, args = [], fn }:
	{
		command: string;
		alias?: string;
		args?: Array<Arg<string | number>>;
		fn: ( this: void, args: T, words: Array<string> ) => void;
	},
): void => {

	const t = CreateTrigger();

	let requiredArgs = 0;
	for ( ;
		requiredArgs < args.length && isArgRequired( args[ requiredArgs ] );
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

	wrappedTriggerAddAction( t, `command ${command}`, () => {

		const str = GetEventPlayerChatString();

		// with args, make sure the trigger leads
		const triggerWord = triggerWords.find( triggerWord => str.indexOf( triggerWord ) === 1 ); // we do 1 to skip the -
		if ( ! triggerWord ) return;
		const offset = triggerWord.split( " " ).length;

		const words = str.split( " " );

		// Build our args object
		let argsObject: T;
		try {

			argsObject = Object.fromEntries( args.map( ( { name, type, default: defualtValue }, i ) => {

				const word = words[ i + offset ];
				if ( word === "" || word === undefined ) return [ name, defualtValue ];
				if ( type )
					switch ( type ) {

						case "number": return [ name, tonumber( word ) ];
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

	} );

};

export const registerCommand = <T>( command: Command<T> ): void => {

	commands.push( command );

	if ( ready ) return _registerCommand( command );

};

export const main = (): void => {

	ready = true;
	commands.forEach( r => _registerCommand( r ) );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, main );
