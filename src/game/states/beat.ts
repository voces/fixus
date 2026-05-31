import { timeout } from "util/temp";
import { gameState, TransitionInformation, transitionsFrom } from "./common";

declare const gg_snd_BattleNetTick: sound;

transitionsFrom["init"] = (): TransitionInformation => {
  gameState("beat");
  StartSound(gg_snd_BattleNetTick);
  timeout("sheep countdown tick 2", 1, () => StartSound(gg_snd_BattleNetTick));
  timeout("sheep countdown tick 1", 2, () => StartSound(gg_snd_BattleNetTick));
  return { remaining: 3, title: "Sheep in..." };
};
