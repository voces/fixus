
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	myArg,
	s__splitarray,
	Split,
	Split2,
	TriggerRegisterPlayerChatEventAll,
	wolfTeam,
} from "../shared";
import { s__File_close, s__File_write, s__File_open, s__File_readAndClose } from "./fileIO";

const sheepZoom: Array<number> = [];
const wolfZoom: Array<number> = [];

// ===========================================================================
// Trigger: miscZoom
// ===========================================================================

const Trig_miscZoom_Actions = (): void => {

	let zoom: number;
	const playerId = GetPlayerId( GetTriggerPlayer() );

	Split( GetEventPlayerChatString(), " ", false );

	if ( myArg[ 0 ] !== "zoom" && myArg[ 0 ] !== "z" )

		return;

	zoom = S2R( myArg[ 1 ] || "" );

	if ( zoom === 0 )

		if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) {

			zoom = wolfZoom[ playerId ];

		} else {

			zoom = sheepZoom[ playerId ];

		}

	if ( zoom <= 0 )

		zoom = 1650;

	while ( true ) {

		if ( zoom > 400 ) break;
		zoom = zoom * 10;

	}

	if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

		wolfZoom[ playerId ] = zoom;

	else

		sheepZoom[ playerId ] = zoom;

	if ( GetLocalPlayer() === GetTriggerPlayer() ) {

		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );
		s__File_close( s__File_write( s__File_open( "fixus/zooms.txt" ), R2S( sheepZoom[ playerId ] ) + " " + R2S( wolfZoom[ playerId ] ) ) );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	const zooms = Split2( s__File_readAndClose( s__File_open( "fixus/zooms.txt" ) ) || "", " " );

	TriggerRegisterPlayerChatEventAll( t, "-zoom", false );
	TriggerRegisterPlayerChatEventAll( t, "-z", false );
	TriggerAddAction( t, Trig_miscZoom_Actions );

	sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms ] );

	if ( sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

		sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

	wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms + 1 ] );

	if ( wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

		wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

	if ( IsPlayerInForce( GetLocalPlayer(), wolfTeam ) )

		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, wolfZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

	else

		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, sheepZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

} );
