import { expect, it } from "test/jest-compat";
import "w3api/dist/lua/polyfill.js";
import { swapQuotes } from "./strings";

it("swaps single and double quotes", () => {
  expect(swapQuotes("\"'\"'")).toEqual("'\"'\"");
});

it("running twice returns the same string", () => {
  expect(swapQuotes(swapQuotes("\"''\""))).toEqual("\"''\"");
});
