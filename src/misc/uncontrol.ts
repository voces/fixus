
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { Split, myArg, TriggerRegisterPlayerChatEventAll, color } from "../shared";

// ===========================================================================
// Trigger: miscUncontrol
// ===========================================================================

const Trig_miscUncontrol_Actions = (): void => {

	// Preconditions
	Split( GetEventPlayerChatString(), " ", false );
	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
	const receiver: player = Player( receiverId );

	if ( myArg[ 0 ] !== "uc" || receiverId < 0 || receiverId > 11 || ! ( IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING ) )

		return;

	// Remove control
	SetPlayerAllianceStateBJ( GetTriggerPlayer(), receiver, bj_ALLIANCE_ALLIED_VISION );
	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control taken from " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-uc ", false );
	TriggerAddAction( t, Trig_miscUncontrol_Actions );

} );
