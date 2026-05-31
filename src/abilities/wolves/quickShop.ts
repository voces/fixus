// =============================================================================
// Quick Shop — wolf-side build menu repurposed as an item shop.
// =============================================================================
//
// Wolves' build menu (Q) opens a paginated grid of items. Clicking an item
// instantly buys it. Replaces the orbiting shop unit (removed: quickShops.ts).
//
// -----------------------------------------------------------------------------
// Architecture (three layers)
// -----------------------------------------------------------------------------
//
// 1. Authored content (lives in map.w3x/, edited once via WE — the
//    foundation everything else builds on):
//      • Wolves have urac="orc" so engine routes build clicks through AObu.
//      • war3mapSkin.w3a: AObu icon=BTNMerchant, buttonpos=(2,1).
//      • Units/CommandStrings.txt: [CmdBuildOrc] block (Tip="Quick Shop",
//        Ubertip=..., Hotkey=Q). Full stock contents required — no partial
//        Skin variant of this file exists (CommandSkinStrings.txt was tried,
//        not honored by the engine).
//      • war3mapSkin.txt: CommandBasicStructOrc=BTNMerchant.blp (changes the
//        build-menu cursor icon), ToolTipSupplyIcon=BTNMerchant (replaces
//        the lumber icon in the food tooltip area), Nofood=TRIGSTR_5138
//        (redirects the engine's "Not enough food" error text at our
//        per-race-empty STRING 5138 entry, hiding the text — sibling to the
//        silent sound stubs below).
//      • map.w3x/Sound/Interface/Warning/<Race>/<Race>NoFood1.mp3: silent
//        stubs that replace the engine's stock "Not enough food" voice (the
//        food check blocks every dummy click — see "tricks" below).
//
// 2. Pipeline (scripts/generateQuickShop.ts), run at build time:
//      • generateQuickShopData()        → codegens ./quickShop.generated.ts
//        BEFORE tstl (runtime imports it). The generated file is just the
//        page → item-rawcodes mapping — costs are NOT codegenned, the
//        runtime queries GetUnitGoldCost / GetUnitWoodCost (common.ai
//        natives) on each dummy to recover what we set as ugol/ulum.
//      • applyQuickShopToArchive(map)   → in-memory transforms on the .w3x
//        archive AFTER files load:
//          a. Read each QUICK_SHOP_PAGE_SHOPS unit's `usei` (Items Sold)
//             from war3map.w3u; assert each ≤ QUICK_SHOP_PAGE_LIMIT items
//          b. Inject one dummy per shop item + 1 next-page dummy into
//             war3map.w3u
//          c. Set `ubui` on each wolf type to list those dummies
//          d. Strip stale qs* entries from war3mapSkin.w3u (editor sometimes
//             copies them as "skin overrides" — they'd otherwise win at
//             runtime over our war3map.w3u entries)
//          e. Inject STRING 5138 (per-race empty Nofood) into war3map.wts
//      Source files in map.w3x/ are NEVER mutated by the pipeline — output
//      lives only inside the built archive (and the generated.ts file).
//
// 3. Runtime (this file): registers CommandEvent triggers on AObu (orc
//    build), one per dummy rawcode. On click: check resources, deduct,
//    grant item, ForceUICancel, reset page. Pagination uses
//    SetPlayerTechMaxAllowed(player, dummyId, -1|0) to hide items not on
//    the current page.
//
// -----------------------------------------------------------------------------
// Tricks / gotchas
// -----------------------------------------------------------------------------
//
// • Food cost (ufoo) on each dummy = its gold cost. Wolves have 0 food
//   capacity, so the engine blocks every build attempt at the food check.
//   The CommandEvent has already fired by then, so we handle the purchase
//   in code. Without silencing the engine's "Not enough food" voice + UI,
//   every successful purchase would still trigger them — hence the silent
//   sound stubs and the per-race-empty STRING 5138 entry.
//
// • Engine handles the "Not enough gold/lumber" UI for free. With `ugol`
//   and `ulum` set on the dummies, the engine plays the race-specific voice
//   and shows the text automatically when the player can't afford. Our
//   onBuyItem just silent-returns on insufficient resources.
//
// • Build button styling is split: icon + buttonpos take effect from
//   war3mapSkin.w3a (Object Editor → Skins tab on AObu); tip + ubertip +
//   hotkey only honored from Units/CommandStrings.txt. The skin file's
//   atp1/aub1/ahky on AObu are ignored by the engine specifically for
//   build buttons.
//
// • AObu (and the other race-builds AHbu/AEbu/AUbu) are hidden in the WE
//   Object Editor by default (useInEditor=0 in the stock AbilityData.slk).
//   One-time host setup to edit them:
//     1. Enable local-file overrides in the registry:
//          reg add "HKCU\Software\Blizzard Entertainment\Warcraft III" \
//            /v "Allow Local Files" /t REG_DWORD /d 1
//     2. Edit <WC3 install>/Units/abilitydata.slk, find AObu's row, flip
//        its X5 (useInEditor) cell from K0 to K1. (Back the file up — it
//        lives in your game install, not the repo.)
//     3. Restart WE. AObu now appears under Abilities and edits in the
//        Skins tab land in war3mapSkin.w3a like a normal ability.
//   Same trick works for any hidden ability.
//
// • Pagination needs a Next-Page button on every page. qsNX is at C (2,2);
//   stock Cancel button sits at V (3,2). Items fill the rest of the 4×3
//   grid (10 on pages 1+2, 9 on page 3).
//
// • Page resets fire on: successful purchase, wolf deselect, ESC key. The
//   build-menu Cancel button (V tick) does NOT surface any catchable event
//   — neither AObu's CommandEvent nor ISSUED_ORDER 851976 ("cancel") fire
//   for it. ESC works because we listen to the raw keypress instead.
//
// • Cost lookup at runtime uses GetUnitGoldCost / GetUnitWoodCost — both
//   declared in common.ai (NOT common.j). They work from map triggers
//   because tsconfig pulls in war3-types/core/commonai. The dummies' ugol /
//   ulum (set by the pipeline) become the lookup result.
//
// • Library bugs worked around:
//     - mdx-m3-viewer-th 5.13: ModifiedObject.save writes modCount before
//       setsFlag for format v3, but load reads [flag, modCount]. Monkey-
//       patched at top of generateQuickShop.ts.
//     - w3xdata pre-3.1.1: applyModifications didn't honor the type's
//       use{Item,Unit,Building,Hero} flags, so an orphan `uico` on an item
//       leaked into spec.art.Art. Fixed upstream in 3.1.1.
//
// =============================================================================

import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { BLACK_WOLF_TYPE, IMBA_WOLF_TYPE, WOLF_TYPE } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";
import { forEachPlayer } from "util/temp";
import { QUICK_SHOP_NEXT_PAGE_RAWCODE, quickShopSlotRawcode } from "./quickShop.config";
import { quickShopPages } from "./quickShop.generated";

const WOLF_TYPES = [WOLF_TYPE, BLACK_WOLF_TYPE, IMBA_WOLF_TYPE];

const NEXT_PAGE = FourCC(QUICK_SHOP_NEXT_PAGE_RAWCODE);

// Wolves are orc race (urac="orc"), so the engine routes the build-menu click
// through AObu — only register that one.
//
// To override stock fields on AObu (icon, button position, etc.) the ability
// has to be visible in the World Editor's Object Editor first. It's hidden by
// default (`useInEditor=0` in the stock AbilityData.slk). One-time host setup:
//   1. Enable local-file overrides in the registry:
//        reg add "HKCU\Software\Blizzard Entertainment\Warcraft III" \
//          /v "Allow Local Files" /t REG_DWORD /d 1
//   2. Edit <WC3 install>/Units/abilitydata.slk, find the AObu row, flip its
//      X5 (useInEditor) cell from `K0` to `K1`. (Back the file up first — it
//      lives in the game install, not the repo.)
//   3. Restart the World Editor. AObu now shows up under Abilities and can be
//      edited like any other; the editor writes overrides to war3mapSkin.w3a.
// Same trick works for any hidden ability — flip its useInEditor cell.
//
// Heads-up: the build button's Tip/Ubertip/Hotkey are *not* honored from the
// skin file — the engine special-cases them through `[CmdBuild<Race>]` in
// Units/CommandStrings.txt. That file has to be the full stock contents plus
// our overrides (partial CommandSkinStrings.txt does NOT work — tested).
const BUILD_ABILITY = FourCC("AObu");

// Page → dummy rawcode integer ids, derived from quickShopPages (codegenned
// from each shop unit's Items Sold list).
const pageIds: number[][] = quickShopPages.map((page, pageIndex) =>
  page.map((_, slot) => FourCC(quickShopSlotRawcode(pageIndex, slot)))
);

const playerPage = new Map<player, number>();

const applyPage = (player: player, pageIndex: number): void => {
  for (let p = 0; p < pageIds.length; p++) {
    const allowed = p === pageIndex ? -1 : 0;
    for (const id of pageIds[p]) SetPlayerTechMaxAllowed(player, id, allowed);
  }
};

// TriggerRegisterCommandEvent doesn't set the triggering player the same way
// order events do — derive the owner from the commanded unit instead.
const triggerWolf = (): { wolf: unit; player: player } => {
  const wolf = GetTriggerUnit();
  return { wolf, player: GetOwningPlayer(wolf) };
};

const onNextPage = (): void => {
  const { player } = triggerWolf();
  const next = ((playerPage.get(player) ?? 0) + 1) % pageIds.length;
  playerPage.set(player, next);
  applyPage(player, next);
};

// Resets the player back to page 0 so the next time the build menu opens it
// starts fresh. Cheap no-op if they're already on page 0.
const resetPage = (player: player): void => {
  if ((playerPage.get(player) ?? 0) === 0) return;
  playerPage.set(player, 0);
  applyPage(player, 0);
};

const onWolfDeselected = (): void => {
  const u = GetTriggerUnit();
  if (!WOLF_TYPES.includes(GetUnitTypeId(u))) return;
  resetPage(GetOwningPlayer(u));
};

// Sound handles created by the WE Sound Editor when each stock NoGold/NoLumber
// asset was imported — the editor emits a `gg_snd_<Name>` global per import.
declare const gg_snd_KnightNoGold1: sound;
declare const gg_snd_KnightNoLumber1: sound;
declare const gg_snd_GruntNoGold1: sound;
declare const gg_snd_GruntNoLumber1: sound;
declare const gg_snd_NecromancerNoGold1: sound;
declare const gg_snd_NecromancerNoLumber1: sound;
declare const gg_snd_SentinelNoGold1: sound;
declare const gg_snd_SentinelNoLumber1: sound;

const insufficientSound = (playerRace: race, short: "gold" | "lumber"): sound | undefined => {
  if (playerRace === RACE_HUMAN) return short === "gold" ? gg_snd_KnightNoGold1 : gg_snd_KnightNoLumber1;
  if (playerRace === RACE_ORC) return short === "gold" ? gg_snd_GruntNoGold1 : gg_snd_GruntNoLumber1;
  if (playerRace === RACE_UNDEAD) {
    return short === "gold" ? gg_snd_NecromancerNoGold1 : gg_snd_NecromancerNoLumber1;
  }
  if (playerRace === RACE_NIGHTELF) return short === "gold" ? gg_snd_SentinelNoGold1 : gg_snd_SentinelNoLumber1;
};

const reportInsufficient = (player: player, short: "gold" | "lumber"): void => {
  const snd = insufficientSound(GetPlayerRace(player), short);
  const text = short === "gold" ? "Not enough gold." : "Not enough lumber.";
  // Y measured off the engine's actual "Not enough gold." render position in
  // Reforged — SimError's stock (0.52, -1.0) renders too high.
  if (GetLocalPlayer() === player) {
    if (snd) StartSound(snd);
    ClearTextMessages();
    DisplayTimedTextToPlayer(player, 0.52, 0, 2.0, `|cffffcc00${text}|r`);
  }
};

const onBuyItem = (itemId: number, goldPrice: number, lumberPrice: number): void => {
  const { wolf, player } = triggerWolf();
  if (GetUnitState(wolf, UNIT_STATE_LIFE) <= 0) return;
  const gold = GetPlayerState(player, PLAYER_STATE_RESOURCE_GOLD);
  const lumber = GetPlayerState(player, PLAYER_STATE_RESOURCE_LUMBER);
  if (gold < goldPrice) return reportInsufficient(player, "gold");
  if (lumber < lumberPrice) return reportInsufficient(player, "lumber");
  // Close the build cursor so the click feels like a purchase, not a placement.
  if (GetLocalPlayer() === player) ForceUICancel();
  SetPlayerState(player, PLAYER_STATE_RESOURCE_GOLD, gold - goldPrice);
  if (lumberPrice > 0) SetPlayerState(player, PLAYER_STATE_RESOURCE_LUMBER, lumber - lumberPrice);
  UnitAddItemById(wolf, itemId);
  resetPage(player);
};

const registerCommand = (orderString: string, action: () => void): void => {
  const t = CreateTrigger();
  TriggerRegisterCommandEvent(t, BUILD_ABILITY, orderString);
  wrappedTriggerAddAction(t, "quick shop", action);
};

addScriptHook(W3TS_HOOK.MAIN_AFTER, (): void => {
  registerCommand(UnitId2String(NEXT_PAGE), onNextPage);

  // For each slot: read costs from the dummy (common.ai natives recover the
  // ugol/ulum the pipeline set), close over them in the buy handler. Computed
  // once at MAIN_AFTER, not per-click.
  quickShopPages.forEach((page, pageIndex) => {
    page.forEach((itemRawcode, slot) => {
      const itemId = FourCC(itemRawcode);
      const dummyId = FourCC(quickShopSlotRawcode(pageIndex, slot));
      const gold = GetUnitGoldCost(dummyId);
      const lumber = GetUnitWoodCost(dummyId);
      registerCommand(UnitId2String(dummyId), () => onBuyItem(itemId, gold, lumber));
    });
  });

  // Escape closes the build sub-menu; neither AObu's CommandEvent nor the
  // ISSUED_ORDER 851976 ("cancel") fire for it, so listen to the raw keypress.
  const escT = CreateTrigger();
  forEachPlayer((p) => BlzTriggerRegisterPlayerKeyEvent(escT, p, OSKEY_ESCAPE, 0, true));
  wrappedTriggerAddAction(escT, "quick shop escape", () => resetPage(GetTriggerPlayer()));

  // Reset on wolf deselect (clicking elsewhere, switching units, etc.).
  const deselectT = CreateTrigger();
  TriggerRegisterAnyUnitEventBJ(deselectT, EVENT_PLAYER_UNIT_DESELECTED);
  wrappedTriggerAddAction(deselectT, "quick shop deselect", onWolfDeselected);

  // Seed every player at page 0 so the first wolf already sees the trimmed list.
  forEachPlayer((p) => {
    playerPage.set(p, 0);
    applyPage(p, 0);
  });
});
