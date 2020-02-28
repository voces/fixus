export enum TraitClass {
  DEFENDER,
  CUTTER,
  HOARDER,
  SCOUT,
  CREEP_MEISTER,
  ILLUSIONIST
}

export enum EventType {
  PASSIVE,
  ACTIVE,
  ACTIVE_REPLACE,
  TAX_MODIFIER,
  BOUNTY_MODIFIER,
  BOUNTY_SIDE_EFFECT,
  INCOME_MODIFIER,
  UNIT_MODIFIER,
  FARM_MODIFIER,
  DAMAGED_UNIT_MODIFIER,
  CLOAKS_ON_MIRROR_IMAGES
}

export enum PassiveType {
  ONE_SLOT_BACK_PACK,
  SIX_SLOT_BACK_PACK,
  ATTACK_SPEED_20,
  ATTACK_SPILL_OVER_25_PERCENT,
  ATTACK_DAMAGE_15_PERCENT,
  ATTACK_SPEED_40,
  MANA_DEGEN,
  SCOUT_CLASS_MOVEMENT_SPEED_BONUS,
  SCOUT_MOVEMENT_SPEED_SLOW_AURA
}

export enum ActiveType {
  PHASE_SHIFT,
  DIVINE_SHIELD,
  SCOUT,
  SCOUT_LONGER,
  WARD_OF_POWER,
  MIRROR_IMAGE,
  MIRROR_IMAGE_0_MANA,
  MIRROR_IMAGE_JUMP_DISTANCE,
  MIRROR_IMAGE_0_MANA_JUMP_DISTANCE,
  MIRROR_IMAGE_DAMAGE,
  MIRROR_IMAGE_DAMAGE_JUMP_DISTANCE,
  SWAP_IMAGE,
  SPAWN_IMAGE,
  SUMMON_WOLVES,
  DIVINE_SHIELD_10,
  DIVINE_SHIELD_REFLECT,
  DIVINE_SHIELD_10_REFLECT,
  SILENCE,
  DOOM,
  CHARM_FARMS,
  WARD,
  WARD_UNOBSTRUCTED,
  OMNISCIENCE
}

type AbilityType = PassiveType | ActiveType;

export enum UnitType {
  WOLF,
  BLACK_WOLF,
  DEMON_WOLF,
  SCOUT,
  PHONEIX,
  STALKER,
  GOLEM
}

interface EventDefinition {
  type: EventType;
  order?: number; // nulls execute first
}

interface SkillReplacement {
  target: AbilityType;
  replacement: AbilityType;
}

interface BountyModifier extends EventDefinition {
  type: EventType.BOUNTY_MODIFIER;
  modify(bounty: number): number;
}

interface CloaksOnMirrorImages extends EventDefinition {
  type: EventType.CLOAKS_ON_MIRROR_IMAGES;
}

interface FarmModifier extends EventDefinition {
  type: EventType.FARM_MODIFIER;
  modify(unit: unit): void;
}

interface TaxModifier extends EventDefinition {
  type: EventType.TAX_MODIFIER;
  modify(preTax: number, postTax: number): number;
}

interface BountySideEffect extends EventDefinition {
  type: EventType.BOUNTY_SIDE_EFFECT;
  modify(
    bountyAmount: number,
    targetPlayer: player,
    receivingPlayer: player
  ): void;
}

interface IncomeModifier extends EventDefinition {
  type: EventType.INCOME_MODIFIER;
  modify(income: number): number;
}

interface UnitModifier extends EventDefinition {
  type: EventType.UNIT_MODIFIER;
  units: UnitType[];
  modify(unit: unit): void;
}

interface DamagedUnitModifier extends EventDefinition {
  type: EventType.DAMAGED_UNIT_MODIFIER;
  units: UnitType[];
  modify(unit: unit): void;
}

interface Passive extends EventDefinition {
  type: EventType.PASSIVE;
  units: UnitType[];
  passive: PassiveType;
}

interface Active extends EventDefinition {
  type: EventType.ACTIVE;
  units: UnitType[];
  active: ActiveType;
}

interface ActiveReplace extends EventDefinition {
  type: EventType.ACTIVE_REPLACE;
  units: UnitType[];
  replacements: SkillReplacement[]; // array of tuples
}

export type EVENT =
  | Passive
  | Active
  | ActiveReplace
  | BountyModifier
  | IncomeModifier
  | BountySideEffect
  | UnitModifier
  | TaxModifier
  | FarmModifier
  | CloaksOnMirrorImages
  | DamagedUnitModifier;

export interface Trait {
  class: TraitClass;
  tier: number;
  icon: string;
  option: number;
  name: string;
  description: string;
  events: EVENT[];
}

export interface StoredTrait {
  class: TraitClass;
  tier: number;
  option: number;
}

export interface SpecializationStorage {
  [key: string]: StoredTrait[];
}
