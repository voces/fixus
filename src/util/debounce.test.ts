import { expect, it, jest } from "test/jest-compat";
import "test/w3api";
import { executeHooksMainAfter } from "@voces/w3ts";
import { getGame } from "w3api";
import { debounce } from "./debounce";
import { repeat } from "test/util";

it("works", () => {
  executeHooksMainAfter();
  const fn = jest.fn();
  const debounced = debounce({ threshold: 3, duration: 5 }, fn);
  repeat(5, () => debounced("a"));

  expect(fn).toHaveBeenCalledTimes(3);

  getGame().tickFor(5);
  repeat(5, () => debounced("a"));
  debounced("b");

  expect(fn).toHaveBeenCalledTimes(7);
});
