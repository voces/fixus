import { gameState, TransitionInformation, transitionsFrom } from "./common";

transitionsFrom["init"] = (): TransitionInformation => {
  gameState("beat");
  return { remaining: 3, title: "Sheep in..." };
};
