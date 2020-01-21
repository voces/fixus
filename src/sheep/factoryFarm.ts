
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { saveskills } from "shared";

// globals from FactoryFarm:
const factoryFarmTiemr = CreateTimer();
let factoryFarmDummySheep: unit;
const factoryFarms = CreateGroup();
const factoryFarmData = InitHashtable();
const factoryFarmsTemp = CreateGroup();
let factoryFarmBuilds: number;
// endglobals from FactoryFarm

const FACTORY_FARM_TYPE = FourCC( "h00C" );
const s__FactoryFarm__data_typeIndex = 0;
const s__FactoryFarm__data_spiralIndex = 1;
const s__FactoryFarm__data_waitBetweenTicks = 2.5;
const s__FactoryFarm__data_waitBetweenBuilds = 0.1;
const s__FactoryFarm__data_selectFarmType = FourCC( "A00M" );

const FARM_TYPE = FourCC( "hhou" );
const BLACK_FARM_TYPE = FourCC( "h004" );
const SILVER_FARM_TYPE = FourCC( "h001" );
const GOLDEN_FARM_TYPE = FourCC( "h000" );
const HARD_FARM_TYPE = FourCC( "hC06" );
const TINY_FARM_TYPE = FourCC( "hC07" );

// library FactoryFarm:

// todo: SpiralX/Y are broken on bottom right, jumps strangely
const spiralX = ( n: number ): number => {

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

const spiralY = ( n: number ): number => {

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

let FactoryFarmStart: () => void = () => { /* do nothing */ };

const FactoryFarm__FactoryFarmEnd = (): void => {

	let wait = s__FactoryFarm__data_waitBetweenTicks - factoryFarmBuilds * s__FactoryFarm__data_waitBetweenBuilds;

	// Return sheep to unowned
	SetUnitOwner( factoryFarmDummySheep, Player( PLAYER_NEUTRAL_PASSIVE ), false );

	// Invoke next run

	if ( wait < s__FactoryFarm__data_waitBetweenBuilds )
		wait = s__FactoryFarm__data_waitBetweenBuilds;

	TimerStart( factoryFarmTiemr, wait, false, FactoryFarmStart );

};

const FactoryFarm__FarmSize = ( farmType: number ): number => {

	if ( farmType === HARD_FARM_TYPE ) return 320;
	else if ( farmType === TINY_FARM_TYPE ) return 128;
	return 192;

};

const FactoryFarm__SpiralSize = ( size: number ): number => R2I( Pow( Math.floor( 640 / size ) * 2 + 1, 2 ) );

const FactoryFarm__FactoryFarmTick = (): void => {

	const u = FirstOfGroup( factoryFarmsTemp );
	let farmType: number;
	let spiralIndex: number;
	let farmSize: number;
	let x: number;
	let y: number;

	if ( u === null ) {

		FactoryFarm__FactoryFarmEnd();
		return;

	}

	if ( UnitAlive( u ) ) {

		farmType = LoadInteger( factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_typeIndex );
		farmSize = FactoryFarm__FarmSize( farmType );

		// Get next location
		spiralIndex = LoadInteger( factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex ) + 1;

		if ( spiralIndex > FactoryFarm__SpiralSize( farmSize ) )
			spiralIndex = 2;

		SaveInteger( factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex, spiralIndex );

		x = GetUnitX( u ) + Math.round( spiralX( spiralIndex ) ) * farmSize;
		y = GetUnitY( u ) + Math.round( spiralY( spiralIndex ) ) * farmSize;

		// Build the farm
		SetUnitX( factoryFarmDummySheep, x );
		SetUnitY( factoryFarmDummySheep, y );

		SetUnitOwner( factoryFarmDummySheep, GetOwningPlayer( u ), false );
		IssueBuildOrderById( factoryFarmDummySheep, farmType, x, y );

		factoryFarmBuilds = factoryFarmBuilds + 1;

	}

	GroupRemoveUnit( factoryFarmsTemp, u );

	TimerStart( factoryFarmTiemr, s__FactoryFarm__data_waitBetweenBuilds, false, FactoryFarm__FactoryFarmTick );

};

FactoryFarmStart = (): void => {

	factoryFarmBuilds = 0;
	BlzGroupAddGroupFast( factoryFarms, factoryFarmsTemp );

	FactoryFarm__FactoryFarmTick();

};

const FactoryFarm__GetBaseFarm = ( u: unit ): number => {

	const playerId = GetPlayerId( GetOwningPlayer( u ) );

	if ( saveskills[ playerId ] >= 25 ) return GOLDEN_FARM_TYPE;
	else if ( saveskills[ playerId ] >= 15 ) return SILVER_FARM_TYPE;
	else if ( saveskills[ playerId ] >= 10 ) return BLACK_FARM_TYPE;
	return FARM_TYPE;

};

const FactoryFarm__FinishConstruction = (): void => {

	const u = GetTriggerUnit();

	if ( GetUnitTypeId( u ) === FACTORY_FARM_TYPE ) {

		GroupAddUnit( factoryFarms, u );
		SaveInteger( factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_typeIndex, FactoryFarm__GetBaseFarm( u ) );
		SaveInteger( factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex, 1 );

	}

};

const FactoryFarm__SelectFarm = (): void => {

	if ( GetSpellAbilityId() === s__FactoryFarm__data_selectFarmType )

		SaveInteger( factoryFarmData, GetHandleId( GetTriggerUnit() ), s__FactoryFarm__data_typeIndex, GetUnitTypeId( GetSpellTargetUnit() ) );

};

const FactoryFarm__Init = (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH );
	TriggerAddAction( t, FactoryFarm__FinishConstruction );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, FactoryFarm__SelectFarm );

	factoryFarmDummySheep = CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), FourCC( "u002" ), 0, 0, 270 );

	TimerStart( factoryFarmTiemr, s__FactoryFarm__data_waitBetweenTicks, false, FactoryFarmStart );

};

// library FactoryFarm ends

addScriptHook( W3TS_HOOK.MAIN_AFTER, FactoryFarm__Init );
