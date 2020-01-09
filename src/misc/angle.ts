
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { Split, myArgCount, myArg, TriggerRegisterPlayerChatEventAll } from "../shared";

// ===========================================================================
// Trigger: miscAngle
// ===========================================================================

const Trig_miscAngle_Actions = (): void => {

	Split( GetEventPlayerChatString(), " ", true );

	if ( myArgCount === 1 && GetLocalPlayer() === GetTriggerPlayer() )

		SetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK, S2R( myArg[ 0 ] || "" ), 0 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-angle ", false );
	TriggerRegisterPlayerChatEventAll( t, "-a ", false );
	TriggerAddAction( t, Trig_miscAngle_Actions );

} );
