import Map from "npm:mdx-m3-viewer-th/dist/cjs/parsers/w3x/map.js";

const War3Map = Map.default;

if (Deno.args.length) {
  const computers = parseInt(Deno.args[0]);
  if (!Number.isInteger(computers) || computers < 1 || computers > 23) {
    console.error("Number of computers must be between 1 and 23.");
    Deno.exit(1);
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
        () => `SetPlayerController(Player(${i++}), MAP_CONTROL_${i > 1 && i - 1 <= computers ? "COMPUTER" : "USER"})`,
      ),
    ),
  );

  const result = map.save();
  if (!result) throw new Error("Failed to save archive");

  await Deno.writeFile(`temp/release.w3x`, result);
}

await new Deno.Command("deno", { args: ["task", "launch"] }).output();
