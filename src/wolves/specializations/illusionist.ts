import { Trait, TraitClass, EventType, ActiveType, UnitType } from "./types";

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
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.MIRROR_IMAGE,
            replacement: ActiveType.MIRROR_IMAGE_0_MANA
          }
        ]
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
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.MIRROR_IMAGE,
            replacement: ActiveType.MIRROR_IMAGE_DAMAGE
          }
        ]
      }
    ]
  },
  {
    class: TraitClass.ILLUSIONIST,
    tier: 2,
    option: 1,
    name: "Cloaks work on images",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.CLOAKS_ON_MIRROR_IMAGES
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
    events: [
      {
        type: EventType.ACTIVE_REPLACE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        replacements: [
          {
            target: ActiveType.MIRROR_IMAGE,
            replacement: ActiveType.MIRROR_IMAGE_JUMP_DISTANCE
          },
          {
            target: ActiveType.MIRROR_IMAGE_DAMAGE,
            replacement: ActiveType.MIRROR_IMAGE_DAMAGE_JUMP_DISTANCE
          },
          {
            target: ActiveType.MIRROR_IMAGE_0_MANA,
            replacement: ActiveType.MIRROR_IMAGE_0_MANA_JUMP_DISTANCE
          }
        ]
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
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.SWAP_IMAGE
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
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.SPAWN_IMAGE
      }
    ]
  }
];

export default IllusionistTraits;
