
import { getElapsedTime } from "@voces/w3ts";
import { registerCommand } from "./registerCommand";
import { isSandbox } from "shared";
import { getController } from "./host";

const gameSpeedMap = [
	MAP_SPEED_SLOWEST,
	MAP_SPEED_SLOWEST,
	MAP_SPEED_SLOW,
	MAP_SPEED_NORMAL,
	MAP_SPEED_FAST,
	MAP_SPEED_FASTEST,
];

const action = ( { speed }: {speed: number} ): void => {

	if ( getController() !== GetTriggerPlayer() ) return;

	if ( speed < 1 || speed > 5 )
		return DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Invalid speed. Use 1-5." );

	if ( speed !== 4 && getElapsedTime() < 75 && ! isSandbox() )
		return DisplayTextToPlayer(
			GetTriggerPlayer(),
			0,
			0,
			"Non-default speeds can only be set in the first minute.",
		);

	SetGameSpeed( gameSpeedMap[ speed ] );

};

// ===========================================================================
registerCommand( {
	command: "speed",
	category: "host",
	description: "Sets the game speed. Values can range 1-5.",
	args: [ { name: "speed", type: "number", default: 4 } ],
	fn: action,
} );
