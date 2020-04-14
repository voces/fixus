
import * as w3api from "w3api/dist/api";
import * as w3ts from "w3api/dist/w3ts";
import fs from "fs";
import { getGame } from "w3api";
import "./lua";

Object.assign( globalThis, w3api );
Object.assign( globalThis, w3ts );

getGame().loadData( {
	w3u: fs.readFileSync( "maps/fixus.w3x/war3map.w3u" ),
	wts: fs.readFileSync( "maps/fixus.w3x/war3map.wts" ),
} );
