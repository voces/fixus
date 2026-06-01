import { registerCommand } from "./registerCommand";

registerCommand({
  command: "todo",
  category: "misc",
  description: "Reports a bug or suggests a feature for the map.",
  args: [{ name: "message", type: "string", required: false }],
  fn: () => {/* functionality is done via replay parsing */},
});
