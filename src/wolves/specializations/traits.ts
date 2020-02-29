import { Trait, StoredTrait, EventType, EVENT } from "./types";
import cutterTraits from "./cutter";
import hoarderTraits from "./hoarder";
import scoutTraits from "./scout";
import illusionistTraits from "./illusionist";
import defenderTraits from "./defender";
import creepMeisterTraits from "./creepMeister";
import {
  applyEventsToAllPlayerUnits,
  orderedEvents,
  applyEventsToUnit
} from "./events";

import { addStoredTrait, getStoredTraits } from "./store";

export const traits: Trait[] = [
  ...cutterTraits,
  ...hoarderTraits,
  ...scoutTraits,
  ...illusionistTraits,
  ...defenderTraits,
  ...creepMeisterTraits
];

function convertToTrait(storedTrait: StoredTrait): Trait | undefined {
  return traits.find(trait => {
    storedTrait.option === trait.option &&
      storedTrait.class === trait.class &&
      storedTrait.tier === trait.tier;
  });
}

function applyTraitToAllUnits(trait: Trait, player: player): void {
  applyEventsToAllPlayerUnits(trait.events, player);
}

function getPlayerEvents(player: player): EVENT[] {
  const storedTraits: StoredTrait[] = getStoredTraits(player);
  return orderedEvents(
    storedTraits
      .map(convertToTrait)
      .map(trait => trait && trait.events)
      .flat()
  );
}

/**
 * Find events of a type for a player, helpful for
 * traits that are applied elsewhere (non-instant)
 *
 * @param player
 * @param eventType
 */
export function getPlayerEventsByType(
  player: player,
  eventType: EventType
): any[] {
  return getPlayerEvents(player).filter(
    event => event && event.type === eventType
  );
}

/**
 * Stores a trait and applies nescessary trait behaviors
 * @param player
 * @param storedTrait
 */
export function learn(player: player, storedTrait: StoredTrait): void {
  addStoredTrait(player, storedTrait);

  const trait = convertToTrait(storedTrait);
  if (trait) {
    applyTraitToAllUnits(trait, player);
  }
}

/**
 * Applies events to a unit helpful for when
 * new unit spawns or is created.
 * @param player
 * @param storedTrait
 */
export function applyLearnedPlayerTraitsToUnit(
  player: player,
  unit: unit
): void {
  const events: EVENT[] = getPlayerEvents(player);
  applyEventsToUnit(events, unit);
}
