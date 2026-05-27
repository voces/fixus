import { colorize } from "./colorize";
import { colorizedName } from "./player";

const isArray = (v: unknown): v is Record<string, unknown> => {
  if (typeof v !== "object" || v == null) return false;

  const obj = v as Record<string, unknown>;
  // Lua uses 1 as the starter index
  return Object.keys(obj).every((k, index) => S2I(k) === index + 1 || S2I(k) === index) &&
    (obj[0] != null || obj[1] != null);
};

const userdataType = (userdata: { toString: () => string }): string => {
  const typeString = userdata.toString();
  return typeString.slice(0, typeString.indexOf(":"));
};

export const termToString = (v: unknown, color = true): string => {
  if (typeof v === "string") return color ? colorize.string(`"${v}"`) : v;
  if (typeof v === "number") return color ? colorize.number(v) : v.toString();
  if (typeof v === "boolean") return color ? colorize.boolean(v) : v.toString();
  if (typeof v === "function") return color ? colorize.number("[function]") : "[function]";
  if (v == null) return color ? colorize.boolean("null") : "null";

  if (isArray(v)) {
    const arr = v as unknown as unknown[];

    return `[ ${arr.map((v) => termToString(v)).join(", ")} ]`;
  }

  if (typeof v === "object" && v != null) {
    return `{ ${Object.entries(v).map(([key, value]) => `${key}: ${termToString(value)}`).join(", ")} }`;
  }

  const handle = v as { toString: () => string } & player & unit & force & handle;
  const type = userdataType(handle);

  switch (type) {
    case "player":
      return `Player ${termToString({ id: GetPlayerId(handle), name: GetPlayerName(handle) })}`;
    case "unit":
      return `Unit ${
        termToString({
          id: GetHandleId(handle),
          name: GetUnitName(handle),
          owner: colorizedName(GetOwningPlayer(handle)),
        })
      }`;
    case "force": {
      const arr: player[] = [];
      ForForce(handle, () => arr.push(GetEnumPlayer()));
      return `Force ${termToString(arr)}`;
    }
    default: {
      let handleId = -1;
      try {
        handleId = GetHandleId(handle);
      } catch { /* do nothing */ }

      return `[${type}(${handleId === -1 ? "not-handle" : handleId})]`;
    }
  }
};

export const log = (...args: unknown[]): void => BJDebugMsg(args.map((v) => termToString(v)).join(" "));
