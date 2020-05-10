
import { registerCommand } from "./registerCommand";
import { toggleGps } from "resources/goldPerSecond";

// ===========================================================================
registerCommand( {
	command: "gps",
	category: "misc",
	description: "Shows or hides the Gold Per Second (GPS) meter.",
	fn: (): void => toggleGps( GetTriggerPlayer() ),
} );
