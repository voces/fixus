import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { goldFactor, SmallText, mainUnit, fillArrayFn } from "shared";
import {
  applyBountyModifications,
  applyBountySideEffects
} from "../wolves/specializations/index";
// ===========================================================================
// Trigger: miscKillReturn
// ===========================================================================

const Trig_miscKillReturn_Actions = (): void => {
  if (
    GetKillingUnit() == null ||
    IsUnitAlly(GetKillingUnit(), GetOwningPlayer(GetTriggerUnit()))
  )
    return;

  const goldBase = BlzGetUnitIntegerField(
    GetTriggerUnit(),
    UNIT_IF_GOLD_BOUNTY_AWARDED_BASE
  );
  const goldDice = BlzGetUnitIntegerField(
    GetTriggerUnit(),
    UNIT_IF_GOLD_BOUNTY_AWARDED_NUMBER_OF_DICE
  );
  const goldSides = BlzGetUnitIntegerField(
    GetTriggerUnit(),
    UNIT_IF_GOLD_BOUNTY_AWARDED_SIDES_PER_DIE
  );

  const gold: number = applyBountyModifications(
    GetOwningPlayer(GetKillingUnit()),
    (goldBase +
      fillArrayFn(goldDice, () => Math.ceil(Math.random() * goldSides)).reduce(
        (sum, v) => sum + v,
        0
      )) *
      goldFactor()
  );

  const xp =
    BlzGetUnitIntegerField(
      GetTriggerUnit(),
      UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE
    ) * goldFactor();

  if (gold > 0) {
    applyBountySideEffects(
      GetOwningPlayer(GetTriggerUnit()),
      GetOwningPlayer(GetKillingUnit()),
      gold
    );

    AdjustPlayerStateBJ(
      gold,
      GetOwningPlayer(GetKillingUnit()),
      PLAYER_STATE_RESOURCE_GOLD
    );
    SmallText(gold, GetTriggerUnit(), 14, 0, 0);
  }

  if (xp > 0) {
    AddHeroXP(mainUnit(GetOwningPlayer(GetKillingUnit())), xp, true);
    SmallText(xp, GetTriggerUnit(), 3, 16, -64);
  }
};

// ===========================================================================
addScriptHook(W3TS_HOOK.MAIN_AFTER, (): void => {
  const t = CreateTrigger();
  TriggerRegisterAnyUnitEventBJ(t, EVENT_PLAYER_UNIT_DEATH);
  TriggerAddAction(t, Trig_miscKillReturn_Actions);
});
