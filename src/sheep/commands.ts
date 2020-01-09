import { color, wolfTeam, WORLD_BOUNDS, TriggerRegisterPlayerChatEventAll } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

// ===========================================================================
// Trigger: sheepCommands
// ===========================================================================

const Trig_sheepCommands_RemoveCheapFarms = (): boolean => {

	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) && BlzGetUnitIntegerField( GetFilterUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) < 5 )

		RemoveUnit( GetFilterUnit() );

	return false;

};

const Trig_sheepCommands_RemoveAllFarms = (): boolean => {

	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) )

		RemoveUnit( GetFilterUnit() );

	return false;

};

const Trig_sheepCommands_Actions = (): void => {

	let i = 0;
	let n: number;
	let g: group;

	if ( GetEventPlayerChatString() === "-d" ) {

		g = CreateGroup();
		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveCheapFarms ) );
		DestroyGroup( g );
		return;

	} else if ( GetEventPlayerChatString() === "-dall" ) {

		g = CreateGroup();
		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveAllFarms ) );
		DestroyGroup( g );
		return;

	}

	while ( true ) {

		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )

			if ( Player( i ) === GetTriggerPlayer() ) {

				n = 0;

				while ( true ) {

					if ( n === 12 ) break;

					if ( GetEventPlayerChatString() === "-wolf gold" ) {

						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave the shepherds 100 gold!" );

						if ( IsPlayerInForce( Player( n ), wolfTeam ) )

							SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + 100 );

					} else if ( GetEventPlayerChatString() === "-destroy all farms" ) {

						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r has destroyed all the farms!" );

						if ( n === 0 ) {

							g = CreateGroup();
							GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( Trig_sheepCommands_RemoveCheapFarms ) );
							DestroyGroup( g );

						}

					}

					n = n + 1;

				}

			} else {

				return;

			}

		i = i + 1;

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-wolf gold", true );
	TriggerRegisterPlayerChatEventAll( t, "-destroy all farms", true );
	TriggerRegisterPlayerChatEventAll( t, "-d", true );
	TriggerRegisterPlayerChatEventAll( t, "-dall", true );
	TriggerRegisterPlayerChatEventAll( t, "-d on", true );
	TriggerRegisterPlayerChatEventAll( t, "-d off", true );
	TriggerAddAction( t, Trig_sheepCommands_Actions );

} );
