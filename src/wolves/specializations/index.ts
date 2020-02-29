import {
  learn,
  applyLearnedPlayerTraitsToUnit,
  getPlayerEventsByType
} from "./traits";
import { EventType, DamagedUnitModifier } from "./types";
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

export { learn, applyLearnedPlayerTraitsToUnit, getPlayerEventsByType };
