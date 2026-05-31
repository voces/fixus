// Shop unit types whose Items Sold (`usei`) populates each quick-shop page,
// listed in display order. The pipeline reads each shop's `usei` from
// map.w3x/war3map.w3u at build time and generates a dummy unit per item.
//
// Each shop must have at most QUICK_SHOP_PAGE_LIMIT items: the build menu's
// 4×3 grid has 12 slots, with V reserved for the engine's Cancel button and
// C reserved for our Next Page button.
export const QUICK_SHOP_PAGE_SHOPS = ["nC12", "n003", "n004"];

export const QUICK_SHOP_PAGE_LIMIT = 10;

// Always-available "Next Page" dummy that cycles the player's current page.
export const QUICK_SHOP_NEXT_PAGE_RAWCODE = "qsNX";

// Dummy rawcode for a given (page, slot) coordinate.
// Page 0 → qsA0..qsA9, page 1 → qsB0..qsB9, page 2 → qsC0..qsC9, etc.
export const quickShopSlotRawcode = (page: number, slot: number): string =>
  `qs${String.fromCharCode(65 + page)}${slot}`;
