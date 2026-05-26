import { Buffer } from "node:buffer";
import "w3api/dist/lua/polyfill.js";
import { api, getGame, w3ts } from "w3api";

Object.assign(globalThis, api);
Object.assign(globalThis, w3ts);

getGame().loadData({
  w3u: Buffer.from(Deno.readFileSync("map.w3x/war3map.w3u")),
  wts: Buffer.from(Deno.readFileSync("map.w3x/war3map.wts")),
});
