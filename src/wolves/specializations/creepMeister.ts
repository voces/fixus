import { Trait, TraitClass, EventType } from "./traits";

const scoutTraits: Trait[] = [
  {
    class: TraitClass.CREEP_MEISTER,
    tier: 1,
    option: 1,
    name: "+15 damage on golems",
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
    class: TraitClass.CREEP_MEISTER,
    tier: 1,
    option: 2,
    name: "Golem Item slot",
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
    class: TraitClass.CREEP_MEISTER,
    tier: 2,
    option: 1,
    name: "Summon wolves ability",
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
    class: TraitClass.CREEP_MEISTER,
    tier: 2,
    option: 2,
    name: "Golems are forever",
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
    class: TraitClass.CREEP_MEISTER,
    tier: 3,
    option: 1,
    name: "6 item slots on golems",
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
    class: TraitClass.CREEP_MEISTER,
    tier: 3,
    option: 2,
    name: "Stalkers max movement speed",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.PASSIVE,
        behavior: (): void => {}
      }
    ]
  }
];

export default scoutTraits;
