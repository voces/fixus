# Version 8
## Balance
- Fixed reduction of Harden (30 -> 20 seconds)

## Features
- Added commands and changelog to quests menu
- Sheep (Factory) no longer shows up on the minimap
- 
## Refactors
- Converted to TypeScript
- Dragon Fire made ~10x more efficient

# Version 7d
## Bug Fixes
- Can no longer gold allies gold you don't have

# Version 7c
## Features
- Sheep now spawn on the edges of the map
- Wolves spawn at the same time of sheep.

# Version 7b
## Bug fixes
- Copious Blood no longer gives insane HP

# Version 7
## Balance
- Farms
	- Saving Farms (Hidden)
		- No longer grant XP
		- Shadow matches Farm
	- Stun/Power Farms can no longer target sheep
	- Reduced Farm bounty (2 -> 1 gold)
	- Increased Strong Farm gold (48 -> 60 gold)
- Specialities
	- Reduced Copious Blood HP/level (20 -> 15)
	- Avatar
		- Reduced HP/level (50 -> 25)
		- Reduced duration (10 -> 5 seconds)
	- Reduced Harden duration (30 -> 20 seconds)
	- Reduced Stack Farm build time (3 -> 2 seconds)
- Abilities
	- Decreased size of Phoenixes (1 -> 0.65 scale)
	- Increased duration of Far Sight (8 -> 20 seconds)
- Items
	- Added Health Stone
	- White wolf
		- Changed attack to Siege
		- Increased initial mana (0 -> 20)
		- Increased movement speed (390 -> 400)
	- Goblin Land Mines
		- Increased cost (80 -> 150 gold)
		- Increased scale (1 -> 1.25)
		- Reset activation delay (0.25 -> 10 seconds)
		- Increased activation radius (200 -> 250)
		- Decreased HP (100 -> 5)
		- Decreased full damage radius (150 -> 125)
		- Decreased partial damage radius (400 -> 350)
	- Potion of Speed
		- Increased movement speed bonus (3% -> 15%)
		- Increased cost (15 -> 25 gold)
- Misc
	- Changed gold bounty on sheep kills[0]
	- Increased XP bounty on sheep kills[1]
## Features
-z remembers zooms between games
- Added -buy commands to items
- Dagger is no longer actively used
## Bug fixes
-destroy all farms no longer removes shops
## Refactors
- Cloak of Flames no longer scans for units with cloak and instead uses a managed group
- Dragon Fire is only active after cast and auto deactivates
- Wait to remove dying units increased (2 -> 5 seconds)
	
0. Where S is the nu mber of sheep (and wisps) and W is the number of wolves, we use to do
	 S/W*12.5 for the killer and S/W*10 for allies. Now we determine the total bounty via
	 100 + typeBounty[2] + level*10 + bountyOfFarms/2. We then give allies
	 floor(bounty/(W+0.5)) each and the remaining to the killer.
1. Increased level 1 bounty from 25 to 100; changed Sheep from level 4 to 1, Black from
	 level 4 to 2, Silver from level 3 to 4, and left Golden at level 4. Sheep level also
	 increases with save count (relating to Specialization).
2. Black = 25, Silver = 50, Golden = 100.

# Version 6
- Dragon Glass/Fire
	- Increased cost (125 -> 400 gold)
	- Decreased spread rate (5 -> 10 seconds)
	- Decreased damage (3.5% -> max(1%, 1))
	- Added stock delay (15 minutes)
	- Increased cast range (700 -> 800)
	- Add lumber cost
- Decreased Piiri Tower health regeneration rate (150 -> 75)
- Increased cost of Piiri Tower (125 -> 150)
- Decreased Stun Farm build time (8 -> 7 seconds)
- Decreased cost of Cloak of Shadows (125 -> 100 gold)
- Added +4 Intelligence to Dagger
- Removed Dagger from the shop
- Added Tome of Power
- Fixed Power Tower range (700 -> 1000)
- Increased Power Tower HP (10 -> 25)
- Decreased Sentry Farm's night sight radius (1600 -> 1500)
- Added health regeneration to White Wolf
- Decreased Golem White Wolf time (3 -> 2.5 minutes)
- Decreased cost of Gem of True Seeing (150 -> 125 gold)
- Reworked Factory Farm
	- Build in spiral order
	- Builds a single type with reasonable default and selectable
	- Each is semi-independent, with global max of 10 farms per second
- Added zoom shorthands (2 -> 2000, 24 -> 2400, 245 -> 2450)
- Zoom has memory, so you can just type -z to fix
- Reworked -d/-dall to be based off farm bounty
- Single player no longer ends game and sets bounties to 1000x
- When Sheep win, they become the hunters
- Decreased Invisibile Farm bounty (5 -> 4)
- Decreased Phoenix (Level 1) HP (1250 -> 1000)
- Decreased Phoenix (Level 2) HP (1750 -> 1500)
- Increased Phoenix (Level 2) movement speed (320 -> 340)
- Decreased Phoenix (Level 3) HP (2250 -> 2000)
- Increased Phoenix (Level 3) movement speed (320 -> 360)
- Reduced Healing Farm armor (5 -> 0)
- Reduced Healing Farm HP (200 -> 120)
- Increased Healing Farm cost (25 -> 100 gold)
- Reduced Magic Farm armor (5 -> 0)
- Fixed player leave logic
- Fixed various commands to not misfire (-sell/-buy/-z)
- Removed -d on/off

# Version 5
- Fixed bug where Black, Silver, and Golden sheep lost spellbook
- Lot of code refactoring to suss out leaks
- Mirror Image cloaks deal damage
- Stack Farm has color (0 -> 127)
- Fixed CPU lock on Dragon Glass usage
- Increased mana cost of Phoenix (50 -> 75)
- White Wolf has mana
- Increased Mana per Intelligent point (15 -> 17.5)

# Version 4
- Added Strong Farm
- Added Thorn Farm
- Replaced Magic Farm upgrade Heal with unit upgrade Healing Farm
- Fixed some memory leaks (miscGoldTick, wolfCloakOfFlames, and sheepFactoryFarm)
- Hidden Saving Farms applies to Black/Silver/Gold
- Added Sheep Specializations (Flash, Hulk, Attacker, and Engineer)
- Added Dragon Fire
- Added Goblin Land Mines
- Added Charm of Mana Negation
- Fixed bug where Golems were not consumed when making Golem Totem
- Mirror Images now only spawn one mirror and deal damage
- Saving Farms and Hidden Saving Farms are now targeted as structures
- Added Phoenix Scouts upgrade
- Replaced War Stomp with Mirror Image
- Added health regeneration to Siege Tower and Golem Totem
- Added Piiri Tower
- Adjusted bounties
	- Hard Farm (3 -> 4 gold)
	- Hidden Saving Farm (10 -> 6 gold)
	- Black Farm (2 -> 3 gold)
	- Golden Farm (3 -> 4 gold)
- Fixed experience on attacked farms; no longer shared
	- Stun Farm (35 -> 25 experience)
- Increase sheep headstart timer (15 -> 20 seconds)
- Reduced iStick night sight radius (1600 -> 1400)
- Reduced iStick True Sight radius (1200 -> 1000)

# Version 3
- Fixed upgraded Endurance and Unholy auras effecting enemies
- Reduced end game timer (60 -> 15 seconds)
- Hidden Saving Farms
	- Added gold cost to upgrade (100 gold)
	- Fixed ground texture so they are hidden
- Changed hotkey of Kaboom! (K -> A)
- Added Command Aura upgrades (Golem Totem)
- Fixed some memory leaks
- Added Siege Tower
- Fixed gold return on advanced Saving Farms
- Increased effectiveness of Unholy Aura
	- Level 1: (0.5 -> 1%)
	- Level 2: (1.0 -> 2%)
	- Level 3: (1.5 -> 3%)
- Decreased cost of Magic Farm (61 -> 50 gold)
- Added Heal upgrade for Magic Farm

# Version 2
- Bounty changes
	- Decreased Saving Farm bounty (10 -> 5)
	- Added Better Saving Farm bounty (10)
	- Added Super Saving Farm bounty (15)
	- Removed bounty for killing allied shepherds
- Doom Guard
	- Required kill count reduced (50 -> 25)
	- Mirror Image replaced with Rain of Fire
	- Added War Stomp
- Added Tameyoshi to proper wolf names
- Each Cloak of Flames now deals (15-2n) damage in a (256+64n) radius
- Dolly
	- No longer desyncs - instead properly removes control for a minute
	- No longer spawns twice
- Fixed Gloves of Haste description to show correct IAS
- Added some trees
- Upgrades
	- Added Hidden Saving Farms (Saving Farm)
	- Added Devotion, Endurance, and Unholy Aura upgrades (Aura Farm)
- Rock Golems
	- Increased duration (3 minutes -> 5 minutes)
	- Can build Golem Totem, consuming unit
	- Has Backpack
	- Can Kaboom!
- Golem Totem
	- Large AoE aura increases damage of Rock Golems
	- Can research Backpack
- Increased end game timer (3 seconds -> 1 minute)
- Added Factory Farm
- Remove Magic Farm from build list; upgraded from Invisibile Farm
- Added five minute actions
	- Added increase movement speed +25%
	- Added double income
- Fixed bug where wisps were not removed when player left

# Version 1.12
- Fixed -g x
- Increased range of Power Tower (1000 -> 1250)
- Decreased damage of Power Tower (250 -> 200)
- Decreased HP per Str (1000 -> 500)
- Fixed "Suggested Players" ("7v5 - Best Play" -> "6v3")
- Increased Increase Attack Speed of Gloves of Haste (15% -> 30%)
- Changed abilities of Black Wolf (Critical Strike -> Divine Shield)
- Changed abilities of Doom Guard (Critical Strike -> Divine Shield)
- Increased movement speed of Goom Guard (405 -> 410)
- Increased gold cost of Frost Farm (40 -> 60)
- Decreased build time of Frost Farm (13 -> 5)
- Decreased build time of Aura Farm (5 -> 4)
- Increased gold bounties of various farms (primary farms)
- Sheep are once again removed when player leaves
- Movement speed bonuses now stack
- Fixed issue with -buy and -sell
- Added Claws of Attack +50
- Modified Dagger description
- Tomb of Retraining removed
- Added some Proper Names to Wolves.
- Added Claws of Attack +9 to item list.
- Modified all Claws of Attack Pricings
	- +6: 18
	- +9: 36
	- +12: 60
	- +21: 126
	- +50: 350
- Reduced Sheep Stalker damage (56 -> 23-25)
- Increased movement speed of Rock Golem (330 -> 340)
- Reduced Sheep Stalker movement speed (425 -> 420)
- Doubled Mirror Image duration (60 -> 120)
- Increased Mirror Image split Distance
	- Level 2: (128 -> 192)
	- Level 3: (128 -> 256)
- Increased Scout duration
	- Level 1: (60 -> 90)
	- Level 2: (90 -> 145)
	- Level 3: (120 -> 180)
- Decreased Stun Farm build duration (10 -> 2)
- Decreased Power Tower build duration (5 -> 4)
- Increased Magic Farm hit points (120 -> 200)
- Added Cloak of Shadows
- Fixed buy/sell glitch involving illusions
- Decreased Divine Shield Cooldown (+5 duration, respectful to level)
- Decreased Sheep Stalker Range (40 -> 32)

# Version 1.11
- Made all content RoC-friendly
- Nerfed Battleship
	- Changed to Doom Guard (RoC/TFT reasons)
	- Reduced range to 64
	- Increased movement speed to match Black
	- No longer flying
- Necklace changed to Spell Immunity
- Divine Shield cooldown decreased (+15/+10/+5 of duration)
- Slightly increased range of CoF by 16
- Buffed damage of CoF to 15
- Increased Stack Farm HP to 15
- Decreased sheep cooldown time on attack by .1 seconds
- Decreased backswing by .05
- Decreased damage point by .075
- Increased ward duration by 60 seconds
- Computer gold is distributed when possible (checking every three seconds), only for shepherds
-buy can now be done on controlled units
-sell can now be done on controlled units
- Dolly freezes whoever kills her for 60 seconds
- Can now attack other shepherds
- Added Power Tower
- Changed format to 8v4
- Double Jotye Farm's aura
- Removed Spell Immunity from Black and Imba Wolves
- Added Gloves of Haste

# Version 1.10
- Updated contact information
- Change shepherd kill return to (sheep+wisp)/shep*10 (+25% for killer)
- If a shepherd leaves during beginning countdown, their shepherd should still spawn
- Price of cheese increased to 2/3
- Wood earned changed to 2
- Claws of Attack +6 is now in the item list (can be -sell and -buy)
- Golem base damaged decreased 28 -> 20
- Shepherd inital mana decreased from 300 to 0
- Shepherd mana regen doubled from .25 to .5
- Stack Farm sight radii increased by 300
- Basically disabled attack pings
- Users with "Grim" in their name get special effects

# Version 1.9
- Game should now end when the last player of a team leaves
- Full shared control is now granded via the allies menu
- Added the Jotye Farm for Silver and Golden Sheep
	- 100 gold
	- Inverts point orders in 512 area
	- 5 bounty
- Added -d on and -d off along with D ability
- Added the Gem easteregg
- Added the Dolly eastereggs
- Fixed the -c/-uc messages
- Renamed the Silver Sheep to Silv3rSheep
- Renamed the Golden Sheep to GoldenSheep
- Changed Reaction Delay to 0 from .25
- Changed Attack Notification Interval to 1 from 30
- Changed Attack Notification Range to 256 from 1250
- Nerfed the Battleship
	- Changed movement speed to 405 from 522
	- Changed range to 128 from 500
	- Added projectile animation
	- Changed some other stats...
- Dagger now works on RoC

# Version 1.8
- Wards changed back to 1.6 (using SetUnitPosition)
- Lowered shepherd base damage to 12 (to compensate 1.7 changes in damage)
- Sentry Ward True Sight increased from 1100 to 1200
- Fixed the -g text.
- Fixed fatal error on -g command.
- Increased Sentry Farm True Sight range from 900 to 1200.
- Added the battleship.

# Version 1.7
- buy no longer turns shepherds black
- Killing shepherds now only get +25 gold rather than 10 * sheep
- Added some Clan StH spam
- Hopefully fixed some desyncs
- Auras now target structures
- Wards can truly be placed anywhere
- Stun farms have a lot more damage, 20 to 50 base
- Stalkers can now be killed via manaburn
- Removed w3mmd support
- Can no longer gold yourself
- Stacks now have 10 hp as opposed to 50
- Wards die in 180 seconds
- Black Wolves are now spell immune instead of invul
- Buffed Boots of Speed, 5 to 30
- Shepherds are actually killable
	- 100 base HP, .5 base regen
	- 1000 HP per str, .25 regen per str
	- 4.8 str per level
	- 9.6 str per level - black
- Tiny farm has standard farm model
- Devotion Aura now adds 3 armor instead of 1
- Added Dolly
- Shepherds are now agility heroes
	- 2.4 per level
	- 3.6 - black

# Version 1.6
- Ward can no longer be casted across the map
- Wards cost 50 mana to use
- Shepherds can level again

# Version 1.5
- Fixed issue with constant data (item/farm IDs) were completely wrong
	- Fixed -buy, -sell, and kill return

# Version 1.4
- A lot of changes I did not record. --------------------
- Modernized the map a bit, miscGoldTick/X
- Ward works! Full RoC compat.

# Version 1.3
- When a sheep or wisp leaves, their main unit is now removed
- Control is now given to allies when someone leaves
- Resources are now split up when someone leaves
- Cloak of Flames now has an artistic effect on structures
- The icon for the Golden Sheep now comes at 25 saves instead of 20
- Rewarded gold to killing shepherd is now dependent on allies who are still in the game
- Wisp are now flying and can walk over stacks
- A victory message was added for winners
- Added the -sell command
- Structures are now removed instead of killed when mass events occur
- The unit follow distance was changed from 300 to 0
- The unit max movement speed was increased from 500 to 522
- The unit min movement speed was decreased from 150 to 0
- Fixed spelling of Fixus on multiboard
- Fixed issue with not being able to give control

# Version 1.2
- Wisp no longer generate 1 saving gold tick
- Removed fai (have to manually embed)
- Shep now gets a cloak of flames when achieving black
- Can now smart wisp to save
- Fixed issue of showing gold gains as both gold and XP
- Fixed cloak (no longer targets sheep or is effective when worn by image)
- Fixed Low Upkeep status
- Increased cloak range by 80

# Version 1.1
- Fixed camera scroll on saving (would scroll to start location, not spawn location)
- Fixed "140 gold on save" (text displayed 140 instead of 100)
- Fixed Orb of Fire (now corretly targets)
- Fixed Sabre (now correctly targets)
- Shepherds no longer recieve 1000 gold every tick
- Hopefully fixed joining issue by internalizing fai
