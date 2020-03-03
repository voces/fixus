
import * as w3api from "w3api/dist/api";
Object.assign( globalThis, w3api );

// Lua polyfills
globalThis.tonumber = parseFloat;
