
import { termToString } from "./log";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { MMD__DefineEvent, MMD__LogEvent } from "../stats/w3mmd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emitLog = ( key: string, ...args: Array<any> ): void => {

	const message = args.map( v => termToString( v, false ) ).join( " " );
	MMD__LogEvent( "log", key, message );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0, false );
	TriggerAddAction( t, () => {

		MMD__DefineEvent( "log", "${0}: {1}", "key", "message" );

	} );

} );
