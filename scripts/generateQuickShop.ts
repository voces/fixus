import { Buffer } from "node:buffer";
import { type ItemSpec, mapItemSpecs, mapStrings, replaceStrings } from "w3xdata";
import War3MapW3u from "mdx-m3-viewer-th/w3x/w3u/file";
import Modification from "mdx-m3-viewer-th/w3x/w3u/modification";
import ModifiedObject from "mdx-m3-viewer-th/w3x/w3u/modifiedobject";
import {
  QUICK_SHOP_NEXT_PAGE_RAWCODE,
  QUICK_SHOP_PAGE_LIMIT,
  QUICK_SHOP_PAGE_SHOPS,
  quickShopSlotRawcode,
} from "../src/abilities/wolves/quickShop.config.ts";

// Deno's CJS interop double-wraps these modules: the default import is an
// object whose `.default` is the actual class. The TS diagnostic that calls
// `new X()` "not constructable" is misleading — at runtime this resolves to
// the class and constructs fine.
const W3u = (War3MapW3u as unknown as { default: typeof War3MapW3u }).default;
const Mod = (Modification as unknown as { default: typeof Modification }).default;
const ModObj = (ModifiedObject as unknown as { default: typeof ModifiedObject }).default;

// mdx-m3-viewer-th 5.13's ModifiedObject.save writes the modification count
// before the per-set flag for format v3, but load expects [flag, modCount, ...].
// Patch save to match load's wire order.
interface PatchedModObj {
  oldId: string;
  newId: string;
  sets: number;
  setsFlag: number[];
  modifications: { save: (stream: unknown, useOptionalInts: boolean) => void }[];
}
(ModObj.prototype as unknown as {
  save: (
    this: PatchedModObj,
    stream: { writeBinary: (s: string) => void; writeUint32: (n: number) => void },
    useOptionalInts: boolean,
    formatVersion: number,
  ) => void;
}).save = function (stream, useOptionalInts, formatVersion) {
  stream.writeBinary(this.oldId === "\0\0\0\0" ? "\0\0\0\0" : this.oldId);
  stream.writeBinary(this.newId === "\0\0\0\0" ? "\0\0\0\0" : this.newId);
  if (formatVersion >= 3) stream.writeUint32(this.sets);
  for (let set = 0; set < this.sets; set++) {
    if (formatVersion >= 3) stream.writeUint32(this.setsFlag[set] ?? 0);
    stream.writeUint32(this.modifications.length);
    for (const m of this.modifications) m.save(stream, useOptionalInts);
  }
};

// Chicken base — chosen because the original orbiting-shop pipeline used it.
// Any unit-or-structure type whose food cost we can override should also work
// (the food check blocks every dummy click regardless).
const BASE_STRUCTURE = "nech";
const RAWCODE_PREFIX = "qs";

// Wolf types whose `ubui` (Structures Built) is overwritten to expose the shop.
// Mirrors WOLF_TYPE / BLACK_WOLF_TYPE / IMBA_WOLF_TYPE in src/shared.ts.
const SHOPPER_UNIT_TYPES = ["EC03", "E002", "E000"];

const intMod = (id: string, value: number) => {
  const m = new Mod();
  m.id = id;
  m.variableType = 0;
  m.value = value;
  return m;
};

const stringMod = (id: string, value: string) => {
  const m = new Mod();
  m.id = id;
  m.variableType = 3;
  m.value = value;
  return m;
};

const HOTKEY_GRID = ["QWER", "ASDF", "ZXCV"];
const positionFromHotkey = (hotkey: string | undefined): [number, number] | undefined => {
  if (!hotkey) return;
  const key = hotkey.toUpperCase();
  for (let y = 0; y < HOTKEY_GRID.length; y++) {
    const x = HOTKEY_GRID[y].indexOf(key);
    if (x !== -1) return [x, y];
  }
};

const buttonposFromSpec = (buttonpos: unknown): [number, number] => {
  if (Array.isArray(buttonpos)) return [buttonpos[0] as number, buttonpos[1] as number];
  if (typeof buttonpos === "number") return [buttonpos, 0];
  return [0, 0];
};

// Hand-tuned base-gold overrides for items whose wc3data goldcost is too low
// (e.g. Cheese/White Wolf ships at 0).
const BASE_GOLD_OVERRIDES: Record<string, number> = {
  I003: 10,
};

const baseGoldFor = (itemId: string, spec: ItemSpec | undefined): number =>
  BASE_GOLD_OVERRIDES[itemId] ?? spec?.stats?.goldcost ?? 0;

// Purchase price = 125% of the item's base gold cost, clamped to a +5..+25 surcharge.
const buyPrice = (baseGold: number): number => {
  const surcharge = Math.max(5, Math.min(25, Math.round(baseGold * 0.25)));
  return baseGold + surcharge;
};

interface ModObjLike {
  oldId: string;
  newId: string;
  sets: number;
  setsFlag: number[];
  modifications: InstanceType<typeof Mod>[];
}

interface ArchiveFile {
  bytes: () => Uint8Array;
}
interface MapLike {
  archive: { get: (name: string) => ArchiveFile | null };
  import: (name: string, buffer: ArrayBuffer) => boolean;
}

const loadItemSpecs = (): Record<string, ItemSpec> => {
  const strings = (mapStrings as unknown as (wts: string) => Record<string, string>)(
    Deno.readTextFileSync("map.w3x/war3map.wts"),
  );
  const merged = mapItemSpecs(
    Buffer.from(Deno.readFileSync("map.w3x/war3map.w3t")),
    Buffer.from(Deno.readFileSync("map.w3x/war3mapSkin.w3t")),
  );
  return replaceStrings(merged, strings);
};

// Reads each QUICK_SHOP_PAGE_SHOPS unit's `usei` (Items Sold) from source
// war3map.w3u and returns pages of item rawcodes. Asserts each page has at
// most QUICK_SHOP_PAGE_LIMIT items (build menu has 12 slots; 2 reserved for
// Cancel and Next Page).
const loadShopPages = (): string[][] => {
  const bytes = Deno.readFileSync("map.w3x/war3map.w3u");
  const f = new W3u();
  f.load(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const objects = (f as unknown as { customTable: { objects: ModObjLike[] } }).customTable.objects;

  return QUICK_SHOP_PAGE_SHOPS.map((shopId, pageIndex) => {
    const obj = objects.find((o) => o.newId === shopId);
    if (!obj) throw new Error(`Quick shop page ${pageIndex}: unit type "${shopId}" not found in war3map.w3u`);
    const usei = obj.modifications.find((m) => m.id === "usei");
    if (!usei) throw new Error(`Quick shop page ${pageIndex} (${shopId}): no \`usei\` (Items Sold) modification`);
    const items = String(usei.value).split(",").map((s) => s.trim()).filter(Boolean);
    if (items.length > QUICK_SHOP_PAGE_LIMIT) {
      throw new Error(
        `Quick shop page ${pageIndex} (${shopId}) has ${items.length} items; max is ${QUICK_SHOP_PAGE_LIMIT}`,
      );
    }
    return items;
  });
};

const buildQuickShopMods = (
  itemSpecs: Record<string, ItemSpec>,
  pages: string[][],
): ModObjLike[] => {
  const objects: ModObjLike[] = [];
  pages.forEach((page, pageIndex) => {
    page.forEach((itemId, slot) => {
      const spec = itemSpecs[itemId];
      const baseGold = baseGoldFor(itemId, spec);
      const o = new ModObj() as unknown as ModObjLike;
      o.oldId = BASE_STRUCTURE;
      o.newId = quickShopSlotRawcode(pageIndex, slot);
      o.sets = 1;
      o.setsFlag = [0];
      o.modifications = [
        // `nech` is race=critters by default; override so the click routes
        // through the build ability dispatcher.
        stringMod("urac", "nightelf"),
        // Food cost = item's base gold cost. Wolves never have food, so the
        // engine blocks the actual build attempt while the trigger still
        // fires on click.
        intMod("ufoo", baseGold),
        intMod("ulum", spec?.stats?.lumbercost ?? 0),
      ];
      o.modifications.push(stringMod("unam", spec?.text?.Name ?? `[QS p${pageIndex}/s${slot}] ${itemId}`));
      if (spec?.text?.Tip) o.modifications.push(stringMod("utip", spec.text.Tip));
      if (spec?.text?.Ubertip) o.modifications.push(stringMod("utub", spec.text.Ubertip));
      if (spec?.art?.Art) o.modifications.push(stringMod("uico", spec.art.Art));
      if (spec?.text?.Hotkey) o.modifications.push(stringMod("uhot", spec.text.Hotkey));
      o.modifications.push(intMod("ugol", buyPrice(baseGold)));
      // Button position derived from the item's hotkey (QWER/ASDF/ZXCV grid).
      // Falls back to the item's Buttonpos field when no hotkey is set.
      const pos = positionFromHotkey(spec?.text?.Hotkey) ?? buttonposFromSpec(spec?.art?.Buttonpos);
      o.modifications.push(intMod("ubpx", pos[0]));
      o.modifications.push(intMod("ubpy", pos[1]));
      objects.push(o);
    });
  });

  // Next-page dummy: shown on every page, advances the player's current page.
  // Position (2, 2) = "C" on the QWER/ASDF/ZXCV grid; V (3, 2) is built-in Cancel.
  const np = new ModObj() as unknown as ModObjLike;
  np.oldId = BASE_STRUCTURE;
  np.newId = QUICK_SHOP_NEXT_PAGE_RAWCODE;
  np.sets = 1;
  np.setsFlag = [0];
  np.modifications = [
    stringMod("urac", "nightelf"),
    stringMod("unam", "Next Page"),
    stringMod("utip", "Next Page"),
    stringMod("utub", "Show the next page of items."),
    stringMod("uhot", "C"),
    stringMod("uico", "ReplaceableTextures\\CommandButtons\\BTNReplay-Play.blp"),
    intMod("ufoo", 1), // unfulfillable: the click is the trigger, not an actual build
    intMod("ulum", 0),
    intMod("ugol", 0),
    intMod("ubpx", 2),
    intMod("ubpy", 2),
  ];
  objects.push(np);
  return objects;
};

// Generate the runtime page → items mapping (src/abilities/wolves/quickShop.generated.ts).
// Pricing is NOT codegenned — the runtime queries GetUnitGoldCost / GetUnitWoodCost
// (common.ai natives) on each dummy to recover the ugol/ulum we set here. The
// engine has no native for walking a shop's items sold list, hence this much.
export const generateQuickShopData = async (): Promise<void> => {
  const pages = loadShopPages();
  const outPath = "src/abilities/wolves/quickShop.generated.ts";
  const body = pages.map((page, pageIndex) => {
    const slots = page.map((id, slot) => `    "${id}", // ${quickShopSlotRawcode(pageIndex, slot)}`).join("\n");
    return `  [\n${slots}\n  ],`;
  }).join("\n");
  const content = "// AUTO-GENERATED by scripts/generateQuickShop.ts — do not edit.\n" +
    "// Sourced from QUICK_SHOP_PAGE_SHOPS' Items Sold (`usei`) field at build time.\n" +
    `export const quickShopPages: string[][] = [\n${body}\n];\n`;
  const existing = await Deno.readTextFile(outPath).catch(() => "");
  if (existing !== content) await Deno.writeTextFile(outPath, content);
};

// Transform an in-memory War3Map archive: inject qs* dummies into war3map.w3u,
// strip orphan qs* skin overrides from war3mapSkin.w3u, and inject the
// per-race-empty Nofood entry (STRING 5138) into war3map.wts. The source files
// in map.w3x/ are never mutated — pipeline output exists only in the .w3x.
export const applyQuickShopToArchive = (map: MapLike): void => {
  const itemSpecs = loadItemSpecs();
  const pages = loadShopPages();
  const generated = buildQuickShopMods(itemSpecs, pages);

  const w3uBytes = map.archive.get("war3map.w3u")?.bytes();
  if (!w3uBytes) throw new Error("war3map.w3u missing from archive");
  const w3u = new W3u();
  w3u.load(w3uBytes.buffer.slice(w3uBytes.byteOffset, w3uBytes.byteOffset + w3uBytes.byteLength));
  const w3uCustom = (w3u as unknown as { customTable: { objects: ModObjLike[] } }).customTable;
  w3uCustom.objects = w3uCustom.objects.filter((o) => !o.newId.startsWith(RAWCODE_PREFIX));
  w3uCustom.objects.push(...generated);

  const buildList = [
    ...pages.flatMap((page, pageIndex) => page.map((_, slot) => quickShopSlotRawcode(pageIndex, slot))),
    QUICK_SHOP_NEXT_PAGE_RAWCODE,
  ].join(",");
  // Only set ubui; urac is authored as "orc" in source map.w3x/war3map.w3u
  // (required so the engine routes builds through AObu, which the runtime
  // trigger registers against).
  let modifiedWolves = 0;
  for (const obj of w3uCustom.objects) {
    if (!SHOPPER_UNIT_TYPES.includes(obj.newId)) continue;
    const existingBuilds = obj.modifications.find((m) => m.id === "ubui");
    if (existingBuilds) existingBuilds.value = buildList;
    else obj.modifications.push(stringMod("ubui", buildList));
    modifiedWolves++;
  }
  const w3uOut = w3u.save();
  map.import("war3map.w3u", w3uOut.buffer.slice(w3uOut.byteOffset, w3uOut.byteOffset + w3uOut.byteLength));

  // war3mapSkin.w3u: strip qs* orphans the editor may have copied as skins.
  const skinBytes = map.archive.get("war3mapSkin.w3u")?.bytes();
  if (skinBytes) {
    const skin = new W3u();
    skin.load(skinBytes.buffer.slice(skinBytes.byteOffset, skinBytes.byteOffset + skinBytes.byteLength));
    const skinCustom = (skin as unknown as { customTable: { objects: ModObjLike[] } }).customTable;
    const before = skinCustom.objects.length;
    skinCustom.objects = skinCustom.objects.filter((o) => !o.newId.startsWith(RAWCODE_PREFIX));
    if (skinCustom.objects.length !== before) {
      const skinOut = skin.save();
      map.import(
        "war3mapSkin.w3u",
        skinOut.buffer.slice(skinOut.byteOffset, skinOut.byteOffset + skinOut.byteLength),
      );
    }
  }

  // war3map.wts: inject `STRING 5138` with per-race empty entries. The editor
  // wipes this string on every save, so we re-inject it into the built archive
  // (source map.w3x/war3map.wts is never modified).
  const wtsBytes = map.archive.get("war3map.wts")?.bytes();
  if (wtsBytes) {
    const wtsText = new TextDecoder("utf-8").decode(wtsBytes);
    const NOFOOD_BLOCK_RE = /STRING 5138\b(?:\r?\n\/\/[^\r\n]*)*\r?\n\{\r?\n[^}]*\r?\n\}/g;
    const desiredBlock = "STRING 5138\r\n{\r\n , , , \r\n}";
    const stripped = wtsText.replace(NOFOOD_BLOCK_RE, "").replace(/\s+$/, "");
    const fixed = stripped + "\r\n\r\n" + desiredBlock + "\r\n";
    const fixedBytes = new TextEncoder().encode(fixed);
    map.import(
      "war3map.wts",
      fixedBytes.buffer.slice(fixedBytes.byteOffset, fixedBytes.byteOffset + fixedBytes.byteLength),
    );
  }

  const totalItems = pages.reduce((sum, page) => sum + page.length, 0);
  console.log(
    `quickShop: injected ${totalItems} item dummies across ${pages.length} pages + 1 next-page, set ubui on ${modifiedWolves}/${SHOPPER_UNIT_TYPES.length} wolf types`,
  );
};

if (import.meta.main) await generateQuickShopData();
