
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { saveskills } from "shared";
import { emitLog, wrappedTriggerAddAction } from "util/emitLog";
import { onSpellCast } from "util/event";
import { timeout } from "util/temp";

let factoryFarmDummySheep: unit;
let factoryFarms: group;
let factoryFarmsTemp: group;
let factoryFarmBuilds: number;

const FACTORY_FARM_TYPE = FourCC( "h00C" );
const WAIT_BETWEEN_TICKS = 2.5;
const WAIT_BETWEEN_BUILDS = 0.1;
const SELECT_FARM_TYPE = FourCC( "A00M" );

const FARM_TYPE = FourCC( "hhou" );
const BLACK_FARM_TYPE = FourCC( "h004" );
const SILVER_FARM_TYPE = FourCC( "h001" );
const GOLDEN_FARM_TYPE = FourCC( "h000" );
const HARD_FARM_TYPE = FourCC( "hC06" );
const TINY_FARM_TYPE = FourCC( "hC07" );

type FactoryFarmData = {
	buildIndex: number;
	buildType: number;
	compact: boolean;
}

const factoryFarmData: Map<unit, FactoryFarmData> = new Map();
const lastFarmType: Map<player, number> = new Map();

export const spiralX = ( n: number ): number => {

	const k = Math.ceil( ( n ** 0.5 - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = t ** 2;
	t = t - 1;

	if ( n >= m - t ) return k - ( m - n );
	else m = m - t;

	if ( n >= m - t ) return - k;
	else m = m - t;

	if ( n >= m - t ) return - k + ( m - n );
	return k;

};

export const spiralY = ( n: number ): number => {

	const k = Math.ceil( ( n ** 0.5 - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = t ** 2;
	t = t - 1;

	if ( n >= m - t ) return - k;
	else m = m - t;

	if ( n >= m - t ) return - k + ( m - n );
	else m = m - t;

	if ( n >= m - t ) return k;
	return k - ( m - n - t );

};

// This is redefined
let factoryFarmStart: () => void = () => { /* do nothing */ };

const factoryFarmEnd = (): void => {

	try {

		let wait = WAIT_BETWEEN_TICKS - factoryFarmBuilds * WAIT_BETWEEN_BUILDS;

		// Return sheep to unowned
		SetUnitOwner( factoryFarmDummySheep, Player( PLAYER_NEUTRAL_PASSIVE ), false );

		// Invoke next run
		if ( wait < WAIT_BETWEEN_BUILDS ) wait = WAIT_BETWEEN_BUILDS;
		timeout( "factory end", wait, factoryFarmStart );

	} catch ( err ) {

		emitLog( "factoryFarmEnd", err );
		timeout( "factory end errored", WAIT_BETWEEN_TICKS, factoryFarmStart );

	}

};

const getFarmSize = ( farmType: number ): number => {

	if ( farmType === HARD_FARM_TYPE ) return 256;
	else if ( farmType === TINY_FARM_TYPE ) return 64;
	return 128;

};

const getSpiralSize = ( size: number ): number => R2I( Pow( Math.floor( 640 / size ) * 2 + 1, 2 ) );

const factoryFarmTick = (): void => {

	try {

		const u = FirstOfGroup( factoryFarmsTemp );

		if ( u == null ) {

			factoryFarmEnd();
			return;

		}

		if ( UnitAlive( u ) ) {

			const factoryData = factoryFarmData.get( u ) as FactoryFarmData;
			const { buildType, compact } = factoryData;
			const farmSize = getFarmSize( buildType ) + ( compact ? 0 : 64 );

			// Get next location
			let buildIndex = factoryData.buildIndex + 1;
			if ( buildIndex > getSpiralSize( farmSize ) ) buildIndex = 2;
			factoryFarmData.set( u, { ...factoryData, buildIndex } );

			const x = GetUnitX( u ) + Math.round( spiralX( buildIndex ) ) * farmSize;
			const y = GetUnitY( u ) + Math.round( spiralY( buildIndex ) ) * farmSize;

			// Build the farm
			SetUnitX( factoryFarmDummySheep, x );
			SetUnitY( factoryFarmDummySheep, y );

			SetUnitOwner( factoryFarmDummySheep, GetOwningPlayer( u ), false );
			IssueBuildOrderById( factoryFarmDummySheep, buildType, x, y );

			factoryFarmBuilds = factoryFarmBuilds + 1;

		}

		GroupRemoveUnit( factoryFarmsTemp, u );

	} catch ( err ) {

		emitLog( "factoryFarmTick", err );

	}

	timeout( "factory tick", WAIT_BETWEEN_BUILDS, factoryFarmTick );

};

factoryFarmStart = (): void => {

	factoryFarmBuilds = 0;
	BlzGroupAddGroupFast( factoryFarms, factoryFarmsTemp );

	factoryFarmTick();

};

const getBaseFarm = ( u: unit ): number => {

	const playerId = GetPlayerId( GetOwningPlayer( u ) );

	if ( saveskills[ playerId ] >= 25 ) return GOLDEN_FARM_TYPE;
	else if ( saveskills[ playerId ] >= 15 ) return SILVER_FARM_TYPE;
	else if ( saveskills[ playerId ] >= 10 ) return BLACK_FARM_TYPE;
	return FARM_TYPE;

};

const getDefaults = ( u: unit ): FactoryFarmData => ( {
	buildIndex: 1,
	buildType: lastFarmType.get( GetOwningPlayer( u ) ) ?? getBaseFarm( u ),
	compact: false,
} );

const onFinishConstruction = (): void => {

	const u = GetTriggerUnit();

	if ( GetUnitTypeId( u ) !== FACTORY_FARM_TYPE ) return;

	GroupAddUnit( factoryFarms, u );
	factoryFarmData.set( u, getDefaults( u ) );

};

const onSelectFarm = (): void => {

	if ( GetSpellAbilityId() !== SELECT_FARM_TYPE ) return;

	const triggerUnit = GetTriggerUnit();
	const unitType = GetUnitTypeId( GetSpellTargetUnit() );

	// For future factories
	lastFarmType.set( GetOwningPlayer( triggerUnit ), unitType );

	// For the current factory
	factoryFarmData.set( triggerUnit, {
		...getDefaults( triggerUnit ),
		buildType: unitType,
	} );

};

const onIssuedOrder = (): void => {

	const triggerUnit = GetTriggerUnit();
	if ( GetUnitTypeId( triggerUnit ) !== FACTORY_FARM_TYPE ) return;

	const order = OrderId2String( GetIssuedOrderId() );

	if ( order === "defend" )
		factoryFarmData.set( triggerUnit, {
			...getDefaults( triggerUnit ),
			...factoryFarmData.get( triggerUnit ),
			compact: true,
		} );

	else if ( order === "undefend" )
		factoryFarmData.set( triggerUnit, {
			...getDefaults( triggerUnit ),
			...factoryFarmData.get( triggerUnit ),
			compact: false,
		} );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH );
	wrappedTriggerAddAction( t, "factory finish construction", onFinishConstruction );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_ORDER );
	wrappedTriggerAddAction( t, "factory finish issued order", onIssuedOrder );

	onSpellCast( "factory", onSelectFarm );

	factoryFarmDummySheep = CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), FourCC( "u002" ), 0, 0, 270 );
	factoryFarms = CreateGroup();
	factoryFarmsTemp = CreateGroup();

	timeout( "factory start", WAIT_BETWEEN_TICKS, factoryFarmStart );

} );
