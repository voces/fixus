
import { addScriptHook, W3TS_HOOK } from "w3ts";

// globals from AbilityPreload:
const AbilityPreload__PreloadUnitRawcode = FourCC( "zsmc" );
// // This is the rawcode for "Sammy!". It is never used and has no model,
// // which makes an ideal preloading unit. Change it if you want to.
let AbilityPreload__PreloadUnit: unit;
// endglobals from AbilityPreload
// globals from CloakOfFlames:
const CloakOfFlames__cloakHolders = CreateGroup();
// endglobals from CloakOfFlames
// globals from DragonFire:
let DragonFire__burnWolfId = 7;
let DragonFire__emptyCount: number;
const DragonFire__spreadFire = CreateTrigger();
const DragonFire__burnUnits = CreateTrigger();
// endglobals from DragonFire
// globals from FactoryFarm:
const FactoryFarm__factoryFarmTimer = CreateTimer();
let FactoryFarm__factoryFarmSheep: unit;
const FactoryFarm__factoryFarms = CreateGroup();
const FactoryFarm__factoryFarmData = InitHashtable();
const FactoryFarm__factoryFarmsTemp = CreateGroup();
let FactoryFarm__factoryFarmBuilds: number;
// endglobals from FactoryFarm
// globals from FileIO:
// Enable this if you want to allow the system to read files generated in patch 1.30 or below.
// NOTE: For this to work properly you must edit the 'Amls' ability and change the levels to 2
// as well as typing something in "Level 2 - Text - Tooltip - Normal" text field.
//
// Enabling this will also cause the system to treat files written with .write("") as empty files.
//
// This setting is really only intended for those who were already using the system in their map
// prior to patch 1.31 and want to keep old files created with this system to still work.
// endglobals from FileIO
// globals from ScoutPhoenixUpgrade:
// endglobals from ScoutPhoenixUpgrade
// globals from Specialization:
const Specialization__playerSpecializations: Array<number> = [];
const Specialization__specializations: Array<number> = [];
const Specialization__levels: Array<number> = [];
// endglobals from Specialization
// // Generated
// let gg_rct_Pen: rect;
// let gg_trg_coreInit: trigger;
// let gg_trg_coreGame: trigger;
// let gg_trg_miscFace: trigger;
// let gg_trg_miscFriendlyAttack: trigger;
// let gg_trg_miscSmartSave: trigger;
// let gg_trg_miscFiveMinuteAction: trigger;
// let gg_trg_miscDollyMove: trigger;
// let gg_trg_sheepCommands: trigger;
// let gg_trg_sheepJotyeFarm: trigger;
// let gg_trg_eggGem: trigger;
// let gg_trg_eggDolly: trigger;
// let gameState = "init";
const saveskills: Array<number> = [];
// const myTimer = CreateTimer();
// const myTimerDialog = CreateTimerDialog( myTimer );
const wolves: Array<unit> = [];
// const sheeps: Array<unit> = [];
// const wisps: Array<unit> = [];
// const wws: Array<unit> = [];
// const sheepTeam = CreateForce();
// const wolfTeam = CreateForce();
// const wispTeam = CreateForce();
// const color: Array<string> = [];
// const itemSpecs: Array<number> = [];
// // skip 0 to avoid typos
// let itemSpecsLength = 1;
// const itemSpecsNames = InitHashtable();
// const itemSpecsIds = InitHashtable();
// let board: multiboard;
// const myArg: Array<string | null> = [];
// let myArgCount = 0;
// const gemActivated: Array<boolean> = [];
let WORLD_BOUNDS: rect;

// const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
// const quickBuyTax = 1.5;
// const quickSellTax = 0.5;
// let gameEnded = false;
// let someInteger: number;
// const sheepZoom: Array<number> = [];
// const wolfZoom: Array<number> = [];
// let goldFactor = 1;
// const wwTimer: Array<timer> = [];
// const wwTimerDialog: Array<timerdialog> = [];
// const dollyClick: Array<number> = [];
// let katama = true;
// const dollyTimer: Array<timer> = [];
// const dollyTimerDialog: Array<timerdialog> = [];

// // JASSHelper struct globals:
const s__DragonFire__data_dragonGlass = FourCC( "A00H" );
const s__DragonFire__data_dragonFireBuff = FourCC( "B000" );
const s__DragonFire__data_dragonFireAbility = FourCC( "A00N" );
const s__FactoryFarm__data_factoryFarmType = FourCC( "h00C" );
const s__FactoryFarm__data_typeIndex = 0;
const s__FactoryFarm__data_spiralIndex = 1;
const s__FactoryFarm__data_waitBetweenTicks = 2.5;
const s__FactoryFarm__data_waitBetweenBuilds = 0.1;
const s__FactoryFarm__data_selectFarmType = FourCC( "A00M" );
// const s__File_AbilityCount = 10;
// const s__File_PreloadLimit = 200;
// let s__File_Counter = 0;
// const s__File_List: Array<number> = [];
const s__File_AbilityList: Array<number> = [];
// const s__File_filename: Array<string> = [];
// const s__File_buffer: Array<string | null> = [];
// // let s__File_ReadEnabled: boolean;
const s__ScoutPhoenixUpgrade__data_upgradeId = FourCC( "R004" );
const s__ScoutPhoenixUpgrade__data_abilityId = FourCC( "A00B" );
let si__SpecializationStruct_F = 0;
let si__SpecializationStruct_I = 0;
const si__SpecializationStruct_V: Array<number> = [];
const s__SpecializationStruct_learn: Array<number> = [];
const s__SpecializationStruct_passive: Array<number> = [];
const s__SpecializationStruct_active: Array<number> = [];
const s__SpecializationStruct_upgrade: Array<number> = [];
const s__data_spellbook = FourCC( "A006" );
let s__data_flash: number;
let s__data_engineer: number;
let s__data_attacker: number;
let s__data_hulk: number;
// const s__sheep_type = FourCC( "uC04" );
// const s__sheep_blacktype = FourCC( "uC02" );
// const s__sheep_silvertype = FourCC( "u000" );
// const s__sheep_goldtype = FourCC( "u001" );
// const s__sheep_xability = FourCC( "A00D" );
// const s__sheep_dolly = FourCC( "nshf" );
// const s__sheep_katama = FourCC( "n002" );
const s__sheep_farmType = FourCC( "hhou" );
const s__sheep_blackFarmType = FourCC( "h004" );
const s__sheep_silverFarmType = FourCC( "h001" );
const s__sheep_goldenFarmType = FourCC( "h000" );
const s__sheep_hardFarmType = FourCC( "hC06" );
const s__sheep_tinyFarmType = FourCC( "hC07" );
// const s__wisp_type = FourCC( "eC01" );
// const s__wolf_type = FourCC( "EC03" );
// const s__wolf_blacktype = FourCC( "E002" );
// const s__wolf_imbatype = FourCC( "E000" );
// const s__wolf_wwtype = FourCC( "eC16" );
// const s__wolf_wwitem = FourCC( "I003" );
const s__wolf_cloakitem = FourCC( "clfm" );
// const s__wolf_wardtype = FourCC( "n001" );
// const s__wolf_wardability = FourCC( "A001" );
// const s__wolf_golemtype = FourCC( "ewsp" );
// const s__wolf_stalkertype = FourCC( "nfel" );
// const s__wolf_item1 = FourCC( "ratf" );
// const s__wolf_item2 = FourCC( "ratc" );
// const s__wolf_item3 = FourCC( "rat9" );
// const s__wolf_item4 = FourCC( "rat6" );
// const s__wolf_itemGlobal = FourCC( "mcou" );
// const s__wolf_gem = FourCC( "gemt" );
// const s__misc_dolly = FourCC( "nshf" );
// const s__misc_dollySpeedAura = FourCC( "Aasl" );
// let si__itemspec_F = 0;
// let si__itemspec_I = 0;
// const si__itemspec_V: Array<number> = [];
// const s__itemspec_name: Array<string> = [];
// const s__itemspec_gold: Array<number> = [];
// const s__itemspec_lumber: Array<number> = [];
// const s__itemspec_id: Array<number> = [];
// let si__splitarray_I = 0;
// let si__splitarray_F = 0;
// const s__splitarray: Array<string> = [];
// const si__splitarray_V: Array<number> = [];

// // Generated allocator of splitarray
// const s__splitarray__allocate = (): number => {

// 	let _this = si__splitarray_F;

// 	if ( _this !== 0 )

// 		si__splitarray_F = si__splitarray_V[ _this ];

// 	else {

// 		si__splitarray_I = si__splitarray_I + 4;
// 		_this = si__splitarray_I;

// 	}

// 	if ( _this > 8187 )

// 		return 0;

// 	si__splitarray_V[ _this ] = - 1;
// 	return _this;

// };

// // Generated allocator of itemspec
// const s__itemspec__allocate = (): number => {

// 	let _this = si__itemspec_F;

// 	if ( _this !== 0 )

// 		si__itemspec_F = si__itemspec_V[ _this ];

// 	else {

// 		si__itemspec_I = si__itemspec_I + 1;
// 		_this = si__itemspec_I;

// 	}

// 	if ( _this > 8190 )

// 		return 0;

// 	si__itemspec_V[ _this ] = - 1;
// 	return _this;

// };

// Generated allocator of SpecializationStruct
const s__SpecializationStruct__allocate = (): number => {

	let _this = si__SpecializationStruct_F;

	if ( _this !== 0 )

		si__SpecializationStruct_F = si__SpecializationStruct_V[ _this ];

	else {

		si__SpecializationStruct_I = si__SpecializationStruct_I + 1;
		_this = si__SpecializationStruct_I;

	}

	if ( _this > 8190 )

		return 0;

	si__SpecializationStruct_V[ _this ] = - 1;
	return _this;

};

// // library AbilityPreload:
// // ===========================================================================
// // Information:
// // ==============
// //
// //      Preloading removes the noticeable delay the first time an ability
// //  is loaded in a game. If an ability was not already on a pre-placed unit
// //  or a unit that was created during initialization, preloading is needed
// //  to prevent a delay.
// //
// // ===========================================================================
// // AbilityPreload API:
// // =====================
// //
// //  AbilityPreload(abilityid) :
// //        Call this before any time has elapsed to preload a specific
// //     ability. If debug mode is enabled, you will see an error message
// //     if you call this after initialization, or if you try to preload
// //     an ability that does not exist. Will inline to a UnitAddAbility
// //     call if debug mode is disabled.
// //
// //  AbilityRangePreload(start, end) :
// //        Same as AbilityPreload, but preloads a range of abilities.
// //      It will iterates between the two rawcode values and preload
// //      every ability along the way. It will not show an error message
// //      for non-existent abilities.
// //
// // ===========================================================================
// // Configuration:
// // ================

// // ===========================================================================

// const AbilityRangePreload = ( start: number, end: number ): void => {

// 	let i = 1;

// 	if ( start > end )

// 		i = - 1;

// 	while ( true ) {

// 		if ( start > end ) break;
// 		UnitAddAbility( AbilityPreload__PreloadUnit, start );
// 		start = start + i;

// 	}

// };

// // ===========================================================================

// // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const s__AbilityPreload__Init_onInit = (): void => {

	AbilityPreload__PreloadUnit = CreateUnit( Player( 15 ), AbilityPreload__PreloadUnitRawcode, 0, 0, 0 );
	UnitApplyTimedLife( AbilityPreload__PreloadUnit, 0, 0.001 );
	ShowUnit( AbilityPreload__PreloadUnit, false );
	UnitAddAbility( AbilityPreload__PreloadUnit, FourCC( "Aloc" ) );

};

// library AbilityPreload ends
// library CloakOfFlames:

const CloakOfFlames__OnPickupItem = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_cloakitem )

		GroupAddUnit( CloakOfFlames__cloakHolders, GetManipulatingUnit() );

};

const CloakOfFlames__CountCloaks = ( u: unit ): number => {

	let i = 0;
	let cloaks = 0;

	while ( true ) {

		if ( i === 6 ) break;

		if ( GetItemTypeId( UnitItemInSlot( u, i ) ) === s__wolf_cloakitem )

			cloaks = cloaks + 1;

		i = i + 1;

	}

	return cloaks;

};

const CloakOfFlames__OnDropItem = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_cloakitem && CloakOfFlames__CountCloaks( GetManipulatingUnit() ) === 1 )

		GroupRemoveUnit( CloakOfFlames__cloakHolders, GetManipulatingUnit() );

};

const CloakOfFlames__Tick = (): void => {

	const unitsWithCloak = CreateGroup();
	let cloakHolder: unit;
	let x: number;
	let y: number;
	let i: number;
	let cloaks: number;
	let unitsToDamage: group;
	let damagedUnit: unit;

	BlzGroupAddGroupFast( CloakOfFlames__cloakHolders, unitsWithCloak );

	while ( true ) {

		cloakHolder = FirstOfGroup( unitsWithCloak );
		if ( cloakHolder === null ) break;
		x = GetUnitX( cloakHolder );
		y = GetUnitY( cloakHolder );
		i = 0;
		cloaks = 0;

		while ( true ) {

			if ( i === 6 ) break;

			if ( GetItemTypeId( UnitItemInSlot( cloakHolder, i ) ) === s__wolf_cloakitem ) {

				unitsToDamage = CreateGroup();
				GroupEnumUnitsInRange( unitsToDamage, x, y, 256 + cloaks * 64, null );

				while ( true ) {

					damagedUnit = FirstOfGroup( unitsToDamage );
					if ( damagedUnit === null ) break;

					if ( IsUnitType( damagedUnit, UNIT_TYPE_STRUCTURE ) && IsUnitAlly( damagedUnit, GetOwningPlayer( cloakHolder ) ) === false )

						if ( IsUnitIllusion( cloakHolder ) ) {

							UnitDamageTarget( cloakHolder, damagedUnit, 6 - cloaks, true, false, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS );

						} else {

							UnitDamageTarget( cloakHolder, damagedUnit, 15 - cloaks * 2, true, false, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS );

						}

					GroupRemoveUnit( unitsToDamage, damagedUnit );

				}

				cloaks = cloaks + 1;
				DestroyGroup( unitsToDamage );

			}

			i = i + 1;

		}

		GroupRemoveUnit( unitsWithCloak, cloakHolder );

	}

	DestroyGroup( unitsWithCloak );

};

// // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const CloakOfFlames__Init = (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, CloakOfFlames__OnPickupItem );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DROP_ITEM );
	TriggerAddAction( t, CloakOfFlames__OnDropItem );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 1, true );
	TriggerAddAction( t, CloakOfFlames__Tick );

};

// // library CloakOfFlames ends
// // library DragonFire:

const DragonFire__NeedsFireAbility = (): boolean => GetUnitAbilityLevel( GetFilterUnit(), s__DragonFire__data_dragonFireBuff ) > 0 && BlzGetUnitAbility( GetFilterUnit(), s__DragonFire__data_dragonFireAbility ) === null && IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE );

const DragonFire__SpreadFire = (): void => {

	const g = CreateGroup();
	let u: unit;
	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( DragonFire__NeedsFireAbility ) );

	while ( true ) {

		u = FirstOfGroup( g );
		if ( u === null ) break;
		UnitAddAbility( u, s__DragonFire__data_dragonFireAbility );
		GroupRemoveUnit( g, u );

	}

	DestroyGroup( g );

};

const DragonFire__NextWolfId = ( current: number ): number => {

	let tries = 5;

	while ( true ) {

		if ( tries === 0 ) break;
		current = current + 1;

		if ( current === 12 )

			current = 8;

		if ( wolves[ current ] !== null )

			return current;

		tries = tries - 1;

	}

	return 8;

};

const DragonFire__BurningUnits = (): boolean => GetUnitAbilityLevel( GetFilterUnit(), s__DragonFire__data_dragonFireBuff ) > 0;

const DragonFire__BurnUnits = (): void => {

	const g = CreateGroup();
	let u: unit;
	let damage: number;
	let isEmpty = true;

	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( DragonFire__BurningUnits ) );

	while ( true ) {

		u = FirstOfGroup( g );
		if ( u === null ) break;
		isEmpty = false;
		DragonFire__burnWolfId = DragonFire__NextWolfId( DragonFire__burnWolfId );
		damage = R2I( BlzGetUnitMaxHP( u ) * 0.01 );

		if ( damage < 1 )

			damage = 1;

		UnitDamageTarget( wolves[ DragonFire__burnWolfId ], u, damage, true, false, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_FIRE, WEAPON_TYPE_WHOKNOWS );
		GroupRemoveUnit( g, u );

	}

	if ( isEmpty ) {

		DragonFire__emptyCount = DragonFire__emptyCount + 1;

		if ( DragonFire__emptyCount > 3 ) {

			DisableTrigger( DragonFire__spreadFire );
			DisableTrigger( DragonFire__burnUnits );

		}

	} else

		DragonFire__emptyCount = 0;

	DestroyGroup( g );

};

const DragonFire__OnSpellCast = (): void => {

	if ( GetSpellAbilityId() === s__DragonFire__data_dragonGlass ) {

		DragonFire__emptyCount = 0;
		EnableTrigger( DragonFire__spreadFire );
		EnableTrigger( DragonFire__burnUnits );

	}

};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const DragonFire__Init = (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, DragonFire__OnSpellCast );

	TriggerRegisterTimerEvent( DragonFire__spreadFire, 10, true );
	TriggerAddAction( DragonFire__spreadFire, DragonFire__SpreadFire );
	DisableTrigger( DragonFire__spreadFire );

	TriggerRegisterTimerEvent( DragonFire__burnUnits, 1, true );
	TriggerAddAction( DragonFire__burnUnits, DragonFire__BurnUnits );
	DisableTrigger( DragonFire__burnUnits );

};

// library DragonFire ends
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
// // library FileIO:

// const s__File_open = ( filename: string ): number => {

// 	let _this = s__File_List[ 0 ];

// 	if ( _this === 0 ) {

// 		_this = s__File_Counter + 1;
// 		s__File_Counter = _this;

// 	} else

// 		s__File_List[ 0 ] = s__File_List[ _this ];

// 	s__File_filename[ _this ] = filename;
// 	s__File_buffer[ _this ] = null;

// 	return _this;

// };

// // This is used to detect invalid characters which aren't supported in preload files.

// const s__File_write = ( _this: number, contents: string ): number => {

// 	let i = 0;
// 	let c = 0;
// 	let len = StringLength( contents );
// 	let lev = 0;
// 	const prefix = "-";
// 	let chunk: string;

// 	s__File_buffer[ _this ] = null;

// 	// Check if the string is empty. If null, the contents will be cleared.

// 	if ( contents === "" )

// 		len = len + 1;

// 	// Begin to generate the file
// 	PreloadGenClear();
// 	PreloadGenStart();

// 	while ( true ) {

// 		if ( i >= len ) break;

// 		lev = 0;

// 		chunk = SubString( contents, i, i + s__File_PreloadLimit );
// 		Preload( "\" )\ncall BlzSetAbilityTooltip(" + I2S( s__File_AbilityList[ c ] ) + ", \"" + prefix + chunk + "\", " + I2S( lev ) + ")\n//" );
// 		i = i + s__File_PreloadLimit;
// 		c = c + 1;

// 	}

// 	Preload( "\" )\nendfunction\nfunction a takes nothing returns nothing\n //" );
// 	PreloadGenEnd( s__File_filename[ _this ] );

// 	return _this;

// };

// const s__File_readPreload = ( _this: number ): string | null => {

// 	let i = 0;
// 	let lev = 0;
// 	const original: Array<string> = [];
// 	let chunk = "";
// 	let output = "";

// 	while ( true ) {

// 		if ( i === s__File_AbilityCount ) break;
// 		original[ i ] = BlzGetAbilityTooltip( s__File_AbilityList[ i ], 0 );
// 		i = i + 1;

// 	}

// 	// Execute the preload file
// 	Preloader( s__File_filename[ _this ] );

// 	// Read the output
// 	i = 0;

// 	while ( true ) {

// 		if ( i === s__File_AbilityCount ) break;

// 		lev = 0;

// 		// Read from ability index 1 instead of 0 if
// 		// backwards compatability is enabled

// 		// Make sure the tooltip has changed
// 		chunk = BlzGetAbilityTooltip( s__File_AbilityList[ i ], lev );

// 		if ( chunk === original[ i ] ) {

// 			if ( i === 0 && output === "" )

// 				return null;

// 			return output;

// 		}

// 		// Check if the file is an empty string or null

// 		if ( i === 0 ) {

// 			if ( SubString( chunk, 0, 1 ) !== "-" )

// 				return null;

// 			chunk = SubString( chunk, 1, StringLength( chunk ) );

// 		}

// 		// Remove the prefix

// 		if ( i > 0 )

// 			chunk = SubString( chunk, 1, StringLength( chunk ) );

// 		// Restore the tooltip and append the chunk
// 		BlzSetAbilityTooltip( s__File_AbilityList[ i ], original[ i ], lev );

// 		output = output + chunk;

// 		i = i + 1;

// 	}

// 	return output;

// };

// const s__File_close = ( _this: number ): void => {

// 	if ( s__File_buffer[ _this ] !== null ) {

// 		s__File_write( _this, ( s__File_readPreload( _this ) || "" ) + s__File_buffer[ _this ] );
// 		s__File_buffer[ _this ] = null;

// 	}

// 	s__File_List[ _this ] = s__File_List[ 0 ];
// 	s__File_List[ 0 ] = _this;

// };

// const s__File_readEx = ( _this: number, close: boolean ): string | null => {

// 	let output = s__File_readPreload( _this );
// 	const buf = s__File_buffer[ _this ];

// 	if ( close )

// 		s__File_close( _this );

// 	if ( output === null )

// 		return buf;

// 	if ( buf !== null )

// 		output = output + buf;

// 	return output;

// };

// const s__File_readAndClose = ( _this: number ): string | null => s__File_readEx( _this, true );

// Implemented from module FileIO__FileInit:
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const s__File_FileIO__FileInit___onInit = (): void => {

	// We can't use a single ability with multiple levels because
	// tooltips return the first level's value if the value hasn't
	// been set. This way we don't need to edit any object editor data.
	s__File_AbilityList[ 0 ] = FourCC( "Amls" );
	s__File_AbilityList[ 1 ] = FourCC( "Aroc" );
	s__File_AbilityList[ 2 ] = FourCC( "Amic" );
	s__File_AbilityList[ 3 ] = FourCC( "Amil" );
	s__File_AbilityList[ 4 ] = FourCC( "Aclf" );
	s__File_AbilityList[ 5 ] = FourCC( "Acmg" );
	s__File_AbilityList[ 6 ] = FourCC( "Adef" );
	s__File_AbilityList[ 7 ] = FourCC( "Adis" );
	s__File_AbilityList[ 8 ] = FourCC( "Afbt" );
	s__File_AbilityList[ 9 ] = FourCC( "Afbk" );

	// Backwards compatability check

	// Read check
	// s__File_ReadEnabled = s__File_readAndClose( s__File_write( s__File_open( "FileTester.pld" ), "FileIO_" ) ) === "FileIO_";

};

// library FileIO ends
// library ScoutPhoenixUpgrade:

const ScoutPhoenixUpgrade__EnablePhoenix = ( u: unit ): void => {

	UnitAddAbilityBJ( s__ScoutPhoenixUpgrade__data_abilityId, u );
	BlzUnitHideAbility( u, s__ScoutPhoenixUpgrade__data_abilityId, true );

};

const ScoutPhoenixUpgrade__OnResearch = (): void => {

	if ( GetResearched() === s__ScoutPhoenixUpgrade__data_upgradeId )

		ScoutPhoenixUpgrade__EnablePhoenix( wolves[ GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) ) ] );

};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const ScoutPhoenixUpgrade__Init = (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_RESEARCH_FINISH );
	TriggerAddAction( t, ScoutPhoenixUpgrade__OnResearch );

};

const ScoutPhoenixUpgrade_onSpawn = ( u: unit ): void => {

	if ( GetPlayerTechResearched( GetOwningPlayer( u ), s__ScoutPhoenixUpgrade__data_upgradeId, true ) )

		ScoutPhoenixUpgrade__EnablePhoenix( u );

};

// library ScoutPhoenixUpgrade ends
// library Specialization:

const updateUnit = ( u: unit ): void => {

	const playerIndex = GetPlayerId( GetOwningPlayer( u ) );
	const specialization = Specialization__playerSpecializations[ playerIndex ];
	const level = Specialization__levels[ playerIndex ];
	let effectiveLevel: number;

	// Player hasn't picked one yet (they got another save)

	if ( specialization === null )

		return;

	if ( level > 25 )

		effectiveLevel = 25;

	else

		effectiveLevel = level;

	if ( effectiveLevel > 0 ) {

		if ( BlzGetUnitAbility( u, s__SpecializationStruct_passive[ specialization ] ) === null ) {

			UnitAddAbility( u, s__SpecializationStruct_passive[ specialization ] );
			UnitAddAbility( u, s__SpecializationStruct_active[ specialization ] );

			if ( specialization === s__data_hulk ) {

				BlzSetUnitMaxHP( u, BlzGetUnitMaxHP( u ) + effectiveLevel * 15 );
				SetUnitState( u, UNIT_STATE_LIFE, GetUnitState( u, UNIT_STATE_LIFE ) + effectiveLevel * 15 );

			}

		} else

		if ( specialization === s__data_hulk ) {

			BlzSetUnitMaxHP( u, BlzGetUnitMaxHP( u ) + 15 );
			SetUnitState( u, UNIT_STATE_LIFE, GetUnitState( u, UNIT_STATE_LIFE ) + 15 );

		}

		SetUnitAbilityLevel( u, s__SpecializationStruct_passive[ specialization ], effectiveLevel );
		SetUnitAbilityLevel( u, s__SpecializationStruct_active[ specialization ], effectiveLevel );

	}

	if ( specialization === s__data_attacker )

		SetPlayerTechResearched( GetOwningPlayer( u ), s__SpecializationStruct_upgrade[ specialization ], effectiveLevel );

};

const setSpecialization = (): void => {

	const playerId = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
	let i = 0;
	const spellId = GetSpellAbilityId();

	// Close and remove the spellbook
	ForceUICancelBJ( GetOwningPlayer( GetTriggerUnit() ) );
	UnitRemoveAbilityBJ( s__data_spellbook, GetTriggerUnit() );

	// Set specialization and update unit

	while ( true ) {

		if ( Specialization__specializations[ i ] === null ) break;

		if ( s__SpecializationStruct_learn[ Specialization__specializations[ i ] ] === spellId ) {

			Specialization__playerSpecializations[ playerId ] = Specialization__specializations[ i ];
			updateUnit( GetTriggerUnit() );
			if ( true ) break;

		}

		i = i + 1;

	}

};

const isSpecializationAbility = (): boolean => GetSpellAbilityId() === s__SpecializationStruct_learn[ s__data_flash ] || GetSpellAbilityId() === s__SpecializationStruct_learn[ s__data_engineer ] || GetSpellAbilityId() === s__SpecializationStruct_learn[ s__data_attacker ] || GetSpellAbilityId() === s__SpecializationStruct_learn[ s__data_hulk ];

const startConstruction = (): void => {

	const playerIndex = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
	const specialization = Specialization__playerSpecializations[ playerIndex ];
	const level = Specialization__levels[ playerIndex ];
	let effectiveLevel: number;

	if ( specialization === s__data_engineer ) {

		if ( level > 25 )

			effectiveLevel = 25;

		else

			effectiveLevel = level;

		BlzSetUnitMaxHP( GetTriggerUnit(), BlzGetUnitMaxHP( GetTriggerUnit() ) + 10 * effectiveLevel );

	}

};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const init = (): void => {

	let t = CreateTrigger();

	s__data_flash = s__SpecializationStruct__allocate();
	s__SpecializationStruct_learn[ s__data_flash ] = FourCC( "A007" );
	s__SpecializationStruct_passive[ s__data_flash ] = FourCC( "A00F" );
	s__SpecializationStruct_active[ s__data_flash ] = FourCC( "A00A" );
	Specialization__specializations[ 0 ] = s__data_flash;

	s__data_engineer = s__SpecializationStruct__allocate();
	s__SpecializationStruct_learn[ s__data_engineer ] = FourCC( "A008" );
	s__SpecializationStruct_passive[ s__data_engineer ] = FourCC( "A009" );
	s__SpecializationStruct_active[ s__data_engineer ] = FourCC( "A00G" );
	Specialization__specializations[ 1 ] = s__data_engineer;

	s__data_attacker = s__SpecializationStruct__allocate();
	s__SpecializationStruct_learn[ s__data_attacker ] = FourCC( "A00E" );
	s__SpecializationStruct_passive[ s__data_attacker ] = FourCC( "A00K" );
	s__SpecializationStruct_active[ s__data_attacker ] = FourCC( "A00J" );
	s__SpecializationStruct_upgrade[ s__data_attacker ] = FourCC( "R003" );
	Specialization__specializations[ 2 ] = s__data_attacker;

	s__data_hulk = s__SpecializationStruct__allocate();
	s__SpecializationStruct_learn[ s__data_hulk ] = FourCC( "A00C" );
	s__SpecializationStruct_passive[ s__data_hulk ] = FourCC( "A00L" );
	s__SpecializationStruct_active[ s__data_hulk ] = FourCC( "A00I" );
	Specialization__specializations[ 3 ] = s__data_hulk;

	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddCondition( t, Condition( isSpecializationAbility ) );
	TriggerAddAction( t, setSpecialization );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_START );
	TriggerAddAction( t, startConstruction );

};

const Specialization_onSpawn = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );

	if ( Specialization__levels[ i ] === null )

		Specialization__levels[ i ] = 0;

	if ( Specialization__levels[ i ] >= 1 && Specialization__playerSpecializations[ i ] === null && BlzGetUnitAbility( u, s__data_spellbook ) === null )

		UnitAddAbility( u, s__data_spellbook );

	else if ( Specialization__playerSpecializations[ i ] !== null )

		updateUnit( u );

	BlzSetUnitIntegerField( u, UNIT_IF_LEVEL, GetUnitLevel( u ) + Specialization__levels[ i ] );

};

const Specialization_onSave = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );

	if ( Specialization__levels[ i ] === null )

		Specialization__levels[ i ] = 0;

	Specialization__levels[ i ] = Specialization__levels[ i ] + 1;
	BlzSetUnitIntegerField( u, UNIT_IF_LEVEL, GetUnitLevel( u ) + 1 );

	Specialization_onSpawn( u );

};

const Specialization_onDeath = ( u: unit ): void => {

	Specialization__levels[ GetPlayerId( GetOwningPlayer( u ) ) ] = 0;

};

const Specialization_GetLevel = ( u: unit ): number => Specialization__levels[ GetPlayerId( GetOwningPlayer( u ) ) ];

// library Specialization ends

// // ***************************************************************************
// // *
// // *  Custom Script Code
// // *
// // ***************************************************************************

// const DisplayTimedText = ( duration: number, message: string ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		DisplayTimedTextToPlayer( Player( i ), 0, 0, duration, message );
// 		i = i + 1;

// 	}

// };

// // Ends the game, awarding wins/loses and other W3MMD data
// const endGame = ( winner: number ): void => {

// 	let i = 0;

// 	if ( gameEnded )

// 		return;

// 	gameEnded = true;
// 	TimerDialogDisplay( myTimerDialog, false );
// 	DisplayTimedText( 120, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
// 	// todo: this should be nullable
// 	TimerStart( myTimer, 15, false, () => { /* do nothing */ } );
// 	TimerDialogSetTitle( myTimerDialog, "Ending in..." );
// 	TimerDialogDisplay( myTimerDialog, true );

// 	if ( winner < 1 )

// 		while ( true ) {

// 			if ( i === 12 ) break;

// 			if ( IsPlayerInForce( Player( i ), sheepTeam ) ) {

// 				SetUnitInvulnerable( sheeps[ i ], true );
// 				BlzSetUnitBaseDamage( sheeps[ i ], 4999, 0 );
// 				SetUnitMoveSpeed( sheeps[ i ], 522 );
// 				BlzSetUnitRealField( sheeps[ i ], UNIT_RF_SIGHT_RADIUS, 5000 );

// 			}

// 			i = i + 1;

// 		}

// 	TriggerSleepAction( 15 );

// 	DisplayTimedText( 120, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

// 			if ( winner < 1 ) {

// 				CustomVictoryBJ( Player( i ), true, true );

// 			} else {

// 				CustomDefeatBJ( Player( i ), defeatString );

// 			}

// 		else

// 		if ( winner > 1 )

// 			CustomVictoryBJ( Player( i ), true, true );

// 		else

// 			CustomDefeatBJ( Player( i ), defeatString );

// 		i = i + 1;

// 	}

// };

// // Duh
// const TriggerRegisterPlayerEventAll = ( t: trigger, e: playerevent ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerEvent( t, Player( i ), e );
// 		i = i + 1;

// 	}

// };

// // Duh
// const TriggerRegisterPlayerUnitEventAll = ( t: trigger, p: playerunitevent, b: boolexpr ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerUnitEvent( t, Player( i ), p, b );
// 		i = i + 1;

// 	}

// };

// // Duh
// const TriggerRegisterPlayerChatEventAll = ( t: trigger, s: string, match: boolean ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerChatEvent( t, Player( i ), s, match );
// 		i = i + 1;

// 	}

// };

// // Splits a string into arguments around string c. If bb true, first argument is ignored.
// const Split = ( s: string, c: string, bb: boolean ): void => {

// 	let i = 0;
// 	let n = 0;

// 	while ( true ) {

// 		if ( i === myArgCount ) break;
// 		myArg[ i ] = null;
// 		i = i + 1;

// 	}

// 	i = 0;

// 	if ( bb )

// 		while ( true ) {

// 			if ( SubString( s, 0, 1 ) === c ) break;
// 			s = SubString( s, 1, StringLength( s ) );

// 		}

// 	s = SubString( s, 1, StringLength( s ) );

// 	while ( true ) {

// 		if ( s === null ) break;
// 		i = 0;

// 		while ( true ) {

// 			if ( SubString( s, i, i + 1 ) === c || SubString( s, i, i + 1 ) === null ) break;
// 			i = i + 1;

// 		}

// 		myArg[ n ] = SubString( s, 0, i );
// 		s = SubString( s, i + 1, StringLength( s ) );
// 		n = n + 1;

// 	}

// 	myArgCount = n;

// };

// // processed :type splitarray extends string array[4]
// const Split2 = ( str: string, separator: string ): number => {

// 	let i = 0;
// 	let n = 0;
// 	let last = 0;
// 	const separatorLength = StringLength( separator );
// 	const strLength = StringLength( str );
// 	const targetLength = strLength - separatorLength;
// 	const substrings = s__splitarray__allocate();

// 	while ( true ) {

// 		if ( i >= targetLength || n >= 4 ) break;

// 		if ( SubString( str, i, i + separatorLength ) === separator ) {

// 			s__splitarray[ substrings + n ] = SubString( str, last, i );
// 			n = n + 1;
// 			i = i + separatorLength;
// 			last = i;

// 		}

// 		i = i + 1;

// 	}

// 	if ( last < strLength && n < 4 )

// 		s__splitarray[ substrings + n ] = SubString( str, last, strLength );

// 	return substrings;

// };

// const SmallText = ( amount: number, u: unit, cc: number, x: number, y: number ): void => {

// 	let tt: texttag;

// 	if ( GetUnitAbilityLevel( u, FourCC( "Alv1" ) ) <= 0 && IsVisibleToPlayer( GetUnitX( u ), GetUnitY( u ), GetLocalPlayer() ) ) {

// 		tt = CreateTextTag();
// 		SetTextTagPermanent( tt, false );
// 		SetTextTagPos( tt, GetUnitX( u ) + x, GetUnitY( u ) + y, 25 );
// 		SetTextTagText( tt, color[ cc ] + "+" + I2S( amount ), 0.0276 );
// 		SetTextTagColor( tt, 217, 217, 25, 0 );
// 		SetTextTagFadepoint( tt, 0 );
// 		SetTextTagVelocity( tt, 0, 0.027734375 );
// 		SetTextTagLifespan( tt, 3 );

// 	}

// };

// const isHere = (): boolean => GetPlayerSlotState( GetFilterPlayer() ) === PLAYER_SLOT_STATE_PLAYING;

// const countHereEnum = (): void => {

// 	if ( GetPlayerSlotState( GetEnumPlayer() ) === PLAYER_SLOT_STATE_PLAYING )

// 		someInteger = someInteger + 1;

// };

// // Counts players in force that are here
// const countHere = ( f: force ): number => {

// 	someInteger = 0;
// 	ForForce( f, countHereEnum );
// 	return someInteger;

// };

// const countHereRealEnum = (): void => {

// 	if ( GetPlayerSlotState( GetEnumPlayer() ) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController( GetEnumPlayer() ) === MAP_CONTROL_USER )

// 		someInteger = someInteger + 1;

// };

// // Counts players in force that are here
// const countHereReal = ( f: force ): number => {

// 	someInteger = 0;
// 	ForForce( f, countHereRealEnum );
// 	return someInteger;

// };

// // Grabs the player's main unit
// const mainUnit = ( p: player ): unit => {

// 	if ( GetPlayerId( p ) > 6 )

// 		return wolves[ GetPlayerId( p ) ];

// 	else

// 	if ( IsPlayerInForce( p, sheepTeam ) )

// 		return sheeps[ GetPlayerId( p ) ];

// 	else

// 		return wisps[ GetPlayerId( p ) ];

// };

// // Returns the index in which string part is found in string whole
// const InStr = ( whole: string, part: string ): number => {

// 	let index = 0;

// 	while ( true ) {

// 		if ( StringLength( whole ) - index < StringLength( part ) ) break;

// 		if ( SubString( whole, index, StringLength( part ) + index ) === part )

// 			return index;

// 		index = index + 1;

// 	}

// 	return - 1;

// };

// const updateMultiboardRow = ( index: number, value1: string | null, icon: string | null, value2: string | null ): void => {

// 	let mbi = MultiboardGetItem( board, index, 0 );
// 	if ( value1 ) MultiboardSetItemValue( mbi, value1 );
// 	MultiboardSetItemWidth( mbi, 0.1 );
// 	MultiboardSetItemStyle( mbi, true, false );
// 	MultiboardReleaseItem( mbi );

// 	mbi = MultiboardGetItem( board, index, 1 );
// 	if ( value2 ) MultiboardSetItemValue( mbi, value2 );

// 	if ( icon === null )
// 		MultiboardSetItemStyle( mbi, true, false );
// 	else
// 		MultiboardSetItemIcon( mbi, icon );

// 	MultiboardReleaseItem( mbi );

// };

// const getSheepIcon = ( i: number ): string => {

// 	if ( saveskills[ i ] >= 25 )

// 		return "ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp";

// 	else if ( saveskills[ i ] >= 15 )

// 		return "ReplaceableTextures\\CommandButtons\\BTNDruidOfTheClaw.blp";

// 	else if ( saveskills[ i ] >= 10 )

// 		return "ReplaceableTextures\\CommandButtons\\BTNSheep.blp";

// 	return "ReplaceableTextures\\CommandButtons\\BTNPolymorph.blp";

// };

// const getWolfIcon = ( i: number ): string => {

// 	if ( saveskills[ i ] >= 25 )

// 		return "ReplaceableTextures\\CommandButtons\\BTNDoomGuard.blp";

// 	else if ( saveskills[ i ] >= 10 )

// 		return "ReplaceableTextures\\CommandButtons\\BTNDireWolf.blp";

// 	return "ReplaceableTextures\\CommandButtons\\BTNTimberWolf.blp";

// };

// const reloadMultiboard = (): void => {

// 	let i = 0;
// 	let index = 0;
// 	MultiboardDisplay( board, false );
// 	DestroyMultiboard( board );

// 	board = CreateMultiboard();
// 	MultiboardSetTitleText( board, "Ultimate Sheep Tag Fixus" );
// 	MultiboardSetColumnCount( board, 2 );
// 	MultiboardSetRowCount( board, 5 + CountPlayersInForceBJ( sheepTeam ) + CountPlayersInForceBJ( wolfTeam ) + CountPlayersInForceBJ( wispTeam ) );

// 	// sheep
// 	updateMultiboardRow( index, color[ 12 ] + "Sheep: " + I2S( countHere( sheepTeam ) ), null, "Saves" );
// 	index = index + 1;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) {

// 			updateMultiboardRow( index, color[ i ] + GetPlayerName( Player( i ) ), getSheepIcon( i ), I2S( saveskills[ i ] ) );
// 			index = index + 1;

// 		}

// 		i = i + 1;

// 	}

// 	updateMultiboardRow( index, null, null, null );
// 	index = index + 1;

// 	// Wisps
// 	updateMultiboardRow( index, color[ 12 ] + "Wisps: " + I2S( countHere( wispTeam ) ), null, "Saves" );
// 	index = index + 1;
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), wispTeam ) ) {

// 			updateMultiboardRow( index, color[ i ] + GetPlayerName( Player( i ) ), "ReplaceableTextures\\CommandButtons\\BTNWisp.blp", I2S( saveskills[ i ] ) );
// 			index = index + 1;

// 		}

// 		i = i + 1;

// 	}

// 	updateMultiboardRow( index, null, null, null );
// 	index = index + 1;

// 	// Wolves
// 	updateMultiboardRow( index, color[ 13 ] + "Wolves: " + I2S( countHere( wolfTeam ) ), null, "Kills" );
// 	index = index + 1;
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), wolfTeam ) ) {

// 			updateMultiboardRow( index, color[ i ] + GetPlayerName( Player( i ) ), getWolfIcon( i ), I2S( saveskills[ i ] ) );
// 			index = index + 1;

// 		}

// 		i = i + 1;

// 	}

// 	MultiboardDisplay( board, true );

// };

// // ***************************************************************************
// // *
// // *  Triggers
// // *
// // ***************************************************************************

// // ===========================================================================
// // Trigger: coreInit
// // ===========================================================================

// const Trig_coreInitDelay_Actions = (): void => {

// 	let i: number;
// 	let q: quest;
// 	let qi: questitem;
// 	q = CreateQuest();
// 	QuestSetTitle( q, "Ultimate Sheep Tag Fixus" );
// 	QuestSetDescription( q, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
// 	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNAcorn.blp" );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Fixus by |CFF959697Chakra|r" );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Ultimate Sheep Tag using |CFF959697Chakra|r's Sheep Tag Template file." );

// 	q = CreateQuest();
// 	QuestSetTitle( q, "Sheep" );
// 	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNSheep.blp" );
// 	QuestSetRequired( q, false );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Either last 25 minutes or until all wolves leave to win." );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Build farms to survive." );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Save dead sheep to last." );

// 	q = CreateQuest();
// 	QuestSetTitle( q, "Wolves" );
// 	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNRaider.blp" );
// 	QuestSetRequired( q, false );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Either kill all sheep or wait until all sheep leave to win." );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Buy items to kill sheep." );
// 	qi = QuestCreateItem( q );
// 	QuestItemSetDescription( qi, "Camp the middle to avoid killed sheep to be revived." );

// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		DisplayTimedTextToPlayer( Player( i ), 0, 0, 3, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
// 		i = i + 1;

// 	}

// 	if ( countHere( wolfTeam ) === 0 || countHere( sheepTeam ) === 0 )

// 		goldFactor = 1000;

// 	// todo: should be nulalble
// 	TimerStart( myTimer, 3, false, () => { /* do nothing */ } );
// 	TimerDialogSetTitle( myTimerDialog, "Starting in..." );
// 	TimerDialogDisplay( myTimerDialog, true );
// 	board = CreateMultiboard();

// };

// const RegisterItem = ( name: string, gold: number, lumber: number, id: number ): number => {

// 	// Can't directly get gold/lumber cost off an item, so... :(
// 	itemSpecs[ itemSpecsLength ] = s__itemspec__allocate();
// 	s__itemspec_name[ itemSpecs[ itemSpecsLength ] ] = name;
// 	s__itemspec_gold[ itemSpecs[ itemSpecsLength ] ] = gold;
// 	s__itemspec_lumber[ itemSpecs[ itemSpecsLength ] ] = lumber;
// 	s__itemspec_id[ itemSpecs[ itemSpecsLength ] ] = id;
// 	SaveInteger( itemSpecsNames, StringHash( name ), 0, itemSpecsLength );
// 	SaveInteger( itemSpecsIds, id, 0, itemSpecsLength );
// 	itemSpecsLength = itemSpecsLength + 1;
// 	return itemSpecs[ itemSpecsLength - 1 ];

// };

// // ===========================================================================
// const InitTrig_coreInit = (): void => {

// 	const t = CreateTrigger();
// 	let i: number;
// 	WORLD_BOUNDS = GetWorldBounds();
// 	SetMapFlag( MAP_SHARED_ADVANCED_CONTROL, true );
// 	TriggerRegisterTimerEvent( t, 0.01, false );
// 	TriggerAddAction( t, Trig_coreInitDelay_Actions );
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		saveskills[ i ] = 0;
// 		dollyClick[ i ] = 0;
// 		gemActivated[ i ] = false;
// 		i = i + 1;

// 	}

// 	RegisterItem( "supergolem", 350, 0, FourCC( "I001" ) );
// 	RegisterItem( "stalker", 100, 0, FourCC( "fgfh" ) );
// 	RegisterItem( "golem", 100, 0, FourCC( "fgrg" ) );
// 	RegisterItem( "speed", 25, 0, FourCC( "pspd" ) );
// 	RegisterItem( "invis", 35, 0, FourCC( "pinv" ) );
// 	RegisterItem( "mana", 20, 0, FourCC( "pman" ) );
// 	RegisterItem( "cheese", 0, 2, FourCC( "I003" ) );
// 	RegisterItem( "50", 350, 0, FourCC( "I002" ) );
// 	RegisterItem( "sabre", 300, 0, FourCC( "I000" ) );
// 	RegisterItem( "21", 126, 0, FourCC( "ratf" ) );
// 	RegisterItem( "12", 60, 0, FourCC( "ratc" ) );
// 	RegisterItem( "dagger", 67, 0, FourCC( "mcou" ) );
// 	RegisterItem( "cloak", 250, 0, FourCC( "clfm" ) );
// 	RegisterItem( "neck", 150, 0, FourCC( "nspi" ) );
// 	RegisterItem( "boots", 70, 0, FourCC( "bspd" ) );
// 	RegisterItem( "gem", 125, 0, FourCC( "gemt" ) );
// 	RegisterItem( "orb", 300, 0, FourCC( "ofir" ) );
// 	RegisterItem( "scope", 30, 0, FourCC( "tels" ) );
// 	RegisterItem( "invul", 25, 0, FourCC( "pnvu" ) );
// 	RegisterItem( "6", 18, 0, FourCC( "rat6" ) );
// 	RegisterItem( "gloves", 80, 0, FourCC( "gcel" ) );
// 	RegisterItem( "9", 36, 0, FourCC( "rat9" ) );
// 	RegisterItem( "shadow", 100, 0, FourCC( "clsd" ) );
// 	RegisterItem( "siege", 150, 0, FourCC( "tfar" ) );
// 	RegisterItem( "dragon", 400, 2, FourCC( "I004" ) );
// 	RegisterItem( "mines", 150, 0, FourCC( "gobm" ) );
// 	RegisterItem( "negation", 50, 0, FourCC( "I005" ) );
// 	RegisterItem( "power", 200, 0, FourCC( "tkno" ) );
// 	RegisterItem( "health", 50, 0, FourCC( "hlst" ) );
// 	color[ 0 ] = "|CFFFF0303";
// 	color[ 1 ] = "|CFF0042FF";
// 	color[ 2 ] = "|CFF1CE6B9";
// 	color[ 3 ] = "|CFF540081";
// 	color[ 4 ] = "|CFFFFFF01";
// 	color[ 5 ] = "|CFFFE8A0E";
// 	color[ 6 ] = "|CFF20C000";
// 	color[ 7 ] = "|CFFE55BB0";
// 	color[ 8 ] = "|CFF959697";
// 	color[ 9 ] = "|CFF7EBFF1";
// 	color[ 10 ] = "|CFF106246";
// 	color[ 11 ] = "|CFF4E2A04";
// 	color[ 12 ] = "|CFF3F81F8";
// 	color[ 13 ] = "|CFFC00040";
// 	color[ 14 ] = "|CFFD9D919";
// 	ForceEnumAllies( sheepTeam, Player( 0 ), Condition( isHere ) );
// 	ForceEnumAllies( wolfTeam, Player( 11 ), Condition( isHere ) );
// 	AbilityRangePreload( FourCC( "A001" ), FourCC( "A00P" ) );

// };

// // ===========================================================================
// // Trigger: coreGame
// // ===========================================================================
// // TESH.scrollpos=41
// // TESH.alwaysfold=0
// const Trig_coreGame_Actions = (): void => {

// 	let i: number;
// 	let n: number;

// 	if ( gameState === "init" ) {

// 		TimerDialogDisplay( myTimerDialog, false );
// 		i = 0;

// 		while ( true ) {

// 			if ( i === 12 ) break;

// 			if ( IsPlayerInForce( Player( i ), sheepTeam ) && GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING ) {

// 				sheeps[ i ] = CreateUnit( Player( i ), s__sheep_type, GetStartLocationX( i ), GetStartLocationY( i ), 270 );

// 				if ( GetLocalPlayer() === Player( i ) ) {

// 					ClearSelection();
// 					SelectUnit( sheeps[ i ], true );
// 					PanCameraToTimed( GetStartLocationX( i ), GetStartLocationY( i ), 0 );

// 				}

// 				if ( InStr( GetPlayerName( Player( i ) ), "Grim" ) >= 0 ) {

// 					AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", sheeps[ i ], "origin" );
// 					AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", sheeps[ i ], "origin" );

// 				}

// 				if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER ) {

// 					n = 0;

// 					while ( true ) {

// 						if ( n === 12 ) break;

// 						if ( IsPlayerInForce( Player( n ), sheepTeam ) ) {

// 							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
// 							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_CONTROL, true );

// 						}

// 						n = n + 1;

// 					}

// 				}

// 			}

// 			i = i + 1;

// 		}

// 		gameState = "start";
// 		// todo: should be nullable
// 		TimerStart( myTimer, 20, false, () => { /* do nothing */ } );
// 		TimerDialogSetTitle( myTimerDialog, "Wolves in..." );
// 		TimerDialogDisplay( myTimerDialog, true );
// 		reloadMultiboard();

// 	} else if ( gameState === "start" ) {

// 		TimerDialogDisplay( myTimerDialog, false );
// 		i = 0;

// 		while ( true ) {

// 			if ( i === 12 ) break;

// 			if ( IsPlayerInForce( Player( i ), wolfTeam ) && GetPlayerSlotState( Player( i ) ) !== PLAYER_SLOT_STATE_EMPTY ) {

// 				wolves[ i ] = CreateUnit( Player( i ), s__wolf_type, GetStartLocationX( i ), GetStartLocationY( i ), 270 );
// 				UnitAddItem( wolves[ i ], CreateItem( s__wolf_itemGlobal, GetStartLocationX( i ), GetStartLocationY( i ) ) );

// 				if ( countHere( wolfTeam ) === 1 )

// 					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item1, GetStartLocationX( i ), GetStartLocationY( i ) ) );

// 				else if ( countHere( wolfTeam ) === 2 )

// 					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item2, GetStartLocationX( i ), GetStartLocationY( i ) ) );

// 				else if ( countHere( wolfTeam ) === 3 )

// 					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item3, GetStartLocationX( i ), GetStartLocationY( i ) ) );

// 				else if ( countHere( wolfTeam ) === 4 )

// 					UnitAddItem( wolves[ i ], CreateItem( s__wolf_item4, GetStartLocationX( i ), GetStartLocationY( i ) ) );

// 				if ( InStr( GetPlayerName( Player( i ) ), "Grim" ) >= 0 ) {

// 					AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", wolves[ i ], "origin" );
// 					AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", wolves[ i ], "head" );

// 				}

// 				if ( GetLocalPlayer() === Player( i ) ) {

// 					ClearSelection();
// 					SelectUnit( wolves[ i ], true );
// 					PanCameraToTimed( - 256, - 1024, 0 );

// 				}

// 				if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER ) {

// 					n = 0;

// 					while ( true ) {

// 						if ( n === 12 ) break;

// 						if ( IsPlayerInForce( Player( n ), wolfTeam ) ) {

// 							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_ADVANCED_CONTROL, true );
// 							SetPlayerAlliance( Player( i ), Player( n ), ALLIANCE_SHARED_CONTROL, true );

// 						}

// 						n = n + 1;

// 					}

// 				}

// 			}

// 			i = i + 1;

// 		}

// 		gameState = "play";
// 		// should be nullable
// 		TimerStart( myTimer, 1500, false, () => { /* do nothing */ } );
// 		TimerDialogSetTitle( myTimerDialog, "Sheep win in..." );
// 		TimerDialogDisplay( myTimerDialog, true );

// 	} else if ( gameState === "play" )

// 		endGame( 0 );

// };

// // ===========================================================================
// const InitTrig_coreGame = (): void => {

// 	gg_trg_coreGame = CreateTrigger();
// 	TriggerRegisterTimerExpireEvent( gg_trg_coreGame, myTimer );
// 	TriggerAddAction( gg_trg_coreGame, Trig_coreGame_Actions );

// };

// // ===========================================================================
// // Trigger: changelog
// // ===========================================================================

// // ===========================================================================
// // Trigger: miscClean
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_miscClean_Actions = (): void => {

// 	if ( IsUnitType( GetTriggerUnit(), UNIT_TYPE_HERO ) === false ) {

// 		TriggerSleepAction( 5 );
// 		RemoveUnit( GetTriggerUnit() );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscClean = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_miscClean_Actions );

// };

// // ===========================================================================
// // Trigger: miscGoldTick
// // ===========================================================================
// const filterActiveUsers = (): boolean => GetPlayerController( GetFilterPlayer() ) !== MAP_CONTROL_COMPUTER && GetPlayerSlotState( GetFilterPlayer() ) !== PLAYER_SLOT_STATE_LEFT;

// const Trig_miscGoldTick_Actions = (): void => {

// 	let i = 0;
// 	let n: number;
// 	let t: number;
// 	let f: force;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor );

// 		else {

// 			t = countHereReal( wolfTeam );

// 			if ( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) > 0 && t > 0 && ModuloInteger( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ), t ) === 0 && ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_LEFT ) ) {

// 				n = 0;
// 				f = CreateForce();
// 				ForceEnumAllies( f, Player( i ), Condition( filterActiveUsers ) );

// 				while ( true ) {

// 					if ( n === 12 ) break;

// 					if ( IsPlayerInForce( Player( n ), f ) )

// 						SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) / t );

// 					n = n + 1;

// 				}

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, 0 );
// 				DestroyForce( f );

// 			}

// 		}

// 		i = i + 1;

// 	}

// };

// const Trig_miscSavingTick_Actions = (): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

// 			if ( saveskills[ i ] >= 25 ) {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 8 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

// 			} else {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

// 			}

// 		else

// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor );

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_miscGoldTick = (): void => {

// 	let t = CreateTrigger();
// 	TriggerRegisterTimerEvent( t, 2, true );
// 	TriggerAddAction( t, Trig_miscGoldTick_Actions );
// 	t = CreateTrigger();
// 	TriggerRegisterTimerEvent( t, 4, true );
// 	TriggerAddAction( t, Trig_miscSavingTick_Actions );

// };

// // ===========================================================================
// // Trigger: miscZoom
// // ===========================================================================

// const Trig_miscZoom_Actions = (): void => {

// 	let zoom: number;
// 	const playerId = GetPlayerId( GetTriggerPlayer() );

// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "zoom" && myArg[ 0 ] !== "z" )

// 		return;

// 	zoom = S2R( myArg[ 1 ] || "" );

// 	if ( zoom === 0 )

// 		if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) {

// 			zoom = wolfZoom[ playerId ];

// 		} else {

// 			zoom = sheepZoom[ playerId ];

// 		}

// 	if ( zoom <= 0 )

// 		zoom = 1650;

// 	while ( true ) {

// 		if ( zoom > 400 ) break;
// 		zoom = zoom * 10;

// 	}

// 	if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		wolfZoom[ playerId ] = zoom;

// 	else

// 		sheepZoom[ playerId ] = zoom;

// 	if ( GetLocalPlayer() === GetTriggerPlayer() ) {

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );
// 		s__File_close( s__File_write( s__File_open( "fixus/zooms.txt" ), R2S( sheepZoom[ playerId ] ) + " " + R2S( wolfZoom[ playerId ] ) ) );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscZoom = (): void => {

// 	const t = CreateTrigger();
// 	const zooms = Split2( s__File_readAndClose( s__File_open( "fixus/zooms.txt" ) ) || "", " " );

// 	TriggerRegisterPlayerChatEventAll( t, "-zoom", false );
// 	TriggerRegisterPlayerChatEventAll( t, "-z", false );
// 	TriggerAddAction( t, Trig_miscZoom_Actions );

// 	sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms ] );

// 	if ( sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

// 		sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

// 	wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms + 1 ] );

// 	if ( wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

// 		wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

// 	if ( IsPlayerInForce( GetLocalPlayer(), wolfTeam ) )

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, wolfZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

// 	else

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, sheepZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

// };

// // ===========================================================================
// // Trigger: miscAngle
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_miscAngle_Actions = (): void => {

// 	Split( GetEventPlayerChatString(), " ", true );

// 	if ( myArgCount === 1 && GetLocalPlayer() === GetTriggerPlayer() )

// 		SetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK, S2R( myArg[ 0 ] || "" ), 0 );

// };

// // ===========================================================================
// const InitTrig_miscAngle = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-angle ", false );
// 	TriggerRegisterPlayerChatEventAll( t, "-a ", false );
// 	TriggerAddAction( t, Trig_miscAngle_Actions );

// };

// // ===========================================================================
// // Trigger: miscGold
// // ===========================================================================

// const miscGold_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const senderId: number = GetPlayerId( GetTriggerPlayer() );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );
// 	let gold: number;

// 	if ( myArg[ 0 ] !== "g" )

// 		return;

// 	if ( receiverId >= 0 && receiverId <= 11 && IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING && GetTriggerPlayer() !== receiver ) {

// 		gold = S2I( myArg[ 2 ] || "" );

// 		if ( gold === 0 )

// 			gold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

// 		if ( gold === 0 )

// 			return;

// 		DisplayTextToPlayer( receiver, 0, 0, color[ senderId ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
// 		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, I2S( gold ) + " gold given to " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );
// 		SetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD ) + gold );
// 		SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - gold );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscGold = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-g ", false );
// 	TriggerAddAction( t, miscGold_Actions );

// };

// // ===========================================================================
// // Trigger: miscControl
// // ===========================================================================

// const Trig_miscControl_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );

// 	if ( myArg[ 0 ] !== "c" || receiverId < 0 || receiverId > 11 || ! ( IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING ) )

// 		return;

// 	// Grant control
// 	SetPlayerAllianceStateBJ( GetTriggerPlayer(), receiver, bj_ALLIANCE_ALLIED_ADVUNITS );
// 	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control given to " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );

// };

// // ===========================================================================
// const InitTrig_miscControl = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-c ", false );
// 	TriggerAddAction( t, Trig_miscControl_Actions );

// };

// // ===========================================================================
// // Trigger: miscUncontrol
// // ===========================================================================

// const Trig_miscUncontrol_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );

// 	if ( myArg[ 0 ] !== "uc" || receiverId < 0 || receiverId > 11 || ! ( IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING ) )

// 		return;

// 	// Remove control
// 	SetPlayerAllianceStateBJ( GetTriggerPlayer(), receiver, bj_ALLIANCE_ALLIED_VISION );
// 	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control taken from " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );

// };

// // ===========================================================================
// const InitTrig_miscUncontrol = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-uc ", false );
// 	TriggerAddAction( t, Trig_miscUncontrol_Actions );

// };

// // ===========================================================================
// // Trigger: miscLeaves
// // ===========================================================================

// const IsSameTeam = ( a: player, b: player ): boolean => IsPlayerInForce( a, wolfTeam ) && IsPlayerInForce( b, wolfTeam ) || ! IsPlayerInForce( a, wolfTeam ) && ! IsPlayerInForce( b, wolfTeam );

// const IsPlayerHere = ( checkPlayer: player ): boolean => GetPlayerSlotState( checkPlayer ) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController( checkPlayer ) === MAP_CONTROL_USER;

// const Trig_miscLeaves_Actions = (): void => {

// 	let i = 0;
// 	const gold: number = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) / i;
// 	const f = CreateForce();

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsSameTeam( GetTriggerPlayer(), Player( i ) ) && IsPlayerHere( Player( i ) ) )

// 			ForceAddPlayer( f, Player( i ) );

// 		i = i + 1;

// 	}

// 	// Divy out resources
// 	i = countHere( f );

// 	if ( i > 1 )

// 		i = i - 1;

// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), f ) ) {

// 			SetPlayerAllianceStateBJ( GetTriggerPlayer(), Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );
// 			DisplayTextToPlayer( Player( i ), 0, 0, color[ GetPlayerId( GetTriggerPlayer() ) ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + gold );

// 		}

// 		i = i + 1;

// 	}

// 	SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, 0 );
// 	DestroyForce( f );

// 	// Update name
// 	SetPlayerName( GetTriggerPlayer(), "|r" + GetPlayerName( GetTriggerPlayer() ) );
// 	reloadMultiboard();

// 	// Remove main unit if sheep or wisp

// 	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) || IsPlayerInForce( GetTriggerPlayer(), wispTeam ) )

// 		RemoveUnit( mainUnit( GetTriggerPlayer() ) );

// 	// End game if last

// 	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) && countHere( sheepTeam ) === 1 )

// 		endGame( 2 );

// 	else if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) && countHere( wolfTeam ) === 1 )

// 		endGame( 0 );

// };

// // ===========================================================================
// const InitTrig_miscLeaves = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
// 	TriggerAddAction( t, Trig_miscLeaves_Actions );

// };

// // ===========================================================================
// // Trigger: miscFace
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const miscFace_Actions = (): void => {

// 	const g = CreateGroup();
// 	let u: unit;
// 	Split( GetEventPlayerChatString(), " ", true );
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), null );

// 	while ( true ) {

// 		u = FirstOfGroup( g );
// 		if ( u === null ) break;

// 		if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "+" )

// 			SetUnitFacing( u, GetUnitFacing( u ) + S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

// 		else if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "-" )

// 			SetUnitFacing( u, GetUnitFacing( u ) - S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

// 		else

// 			SetUnitFacing( u, S2R( myArg[ 0 ] || "" ) );

// 		GroupRemoveUnit( g, u );

// 	}

// 	DestroyGroup( g );

// };

// // ===========================================================================
// const InitTrig_miscFace = (): void => {

// 	gg_trg_miscFace = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( gg_trg_miscFace, "-face ", false );
// 	TriggerAddAction( gg_trg_miscFace, miscFace_Actions );

// };

// // ===========================================================================
// // Trigger: miscFriendlyAttack
// // ===========================================================================

// const miscFriendlyAttack_Actions = (): void => {

// 	const attacked = GetTriggerUnit();

// 	if ( IsUnitAlly( attacked, GetOwningPlayer( GetAttacker() ) ) && GetUnitTypeId( attacked ) !== s__wisp_type && IsUnitType( attacked, UNIT_TYPE_STRUCTURE ) )

// 		KillUnit( attacked );

// };

// // ===========================================================================
// const InitTrig_miscFriendlyAttack = (): void => {

// 	gg_trg_miscFriendlyAttack = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscFriendlyAttack, EVENT_PLAYER_UNIT_ATTACKED );
// 	TriggerAddAction( gg_trg_miscFriendlyAttack, miscFriendlyAttack_Actions );

// };

// // ===========================================================================
// // Trigger: miscKillReturn
// // ===========================================================================

// const Trig_miscKillReturn_Actions = (): void => {

// 	const gold = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) * goldFactor;
// 	const xp = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE ) * goldFactor;

// 	if ( GetKillingUnit() !== null && IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetTriggerUnit() ) ) === false ) {

// 		if ( gold > 0 ) {

// 			SetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD ) + gold );
// 			SmallText( gold, GetTriggerUnit(), 14, 0, 0 );

// 		}

// 		if ( xp > 0 ) {

// 			SetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ), GetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ) ) + xp, true );
// 			SmallText( xp, GetTriggerUnit(), 3, 16, - 32 );

// 		}

// 	}

// };

// // ===========================================================================
// const InitTrig_miscKillReturn = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_miscKillReturn_Actions );

// };

// // ===========================================================================
// // Trigger: miscSmartSave
// // ===========================================================================

// const Trig_miscSmartSave_Actions = (): void => {

// 	const attacked = GetOrderTargetUnit();

// 	if ( OrderId2StringBJ( GetIssuedOrderId() ) === "smart" && IsUnitAlly( GetTriggerUnit(), GetOwningPlayer( attacked ) ) && GetUnitTypeId( attacked ) === s__wisp_type )

// 		IssueTargetOrder( GetTriggerUnit(), "attack", attacked );

// };

// // ===========================================================================
// const InitTrig_miscSmartSave = (): void => {

// 	gg_trg_miscSmartSave = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscSmartSave, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER );
// 	TriggerAddAction( gg_trg_miscSmartSave, Trig_miscSmartSave_Actions );

// };

// // ===========================================================================
// // Trigger: miscFiveMinuteAction
// // ===========================================================================

// const FilterDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__misc_dolly;

// const increaseMovementSpeed = (): void => {

// 	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

// 	const g = CreateGroup();
// 	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( FilterDolly ) );
// 	const dolly = GroupPickRandomUnit( g );
// 	DestroyGroup( g );

// 	if ( dolly === null )

// 		return;

// 	UnitAddAbility( dolly, s__misc_dollySpeedAura );

// };

// const Trig_miscFiveMinuteAction_Actions = (): void => {

// 	const rand = GetRandomReal( 0, 1 );

// 	if ( rand < 0.5 ) {

// 		DisplayTimedText( 15, "Five minutes remaining! All income is doubled!" );
// 		goldFactor = goldFactor * 2;

// 	} else

// 		increaseMovementSpeed();

// };

// // ===========================================================================
// const InitTrig_miscFiveMinuteAction = (): void => {

// 	gg_trg_miscFiveMinuteAction = CreateTrigger();
// 	// 3 (sheep delay) + 20 (shepherd delay) + 1200 (20 minutes)
// 	TriggerRegisterTimerEventSingle( gg_trg_miscFiveMinuteAction, 1223 );
// 	TriggerAddAction( gg_trg_miscFiveMinuteAction, Trig_miscFiveMinuteAction_Actions );

// };

// // ===========================================================================
// // Trigger: miscDollyMove
// // ===========================================================================
// const Trig_miscDollyMove_Conditions = (): boolean => {

// 	if ( ! ( GetUnitTypeId( GetTriggerUnit() ) === FourCC( "nshf" ) ) )

// 		return false;

// 	return true;

// };

// const Trig_miscDollyMove_Actions = (): void => {

// 	IssueImmediateOrderBJ( GetTriggerUnit(), "stop" );

// };

// // ===========================================================================
// const InitTrig_miscDollyMove = (): void => {

// 	gg_trg_miscDollyMove = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscDollyMove, EVENT_PLAYER_UNIT_SELL_ITEM );
// 	TriggerAddCondition( gg_trg_miscDollyMove, Condition( Trig_miscDollyMove_Conditions ) );
// 	TriggerAddAction( gg_trg_miscDollyMove, Trig_miscDollyMove_Actions );

// };

// // ===========================================================================
// // Trigger: miscPreload
// // ===========================================================================

// // ===========================================================================
// // Trigger: miscFileIO
// // ===========================================================================

// // ===========================================================================
// // Trigger: sheepFarmSelfDestruct
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_sheepFarmSelfDestruct_Actions = (): void => {

// 	KillUnit( GetTriggerUnit() );

// };

// // ===========================================================================
// const InitTrig_sheepFarmSelfDestruct = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_TRAIN_START );
// 	TriggerAddAction( t, Trig_sheepFarmSelfDestruct_Actions );

// };

// // ===========================================================================
// // Trigger: sheepSaveDeath
// // ===========================================================================

// const sheepSaveDeath_removeDyingSheepUnits = (): boolean => {

// 	if ( GetOwningPlayer( GetFilterUnit() ) === GetOwningPlayer( GetTriggerUnit() ) )

// 		// return UnitDamageTarget(GetKillingUnit(), GetFilterUnit(), 10000, true, false, ATTACK_TYPE_HERO, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS)
// 		// call KillUnit(GetFilterUnit())
// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const IsStructureFilter = (): boolean => IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE );

// const replaceUnit = ( u: unit, newType: number ): unit => {

// 	// General unit props
// 	const x = GetUnitX( u );
// 	const y = GetUnitY( u );
// 	const f = GetUnitFacing( u );
// 	const p = GetOwningPlayer( u );
// 	// Hero props
// 	const l = GetUnitLevel( u );
// 	const it: Array<number> = [];

// 	let i = 0;

// 	// Copy hero props

// 	while ( true ) {

// 		if ( i === 6 ) break;
// 		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );
// 		i = i + 1;

// 	}

// 	// Remove it
// 	RemoveUnit( u );

// 	// Create a new one
// 	u = CreateUnit( p, newType, x, y, f );

// 	if ( InStr( GetPlayerName( p ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "head" );

// 	}

// 	SelectUnitForPlayerSingle( u, p );

// 	// Copy hero props
// 	SetHeroLevel( u, l, false );
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 6 ) break;
// 		UnitAddItem( u, CreateItem( it[ i ], x, y ) );
// 		i = i + 1;

// 	}

// 	return u;

// };

// const getWolfType = ( p: player ): number => {

// 	if ( saveskills[ GetPlayerId( p ) ] === 10 )

// 		return s__wolf_blacktype;

// 	else if ( saveskills[ GetPlayerId( p ) ] === 25 )

// 		return s__wolf_imbatype;

// 	return s__wolf_type;

// };

// const GetSheepBounty = ( dyingUnit: unit ): number => {

// 	const sheepType = GetUnitTypeId( dyingUnit );
// 	let bounty = 100;
// 	let u: unit;

// 	// sheep type bonus

// 	if ( sheepType === s__sheep_goldtype )

// 		bounty = bounty + 100;

// 	else if ( sheepType === s__sheep_silvertype )

// 		bounty = bounty + 50;

// 	else if ( sheepType === s__sheep_blacktype )

// 		bounty = bounty + 25;

// 	// level bonus
// 	bounty = bounty + Specialization_GetLevel( dyingUnit ) * 10;

// 	// farm bonus
// 	const g = CreateGroup();
// 	GroupEnumUnitsOfPlayer( g, GetOwningPlayer( dyingUnit ), Filter( IsStructureFilter ) );

// 	while ( true ) {

// 		u = FirstOfGroup( g );
// 		if ( u === null ) break;
// 		GroupRemoveUnit( g, u );
// 		bounty = bounty + I2R( BlzGetUnitIntegerField( u, UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) ) / 2;

// 	}

// 	DestroyGroup( g );

// 	return bounty;

// };

// const onSheepDeath = ( killedUnit: unit, killingUnit: unit ): void => {

// 	const killedPlayer = GetOwningPlayer( killedUnit );
// 	const killedPlayerId = GetPlayerId( killedPlayer );
// 	const killingPlayer = GetOwningPlayer( killingUnit );
// 	const killingPlayerId = GetPlayerId( killingPlayer );
// 	const g = CreateGroup();
// 	let i: number;

// 	// Handle dying sheep
// 	const bounty = GetSheepBounty( killedUnit ) * goldFactor;
// 	ForceRemovePlayer( sheepTeam, killedPlayer );
// 	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ killedPlayerId ] + GetPlayerName( killedPlayer ) + "|r has been " + color[ 13 ] + "killed|r by " + color[ GetPlayerId( killingPlayer ) ] + GetPlayerName( killingPlayer ) + "|r!" );
// 	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( sheepSaveDeath_removeDyingSheepUnits ) );
// 	DestroyGroup( g );
// 	Specialization_onDeath( killedUnit );

// 	// Move to wisps
// 	ForceAddPlayer( wispTeam, killedPlayer );
// 	killedUnit = CreateUnit( killedPlayer, s__wisp_type, - 256, - 832, 270 );
// 	wisps[ killedPlayerId ] = killedUnit;
// 	SetUnitPathing( killedUnit, false );

// 	if ( InStr( GetPlayerName( killedPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", killedUnit, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", killedUnit, "origin" );

// 	}

// 	// Increase wolf kills and upgrade
// 	saveskills[ killingPlayerId ] = saveskills[ killingPlayerId ] + 1;

// 	if ( saveskills[ killingPlayerId ] === 10 || saveskills[ killingPlayerId ] === 25 ) {

// 		if ( GetUnitTypeId( wolves[ killingPlayerId ] ) !== s__wolf_wwtype ) {

// 			killingUnit = replaceUnit( wolves[ killingPlayerId ], getWolfType( killingPlayer ) );
// 			wolves[ killingPlayerId ] = killingUnit;

// 		} else {

// 			killingUnit = replaceUnit( wws[ killingPlayerId ], getWolfType( killingPlayer ) );
// 			wws[ killingPlayerId ] = killingUnit;

// 		}

// 		ScoutPhoenixUpgrade_onSpawn( killingUnit );
// 		UnitAddItem( killingUnit, CreateItem( s__wolf_cloakitem, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ) );

// 	}

// 	// Gold bounty
// 	i = 0;
// 	const allyBounty = R2I( bounty / ( I2R( countHere( wolfTeam ) ) + 0.5 ) );
// 	const killerBounty = R2I( bounty - allyBounty * ( countHere( wolfTeam ) - 1 ) );

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING && IsPlayerInForce( Player( i ), wolfTeam ) )

// 			if ( Player( i ) === killingPlayer ) {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + killerBounty );
// 				SmallText( killerBounty, wolves[ i ], 14, 0, 0 );

// 			} else {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + allyBounty );
// 				SmallText( allyBounty, wolves[ i ], 14, 0, 0 );

// 			}

// 		i = i + 1;

// 	}

// };

// const getSheepType = ( p: player ): number => {

// 	if ( saveskills[ GetPlayerId( p ) ] >= 25 )

// 		return s__sheep_goldtype;

// 	else if ( saveskills[ GetPlayerId( p ) ] >= 15 )

// 		return s__sheep_silvertype;

// 	else if ( saveskills[ GetPlayerId( p ) ] >= 10 )

// 		return s__sheep_blacktype;

// 	return s__sheep_type;

// };

// const onSheepSave = ( savedUnit: unit, savingUnit: unit ): void => {

// 	const savedPlayer = GetOwningPlayer( savedUnit );
// 	const savedPlayerId = GetPlayerId( savedPlayer );
// 	const savingPlayer = GetOwningPlayer( savingUnit );
// 	const savingPlayerId = GetPlayerId( savingPlayer );
// 	let i = 0;

// 	// Handle dying wisp
// 	ForceRemovePlayer( wispTeam, savedPlayer );
// 	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ savedPlayerId ] + GetPlayerName( savedPlayer ) + "|r has been " + color[ 12 ] + "saved|r by " + color[ GetPlayerId( savingPlayer ) ] + GetPlayerName( savingPlayer ) + "|r!" );

// 	// Move to sheep
// 	ForceAddPlayer( sheepTeam, savedPlayer );

// 	while ( true ) {

// 		i = GetRandomInt( 0, 12 );
// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) break;

// 	}

// 	const x = GetStartLocationX( i );
// 	const y = GetStartLocationY( i );
// 	savedUnit = CreateUnit( savedPlayer, getSheepType( savedPlayer ), x, y, 270 );
// 	sheeps[ savedPlayerId ] = savedUnit;
// 	Specialization_onSpawn( savedUnit );

// 	if ( GetLocalPlayer() === savedPlayer ) {

// 		PanCameraToTimed( x, y, 0 );
// 		ClearSelection();
// 		SelectUnit( savedUnit, true );

// 	}

// 	if ( InStr( GetPlayerName( savedPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savedUnit, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savedUnit, "origin" );

// 	}

// 	// Increase saves and upgrade
// 	saveskills[ savingPlayerId ] = saveskills[ savingPlayerId ] + 1;
// 	Specialization_onSave( savingUnit );

// 	if ( saveskills[ savingPlayerId ] === 10 || saveskills[ savingPlayerId ] === 15 || saveskills[ savingPlayerId ] === 25 ) {

// 		savingUnit = replaceUnit( savingUnit, getSheepType( savingPlayer ) );
// 		sheeps[ savingPlayerId ] = savingUnit;
// 		SelectUnitForPlayerSingle( savingUnit, savingPlayer );

// 		if ( InStr( GetPlayerName( savingPlayer ), "Grim" ) >= 0 ) {

// 			AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savingUnit, "origin" );
// 			AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savingUnit, "origin" );

// 		}

// 		Specialization_onSpawn( savingUnit );

// 	}

// 	// Bounty
// 	SetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD ) + 100 * goldFactor );
// 	SmallText( 100 * goldFactor, savingUnit, 14, 0, 0 );

// };

// const onWolfDeath = ( wolfUnit: unit, killer: unit ): void => {

// 	// todo: do we still get gold?
// 	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// 	const killingPlayer = GetOwningPlayer( killer );
// 	TriggerSleepAction( 5 );
// 	ReviveHero( wolfUnit, - 256, - 832, true );

// };

// const onWispTK = ( wispUnit: unit ): void => {

// 	const wispPlayer = GetOwningPlayer( wispUnit );
// 	const wispPlayerId = GetPlayerId( wispPlayer );
// 	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, s__wisp_type, - 256, - 832, 270 );
// 	SetUnitPathing( wisps[ wispPlayerId ], false );

// 	if ( InStr( GetPlayerName( wispPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", wisps[ wispPlayerId ], "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", wisps[ wispPlayerId ], "origin" );

// 	}

// };

// const Trig_sheepSaveDeath_Actions = (): void => {

// 	let relevantDeath = false;

// 	// Sheep death

// 	if ( GetUnitTypeId( GetTriggerUnit() ) === s__sheep_type || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_silvertype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_goldtype ) {

// 		onSheepDeath( GetTriggerUnit(), GetKillingUnit() );
// 		relevantDeath = true;

// 		// Spirit death (save)

// 	} else if ( GetUnitTypeId( GetTriggerUnit() ) === s__wisp_type )

// 		if ( GetUnitTypeId( GetKillingUnit() ) !== s__wisp_type ) {

// 			onSheepSave( GetTriggerUnit(), GetKillingUnit() );
// 			relevantDeath = true;

// 		} else {

// 			onWispTK( GetTriggerUnit() );

// 		}

// 	// Wolf death

// 	else if ( GetUnitTypeId( GetTriggerUnit() ) === s__wolf_type || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_imbatype )

// 		onWolfDeath( GetTriggerUnit(), GetKillingUnit() );

// 	if ( relevantDeath ) {

// 		reloadMultiboard();

// 		if ( countHere( sheepTeam ) === 0 )

// 			endGame( 2 );

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepSaveDeath = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_sheepSaveDeath_Actions );

// };

// // ===========================================================================
// // Trigger: sheepWispLeave
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_sheepWispLeave_Actions = (): void => {

// 	if ( GetUnitTypeId( GetTriggerUnit() ) === s__wisp_type )

// 		SetUnitPosition( GetTriggerUnit(), - 256, - 832 );

// };

// // ===========================================================================
// const InitTrig_sheepWispLeave = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterLeaveRectSimple( t, gg_rct_Pen );
// 	TriggerAddAction( t, Trig_sheepWispLeave_Actions );

// };

// // ===========================================================================
// // Trigger: sheepCommands
// // ===========================================================================

// const Trig_sheepCommands_RemoveCheapFarms = (): boolean => {

// 	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) && BlzGetUnitIntegerField( GetFilterUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) < 5 )

// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const Trig_sheepCommands_RemoveAllFarms = (): boolean => {

// 	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) )

// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const Trig_sheepCommands_Actions = (): void => {

// 	let i = 0;
// 	let n: number;
// 	let g: group;

// 	if ( GetEventPlayerChatString() === "-d" ) {

// 		g = CreateGroup();
// 		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveCheapFarms ) );
// 		DestroyGroup( g );
// 		return;

// 	} else if ( GetEventPlayerChatString() === "-dall" ) {

// 		g = CreateGroup();
// 		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveAllFarms ) );
// 		DestroyGroup( g );
// 		return;

// 	}

// 	while ( true ) {

// 		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )

// 			if ( Player( i ) === GetTriggerPlayer() ) {

// 				n = 0;

// 				while ( true ) {

// 					if ( n === 12 ) break;

// 					if ( GetEventPlayerChatString() === "-wolf gold" ) {

// 						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave the shepherds 100 gold!" );

// 						if ( IsPlayerInForce( Player( n ), wolfTeam ) )

// 							SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + 100 );

// 					} else if ( GetEventPlayerChatString() === "-destroy all farms" ) {

// 						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r has destroyed all the farms!" );

// 						if ( n === 0 ) {

// 							g = CreateGroup();
// 							GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( Trig_sheepCommands_RemoveCheapFarms ) );
// 							DestroyGroup( g );

// 						}

// 					}

// 					n = n + 1;

// 				}

// 			} else {

// 				return;

// 			}

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepCommands = (): void => {

// 	gg_trg_sheepCommands = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-wolf gold", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-destroy all farms", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-dall", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d on", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d off", true );
// 	TriggerAddAction( gg_trg_sheepCommands, Trig_sheepCommands_Actions );

// };

// // ===========================================================================
// // Trigger: sheepJotyeFarm
// // ===========================================================================

// // Can probably just use the aura targets property instead of checking type...
// const sheepJotyeFarm_isProperType = ( u: unit ): boolean => {

// 	const unitType = GetUnitTypeId( u );
// 	return unitType === s__wolf_type || unitType === s__wolf_blacktype || unitType === s__wolf_imbatype || unitType === s__wolf_golemtype || unitType === s__wolf_stalkertype;

// };

// const Trig_sheepJotyeFarm_Actions = (): void => {

// 	const u = GetTriggerUnit();

// 	if ( sheepJotyeFarm_isProperType( u ) && GetUnitAbilityLevel( u, FourCC( "BHab" ) ) > 0 ) {

// 		DisableTrigger( GetTriggeringTrigger() );
// 		IssuePointOrderById( u, GetIssuedOrderId(), GetUnitX( u ) + ( GetUnitX( u ) - GetOrderPointX() ), GetUnitY( u ) + ( GetUnitY( u ) - GetOrderPointY() ) );
// 		EnableTrigger( GetTriggeringTrigger() );

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepJotyeFarm = (): void => {

// 	gg_trg_sheepJotyeFarm = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_sheepJotyeFarm, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
// 	TriggerAddAction( gg_trg_sheepJotyeFarm, Trig_sheepJotyeFarm_Actions );

// };

// // ===========================================================================
// // Trigger: sheepDestroyLastFarm
// // ===========================================================================

// const Trig_sheepDestroyLastFarm_Actions = (): void => {

// 	if ( GetSpellAbilityId() === s__sheep_xability )

// 		KillUnit( GetBuilding( GetOwningPlayer( GetTriggerUnit() ) ) );

// };

// // ===========================================================================
// const InitTrig_sheepDestroyLastFarm = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
// 	TriggerAddAction( t, Trig_sheepDestroyLastFarm_Actions );

// };

// // ===========================================================================
// // Trigger: sheepFactoryFarm
// // ===========================================================================

// // ===========================================================================
// // Trigger: sheepSpecialization
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfQuickBuy
// // ===========================================================================

// const hasInventoryAndControlled = (): boolean => IsUnitIllusion( GetFilterUnit() ) === false && GetUnitAbilityLevel( GetFilterUnit(), FourCC( "AInv" ) ) > 0 && ( GetPlayerAlliance( GetOwningPlayer( GetFilterUnit() ), GetTriggerPlayer(), ALLIANCE_SHARED_ADVANCED_CONTROL ) || GetOwningPlayer( GetFilterUnit() ) === GetTriggerPlayer() );

// const wolfQuickBuy_Actions = (): void => {

// 	let g = CreateGroup();
// 	let u: unit;

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "buy" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		return;

// 	// Find unit to give the item to
// 	g = CreateGroup();
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

// 	if ( BlzGroupGetSize( g ) > 0 )

// 		u = FirstOfGroup( g );

// 	else

// 		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

// 	DestroyGroup( g );

// 	// Get and buy the item
// 	Split( GetEventPlayerChatString(), " ", true );
// 	const itemSpec = itemSpecs[ LoadInteger( itemSpecsNames, StringHash( myArg[ 0 ] ), 0 ) ];

// 	if ( itemSpec !== null )

// 		if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) >= R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) >= R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

// 			UnitAddItem( u, CreateItem( s__itemspec_id[ itemSpec ], GetUnitX( u ), GetUnitY( u ) ) );
// 			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) );
// 			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) - R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) );

// 		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) < R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold and " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

// 		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold." );

// 		} else {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

// 		}

// };

// const wolfQuickSell_Actions = (): void => {

// 	let i = 0;
// 	let u: unit;
// 	let itemSpec: number;

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "sell" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		return;

// 	// Find unit to sell the item on
// 	const g = CreateGroup();
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

// 	if ( BlzGroupGetSize( g ) > 0 )

// 		u = FirstOfGroup( g );

// 	else

// 		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

// 	DestroyGroup( g );

// 	// Get the slot
// 	Split( GetEventPlayerChatString(), " ", true );

// 	if ( myArg[ 1 ] === "all" )

// 		Split( "-sell 1 2 3 4 5 6", " ", true );

// 	// Sell items

// 	while ( true ) {

// 		if ( myArg[ i ] === null || S2I( myArg[ i ] || "" ) === 0 ) break;

// 		if ( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) !== null ) {

// 			itemSpec = itemSpecs[ LoadInteger( itemSpecsIds, GetItemTypeId( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) ), 0 ) ];

// 			if ( itemSpec !== null ) {

// 				RemoveItem( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) );
// 				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) + R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickSellTax ) );
// 				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) + R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickSellTax ) );

// 			}

// 		}

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfQuickBuy = (): void => {

// 	let t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-buy ", false );
// 	TriggerAddAction( t, wolfQuickBuy_Actions );
// 	t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-sell ", false );
// 	TriggerAddAction( t, wolfQuickSell_Actions );

// };

// // ===========================================================================
// // Trigger: wolfWhiteWolf
// // ===========================================================================

// const Trig_wolfWhiteWolf_Actions = (): void => {

// 	let x: number;
// 	let y: number;
// 	let f: number;
// 	let p: player;
// 	let original: unit;
// 	let ww: unit;

// 	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_wwitem ) {

// 		RemoveItem( GetManipulatedItem() );
// 		original = GetTriggerUnit();
// 		x = GetUnitX( original );
// 		y = GetUnitY( original );
// 		f = GetUnitFacing( original );
// 		p = GetOwningPlayer( original );

// 		if ( GetUnitTypeId( original ) === s__wolf_type || GetUnitTypeId( original ) === s__wolf_blacktype || GetUnitTypeId( original ) === s__wolf_imbatype ) {

// 			// Freeze wolf unit
// 			PauseUnit( original, true );
// 			SetUnitOwner( original, Player( PLAYER_NEUTRAL_PASSIVE ), false );
// 			SetUnitX( original, - 6144 );
// 			SetUnitY( original, - 6656 );
// 			wws[ GetPlayerId( p ) ] = original;

// 			// Create the White Wolf
// 			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
// 			wolves[ GetPlayerId( p ) ] = ww;
// 			SelectUnitForPlayerSingle( ww, p );

// 			// Start the timer
// 			// todo: should be nullable
// 			TimerStart( wwTimer[ GetPlayerId( p ) ], 60, false, () => { /* do nothing */ } );
// 			TimerDialogSetTitle( wwTimerDialog[ GetPlayerId( p ) ], "Changing in..." );

// 			if ( GetLocalPlayer() === p )

// 				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], true );

// 			TriggerSleepAction( 60 );

// 			// Clear the timer

// 			if ( GetLocalPlayer() === p )

// 				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], false );

// 			// Remove the white wolf
// 			x = GetUnitX( ww );
// 			y = GetUnitY( ww );
// 			f = GetUnitFacing( ww );
// 			RemoveUnit( ww );

// 			// Restore the wolf unit
// 			wolves[ GetPlayerId( p ) ] = original;
// 			PauseUnit( original, false );
// 			SetUnitOwner( original, p, false );
// 			SetUnitPosition( original, x, y );
// 			SelectUnitForPlayerSingle( original, p );

// 		} else {

// 			RemoveUnit( original );
// 			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
// 			UnitApplyTimedLife( ww, FourCC( "BTLF" ), 150 );
// 			SelectUnitForPlayerSingle( ww, p );

// 		}

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfWhiteWolf = (): void => {

// 	let i = 0;
// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
// 	TriggerAddAction( t, Trig_wolfWhiteWolf_Actions );

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		wwTimer[ i ] = CreateTimer();
// 		wwTimerDialog[ i ] = CreateTimerDialog( wwTimer[ i ] );
// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// // Trigger: wolfLumber
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_wolfLumber_Actions = (): void => {

// 	if ( GetHeroLevel( GetTriggerUnit() ) >= 3 )

// 		SetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER ) + 2 * goldFactor );

// };

// // ===========================================================================
// const InitTrig_wolfLumber = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_HERO_LEVEL );
// 	TriggerAddAction( t, Trig_wolfLumber_Actions );

// };

// // ===========================================================================
// // Trigger: wolfWard
// // ===========================================================================

// const Trig_wolfWard_Actions = (): void => {

// 	let u: unit;

// 	if ( GetSpellAbilityId() === s__wolf_wardability ) {

// 		u = CreateUnit( GetOwningPlayer( GetTriggerUnit() ), s__wolf_wardtype, GetSpellTargetX(), GetSpellTargetY(), 270 );
// 		SetUnitPosition( u, GetSpellTargetX(), GetSpellTargetY() );
// 		UnitApplyTimedLife( u, FourCC( "BTLF" ), 240 );

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfWard = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
// 	TriggerAddAction( t, Trig_wolfWard_Actions );

// };

// // ===========================================================================
// // Trigger: wolfCloakOfFlames
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfDragonFire
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfScoutPhoenixUpgrade
// // ===========================================================================

// // ===========================================================================
// // Trigger: eggGem
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_eggGem_Actions = (): void => {

// 	const i = GetRandomInt( 0, 100 );

// 	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_gem )

// 		if ( gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] ) {

// 			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = false;
// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem deactivated." );

// 		} else {

// 			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = true;

// 			if ( i === 0 )

// 				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Perfect gem activated." );

// 			else

// 				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem activated." );

// 		}

// };

// // ===========================================================================
// const InitTrig_eggGem = (): void => {

// 	gg_trg_eggGem = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_eggGem, EVENT_PLAYER_UNIT_USE_ITEM );
// 	TriggerAddAction( gg_trg_eggGem, Trig_eggGem_Actions );

// };

// // ===========================================================================
// // Trigger: eggDolly
// // ===========================================================================

// const Trig_eggDolly_Actions = (): void => {

// 	let e: effect;
// 	const playerId = GetPlayerId( GetTriggerPlayer() );
// 	dollyClick[ playerId ] = dollyClick[ playerId ] + 1;

// 	if ( dollyClick[ playerId ] > 10 ) {

// 		e = AddSpecialEffectTarget( "Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Human\\HumanLargeDeathExplode\\HumanLargeDeathExplode.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Abilities\\Weapons\\Mortar\\MortarMissile.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Orc\\OrcSmallDeathExplode\\OrcSmallDeathExplode.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );

// 		if ( katama ) {

// 			katama = false;
// 			CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_katama, GetUnitX( GetTriggerUnit() ), GetUnitY( GetTriggerUnit() ), GetUnitFacing( GetTriggerUnit() ) + 180 );

// 		}

// 		KillUnit( GetTriggerUnit() );
// 		DisplayTimedTextToPlayer( GetTriggerPlayer(), 0, 0, 5, "You killed Dolly! You've been placed in time out!" );
// 		// todo: should be nullable
// 		TimerStart( dollyTimer[ playerId ], 15, false, () => { /* do nothing */ } );
// 		TimerDialogSetTitle( dollyTimerDialog[ playerId ], "Time out ends in..." );

// 		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

// 			TimerDialogDisplay( dollyTimerDialog[ playerId ], true );
// 			EnableUserControl( false );

// 		}

// 		TriggerSleepAction( 15 );

// 		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

// 			EnableUserControl( true );
// 			TimerDialogDisplay( dollyTimerDialog[ playerId ], false );

// 		}

// 	}

// };

// const Trig_eggDolly_Tick = (): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( dollyClick[ i ] > 0 )

// 			dollyClick[ i ] = dollyClick[ i ] - 1;

// 		i = i + 1;

// 	}

// 	if ( GetPlayerUnitTypeCount( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly ) === 0 )

// 		CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly, - 256, - 768, 270 );

// };

// const Trig_eggDolly_isDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__sheep_dolly;

// // ===========================================================================
// const InitTrig_eggDolly = (): void => {

// 	const t = CreateTrigger();
// 	let i = 0;
// 	gg_trg_eggDolly = CreateTrigger();
// 	TriggerRegisterPlayerUnitEventAll( gg_trg_eggDolly, EVENT_PLAYER_UNIT_SELECTED, Condition( Trig_eggDolly_isDolly ) );
// 	TriggerAddAction( gg_trg_eggDolly, Trig_eggDolly_Actions );
// 	TriggerRegisterTimerEvent( t, 1, true );
// 	TriggerAddAction( t, Trig_eggDolly_Tick );

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		dollyTimer[ i ] = CreateTimer();
// 		dollyTimerDialog[ i ] = CreateTimerDialog( dollyTimer[ i ] );
// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitCustomTriggers = (): void => {

// 	InitTrig_coreInit();
// 	InitTrig_coreGame();
// 	// Function not found: call InitTrig_changelog()
// 	InitTrig_miscClean();
// 	InitTrig_miscGoldTick();
// 	InitTrig_miscZoom();
// 	InitTrig_miscAngle();
// 	InitTrig_miscGold();
// 	InitTrig_miscControl();
// 	InitTrig_miscUncontrol();
// 	InitTrig_miscLeaves();
// 	InitTrig_miscFace();
// 	InitTrig_miscFriendlyAttack();
// 	InitTrig_miscKillReturn();
// 	InitTrig_miscSmartSave();
// 	InitTrig_miscFiveMinuteAction();
// 	InitTrig_miscDollyMove();
// 	// Function not found: call InitTrig_miscPreload()
// 	// Function not found: call InitTrig_miscMath()
// 	// Function not found: call InitTrig_miscFileIO()
// 	InitTrig_sheepFarmSelfDestruct();
// 	InitTrig_sheepSaveDeath();
// 	InitTrig_sheepWispLeave();
// 	InitTrig_sheepCommands();
// 	InitTrig_sheepJotyeFarm();
// 	InitTrig_sheepDestroyLastFarm();
// 	// Function not found: call InitTrig_sheepFactoryFarm()
// 	// Function not found: call InitTrig_sheepSpecialization()
// 	InitTrig_wolfQuickBuy();
// 	InitTrig_wolfWhiteWolf();
// 	InitTrig_wolfLumber();
// 	InitTrig_wolfWard();
// 	// Function not found: call InitTrig_wolfCloakOfFlames()
// 	// Function not found: call InitTrig_wolfDragonFire()
// 	// Function not found: call InitTrig_wolfScoutPhoenixUpgrade()
// 	InitTrig_eggGem();
// 	InitTrig_eggDolly();

// };

// // ===========================================================================
// const RunInitializationTriggers = (): void => {

// 	ConditionalTriggerExecute( gg_trg_coreInit );

// };

// ***************************************************************************
// *
// *  Players
// *
// ***************************************************************************

// const InitCustomPlayerSlots = (): void => {

// 	// Player 0
// 	SetPlayerStartLocation( Player( 0 ), 0 );
// 	ForcePlayerStartLocation( Player( 0 ), 0 );
// 	SetPlayerColor( Player( 0 ), ConvertPlayerColor( 0 ) );
// 	SetPlayerRacePreference( Player( 0 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 0 ), false );
// 	SetPlayerController( Player( 0 ), MAP_CONTROL_USER );

// 	// Player 1
// 	SetPlayerStartLocation( Player( 1 ), 1 );
// 	ForcePlayerStartLocation( Player( 1 ), 1 );
// 	SetPlayerColor( Player( 1 ), ConvertPlayerColor( 1 ) );
// 	SetPlayerRacePreference( Player( 1 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 1 ), false );
// 	SetPlayerController( Player( 1 ), MAP_CONTROL_USER );

// 	// Player 2
// 	SetPlayerStartLocation( Player( 2 ), 2 );
// 	ForcePlayerStartLocation( Player( 2 ), 2 );
// 	SetPlayerColor( Player( 2 ), ConvertPlayerColor( 2 ) );
// 	SetPlayerRacePreference( Player( 2 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 2 ), false );
// 	SetPlayerController( Player( 2 ), MAP_CONTROL_USER );

// 	// Player 3
// 	SetPlayerStartLocation( Player( 3 ), 3 );
// 	ForcePlayerStartLocation( Player( 3 ), 3 );
// 	SetPlayerColor( Player( 3 ), ConvertPlayerColor( 3 ) );
// 	SetPlayerRacePreference( Player( 3 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 3 ), false );
// 	SetPlayerController( Player( 3 ), MAP_CONTROL_USER );

// 	// Player 4
// 	SetPlayerStartLocation( Player( 4 ), 4 );
// 	ForcePlayerStartLocation( Player( 4 ), 4 );
// 	SetPlayerColor( Player( 4 ), ConvertPlayerColor( 4 ) );
// 	SetPlayerRacePreference( Player( 4 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 4 ), false );
// 	SetPlayerController( Player( 4 ), MAP_CONTROL_USER );

// 	// Player 5
// 	SetPlayerStartLocation( Player( 5 ), 5 );
// 	ForcePlayerStartLocation( Player( 5 ), 5 );
// 	SetPlayerColor( Player( 5 ), ConvertPlayerColor( 5 ) );
// 	SetPlayerRacePreference( Player( 5 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 5 ), false );
// 	SetPlayerController( Player( 5 ), MAP_CONTROL_USER );

// 	// Player 6
// 	SetPlayerStartLocation( Player( 6 ), 6 );
// 	ForcePlayerStartLocation( Player( 6 ), 6 );
// 	SetPlayerColor( Player( 6 ), ConvertPlayerColor( 6 ) );
// 	SetPlayerRacePreference( Player( 6 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 6 ), false );
// 	SetPlayerController( Player( 6 ), MAP_CONTROL_USER );

// 	// Player 7
// 	SetPlayerStartLocation( Player( 7 ), 7 );
// 	ForcePlayerStartLocation( Player( 7 ), 7 );
// 	SetPlayerColor( Player( 7 ), ConvertPlayerColor( 7 ) );
// 	SetPlayerRacePreference( Player( 7 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 7 ), false );
// 	SetPlayerController( Player( 7 ), MAP_CONTROL_USER );

// 	// Player 8
// 	SetPlayerStartLocation( Player( 8 ), 8 );
// 	SetPlayerColor( Player( 8 ), ConvertPlayerColor( 8 ) );
// 	SetPlayerRacePreference( Player( 8 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 8 ), false );
// 	SetPlayerController( Player( 8 ), MAP_CONTROL_USER );

// 	// Player 9
// 	SetPlayerStartLocation( Player( 9 ), 9 );
// 	SetPlayerColor( Player( 9 ), ConvertPlayerColor( 9 ) );
// 	SetPlayerRacePreference( Player( 9 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 9 ), false );
// 	SetPlayerController( Player( 9 ), MAP_CONTROL_USER );

// 	// Player 10
// 	SetPlayerStartLocation( Player( 10 ), 10 );
// 	SetPlayerColor( Player( 10 ), ConvertPlayerColor( 10 ) );
// 	SetPlayerRacePreference( Player( 10 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 10 ), false );
// 	SetPlayerController( Player( 10 ), MAP_CONTROL_USER );

// 	// Player 11
// 	SetPlayerStartLocation( Player( 11 ), 11 );
// 	SetPlayerColor( Player( 11 ), ConvertPlayerColor( 11 ) );
// 	SetPlayerRacePreference( Player( 11 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 11 ), false );
// 	SetPlayerController( Player( 11 ), MAP_CONTROL_USER );

// };

// const InitCustomTeams = (): void => {

// 	// Force: TRIGSTR_013
// 	SetPlayerTeam( Player( 0 ), 0 );
// 	SetPlayerState( Player( 0 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 1 ), 0 );
// 	SetPlayerState( Player( 1 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 2 ), 0 );
// 	SetPlayerState( Player( 2 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 3 ), 0 );
// 	SetPlayerState( Player( 3 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 4 ), 0 );
// 	SetPlayerState( Player( 4 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 5 ), 0 );
// 	SetPlayerState( Player( 5 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 6 ), 0 );
// 	SetPlayerState( Player( 6 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 7 ), 0 );
// 	SetPlayerState( Player( 7 ), PLAYER_STATE_ALLIED_VICTORY, 1 );

// 	//   Allied
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 6 ), true );

// 	//   Shared Vision
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 6 ), true );

// 	// Force: TRIGSTR_4360
// 	SetPlayerTeam( Player( 8 ), 1 );
// 	SetPlayerState( Player( 8 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 9 ), 1 );
// 	SetPlayerState( Player( 9 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 10 ), 1 );
// 	SetPlayerState( Player( 10 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 11 ), 1 );
// 	SetPlayerState( Player( 11 ), PLAYER_STATE_ALLIED_VICTORY, 1 );

// 	//   Allied
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 10 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 10 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 10 ), true );

// 	//   Shared Vision
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 10 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 10 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 10 ), true );

// };

// const InitAllyPriorities = (): void => {

// 	SetStartLocPrioCount( 1, 1 );
// 	SetStartLocPrio( 1, 0, 0, MAP_LOC_PRIO_LOW );

// 	SetStartLocPrioCount( 5, 1 );
// 	SetStartLocPrio( 5, 0, 8, MAP_LOC_PRIO_HIGH );

// };

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const jasshelper__initstructs869046375 = (): void => {

	// ExecuteFunc( "s__File_FileIO__FileInit___onInit" );
	s__File_FileIO__FileInit___onInit();

	// ExecuteFunc( "s__AbilityPreload__Init_onInit" );
	s__AbilityPreload__Init_onInit();

};

// ***************************************************************************
// *
// *  Main Initialization
// *
// ***************************************************************************

// ===========================================================================
const mainBefore = (): void => {

	// ExecuteFunc( "jasshelper__initstructs869046375" );
	jasshelper__initstructs869046375();
	// ExecuteFunc( "CloakOfFlames__Init" );
	CloakOfFlames__Init();
	// ExecuteFunc( "DragonFire__Init" );
	DragonFire__Init();
	// ExecuteFunc( "FactoryFarm__Init" );
	FactoryFarm__Init();
	// ExecuteFunc( "ScoutPhoenixUpgrade__Init" );
	ScoutPhoenixUpgrade__Init();
	// ExecuteFunc( "init" );
	init();

};

const mainAfter = (): void => {

	// InitCustomTriggers();
	// RunInitializationTriggers();

};

// ***************************************************************************
// *
// *  Map Configuration
// *
// ***************************************************************************

// const config = (): void => {

// 	SetMapName( "TRIGSTR_039" );
// 	SetMapDescription( "TRIGSTR_041" );
// 	SetPlayers( 12 );
// 	SetTeams( 12 );
// 	SetGamePlacement( MAP_PLACEMENT_TEAMS_TOGETHER );

// 	DefineStartLocation( 0, - 896, - 1216 );
// 	DefineStartLocation( 1, - 768, - 1408 );
// 	DefineStartLocation( 2, - 128, - 1600 );
// 	DefineStartLocation( 3, 384, - 1408 );
// 	DefineStartLocation( 4, 320, - 704 );
// 	DefineStartLocation( 5, 0, - 256 );
// 	DefineStartLocation( 6, - 768, - 256 );
// 	DefineStartLocation( 7, - 896, - 704 );
// 	DefineStartLocation( 8, - 320, - 768 );
// 	DefineStartLocation( 9, - 192, - 768 );
// 	DefineStartLocation( 10, - 320, - 896 );
// 	DefineStartLocation( 11, - 192, - 896 );

// 	// Player setup
// 	InitCustomPlayerSlots();
// 	InitCustomTeams();
// 	InitAllyPriorities();

// };

addScriptHook( W3TS_HOOK.MAIN_BEFORE, mainBefore );
addScriptHook( W3TS_HOOK.MAIN_AFTER, mainAfter );
