
import { log, termToString } from "./log";
import { defineEvent } from "../stats/w3mmd";
import { isSandbox } from "../shared";

export const logEvent = defineEvent( "log", "${0}: {1}", "key", "message" );

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
