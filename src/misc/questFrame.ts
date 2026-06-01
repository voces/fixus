// Collapse the quest dialog's left-side list column so the description panel
// gets the freed horizontal room. Call this once after all quests have been
// created.
//
// The list and scrollbar frames are lazily created by the engine the first
// time the dialog opens, so we have to programmatically open it before
// measuring. Open + resize + close all happen in one synchronous tick — the
// engine never paints between, so the dialog never visibly appears.
//
// The UpperButtonBar Quests button is disabled while the dialog is open, so
// we close via the dialog's own bottom button. Per stock questdialog.fdf the
// only bottom button is "QuestAcceptButton" — the displayed text ("Done" /
// "Accept Quest") is contextual via TRIGSTR but the frame name is the same.
export const widenQuestDescription = (): void => {
  const questsButton = BlzGetFrameByName("UpperButtonBarQuestsButton", 0);
  if (questsButton === null) return;

  BlzFrameClick(questsButton);
  const listContainer = BlzGetFrameByName("QuestItemListContainer", 0);
  const listScrollBar = BlzGetFrameByName("QuestItemListScrollBar", 0);
  if (listContainer !== null) BlzFrameSetSize(listContainer, 0.01, 0.01);
  if (listScrollBar !== null) BlzFrameSetSize(listScrollBar, 0.001, 0.001);
  const acceptButton = BlzGetFrameByName("QuestAcceptButton", 0);
  if (acceptButton !== null) BlzFrameClick(acceptButton);
};
