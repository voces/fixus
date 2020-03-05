
import * as w3api from "w3api/dist/api";
import fs from "fs";
import { getGame } from "w3api";

Object.assign( globalThis, w3api );

getGame().loadData( {
	w3u: fs.readFileSync( "maps/fixus.w3x/war3map.w3u" ),
	wts: fs.readFileSync( "maps/fixus.w3x/war3map.wts" ),
} );

// Lua polyfills
globalThis.tonumber = parseFloat;
