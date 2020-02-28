import { SpecializationStorage, StoredTrait } from "./types";

const storage: SpecializationStorage = {};

export function addStoredTrait(player: player, storedTrait: StoredTrait) {
  const playerNumber = GetPlayerId(player);

  storage[playerNumber] = (storage[playerNumber] || []).concat([storedTrait]);
}

export function getStoredTraits(player: player) {
  const playerNumber = GetPlayerId(player);

  return storage[playerNumber];
}
