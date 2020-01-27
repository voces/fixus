
import { wolfTeam, wolves } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { registerCommand } from "util/commands";
import { withSelectedUnits } from "util/temp";

const quickBuyTax = 1.5;
const quickSellTax = 0.5;

type ItemSpec = {
	name: string;
	gold: number;
	lumber: number;
	id: number;
}

const itemSpecs: Array<ItemSpec> = [];
const itemSpecIds: Record<number, ItemSpec> = {};

// Can't directly get gold/lumber cost off an item, so... :(
const registerItem = ( { name, gold, lumber = 0, id }: { name: string; gold: number; lumber?: number; id: number } ): void => {

	const itemSpec = { name, gold, lumber, id };
	itemSpecs.push( itemSpec );
	itemSpecIds[ itemSpec.id ] = itemSpec;

};

// ===========================================================================
// Trigger: wolfQuickBuy
// ===========================================================================

const hasInventoryAndControlled = Condition( (): boolean =>
	// don't waste gold on an illusion
	! IsUnitIllusion( GetFilterUnit() ) &&
	// has an inventory
	GetUnitAbilityLevel( GetFilterUnit(), FourCC( "AInv" ) ) > 0 &&
	// is a unit we control
	(
		GetOwningPlayer( GetFilterUnit() ) === GetTriggerPlayer() ||
		GetPlayerAlliance( GetOwningPlayer( GetFilterUnit() ), GetTriggerPlayer(), ALLIANCE_SHARED_ADVANCED_CONTROL )
	),
);

const buyAction = ( { item }: { item: string } ): void => {

	// Preconditions
	if ( ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) return;

	// Find unit to give the item to
	const u = withSelectedUnits( GetTriggerPlayer(), ( g: group ) => FirstOfGroup( g ), hasInventoryAndControlled ) ||
		wolves[ GetPlayerId( GetTriggerPlayer() ) ];

	// Get and buy the item
	const itemSpec = itemSpecs.find( spec => spec.name.startsWith( item ) );
	if ( ! itemSpec ) return;

	const goldCost = Math.floor( itemSpec.gold * quickBuyTax );
	const lumberCost = Math.floor( itemSpec.lumber * quickBuyTax );
	if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) >= goldCost && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) >= lumberCost ) {

		UnitAddItem( u, CreateItem( itemSpec.id, GetUnitX( u ), GetUnitY( u ) ) );
		AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, - goldCost );
		AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, - lumberCost );

	} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < goldCost && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) < lumberCost )
		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( goldCost ) + " gold and " + I2S( lumberCost ) + " lumber." );

	else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < goldCost )
		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( goldCost ) + " gold." );

	else
		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( lumberCost ) + " lumber." );

};

const sellAction = (
	{ slot1, slot2, slot3, slot4, slot5, slot6 }:
		{ slot1: string; slot2?: number; slot3?: number; slot4?: number; slot5?: number; slot6?: number },
): void => {

	// Preconditions
	if ( ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) return;

	// Find unit to sell the item on
	const u = withSelectedUnits( GetTriggerPlayer(), ( g: group ) => FirstOfGroup( g ), hasInventoryAndControlled ) ||
		wolves[ GetPlayerId( GetTriggerPlayer() ) ];

	// Get the slot
	const sellSlots = slot1 === "all" ?
		[ 0, 1, 2, 3, 4, 5 ] :
		[ S2I( slot1 ), slot2, slot3, slot4, slot5, slot6 ].filter( v => typeof v === "number" ).map( v => v as number - 1 );

	// Sell items
	sellSlots.forEach( slot => {

		if ( slot < 0 || slot >= bj_MAX_INVENTORY || UnitItemInSlot( u, slot ) === null ) return;

		const itemSpec = itemSpecIds[ GetItemTypeId( UnitItemInSlot( u, slot ) ) ];
		if ( itemSpec === null ) return;

		RemoveItem( UnitItemInSlot( u, slot ) );
		// should gold go to the owner or trigger player?
		AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, Math.floor( itemSpec.gold * quickSellTax ) );
		AdjustPlayerStateSimpleBJ( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, Math.floor( itemSpec.lumber * quickSellTax ) );

	} );

};

// ===========================================================================
registerCommand( {
	command: "buy",
	alias: "b",
	args: [ { name: "item", type: "string" } ],
	fn: buyAction,
} );

registerCommand( {
	command: "sell",
	alias: "s",
	args: [
		{ name: "slot1", type: "string" },
		{ name: "slot2", type: "number", required: false },
		{ name: "slot3", type: "number", required: false },
		{ name: "slot4", type: "number", required: false },
		{ name: "slot5", type: "number", required: false },
		{ name: "slot6", type: "number", required: false },
	],
	fn: sellAction,
} );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	registerItem( { name: "12", gold: 60, id: FourCC( "ratc" ) } );
	registerItem( { name: "21", gold: 126, id: FourCC( "ratf" ) } );
	registerItem( { name: "50", gold: 350, id: FourCC( "I002" ) } );
	registerItem( { name: "6", gold: 18, id: FourCC( "rat6" ) } );
	registerItem( { name: "9", gold: 36, id: FourCC( "rat9" ) } );
	registerItem( { name: "boots", gold: 70, id: FourCC( "bspd" ) } );
	registerItem( { name: "cheese", gold: 0, lumber: 2, id: FourCC( "I003" ) } );
	registerItem( { name: "cloak", gold: 250, id: FourCC( "clfm" ) } );
	registerItem( { name: "dragon", gold: 400, lumber: 2, id: FourCC( "I004" ) } );
	registerItem( { name: "dagger", gold: 67, id: FourCC( "mcou" ) } );
	registerItem( { name: "golem", gold: 100, id: FourCC( "fgrg" ) } );
	registerItem( { name: "gloves", gold: 80, id: FourCC( "gcel" ) } );
	registerItem( { name: "gem", gold: 125, id: FourCC( "gemt" ) } );
	registerItem( { name: "health", gold: 50, id: FourCC( "hlst" ) } );
	registerItem( { name: "invis", gold: 35, id: FourCC( "pinv" ) } );
	registerItem( { name: "invul", gold: 25, id: FourCC( "pnvu" ) } );
	registerItem( { name: "mana", gold: 20, id: FourCC( "pman" ) } );
	registerItem( { name: "mines", gold: 150, id: FourCC( "gobm" ) } );
	registerItem( { name: "neck", gold: 150, id: FourCC( "nspi" ) } );
	registerItem( { name: "negation", gold: 50, id: FourCC( "I005" ) } );
	registerItem( { name: "orb", gold: 300, id: FourCC( "ofir" ) } );
	registerItem( { name: "power", gold: 200, id: FourCC( "tkno" ) } );
	registerItem( { name: "speed", gold: 25, id: FourCC( "pspd" ) } );
	registerItem( { name: "sabre", gold: 300, id: FourCC( "I000" ) } );
	registerItem( { name: "scope", gold: 30, id: FourCC( "tels" ) } );
	registerItem( { name: "shadow", gold: 100, id: FourCC( "clsd" ) } );
	registerItem( { name: "siege", gold: 150, id: FourCC( "tfar" ) } );
	registerItem( { name: "stalker", gold: 100, id: FourCC( "fgfh" ) } );
	registerItem( { name: "supergolem", gold: 350, id: FourCC( "I001" ) } );

} );
