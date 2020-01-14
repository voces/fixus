
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

const getController = (): player => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )
			return Player( i );

	// this can't happen
	throw new Error( "No players!" );

};

const Trig_sheepCommands_Actions = (): void => {

	let g: group;

	if ( GetEventPlayerChatString() === "-d" ) {

		// todo: use a helper
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

	if ( getController() === GetTriggerPlayer() )
		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( GetEventPlayerChatString() === "-wolf gold" ) {

				DisplayTextToPlayer( Player( i ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave the shepherds 100 gold!" );

				if ( IsPlayerInForce( Player( i ), wolfTeam ) )
					SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 100 );

			} else if ( GetEventPlayerChatString() === "-destroy all farms" ) {

				DisplayTextToPlayer( Player( i ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r has destroyed all the farms!" );

				if ( i === 0 ) {

					g = CreateGroup();
					GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( Trig_sheepCommands_RemoveCheapFarms ) );
					DestroyGroup( g );

				}

			}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	// todo: register these as commands
	TriggerRegisterPlayerChatEventAll( t, "-wolf gold", true );
	TriggerRegisterPlayerChatEventAll( t, "-destroy all farms", true );
	TriggerRegisterPlayerChatEventAll( t, "-d", true );
	TriggerRegisterPlayerChatEventAll( t, "-dall", true );
	TriggerRegisterPlayerChatEventAll( t, "-d on", true );
	TriggerRegisterPlayerChatEventAll( t, "-d off", true );
	TriggerAddAction( t, Trig_sheepCommands_Actions );

} );
