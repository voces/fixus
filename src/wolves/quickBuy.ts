
import { Split, myArg, wolfTeam, wolves, TriggerRegisterPlayerChatEventAll } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: test this
const quickBuyTax = 1.5;
const quickSellTax = 0.5;

type ItemSpec = {
	name: string;
	gold: number;
	lumber: number;
	id: number;
}

const itemSpecs: Array<ItemSpec> = [];
const itemSpecsNames: Record<string, ItemSpec> = {};
const itemSpecIds: Record<number, ItemSpec> = {};

// Can't directly get gold/lumber cost off an item, so... :(
const registerItem = ( itemSpec: ItemSpec ): void => {

	itemSpecs.push( itemSpec );
	itemSpecsNames[ itemSpec.name ] = itemSpec;
	itemSpecIds[ itemSpec.id ] = itemSpec;

};

// ===========================================================================
// Trigger: wolfQuickBuy
// ===========================================================================

const hasInventoryAndControlled = (): boolean => IsUnitIllusion( GetFilterUnit() ) === false && GetUnitAbilityLevel( GetFilterUnit(), FourCC( "AInv" ) ) > 0 && ( GetPlayerAlliance( GetOwningPlayer( GetFilterUnit() ), GetTriggerPlayer(), ALLIANCE_SHARED_ADVANCED_CONTROL ) || GetOwningPlayer( GetFilterUnit() ) === GetTriggerPlayer() );

const wolfQuickBuy_Actions = (): void => {

	let g = CreateGroup();
	let u: unit;

	// Preconditions
	Split( GetEventPlayerChatString(), " ", false );

	if ( myArg[ 0 ] !== "buy" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )
		return;

	// Find unit to give the item to
	g = CreateGroup();
	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

	if ( BlzGroupGetSize( g ) > 0 )
		u = FirstOfGroup( g );

	else
		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

	DestroyGroup( g );

	// Get and buy the item
	Split( GetEventPlayerChatString(), " ", true );
	const itemSpec = itemSpecsNames[ myArg[ 0 ] || "" ];

	if ( itemSpec !== null && itemSpec !== undefined )

		if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) >= R2I( I2R( itemSpec.gold ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) >= R2I( I2R( itemSpec.lumber ) * quickBuyTax ) ) {

			UnitAddItem( u, CreateItem( itemSpec.id, GetUnitX( u ), GetUnitY( u ) ) );
			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - R2I( I2R( itemSpec.gold ) * quickBuyTax ) );
			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) - R2I( I2R( itemSpec.lumber ) * quickBuyTax ) );

		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( itemSpec.gold ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) < R2I( I2R( itemSpec.lumber ) * quickBuyTax ) ) {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( itemSpec.gold ) * quickBuyTax ) ) + " gold and " + I2S( R2I( I2R( itemSpec.lumber ) * quickBuyTax ) ) + " lumber." );

		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( itemSpec.gold ) * quickBuyTax ) ) {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( itemSpec.gold ) * quickBuyTax ) ) + " gold." );

		} else {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( itemSpec.lumber ) * quickBuyTax ) ) + " lumber." );

		}

};

const wolfQuickSell_Actions = (): void => {

	let i = 0;
	let u: unit;

	// Preconditions
	Split( GetEventPlayerChatString(), " ", false );

	if ( myArg[ 0 ] !== "sell" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )
		return;

	// Find unit to sell the item on
	const g = CreateGroup();
	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

	if ( BlzGroupGetSize( g ) > 0 )
		u = FirstOfGroup( g );

	else
		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

	DestroyGroup( g );

	// Get the slot
	Split( GetEventPlayerChatString(), " ", true );

	if ( myArg[ 1 ] === "all" )
		Split( "-sell 1 2 3 4 5 6", " ", true );

	// Sell items

	while ( true ) {

		if ( myArg[ i ] === null || S2I( myArg[ i ] || "" ) === 0 ) break;

		if ( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) !== null ) {

			const itemSpec = itemSpecIds[ GetItemTypeId( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) ) ];

			if ( itemSpec !== null ) {

				RemoveItem( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) );
				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) + R2I( I2R( itemSpec.gold ) * quickSellTax ) );
				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) + R2I( I2R( itemSpec.lumber ) * quickSellTax ) );

			}

		}

		i = i + 1;

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-buy ", false );
	TriggerAddAction( t, wolfQuickBuy_Actions );
	t = CreateTrigger();
	TriggerRegisterPlayerChatEventAll( t, "-sell ", false );
	TriggerAddAction( t, wolfQuickSell_Actions );

	registerItem( { name: "supergolem", gold: 350, lumber: 0, id: FourCC( "I001" ) } );
	registerItem( { name: "stalker", gold: 100, lumber: 0, id: FourCC( "fgfh" ) } );
	registerItem( { name: "golem", gold: 100, lumber: 0, id: FourCC( "fgrg" ) } );
	registerItem( { name: "speed", gold: 25, lumber: 0, id: FourCC( "pspd" ) } );
	registerItem( { name: "invis", gold: 35, lumber: 0, id: FourCC( "pinv" ) } );
	registerItem( { name: "mana", gold: 20, lumber: 0, id: FourCC( "pman" ) } );
	registerItem( { name: "cheese", gold: 0, lumber: 2, id: FourCC( "I003" ) } );
	registerItem( { name: "50", gold: 350, lumber: 0, id: FourCC( "I002" ) } );
	registerItem( { name: "sabre", gold: 300, lumber: 0, id: FourCC( "I000" ) } );
	registerItem( { name: "21", gold: 126, lumber: 0, id: FourCC( "ratf" ) } );
	registerItem( { name: "12", gold: 60, lumber: 0, id: FourCC( "ratc" ) } );
	registerItem( { name: "dagger", gold: 67, lumber: 0, id: FourCC( "mcou" ) } );
	registerItem( { name: "cloak", gold: 250, lumber: 0, id: FourCC( "clfm" ) } );
	registerItem( { name: "neck", gold: 150, lumber: 0, id: FourCC( "nspi" ) } );
	registerItem( { name: "boots", gold: 70, lumber: 0, id: FourCC( "bspd" ) } );
	registerItem( { name: "gem", gold: 125, lumber: 0, id: FourCC( "gemt" ) } );
	registerItem( { name: "orb", gold: 300, lumber: 0, id: FourCC( "ofir" ) } );
	registerItem( { name: "scope", gold: 30, lumber: 0, id: FourCC( "tels" ) } );
	registerItem( { name: "invul", gold: 25, lumber: 0, id: FourCC( "pnvu" ) } );
	registerItem( { name: "6", gold: 18, lumber: 0, id: FourCC( "rat6" ) } );
	registerItem( { name: "gloves", gold: 80, lumber: 0, id: FourCC( "gcel" ) } );
	registerItem( { name: "9", gold: 36, lumber: 0, id: FourCC( "rat9" ) } );
	registerItem( { name: "shadow", gold: 100, lumber: 0, id: FourCC( "clsd" ) } );
	registerItem( { name: "siege", gold: 150, lumber: 0, id: FourCC( "tfar" ) } );
	registerItem( { name: "dragon", gold: 400, lumber: 2, id: FourCC( "I004" ) } );
	registerItem( { name: "mines", gold: 150, lumber: 0, id: FourCC( "gobm" ) } );
	registerItem( { name: "negation", gold: 50, lumber: 0, id: FourCC( "I005" ) } );
	registerItem( { name: "power", gold: 200, lumber: 0, id: FourCC( "tkno" ) } );
	registerItem( { name: "health", gold: 50, lumber: 0, id: FourCC( "hlst" ) } );

} );
