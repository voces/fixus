import { Trait, TraitClass, EventType } from "./traits";

const hoarderTraits: Trait[] = [
  {
    class: TraitClass.HOARDER,
    tier: 1,
    option: 1,
    name: "+1 gold per farm kill",
    icon: "",
    description: "",
    events: [
      {
        type: EventType.BOUNTY_MODIFIER,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.HOARDER,
    tier: 1,
    option: 2,
    name: "Tax Free golding to allies",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.GOLD_SHARE_MODIFIER,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.HOARDER,
    tier: 2,
    option: 1,
    name: "Charm Saving Farms",
    icon: "",
    description:
      "(active) aoe skill 30 second cooldown charms savings farms in the area hit.",
    event: [
      {
        type: EventType.ACTIVE,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.HOARDER,
    tier: 2,
    option: 2,
    name: "+2 gold per farm kill",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.BOUNTY_MODIFIER,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.HOARDER,
    tier: 3,
    option: 1,
    name: "Farm bounty funded by sheep",
    icon: "",
    description:
      "The bounty that you earn is funded by the corresponding sheeps bank. (Steals Gold)",
    event: [
      {
        type: EventType.BOUNTY_SIDE_EFFECT,
        order: 2,
        behavior: (): void => {}
      }
    ]
  },
  {
    class: TraitClass.HOARDER,
    tier: 3,
    option: 2,
    name: "1.5x all income",
    icon: "",
    description: "",
    event: [
      {
        type: EventType.BOUNTY_MODIFIER,
        order: 3,
        behavior: (): void => {}
      },
      {
        type: EventType.INCOME_MODIFIER,
        behavior: (): void => {}
      }
    ]
  }
];

export default hoarderTraits;
