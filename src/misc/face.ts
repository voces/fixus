
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { registerCommand } from "../shared";
import { withTempGroup } from "util/temp";

// ===========================================================================
// Trigger: miscFace
// ===========================================================================

const action = ( { angle }: {angle: string} ): void => {

	const adjustment = angle[ 0 ] === "+" ? 1 : angle[ 0 ] === "-" ? - 1 : 0;
	const actualAngle = parseFloat( angle.slice( 1 ) );

	withTempGroup( g => {

		GroupEnumUnitsSelected( g, GetTriggerPlayer(), null );
		ForGroup( g, () => {

			const u = GetEnumUnit();
			const facing = adjustment !== 0 ?
				GetUnitFacing( u ) + adjustment * actualAngle :
				actualAngle;

			SetUnitFacing( u, facing );

		} );

	} );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void =>
	registerCommand( {
		command: "face",
		args: [ { name: "angle", type: String } ],
		fn: action,
	} ),
);
