import {
  SpecializationStorage,
  StoredTrait,
  LevelStorage,
  MenuStorage
} from "./types";

const traitStorage: SpecializationStorage = {};
const playerLevel: LevelStorage = {};
const menu: MenuStorage = {};

export function getPlayerLevel(player: player): number {
  return playerLevel[GetPlayerId(player)] || 0;
}

export function setPlayerLevel(player: player, level: number): void {
  playerLevel[GetPlayerId(player)] = level;
}

const DEFAULT_PAGE = 0;
export function getMenuPage(player: player): number {
  return (
    (menu[GetPlayerId(player)] && menu[GetPlayerId(player)].page) ||
    DEFAULT_PAGE
  );
}

export function setMenuPage(player: player, pageNumber: number): void {
  menu[GetPlayerId(player)] = Object.assign(menu[GetPlayerId(player)] || {}, {
    page: pageNumber
  });
}

export function addStoredTrait(player: player, storedTrait: StoredTrait): void {
  const playerNumber = GetPlayerId(player);

  traitStorage[playerNumber] = (traitStorage[playerNumber] || []).concat([
    storedTrait
  ]);
}

export function getStoredTraits(player: player): StoredTrait[] {
  const playerNumber = GetPlayerId(player);

  return traitStorage[playerNumber] || [];
}
