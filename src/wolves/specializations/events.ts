import {
  EventType,
  EVENT,
  UnitModifier,
  Passive,
  Active,
  ActiveReplace
} from "./types";

export function orderedEvents(events: EVENT[]): EVENT[] {
  return events.sort((a: EVENT, b: EVENT): number => {
    // equal items sort equally
    if (a.order === b.order) return 0;
    // nulls sort before anything else
    else if (!a.order) return -1;
    else if (!b.order) return 1;
    return a.order < b.order ? -1 : 1;
  });
}

function playerUnits(player: player, callback: (units: group) => void): void {
  const group = CreateGroup();
  GroupEnumUnitsOfPlayer(group, player, null);
  callback(group);
  DestroyGroup(group);
}

function applyActive(unit: unit, event: Active): void {
  UnitAddAbilityBJ(event.active, unit);
}

function applyPassive(unit: unit, event: Passive): void {
  UnitAddAbilityBJ(event.passive, unit);
  BlzUnitHideAbility(unit, event.passive, true);
}

function applyActiveReplace(unit: unit, event: ActiveReplace): void {
  const { target, replacement } =
    event.replacements.find(({ target }) => {
      GetUnitAbilityLevel(unit, target) > 0;
    }) || {};

  if (target && replacement) {
    UnitRemoveAbilityBJ(replacement, unit);
    UnitAddAbilityBJ(target, unit);
  }
}

function applyUnitModifier(unit: unit, event: UnitModifier): void {
  event.modify(unit);
}

function apply(event: EVENT, unit: unit): void {
  switch (event.type) {
    case EventType.ACTIVE: {
      if (event.units.includes(GetUnitTypeId(unit))) {
        applyActive(unit, event);
      }
      break;
    }
    case EventType.PASSIVE: {
      if (event.units.includes(GetUnitTypeId(unit))) {
        applyPassive(unit, event);
      }
      break;
    }
    case EventType.ACTIVE_REPLACE: {
      if (event.units.includes(GetUnitTypeId(unit))) {
        applyActiveReplace(unit, event);
      }
      break;
    }
    case EventType.UNIT_MODIFIER: {
      if (event.units.includes(GetUnitTypeId(unit))) {
        applyUnitModifier(unit, event);
      }
      break;
    }
  }
}

function applyToAllUnits(event: EVENT, units: group): void {
  ForGroup(units, () => {
    const unit = GetEnumUnit();
    apply(event, unit);
  });
}

export function applyEventsToAllPlayerUnits(
  events: EVENT[],
  player: player
): void {
  playerUnits(player, units => {
    events.forEach(event => applyToAllUnits(event, units));
  });
}

export function applyEventsToUnit(events: EVENT[], unit: unit): void {
  events.forEach(event => apply(event, unit));
}
