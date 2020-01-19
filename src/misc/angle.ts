
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscAngle
// ===========================================================================

const action = ( { angle }: {angle: number} ): void => {

	if ( GetLocalPlayer() !== GetTriggerPlayer() ) return;

	SetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK, angle, 0 );

};

// ===========================================================================
registerCommand( {
	command: "angle",
	alias: "a",
	args: [ { name: "angle", type: "number" } ],
	fn: action,
} );
