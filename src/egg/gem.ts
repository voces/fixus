
import { color, fillArray } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const gemActivated: Array<boolean> = fillArray( bj_MAX_PLAYERS, false );
const s__wolf_gem = FourCC( "gemt" );

// ===========================================================================
// Trigger: eggGem
// ===========================================================================

const Trig_eggGem_Actions = (): void => {

	const i = GetRandomInt( 0, 100 );

	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_gem )

		if ( gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] ) {

			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = false;
			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem deactivated." );

		} else {

			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = true;

			if ( i === 0 )

				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Perfect gem activated." );

			else

				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem activated." );

		}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_USE_ITEM );
	TriggerAddAction( t, Trig_eggGem_Actions );

} );
