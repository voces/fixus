import { walk } from "@std/fs/walk";
import { ensureDir } from "@std/fs/ensure-dir";
import Map from "npm:mdx-m3-viewer-th/dist/cjs/parsers/w3x/map.js";

const War3Map = Map.default;

await ensureDir("temp");

const changelog = await Deno.readTextFile("docs/CHANGELOG.md");
const versionMatch = changelog.match(/^#\s+Version\s+(\S+)/m);
if (!versionMatch) throw new Error("Could not find version in docs/CHANGELOG.md");
const version = versionMatch[1];
const build = new Date().toISOString();
await Deno.writeTextFile(
  "src/misc/buildInfo.ts",
  `export const REPO = "voces/fixus";
export const VERSION = ${JSON.stringify(version)};
export const BUILD = ${JSON.stringify(build)};
`,
);

const tstl = new Deno.Command("deno", {
  args: ["run", "-A", "npm:typescript-to-lua/dist/tstl.js", "--project", "tsconfig.build.json"],
  stdout: "inherit",
  stderr: "inherit",
}).outputSync();
if (!tstl.success) throw new Error("tstl failed");

const files: string[] = [];
for await (const entry of walk("map.w3x")) if (entry.isFile) files.push(entry.path);

const map = new War3Map();
map.archive.resizeHashtable(files.length);

await Promise.all(files.map(async (fileName) => {
  if (!map.import(fileName.slice(8).replace(/\//g, "\\"), await Deno.readFile(fileName))) {
    throw new Error(`Could not import file "${fileName}"`);
  }
}));

const scriptFile = map.getScriptFile();
if (!scriptFile) throw new Error("Could not find script file");
const builtLua = (await Deno.readTextFile("temp/out.lua")).replace(/__async__require__/g, "require");
const combinedLua = scriptFile.text() + "\n" + builtLua;
scriptFile.set(new TextEncoder().encode(combinedLua));

const result = map.save();
if (!result) throw new Error("Failed to save archive");

let name: string | undefined = map.getMapInformation().name;
if (name.startsWith("TRIGSTR")) name = map.readStringTable()?.getString(name);
if (!name) throw new Error("Could not extract map name");

await Promise.all([
  Deno.writeFile(`temp/release.w3x`, result),
  Deno.writeFile(`temp/${name}.w3x`, result),
  Deno.writeTextFile("temp/combined.lua", combinedLua),
]);
