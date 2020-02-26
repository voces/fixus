import { Trait, TraitClass, EventType } from "./traits";

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
        type: EventType.PASSIVE,
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        behavior: (): void => {}
      }
    ]
  }
];

export default scoutTraits;
