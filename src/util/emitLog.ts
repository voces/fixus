
import { log, termToString } from "./log";
import { defineEvent } from "./w3mmd/w3mmd";
import { isSandbox } from "shared";
import { debounce } from "./debounce";

export const logEvent = debounce(
	{ threshold: 5, duration: 60 },
	defineEvent( "log", "${0}: {1}", "key", "message" ),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emitLog = ( key: string, arg: any, ...args: Array<any> ): void => {

	const allArgs = [ arg, ...args ];
	const message = allArgs.map( v => termToString( v, false ) ).join( " " );
	logEvent( key, message );
	if ( isSandbox() ) log( key, ...allArgs );

};

export const wrappedTriggerAddAction = ( whichTrigger: trigger, key: string, actionFunc: () => void ): triggeraction =>
	TriggerAddAction( whichTrigger, () => {

		try {

			actionFunc();

		} catch ( err ) {

			emitLog( key, err );

		}

	} );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const wrapFunction = <A extends any[], B>( key: string, fn: ( ...args: A ) => B ): ( ( ...args: A ) => B ) =>
	( ...args: A ): B => {

		try {

			return fn( ...args );

		} catch ( err ) {

			emitLog( key, err );

		}

		emitLog( "wrapFunction impossible", "this should never happen" );
		throw "impossible";

	};
