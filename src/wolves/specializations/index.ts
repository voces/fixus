import {
  learn,
  applyLearnedPlayerTraitsToUnit,
  getPlayerEventsByType
} from "./traits";
import {
  EventType,
  DamagedUnitModifier,
  IncomeModifier,
  BountyModifier,
  BountySideEffect
} from "./types";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";

addScriptHook(W3TS_HOOK.MAIN_AFTER, (): void => {
  const applyOnSpawnSpecializations = CreateTrigger();
  TriggerRegisterAnyUnitEventBJ(
    applyOnSpawnSpecializations,
    EVENT_PLAYER_UNIT_SUMMON
  );
  TriggerAddAction(applyOnSpawnSpecializations, () => {
    const unit: unit = GetTriggerUnit();
    const player: player = GetOwningPlayer(unit);
    // assumption is that golems images scouts are all summons
    // and the replace function is not considered a summon
    // Applying here let's us use unit modifiers rather than
    // Abilities. (should also let mirror images appear consistentish?)
    applyLearnedPlayerTraitsToUnit(player, unit);
  });
});

addScriptHook(W3TS_HOOK.MAIN_AFTER, (): void => {
  const applyOnSpawnSpecializations = CreateTrigger();
  TriggerRegisterAnyUnitEventBJ(
    applyOnSpawnSpecializations,
    EVENT_PLAYER_UNIT_DAMAGED
  );
  TriggerAddAction(applyOnSpawnSpecializations, () => {
    const unit: unit = GetEventDamageSource();
    const damagedUnit: unit = BlzGetEventDamageTarget();
    const player: player = GetOwningPlayer(unit);

    getPlayerEventsByType(player, EventType.DAMAGED_UNIT_MODIFIER).forEach(
      (event: DamagedUnitModifier) => {
        if (event.source_units.includes(GetUnitTypeId(unit))) {
          event.modify(damagedUnit);
        }
      }
    );
  });
});

function applyIncomeModifications(player: player, gold: number): number {
  let modifiedGold = gold;
  getPlayerEventsByType(player, EventType.INCOME_MODIFIER).forEach(
    (event: IncomeModifier) => {
      modifiedGold = event.modify(modifiedGold);
    }
  );
  return modifiedGold;
}

function applyBountyModifications(player: player, gold: number): number {
  let modifiedGold = gold;
  getPlayerEventsByType(player, EventType.BOUNTY_MODIFIER).forEach(
    (event: BountyModifier) => {
      modifiedGold = event.modify(modifiedGold);
    }
  );
  return modifiedGold;
}

function applyBountySideEffects(
  killedPlayer: player,
  killingPlayer: player,
  bounty: number
): void {
  getPlayerEventsByType(killingPlayer, EventType.BOUNTY_SIDE_EFFECT).forEach(
    (event: BountySideEffect) => {
      event.modify(bounty, killedPlayer, killingPlayer);
    }
  );
}

function applyCloaksOnMirrorImages(player: player): boolean {
  return getPlayerEventsByType(player, EventType.BOUNTY_SIDE_EFFECT).length > 0;
}

export {
  learn,
  applyLearnedPlayerTraitsToUnit,
  applyBountyModifications,
  applyIncomeModifications,
  applyBountySideEffects,
  applyCloaksOnMirrorImages
};
