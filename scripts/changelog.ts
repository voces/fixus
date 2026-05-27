import { Lexer, type Tokens } from "npm:marked@^14";

type Version = { title: string; content: string[] };

const listBullets = ["•", "-", "∙"];

const renderList = (list: Tokens.List, depth: number): string[] => {
  const out: string[] = [];
  for (const item of list.items) {
    const inlineParts: string[] = [];
    const nested: Tokens.List[] = [];
    for (const t of item.tokens) {
      if (t.type === "list") nested.push(t as Tokens.List);
      else if ("text" in t && typeof t.text === "string") inlineParts.push(t.text);
    }

    out.push(
      "  ".repeat(depth) + listBullets[depth] + " " +
        inlineParts.join("").replace(/\n\s*/g, " "),
    );
    for (const child of nested) {
      out.push(...renderList(child, depth + 1));
    }
  }
  return out;
};

const formatWithDenoFmt = async (source: string): Promise<string> => {
  const cmd = new Deno.Command("deno", {
    args: ["fmt", "-", "--ext=ts"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
  const child = cmd.spawn();
  const writer = child.stdin.getWriter();
  await writer.write(new TextEncoder().encode(source));
  await writer.close();
  const { success, stdout, stderr } = await child.output();
  if (!success) throw new Error(`deno fmt failed: ${new TextDecoder().decode(stderr)}`);
  return new TextDecoder().decode(stdout);
};

export const generateTs = async (): Promise<string> => {
  const data = await Deno.readTextFile("docs/CHANGELOG.md");

  const versions: Version[] = [];
  let version: Version = { title: "", content: [] };
  for (const token of Lexer.lex(data)) {
    if (token.type === "heading") {
      if (token.depth === 1) {
        version = { title: token.text, content: [] };
        versions.push(version);
      } else version.content.push(token.text);
    } else if (token.type === "list") {
      version.content.push(...renderList(token as Tokens.List, 0));
    }
  }

  const raw = "// DO NOT MODIFY DIRECTLY. Execute `deno task build:changelog` instead.\n\n" +
    "export const changelog = [\n" +
    versions.map((v) =>
      `{ title: ${JSON.stringify(v.title)}, content: [${
        v.content.map((c) => JSON.stringify(c)).join(", ")
      }].join("\\n") },\n`
    ).join("") +
    "];\n";

  return await formatWithDenoFmt(raw);
};

if (import.meta.main) {
  await Deno.writeTextFile("src/misc/changelog.ts", await generateTs());
}
