
import { Split, myArg, wolfTeam, wolves, TriggerRegisterPlayerChatEventAll } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: test this
const quickBuyTax = 1.5;
const quickSellTax = 0.5;

const itemSpecs: Array<number> = [];
// skip 0 to avoid typos
let itemSpecsLength = 1;
const itemSpecsNames = InitHashtable();
const itemSpecsIds = InitHashtable();
let si__itemspec_F = 0;
let si__itemspec_I = 0;
const si__itemspec_V: Array<number> = [];
const s__itemspec_name: Array<string> = [];
const s__itemspec_gold: Array<number> = [];
const s__itemspec_lumber: Array<number> = [];
const s__itemspec_id: Array<number> = [];

// Generated allocator of itemspec
const s__itemspec__allocate = (): number => {

	let _this = si__itemspec_F;

	if ( _this !== 0 )

		si__itemspec_F = si__itemspec_V[ _this ];

	else {

		si__itemspec_I = si__itemspec_I + 1;
		_this = si__itemspec_I;

	}

	if ( _this > 8190 )

		return 0;

	si__itemspec_V[ _this ] = - 1;
	return _this;

};

const RegisterItem = ( name: string, gold: number, lumber: number, id: number ): number => {

	// Can't directly get gold/lumber cost off an item, so... :(
	itemSpecs[ itemSpecsLength ] = s__itemspec__allocate();
	s__itemspec_name[ itemSpecs[ itemSpecsLength ] ] = name;
	s__itemspec_gold[ itemSpecs[ itemSpecsLength ] ] = gold;
	s__itemspec_lumber[ itemSpecs[ itemSpecsLength ] ] = lumber;
	s__itemspec_id[ itemSpecs[ itemSpecsLength ] ] = id;
	SaveInteger( itemSpecsNames, StringHash( name ), 0, itemSpecsLength );
	SaveInteger( itemSpecsIds, id, 0, itemSpecsLength );
	itemSpecsLength = itemSpecsLength + 1;
	return itemSpecs[ itemSpecsLength - 1 ];

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
	const itemSpec = itemSpecs[ LoadInteger( itemSpecsNames, StringHash( myArg[ 0 ] ), 0 ) ];

	if ( itemSpec !== null )

		if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) >= R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) >= R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

			UnitAddItem( u, CreateItem( s__itemspec_id[ itemSpec ], GetUnitX( u ), GetUnitY( u ) ) );
			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) );
			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) - R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) );

		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) < R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold and " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold." );

		} else {

			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

		}

};

const wolfQuickSell_Actions = (): void => {

	let i = 0;
	let u: unit;
	let itemSpec: number;

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

			itemSpec = itemSpecs[ LoadInteger( itemSpecsIds, GetItemTypeId( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) ), 0 ) ];

			if ( itemSpec !== null ) {

				RemoveItem( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) );
				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) + R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickSellTax ) );
				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) + R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickSellTax ) );

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

	RegisterItem( "supergolem", 350, 0, FourCC( "I001" ) );
	RegisterItem( "stalker", 100, 0, FourCC( "fgfh" ) );
	RegisterItem( "golem", 100, 0, FourCC( "fgrg" ) );
	RegisterItem( "speed", 25, 0, FourCC( "pspd" ) );
	RegisterItem( "invis", 35, 0, FourCC( "pinv" ) );
	RegisterItem( "mana", 20, 0, FourCC( "pman" ) );
	RegisterItem( "cheese", 0, 2, FourCC( "I003" ) );
	RegisterItem( "50", 350, 0, FourCC( "I002" ) );
	RegisterItem( "sabre", 300, 0, FourCC( "I000" ) );
	RegisterItem( "21", 126, 0, FourCC( "ratf" ) );
	RegisterItem( "12", 60, 0, FourCC( "ratc" ) );
	RegisterItem( "dagger", 67, 0, FourCC( "mcou" ) );
	RegisterItem( "cloak", 250, 0, FourCC( "clfm" ) );
	RegisterItem( "neck", 150, 0, FourCC( "nspi" ) );
	RegisterItem( "boots", 70, 0, FourCC( "bspd" ) );
	RegisterItem( "gem", 125, 0, FourCC( "gemt" ) );
	RegisterItem( "orb", 300, 0, FourCC( "ofir" ) );
	RegisterItem( "scope", 30, 0, FourCC( "tels" ) );
	RegisterItem( "invul", 25, 0, FourCC( "pnvu" ) );
	RegisterItem( "6", 18, 0, FourCC( "rat6" ) );
	RegisterItem( "gloves", 80, 0, FourCC( "gcel" ) );
	RegisterItem( "9", 36, 0, FourCC( "rat9" ) );
	RegisterItem( "shadow", 100, 0, FourCC( "clsd" ) );
	RegisterItem( "siege", 150, 0, FourCC( "tfar" ) );
	RegisterItem( "dragon", 400, 2, FourCC( "I004" ) );
	RegisterItem( "mines", 150, 0, FourCC( "gobm" ) );
	RegisterItem( "negation", 50, 0, FourCC( "I005" ) );
	RegisterItem( "power", 200, 0, FourCC( "tkno" ) );
	RegisterItem( "health", 50, 0, FourCC( "hlst" ) );

} );
