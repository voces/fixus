import {
  Trait,
  TraitClass,
  EventType,
  ActiveType,
  UnitType,
  PassiveType
} from "./types";

const scoutTraits: Trait[] = [
  {
    class: TraitClass.DEFENDER,
    tier: 1,
    option: 1,
    name: "Phase Shift",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.PHASE_SHIFT
      }
    ]
  },
  {
    class: TraitClass.DEFENDER,
    tier: 1,
    option: 2,
    name: "Divine Shield +10 seconds",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.DIVINE_SHIELD,
            replacement: ActiveType.DIVINE_SHIELD_10
          }
        ]
      }
    ]
  },
  {
    class: TraitClass.DEFENDER,
    tier: 2,
    option: 1,
    name: "Silence Aoe 7s 11% slow",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.DIVINE_SHIELD,
            replacement: ActiveType.DIVINE_SHIELD_10
          },
          {
            target: ActiveType.DIVINE_SHIELD_10,
            replacement: ActiveType.DIVINE_SHIELD_10_REFLECT
          },
          {
            target: ActiveType.DIVINE_SHIELD,
            replacement: ActiveType.DIVINE_SHIELD_REFLECT
          }
        ]
      }
    ]
  },
  {
    class: TraitClass.DEFENDER,
    tier: 2,
    option: 2,
    name: "Divine Shield Reflects damage",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.SILENCE
      }
    ]
  },
  {
    class: TraitClass.DEFENDER,
    tier: 3,
    option: 1,
    name: "Mana Degeneration - 10 mana per second",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.PASSIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.MANA_DEGEN
      }
    ]
  },
  {
    class: TraitClass.DEFENDER,
    tier: 3,
    option: 2,
    name: "Doom",
    icon: "",
    description: "Stop sheep from building for 5 seconds.",
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.DOOM
      }
    ]
  }
];

export default scoutTraits;
