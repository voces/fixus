import {
  Trait,
  TraitClass,
  EventType,
  UnitType,
  PassiveType,
  ActiveType
} from "./types";

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
        type: EventType.UNIT_MODIFIER,
        units: [UnitType.GOLEM],
        modify: (unit: unit): void => {
          BlzSetUnitBaseDamage(unit, BlzGetUnitBaseDamage(unit, 0) + 15, 0);
        }
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
        units: [UnitType.GOLEM],
        passive: PassiveType.ONE_SLOT_BACK_PACK
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
        type: EventType.ACTIVE,
        units: [UnitType.WOLF, UnitType.BLACK_WOLF, UnitType.DEMON_WOLF],
        active: ActiveType.SUMMON_WOLVES
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
        type: EventType.UNIT_MODIFIER,
        units: [UnitType.GOLEM],
        modify: (unit: unit): void => {
          BlzUnitCancelTimedLife(unit);
        }
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
        units: [UnitType.GOLEM],
        order: 1,
        passive: PassiveType.SIX_SLOT_BACK_PACK
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
        type: EventType.UNIT_MODIFIER,
        units: [UnitType.STALKER],
        modify: (unit: unit): void => {
          SetUnitMoveSpeed(unit, 522);
        }
      }
    ]
  }
];

export default scoutTraits;
