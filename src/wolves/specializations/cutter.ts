import { Trait, TraitClass, EventType, UnitType, PassiveType } from "./types";

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
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.ATTACK_SPEED_20
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
        type: EventType.UNIT_MODIFIER,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        modify: (unit: unit): void => {
          BlzSetUnitBaseDamage(unit, BlzGetUnitBaseDamage(unit, 0) + 18, 0);
        }
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
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.ATTACK_DAMAGE_15_PERCENT
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
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.ATTACK_SPILL_OVER_25_PERCENT
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
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        passive: PassiveType.ATTACK_SPEED_40
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
        type: EventType.DAMAGED_UNIT_MODIFIER,
        source_units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        modify: (unit: unit): void => {
          BlzSetUnitArmor(unit, BlzGetUnitArmor(unit) - 10);
        }
      }
    ]
  }
];

export default cutterTraits;
