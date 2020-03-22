
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "../util/emitLog";
import { timeout, forEachPlayer, withSelectedUnits, forEachPlayerUnit } from "../util/temp";
import { fillArray } from "../shared";
import { onSpellCast, onCreated, onDeath } from "../event";

const offset = 120 * Math.PI / 180;

const ACTIVATE_QUICK_SHOPS = FourCC( "A00V" );
const DEACTIVATE_QUICK_SHOPS = FourCC( "A00X" );
const BLUE_SHOP = FourCC( "nC12" );
const GREEN_SHOP = FourCC( "n003" );
const RED_SHOP = FourCC( "n004" );
const NEXT_TYPE = FourCC( "A00U" );
const GOLEM_INVENTORY_RESEARCH_TYPE = FourCC( "Repm" );

type ShopData = {
	blue: unit;
	green: unit;
	red: unit;
}

const shopperData: Map<unit, ShopData> = new Map();
const shoppers: Map<unit, unit> = new Map();
const angles = fillArray( bj_MAX_PLAYERS, 15 * Math.PI / 180 );
const spin = CreateTrigger();
const move = CreateTrigger();
const sleeping: Set<unit> = new Set();
let activeShops = 0;

const onActivateQuickShops = ( unit: unit ): void => {

	if ( sleeping.has( unit ) ) return;
	sleeping.add( unit );

	BlzUnitHideAbility( unit, ACTIVATE_QUICK_SHOPS, true );
	UnitAddAbility( unit, DEACTIVATE_QUICK_SHOPS );
	timeout( 0, () => {

		sleeping.delete( unit );
		if ( GetUnitAbilityLevel( unit, DEACTIVATE_QUICK_SHOPS ) === 0 ) return;
		UnitRemoveAbility( unit, ACTIVATE_QUICK_SHOPS );

	} );

	const owner = GetOwningPlayer( unit );

	const shopData = shopperData.get( unit );
	if ( ! shopData ) throw "No shop data!";

	const { red, green, blue } = shopData;

	ShowUnit( blue, true );
	ShowUnit( green, true );
	ShowUnit( red, true );

	if ( owner === GetLocalPlayer() ) {

		// select blue shop for owner
		SelectUnit( unit, false );
		SelectUnit( blue, true );

	}

	activeShops ++;

	if ( activeShops === 1 ) {

		EnableTrigger( spin );
		DisableTrigger( move );

	}

};

const onDeactivateQuickShops = ( unit: unit ): void => {

	if ( sleeping.has( unit ) ) return;
	sleeping.add( unit );

	BlzUnitHideAbility( unit, DEACTIVATE_QUICK_SHOPS, true );
	UnitAddAbility( unit, ACTIVATE_QUICK_SHOPS );
	timeout( 0, () => {

		sleeping.delete( unit );
		if ( GetUnitAbilityLevel( unit, ACTIVATE_QUICK_SHOPS ) === 0 ) return;
		UnitRemoveAbility( unit, DEACTIVATE_QUICK_SHOPS );

	} );

	const shopData = shopperData.get( unit );
	if ( ! shopData ) throw "No shop data!";

	const { red, green, blue } = shopData;
	ShowUnit( red, false );
	ShowUnit( blue, false );
	ShowUnit( green, false );

	activeShops --;

	if ( activeShops === 0 ) {

		DisableTrigger( spin );
		EnableTrigger( move );

	}

};

const onQuickShops = (): void => {

	const spellId = GetSpellAbilityId();

	if ( spellId === ACTIVATE_QUICK_SHOPS ) return onActivateQuickShops( GetTriggerUnit() );
	if ( spellId === DEACTIVATE_QUICK_SHOPS ) return onDeactivateQuickShops( GetTriggerUnit() );

};

const spinShops = (): void => {

	for ( const [ unit, data ] of shopperData.entries() ) {

		const x = GetUnitX( unit );
		const y = GetUnitY( unit );
		const pId = GetPlayerId( GetOwningPlayer( unit ) );

		const { red, blue, green } = data;
		angles[ pId ] += 0.002;

		SetUnitPosition( blue, x + Math.cos( angles[ pId ] ) * 128, y + Math.sin( angles[ pId ] ) * 128 );
		SetUnitPosition( green, x + Math.cos( angles[ pId ] + offset ) * 128, y + Math.sin( angles[ pId ] + offset ) * 128 );
		SetUnitPosition( red, x + Math.cos( angles[ pId ] + offset * 2 ) * 128, y + Math.sin( angles[ pId ] + offset * 2 ) * 128 );

	}

};

const moveShops = (): void => {

	for ( const [ unit, data ] of shopperData.entries() ) {

		const x = GetUnitX( unit );
		const y = GetUnitY( unit );

		const { red, blue, green } = data;

		SetUnitPosition( blue, x, y );
		SetUnitPosition( green, x, y );
		SetUnitPosition( red, x, y );

	}

};

const onNextShop = (): void => {

	if ( GetSpellAbilityId() !== NEXT_TYPE ) return;

	const shop = GetTriggerUnit();

	const shopper = shoppers.get( shop );
	if ( ! shopper ) throw "No shopper";

	const data = shopperData.get( shopper );
	if ( ! data ) throw "No shop data!";

	const type = GetUnitTypeId( shop );

	if ( GetOwningPlayer( shopper ) !== GetLocalPlayer() ) return;

	SelectUnit( shop, false );

	switch ( type ) {

		case BLUE_SHOP: return SelectUnit( data.green, true );
		case GREEN_SHOP: return SelectUnit( data.red, true );
		case RED_SHOP: return SelectUnit( data.blue, true );
		default: throw "Bad switch";

	}

};

const onEscape = (): void => {

	const p = GetTriggerPlayer();
	withSelectedUnits( p, units => {

		const unit = FirstOfGroup( units );
		const type = GetUnitTypeId( unit );
		if ( type !== BLUE_SHOP && type !== GREEN_SHOP && type !== RED_SHOP ) return;

		const shopper = shoppers.get( unit );
		if ( ! shopper ) throw "No shopper";

		onDeactivateQuickShops( shopper );

		if ( GetLocalPlayer() === p )
			SelectUnit( shopper, true );

	} );

};

const onItemSell = (): void => {

	const shop = GetTriggerUnit();
	const type = GetUnitTypeId( shop );

	if ( type !== BLUE_SHOP && type !== GREEN_SHOP && type !== RED_SHOP ) return;

	const shopper = shoppers.get( shop );
	if ( ! shopper ) throw "No shopper";

	onDeactivateQuickShops( shopper );

	if ( GetLocalPlayer() === GetOwningPlayer( shopper ) )
		SelectUnit( shopper, true );

};

export const addQuickShop = ( unit: unit ): void => {

	if ( shopperData.has( unit ) ) return;

	const owner = GetOwningPlayer( unit );
	const angle = angles[ GetPlayerId( owner ) ];
	const x = GetUnitX( unit );
	const y = GetUnitY( unit );

	UnitAddAbility( unit, ACTIVATE_QUICK_SHOPS );

	const neutralPassive = Player( PLAYER_NEUTRAL_PASSIVE );
	const blue = CreateUnit( neutralPassive, BLUE_SHOP, x + Math.cos( angle ) * 128, y + Math.sin( angle ) * 128, 270 );
	const green = CreateUnit( neutralPassive, GREEN_SHOP, x + Math.cos( angle + offset ) * 128, y + Math.sin( angle + offset ) * 128, 270 );
	const red = CreateUnit( neutralPassive, RED_SHOP, x + Math.cos( angle + offset * 2 ) * 128, y + Math.sin( angle + offset * 2 ) * 128, 270 );

	if ( GetOwningPlayer( unit ) !== GetLocalPlayer() ) {

		SetUnitVertexColor( blue, 100, 100, 255, 0 );
		SetUnitVertexColor( green, 150, 255, 150, 0 );
		SetUnitVertexColor( red, 255, 200, 200, 0 );

		SetUnitScale( blue, 0, 0, 0 );
		SetUnitScale( green, 0, 0, 0 );
		SetUnitScale( red, 0, 0, 0 );

	}

	ShowUnit( blue, false );
	ShowUnit( green, false );
	ShowUnit( red, false );

	shoppers.set( blue, unit );
	shoppers.set( green, unit );
	shoppers.set( red, unit );

	shopperData.set( unit, {
		blue,
		green,
		red,
	} );

};

export const removeQuickShop = ( unit: unit ): void => {

	const shopData = shopperData.get( unit );
	if ( ! shopData ) return;

	const { red, green, blue } = shopData;

	shoppers.delete( red );
	RemoveUnit( red );

	shoppers.delete( blue );
	RemoveUnit( blue );

	shoppers.delete( green );
	RemoveUnit( green );

	shopperData.delete( unit );

};

const onUnitCreated = (): void => {

	const unit = GetTriggerUnit();

	if ( UnitInventorySize( unit ) > 0 )
		addQuickShop( unit );

};

const onResearchFilter = Filter( () => UnitInventorySize( GetFilterUnit() ) > 0 );
const onResearch = (): void => {

	if ( GetResearched() !== GOLEM_INVENTORY_RESEARCH_TYPE ) return;

	forEachPlayerUnit( GetTriggerPlayer(), unit => addQuickShop( unit ), onResearchFilter );

};

const onUnitDeath = (): void => {

	const unit = GetTriggerUnit();

	// If hero dies, hide the quick shops
	if ( IsUnitType( unit, UNIT_TYPE_HERO ) )
		onDeactivateQuickShops( unit );

	// If non-hero dies, remove them
	else
		removeQuickShop( unit );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	onSpellCast( "quick shops", onQuickShops );
	onSpellCast( "next shop", onNextShop );
	onCreated( "quick shops", onUnitCreated );
	onDeath( "quick shops", onUnitDeath );

	TriggerRegisterTimerEvent( spin, 0.03, true );
	wrappedTriggerAddAction( spin, "quick shops spin", spinShops );
	DisableTrigger( spin );

	TriggerRegisterTimerEvent( move, 2, true );
	wrappedTriggerAddAction( move, "quick shops move", moveShops );

	let t = CreateTrigger();
	forEachPlayer( p => BlzTriggerRegisterPlayerKeyEvent( t, p, OSKEY_ESCAPE, 0, true ) );
	TriggerAddAction( t, onEscape );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SELL_ITEM );
	wrappedTriggerAddAction( t, "quick shop sell", onItemSell );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_RESEARCH_FINISH );
	wrappedTriggerAddAction( t, "quick shop research", onResearch );

} );
