import { Trait, TraitClass, EventType } from "./traits";

const IllusionistTraits: Trait[] = [
  {
    class: TraitClass.ILLUSIONIST,
    tier: 1,
    option: 1,
    name: "Free mirror images",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.MIRROR_IMAGE_ACTIVE_REPLACE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 1,
    option: 2,
    name: "Mirror images do damage",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.PASSIVE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 2,
    option: 1,
    name: "Cloaks work on images",
    icon: "",
    description:
      "(active) aoe skill 30 second cooldown charms savings farms in the area hit.",
    event: [
      {
        type: EventType.PASSIVE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 2,
    option: 2,
    name: "mirror image 200% more jump distance",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.MIRROR_IMAGE_ACTIVE_REPLACE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 3,
    option: 1,
    name: "Global swap with mirror image",
    icon: "",
    description:
      "The bounty that you earn is funded by the corresponding sheeps bank. (Steals Gold)",
    event: [
      {
        type: EventType.ACTIVE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 3,
    option: 2,
    name: "Spawn image skill (1000 range channeling)",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.ACTIVE,
        behavior: (): void => {}
      }
    ]
  }
];

export default IllusionistTraits;
