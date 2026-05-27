import { Buffer } from "node:buffer";
import "w3api/dist/lua/polyfill.js";
import { api, getGame, w3ts } from "w3api";

Object.assign(globalThis, api);
Object.assign(globalThis, w3ts);

getGame().loadData({
  w3u: Buffer.from(Deno.readFileSync("map.w3x/war3map.w3u")),
  wts: Buffer.from(Deno.readFileSync("map.w3x/war3map.wts")),
});

// WC3 has no native SetPlayerSlotState, but w3api's polyfill backs `player` with a class that exposes
// a slotState setter. Tests need to seed slot state so GetPlayerSlotState reflects the desired value.
export const setPlayerSlotState = (p: player, state: playerslotstate): void => {
  (p as unknown as { slotState: playerslotstate }).slotState = state;
};
