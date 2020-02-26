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
  MIRROR_IMAGE_ACTIVE_REPLACE,
  BOUNTY_MODIFIER,
  BOUNTY_SIDE_EFFECT,
  INCOME_MODIFIER
}

interface EventDefinition {
  type: EventType;
  behavior(): void;
  order?: number; // nulls execute first
}

interface BountyModifier extends EventDefinition {
  type: EventType.BOUNTY_MODIFIER;
  behavior(): void;
}

interface BountySideEffect extends EventDefinition {
  type: EventType.BOUNTY_SIDE_EFFECT;
  behavior(): void;
}

interface IncomeModifier extends EventDefinition {
  type: EventType.INCOME_MODIFIER;
  behavior(): void;
}

interface Passive extends EventDefinition {
  type: EventType.PASSIVE;
  behavior(): void;
}

interface Active extends EventDefinition {
  type: EventType.ACTIVE;
  behavior(): void;
}

interface ActiveReplace extends EventDefinition {
  type: EventType.ACTIVE_REPLACE;
  behavior(): void;
}

interface MirrorImageActiveReplace extends EventDefinition {
  type: EventType.ACTIVE_REPLACE;
  behavior(): void;
}

export type EVENT =
  | Passive
  | Active
  | BountyModifier
  | IncomeModifier
  | ActiveReplace
  | BountySideEffect
  | MirrorImageActiveReplace;

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

export interface TraitStorage {
  [key: string]: StoredTrait[];
}
