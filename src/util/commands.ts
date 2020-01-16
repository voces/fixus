
import { TriggerRegisterPlayerChatEventAll } from "shared";

export const registerCommand = <T>(
	{ command, alias, args = [], fn }:
	{
		command: string;
		alias?: string;
		args: Array<{
			name: string;
			required?: boolean;
			// todo: add a function type, allowing the user to define their own transformer
			type?: "number"
				| "string"
				| "player";
		}>;
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

		const str = GetEventPlayerChatString();
		const words = str.split( " " );

		// with args, make sure the trigger leads
		if ( triggerWords.indexOf( words[ 0 ].slice( 1 ) ) === - 1 ) return;

		// Build our args object
		const argsObject: T = Object.fromEntries( args.map( ( { name, type }, i ) => {

			const word = words[ i + 1 ];
			if ( type )
				switch ( type ) {

					case "number": return [ name, S2R( word ) ];
					case "player": {

						const playerId = S2I( word ) - 1;
						// todo: provide user feedback
						if ( playerId < 0 || playerId > bj_MAX_PLAYERS )
							throw new Error( "invalid player id" );
						return [ name, Player( playerId ) ];

					}

				}

			return [ name, word ];

		} ) );

		fn( argsObject, words );

	} );

};
