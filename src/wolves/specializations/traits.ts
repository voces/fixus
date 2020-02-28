import { Trait, StoredTrait, EventType, EVENT } from "./types";
import cutterTraits from "./cutter";
import hoarderTraits from "./hoarder";
import scoutTraits from "./scout";
import illusionistTraits from "./illusionist";
import defenderTraits from "./defender";
import creepMeisterTraits from "./creepMeister";
import { applyInstantEvents, orderedEvents, applyInstantEvent } from "./events";

import { addStoredTrait, getStoredTraits } from "./store";
export const traits: Trait[] = [
  ...cutterTraits,
  ...hoarderTraits,
  ...scoutTraits,
  ...illusionistTraits,
  ...defenderTraits,
  ...creepMeisterTraits
];

function convertToTrait(storedTrait: StoredTrait) {
  return traits.find(trait => {
    storedTrait.option === trait.option &&
      storedTrait.class === trait.class &&
      storedTrait.tier === trait.tier;
  });
}

function applyTraitEvents(trait: Trait, player: player): void {
  applyInstantEvents(trait.events, player);
}

function getPlayerEvents(player: player) {
  const storedTraits: StoredTrait[] = getStoredTraits(player);
  return orderedEvents(
    storedTraits
      .map(convertToTrait)
      .map(trait => trait && trait.events)
      .flat()
  );
}

function getPlayerEventsByType(player: player, eventType: EventType): EVENT[] {
  return getPlayerEvents(player).filter(
    event => event && event.type === eventType
  );
}

function applyAllPlayerEvents(player: player) {
  getPlayerEvents(player).forEach(applyInstantEvent);
}

export function learn(player: player, storedTrait: StoredTrait): void {
  addStoredTrait(player, storedTrait);

  const trait = convertToTrait(storedTrait);
  if (trait) {
    applyTraitEvents(trait, player);
  }
}
