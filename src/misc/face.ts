
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { Split, myArg, TriggerRegisterPlayerChatEventAll } from "../shared";

// ===========================================================================
// Trigger: miscFace
// ===========================================================================

const miscFace_Actions = (): void => {

	const g = CreateGroup();
	let u: unit;
	Split( GetEventPlayerChatString(), " ", true );
	GroupEnumUnitsSelected( g, GetTriggerPlayer(), null );

	while ( true ) {

		u = FirstOfGroup( g );
		if ( u === null ) break;

		if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "+" )

			SetUnitFacing( u, GetUnitFacing( u ) + S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

		else if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "-" )

			SetUnitFacing( u, GetUnitFacing( u ) - S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

		else

			SetUnitFacing( u, S2R( myArg[ 0 ] || "" ) );

		GroupRemoveUnit( g, u );

	}

	DestroyGroup( g );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-face ", false );
	TriggerAddAction( t, miscFace_Actions );

} );
