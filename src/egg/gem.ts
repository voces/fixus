
import { color } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: test this
const gemActivated: Map<player, boolean> = new Map();
const GEM_TYPE = FourCC( "gemt" );

// ===========================================================================
// Trigger: eggGem
// ===========================================================================

const Trig_eggGem_Actions = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) !== GEM_TYPE ) return;

	const wasActivated = gemActivated.get( GetTriggerPlayer() ) || false;
	gemActivated.set( GetTriggerPlayer(), ! wasActivated );

	let message = "Gem deactivated.";
	if ( ! wasActivated )
		if ( GetRandomInt( 0, 100 ) === 15 ) message = "Perfect gem activated.";
		else message = "Gem activated.";

	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + message );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, Trig_eggGem_Actions );

} );
