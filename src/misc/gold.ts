
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { Split, myArg, TriggerRegisterPlayerChatEventAll, color } from "../shared";

// ===========================================================================
// Trigger: miscGold
// ===========================================================================

const miscGold_Actions = (): void => {

	// Preconditions
	Split( GetEventPlayerChatString(), " ", false );
	const senderId: number = GetPlayerId( GetTriggerPlayer() );
	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
	const receiver: player = Player( receiverId );
	let gold: number;

	if ( myArg[ 0 ] !== "g" )

		return;

	if ( receiverId >= 0 && receiverId <= 11 && IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING && GetTriggerPlayer() !== receiver ) {

		gold = S2I( myArg[ 2 ] || "" );

		if ( gold === 0 )

			gold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

		if ( gold === 0 )

			return;

		DisplayTextToPlayer( receiver, 0, 0, color[ senderId ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, I2S( gold ) + " gold given to " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );
		SetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD ) + gold );
		SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - gold );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-g ", false );
	TriggerAddAction( t, miscGold_Actions );

} );
