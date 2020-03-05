
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";

// ===========================================================================
// Trigger: miscClean
// ===========================================================================

const action = (): void => {

	const u = GetTriggerUnit();

	if ( IsUnitType( u, UNIT_TYPE_HERO ) !== false ) return;

	PolledWait( 5 );
	RemoveUnit( u );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	wrappedTriggerAddAction( t, "clean", action );

} );
