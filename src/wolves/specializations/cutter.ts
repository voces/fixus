import { Trait, TraitClass, EventType } from "./traits";

const cutterTraits: Trait[] = [
  {
    class: TraitClass.CUTTER,
    tier: 1,
    option: 1,
    name: "20% attack speed",
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
    class: TraitClass.CUTTER,
    tier: 1,
    option: 2,
    name: "18 damage",
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
    class: TraitClass.CUTTER,
    tier: 2,
    option: 1,
    name: "15% bonus damage",
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
    class: TraitClass.CUTTER,
    tier: 2,
    option: 2,
    name: "25% spill over damage",
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
    class: TraitClass.CUTTER,
    tier: 3,
    option: 1,
    name: "40% attack speed",
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
    class: TraitClass.CUTTER,
    tier: 3,
    option: 2,
    name: "-10 armor per swing",
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

export default cutterTraits;
