
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { saveskills } from "../index";

// globals from FactoryFarm:
const FactoryFarm__factoryFarmTimer = CreateTimer();
let FactoryFarm__factoryFarmSheep: unit;
const FactoryFarm__factoryFarms = CreateGroup();
const FactoryFarm__factoryFarmData = InitHashtable();
const FactoryFarm__factoryFarmsTemp = CreateGroup();
let FactoryFarm__factoryFarmBuilds: number;
// endglobals from FactoryFarm

const s__FactoryFarm__data_factoryFarmType = FourCC( "h00C" );
const s__FactoryFarm__data_typeIndex = 0;
const s__FactoryFarm__data_spiralIndex = 1;
const s__FactoryFarm__data_waitBetweenTicks = 2.5;
const s__FactoryFarm__data_waitBetweenBuilds = 0.1;
const s__FactoryFarm__data_selectFarmType = FourCC( "A00M" );

const s__sheep_farmType = FourCC( "hhou" );
const s__sheep_blackFarmType = FourCC( "h004" );
const s__sheep_silverFarmType = FourCC( "h001" );
const s__sheep_goldenFarmType = FourCC( "h000" );
const s__sheep_hardFarmType = FourCC( "hC06" );
const s__sheep_tinyFarmType = FourCC( "hC07" );

// library FactoryFarm:

const FactoryFarm__SpiralX = ( n: number ): number => {

	const k = Math.ceil( ( SquareRoot( n ) - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = Pow( t, 2 );
	t = t - 1;

	if ( n >= m - t )

		return k - ( m - n );

	else

		m = m - t;

	if ( n >= m - t )

		return - k;

	else

		m = m - t;

	if ( n >= m - t )

		return - k + ( m - n );

	return k;

};

const FactoryFarm__SpiralY = ( n: number ): number => {

	const k = Math.ceil( ( SquareRoot( n ) - 1 ) / 2 );
	let t = 2 * k + 1;
	let m = Pow( t, 2 );
	t = t - 1;

	if ( n >= m - t )

		return - k;

	else

		m = m - t;

	if ( n >= m - t )

		return - k + ( m - n );

	else

		m = m - t;

	if ( n >= m - t )

		return k;

	return k - ( m - n - t );

};

let FactoryFarmStart: () => void = () => { /* do nothing */ };

const FactoryFarm__FactoryFarmEnd = (): void => {

	let wait = s__FactoryFarm__data_waitBetweenTicks - FactoryFarm__factoryFarmBuilds * s__FactoryFarm__data_waitBetweenBuilds;

	// Return sheep to unowned
	SetUnitOwner( FactoryFarm__factoryFarmSheep, Player( PLAYER_NEUTRAL_PASSIVE ), false );

	// Invoke next run

	if ( wait < s__FactoryFarm__data_waitBetweenBuilds )

		wait = s__FactoryFarm__data_waitBetweenBuilds;

	TimerStart( FactoryFarm__factoryFarmTimer, wait, false, FactoryFarmStart );

};

const FactoryFarm__FarmSize = ( farmType: number ): number => {

	if ( farmType === s__sheep_hardFarmType )

		return 320;

	else if ( farmType === s__sheep_tinyFarmType )

		return 128;

	return 192;

};

const FactoryFarm__SpiralSize = ( size: number ): number => R2I( Pow( Math.floor( 640 / size ) * 2 + 1, 2 ) );

const FactoryFarm__FactoryFarmTick = (): void => {

	const u = FirstOfGroup( FactoryFarm__factoryFarmsTemp );
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

		farmType = LoadInteger( FactoryFarm__factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_typeIndex );
		farmSize = FactoryFarm__FarmSize( farmType );

		// Get next location
		spiralIndex = LoadInteger( FactoryFarm__factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex ) + 1;

		if ( spiralIndex > FactoryFarm__SpiralSize( farmSize ) )

			spiralIndex = 2;

		SaveInteger( FactoryFarm__factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex, spiralIndex );

		x = GetUnitX( u ) + Math.round( FactoryFarm__SpiralX( spiralIndex ) ) * farmSize;
		y = GetUnitY( u ) + Math.round( FactoryFarm__SpiralY( spiralIndex ) ) * farmSize;

		// Build the farm
		SetUnitX( FactoryFarm__factoryFarmSheep, x );
		SetUnitY( FactoryFarm__factoryFarmSheep, y );

		SetUnitOwner( FactoryFarm__factoryFarmSheep, GetOwningPlayer( u ), false );
		IssueBuildOrderById( FactoryFarm__factoryFarmSheep, farmType, x, y );

		FactoryFarm__factoryFarmBuilds = FactoryFarm__factoryFarmBuilds + 1;

	}

	GroupRemoveUnit( FactoryFarm__factoryFarmsTemp, u );

	TimerStart( FactoryFarm__factoryFarmTimer, s__FactoryFarm__data_waitBetweenBuilds, false, FactoryFarm__FactoryFarmTick );

};

FactoryFarmStart = (): void => {

	FactoryFarm__factoryFarmBuilds = 0;
	BlzGroupAddGroupFast( FactoryFarm__factoryFarms, FactoryFarm__factoryFarmsTemp );

	FactoryFarm__FactoryFarmTick();

};

const FactoryFarm__GetBaseFarm = ( u: unit ): number => {

	const playerId = GetPlayerId( GetOwningPlayer( u ) );

	if ( saveskills[ playerId ] >= 25 )

		return s__sheep_goldenFarmType;

	else if ( saveskills[ playerId ] >= 15 )

		return s__sheep_silverFarmType;

	else if ( saveskills[ playerId ] >= 10 )

		return s__sheep_blackFarmType;

	return s__sheep_farmType;

};

const FactoryFarm__FinishConstruction = (): void => {

	const u = GetTriggerUnit();

	if ( GetUnitTypeId( u ) === s__FactoryFarm__data_factoryFarmType ) {

		GroupAddUnit( FactoryFarm__factoryFarms, u );
		SaveInteger( FactoryFarm__factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_typeIndex, FactoryFarm__GetBaseFarm( u ) );
		SaveInteger( FactoryFarm__factoryFarmData, GetHandleId( u ), s__FactoryFarm__data_spiralIndex, 1 );

	}

};

const FactoryFarm__SelectFarm = (): void => {

	if ( GetSpellAbilityId() === s__FactoryFarm__data_selectFarmType )

		SaveInteger( FactoryFarm__factoryFarmData, GetHandleId( GetTriggerUnit() ), s__FactoryFarm__data_typeIndex, GetUnitTypeId( GetSpellTargetUnit() ) );

};

const FactoryFarm__Init = (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH );
	TriggerAddAction( t, FactoryFarm__FinishConstruction );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, FactoryFarm__SelectFarm );

	FactoryFarm__factoryFarmSheep = CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), FourCC( "u002" ), 0, 0, 270 );

	TimerStart( FactoryFarm__factoryFarmTimer, s__FactoryFarm__data_waitBetweenTicks, false, FactoryFarmStart );

};

// library FactoryFarm ends

addScriptHook( W3TS_HOOK.MAIN_AFTER, FactoryFarm__Init );
