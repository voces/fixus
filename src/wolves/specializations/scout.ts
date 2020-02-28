import {
  Trait,
  TraitClass,
  EventType,
  UnitType,
  ActiveType,
  PassiveType
} from "./types";

const scoutTraits: Trait[] = [
  {
    class: TraitClass.SCOUT,
    tier: 1,
    option: 1,
    name: "unobstructed ward vision",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.WARD,
            replacement: ActiveType.WARD_UNOBSTRUCTED
          }
        ]
      }
    ]
  },
  {
    class: TraitClass.SCOUT,
    tier: 1,
    option: 2,
    name: "Scouts last 200% longer",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.SCOUT,
            replacement: ActiveType.SCOUT_LONGER
          }
        ]
      }
    ]
  },
  {
    class: TraitClass.SCOUT,
    tier: 2,
    option: 1,
    name: "25% movement speed",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.PASSIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.SCOUT_CLASS_MOVEMENT_SPEED_BONUS
      }
    ]
  },
  {
    class: TraitClass.SCOUT,
    tier: 2,
    option: 2,
    name: "Scout 20% slow aura",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.PASSIVE,
        units: [UnitType.SCOUT],
        passive: PassiveType.SCOUT_MOVEMENT_SPEED_SLOW_AURA
      }
    ]
  },
  {
    class: TraitClass.SCOUT,
    tier: 3,
    option: 1,
    name: "Omniscense (skill) 20s cool down",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.OMNISCIENCE
      }
    ]
  },
  {
    class: TraitClass.SCOUT,
    tier: 3,
    option: 2,
    name: "Ward of Power",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.WARD_OF_POWER
      }
    ]
  }
];

export default scoutTraits;
