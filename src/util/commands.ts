
import { TriggerRegisterPlayerChatEventAll } from "../shared";

export const registerCommand = <T>(
	{ command, alias, args = [], fn }:
	{
		command: string;
		alias?: string;
		// eslint-disable-next-line @typescript-eslint/ban-types
		args: Array<{
			name: string;
			required?: boolean;
			// todo: add a function type, allowing the user to define whatever
			type?: NumberConstructor
				| StringConstructor
				| "player";
		}>;
		fn: ( args: T, words: Array<string> ) => void;
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
			requiredArgs > 0 ),
	);

	TriggerAddAction( t, () => {

		const str = GetEventPlayerChatString();
		const words = str.split( " " );

		// with args, make sure the trigger leads
		if ( triggerWords.indexOf( words[ 0 ] ) === - 1 ) return;

		// Build our args object
		const argsObject = Object.fromEntries( args.map( ( { name, type }, i ) => {

			if ( type )
				switch ( type ) {

					case Number: return [ name, parseFloat( words[ i ] ) ];
					case "player": {

						const playerId = parseInt( words[ i ] );
						// todo: test this and provide user feedback
						if ( playerId < 0 || playerId > bj_MAX_PLAYERS )
							throw new Error( "invalid player id" );
						return [ name, Player( playerId ) ];

					}

				}

			return [ name, words[ i ] ];

		} ) );

		// todo: somehow don't do this casting
		fn( argsObject as unknown as T, words );

	} );

};
