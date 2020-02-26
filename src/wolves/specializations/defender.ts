import { Trait, TraitClass, EventType } from "./traits";

const scoutTraits: Trait[] = [
  {
    class: TraitClass.DEFENDER,
    tier: 1,
    option: 1,
    name: "Phase Shift 5s / Brilliance Aura",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.PASSIVE, // perhaps active of phase shift
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        type: EventType.ACTIVE,
        behavior: (): void => {}
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
        type: EventType.ACTIVE_REPLACE,
        behavior: (): void => {}
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
        behavior: (): void => {}
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
        behavior: (): void => {}
      }
    ]
  }
];

export default scoutTraits;
