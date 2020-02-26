import { Trait, TraitStorage, StoredTrait, EventType, EVENT } from "./traits";
import cutterTraits from "./cutter";
import hoarderTraits from "./hoarder";
import scoutTraits from "./scout";
import illusionistTraits from "./illusionist";
import defenderTraits from "./defender";
import creepMeisterTraits from "./creepMeister";

export const traits: Trait[] = [
  ...cutterTraits,
  ...hoarderTraits,
  ...scoutTraits,
  ...illusionistTraits,
  ...defenderTraits,
  ...creepMeisterTraits
];

const playerTraits: TraitStorage = {};

function orderedEvents(events: EVENT[]): EVENT[] {
  return events.sort((a: EVENT, b: EVENT): number => {
    // equal items sort equally
    if (a.order === b.order) return 0;
    // nulls sort before anything else
    else if (!a.order) return -1;
    else if (!b.order) return 1;
    return a.order < b.order ? -1 : 1;
  });
}

export function getEvents(playerNumber: number, eventType: EventType): EVENT[] {
  const storedTraits: StoredTrait[] = playerTraits[playerNumber];

  return orderedEvents(
    storedTraits
      .map(storedTrait =>
        traits.find(trait => {
          storedTrait.option === trait.option &&
            storedTrait.class === trait.class &&
            storedTrait.tier === trait.tier;
        })
      )
      .map(trait => trait && trait.events)
      .flat()
      .filter(event => event && event.type === eventType)
  );
}

export function learnPlayerTrait(
  playerNumber: number,
  trait: StoredTrait
): StoredTrait[] {
  playerTraits[playerNumber] = (playerTraits[playerNumber] || []).concat([
    trait
  ]);

  return playerTraits[playerNumber];
}
