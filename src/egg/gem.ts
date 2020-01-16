
import { color, fillArray } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { log } from "util/log";
// todo: test this
const gemActivated: Array<boolean> = fillArray( bj_MAX_PLAYERS, false );
const GEM_TYPE = FourCC( "gemt" );

// ===========================================================================
// Trigger: eggGem
// ===========================================================================

const Trig_eggGem_Actions = (): void => {

	const playerId = GetPlayerId( GetTriggerPlayer() );

	if ( GetItemTypeId( GetManipulatedItem() ) !== GEM_TYPE ) return;

	log( "gemActivated", "before", gemActivated[ playerId ] );
	gemActivated[ playerId ] = ! gemActivated[ playerId ];
	log( "gemActivated", "after", gemActivated[ playerId ] );
	const message = gemActivated[ playerId ] ?
		GetRandomInt( 0, 100 ) === 0 ?
			"Perfect gem activated." :
			"Gem activated." :
		"Gem deactivated.";
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + message );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, Trig_eggGem_Actions );

} );
