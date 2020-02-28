import { Trait, TraitClass, EventType, ActiveType, UnitType } from "./types";

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
        modify: (bounty: number): number => {
          return bounty + 1;
        }
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
    events: [
      {
        type: EventType.TAX_MODIFIER,
        modify: (pretax: number, _posttax: number): number => {
          return pretax;
        }
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
    events: [
      {
        type: EventType.ACTIVE,
        units: [UnitType.WOLF],
        active: ActiveType.CHARM_FARMS
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
    events: [
      {
        type: EventType.BOUNTY_MODIFIER,
        modify: (bounty: number): number => {
          return bounty + 2;
        }
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
    events: [
      {
        type: EventType.BOUNTY_SIDE_EFFECT,
        modify: (
          bountyAmount: number,
          targetPlayer: player,
          receivingPlayer: player
        ): void => {
          SetPlayerState(
            targetPlayer,
            PLAYER_STATE_RESOURCE_GOLD,
            GetPlayerState(targetPlayer, PLAYER_STATE_RESOURCE_GOLD) -
              bountyAmount
          );
        }
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
    events: [
      {
        type: EventType.BOUNTY_MODIFIER,
        order: 3,
        modify: (bounty: number): number => {
          return bounty * 1.5;
        }
      },
      {
        type: EventType.INCOME_MODIFIER,
        modify: (income: number): number => {
          return income * 1.5;
        }
      }
    ]
  }
];

export default hoarderTraits;
