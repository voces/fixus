const MAPS_DIR = "/mnt/c/Users/verit/Documents/Warcraft III/Maps/Sheep Tag";
const DEPLOYED_MAP = `${MAPS_DIR}/fixus.w3x`;

const formatDuration = (ms: number) => {
  if (ms < 1) return `${Math.round(ms * 1000000)}ns`;
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${Math.round(ms / 100) / 10}s`;
};

let currentTimings: Record<string, number> = {};
const withTiming = (description: string, fn: () => void, timings?: Record<string, number>) => {
  const oldTimings = currentTimings;
  if (timings) currentTimings = timings;
  const start = performance.now();
  currentTimings[description] = -1;
  fn();
  currentTimings[description] = performance.now() - start;
  try {
    return currentTimings;
  } finally {
    currentTimings = oldTimings;
  }
};

const rebuild = () => {
  let buildOk = false;
  const timings = withTiming("total", () => {
    withTiming("build", () => {
      const result = new Deno.Command("deno", {
        args: ["task", "build"],
        stdout: "inherit",
        stderr: "inherit",
      }).outputSync();
      buildOk = result.success;
    });
    if (buildOk) {
      withTiming("deploy", () => {
        try {
          Deno.mkdirSync(MAPS_DIR, { recursive: true });
          Deno.copyFileSync("temp/release.w3x", DEPLOYED_MAP);
        } catch (err) {
          console.warn(`Deploy to ${DEPLOYED_MAP} failed: ${(err as Error).message}`);
        }
      });
    }
  }, {});

  console.log(
    `Completed in ${
      Object.entries(timings).map(([k, v]) => `${k}: ${formatDuration(v)}`).join(", ")
    }. Watching for more changes...`,
  );
};

const dirty = new Set<string>();
let timeout = -1;
const debounceReRun = (path: string) => {
  dirty.add(path);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const files = Array.from(dirty.values());
    if (files.length === 0) return;
    console.log();
    console.log(`File${files.length > 1 ? "s" : ""} changed: ${files.join(", ")}`);
    dirty.clear();
    rebuild();
  }, 10);
};

rebuild();

const cwd = Deno.cwd();
const watcher = Deno.watchFs(["src", "map.w3x", "scripts", "tsconfig.build.json", "tsconfig.json"]);
for await (const event of watcher) {
  for (const path of event.paths) {
    const cleaned = path.replace(`${cwd}/`, "");
    if (
      cleaned.startsWith("temp/") ||
      cleaned.startsWith("node_modules/") ||
      cleaned.startsWith(".git/") ||
      cleaned === "src/misc/buildInfo.ts"
    ) continue;
    debounceReRun(cleaned);
  }
}
