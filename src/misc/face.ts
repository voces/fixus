
import { forEachSelectedUnit } from "util/temp";
import { registerCommand } from "util/commands";

// ===========================================================================
// Trigger: miscFace
// ===========================================================================

const action = ( { angle }: {angle: string} ): void => {

	const adjustment = angle[ 0 ] === "+" ? 1 : angle[ 0 ] === "-" ? - 1 : 0;
	const actualAngle = S2R( adjustment === 0 ? angle : angle.slice( 1 ) );

	forEachSelectedUnit( GetTriggerPlayer(), u => {

		const facing = adjustment !== 0 ?
			GetUnitFacing( u ) + adjustment * actualAngle :
			actualAngle;

		SetUnitFacing( u, facing );

	} );

};

// ===========================================================================
registerCommand( {
	command: "face",
	category: "misc",
	description: "Makes selected units turn towards the passed angle.",
	args: [ { name: "angle", type: "string" } ],
	fn: action,
} );
