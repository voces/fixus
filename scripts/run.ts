import Map from "mdx-m3-viewer-th/w3x/map";

const War3Map = Map.default;

// w3i.flags bit 5: "Fixed player settings (for custom forces)". Without it,
// Reforged's -launch lobby doesn't honor the map's custom force/slot layout,
// so SetPlayerController calls in the lua get ignored for unseated slots.
const W3I_FLAG_FIXED_PLAYER_SETTINGS = 0x20;

if (Deno.args.length) {
  const computers = parseInt(Deno.args[0]);
  if (!Number.isInteger(computers) || computers < 1 || computers > 11) {
    console.error("Number of computers must be between 1 and 11.");
    Deno.exit(1);
  }

  // Seed computers maintaining a 2:1 sheep:wolf ratio, biasing wolves first
  // so the human (player 0, sheep) gets a wolf opponent before any sheep ally.
  const computerSlots = new Set<number>();
  let nextSheep = 1;
  let nextWolf = 8;
  for (let n = 1; n <= computers; n++) {
    if ((n - 1) % 3 === 0) computerSlots.add(nextWolf++);
    else computerSlots.add(nextSheep++);
  }

  const map = new War3Map();
  map.load(await Deno.readFile("temp/release.w3x"));

  const scriptFile = map.getScriptFile();
  if (!scriptFile) throw new Error("Could not find script file");
  let i = 0;
  scriptFile.set(
    new TextEncoder().encode(
      scriptFile.text().replace(
        new RegExp("SetPlayerController.*", "g"),
        () => {
          const id = i++;
          const control = computerSlots.has(id) ? "COMPUTER" : "USER";
          return `SetPlayerController(Player(${id}), MAP_CONTROL_${control})`;
        },
      ),
    ),
  );

  // Without "fixed player settings" set in war3map.w3i, Reforged's -launch
  // lobby ignores the map's custom force layout, so SetPlayerController calls
  // for unseated slots get silently dropped.
  const w3i = map.getMapInformation();
  w3i.flags |= W3I_FLAG_FIXED_PLAYER_SETTINGS;
  const w3iFile = map.get("war3map.w3i");
  if (!w3iFile) throw new Error("Could not find war3map.w3i");
  w3iFile.set(w3i.save());

  const result = map.save();
  if (!result) throw new Error("Failed to save archive");

  await Deno.writeFile(`temp/release.w3x`, result);
}

await new Deno.Command("deno", { args: ["task", "launch"] }).output();
