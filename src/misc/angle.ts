
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { TriggerRegisterPlayerChatEventAll } from "../shared";

// ===========================================================================
// Trigger: miscAngle
// ===========================================================================

const Trig_miscAngle_Actions = (): void => {

	if ( GetLocalPlayer() !== GetTriggerPlayer() ) return;

	const angle = S2R( GetEventPlayerChatString().split( " " )[ 1 ] );
	SetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK, angle, 0 );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-angle ", false );
	TriggerRegisterPlayerChatEventAll( t, "-a ", false );
	TriggerAddAction( t, Trig_miscAngle_Actions );

} );
