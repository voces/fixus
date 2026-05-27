import { expect, it } from "test/jest-compat";
import { generateTs } from "./changelog.ts";

it("snapshot", async () => {
  try {
    expect(await generateTs())
      .toEqual(await Deno.readTextFile("src/misc/changelog.ts"));
  } catch (err) {
    throw new Error((err as Error).message + "\n\nMaybe run `deno task build:changelog`?");
  }
});
