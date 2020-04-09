
import { registerCommand } from "./registerCommand";

// ===========================================================================
// Trigger: miscAngle
// ===========================================================================

const action = ( { rotation }: {rotation: number} ): void => {

	if ( GetLocalPlayer() !== GetTriggerPlayer() ) return;

	SetCameraField( CAMERA_FIELD_ROTATION, rotation, 0 );

};

// ===========================================================================
registerCommand( {
	command: "rotation",
	category: "misc",
	description: "Sets the camera to the passed rotation.",
	alias: "r",
	args: [ { name: "rotation", type: "number", default: 90 } ],
	fn: action,
} );
