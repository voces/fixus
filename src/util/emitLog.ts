
import { log, termToString } from "./log";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { MMD__DefineEvent, MMD__LogEvent } from "../stats/w3mmd";
import { isSandbox } from "../shared";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emitLog = ( key: string, ...args: Array<any> ): void => {

	const message = args.map( v => termToString( v, false ) ).join( " " );
	MMD__LogEvent( "log", key, message );
	if ( isSandbox() ) log( key, ...args );

};

export const wrappedTriggerAddAction = ( whichTrigger: trigger, key: string, actionFunc: () => void ): triggeraction =>
	TriggerAddAction( whichTrigger, () => {

		try {

			actionFunc();

		} catch ( err ) {

			emitLog( key, err );

		}

	} );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0, false );
	wrappedTriggerAddAction( t, "emitLog delay init", () => {

		MMD__DefineEvent( "log", "${0}: {1}", "key", "message" );

	} );

} );
