import { expect, it } from "test/jest-compat";
import { setPlayerSlotState } from "test/w3api";
import { executeHooksMainAfter } from "@voces/w3ts";
import { main, nextWolfId, units } from "./dragonFire";
import { WOLF_TYPE, wolfTeam, wolves } from "shared";

it("smoke", () => {
  SetPlayerController(Player(0), MAP_CONTROL_USER);
  setPlayerSlotState(Player(0), PLAYER_SLOT_STATE_PLAYING);

  executeHooksMainAfter();
  main();
  CreateUnit(Player(0), FourCC("hhou"), 0, 0, 270);
  CreateUnit(Player(0), FourCC("hhou"), 0, 192, 270);
  CreateUnit(Player(0), FourCC("hhou"), 192, 0, 270);
  CreateUnit(Player(0), FourCC("hhou"), 192, 192, 270);
  CreateUnit(Player(0), FourCC("uC04"), 96, 96, 270);

  expect(BlzGroupGetSize(units)).toEqual(1);
});

it("nextWolfId", () => {
  const wolfIds = [2, 5, 8, 11];
  const positions: Record<number, [number, number]> = {
    2: [1024, 1024],
    5: [1024, 1024],
    8: [4096, 4096],
    11: [4096, 4096],
  };
  const created: unit[] = [];
  wolfIds.forEach((id) => {
    ForceAddPlayer(wolfTeam, Player(id));
    const [x, y] = positions[id];
    const u = CreateUnit(Player(id), WOLF_TYPE, x, y, 270);
    created.push(u);
    wolves[id] = u;
  });

  expect(nextWolfId(0)).toEqual(2); // sheep
  expect(nextWolfId(1)).toEqual(2); // sheep
  expect(nextWolfId(2)).toEqual(5); // wolf
  expect(nextWolfId(3)).toEqual(5); // sheep
  expect(nextWolfId(4)).toEqual(5); // sheep
  expect(nextWolfId(5)).toEqual(8); // wolf
  expect(nextWolfId(6)).toEqual(8); // sheep
  expect(nextWolfId(7)).toEqual(8); // sheep
  expect(nextWolfId(8)).toEqual(11); // wolf
  expect(nextWolfId(9)).toEqual(11); // sheep
  expect(nextWolfId(10)).toEqual(11); // sheep
  expect(nextWolfId(11)).toEqual(2); // wolf

  wolfIds.forEach((id, i) => {
    ForceRemovePlayer(wolfTeam, Player(id));
    RemoveUnit(created[i]);
    delete wolves[id];
  });
});
