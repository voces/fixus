
import { addScriptHook, W3TS_HOOK } from "w3ts";

// globals from Specialization:
const Specialization__playerSpecializations: Array<number> = [];
const Specialization__specializations: Array<number> = [];
const Specialization__levels: Array<number> = [];
// endglobals from Specialization

const s__data_spellbook = FourCC( "A006" );
let s__data_flash: number;
let s__data_engineer: number;
let s__data_attacker: number;
let s__data_hulk: number;

let si__SpecializationStruct_F = 0;
let si__SpecializationStruct_I = 0;
const si__SpecializationStruct_V: Array<number> = [];
const s__SpecializationStruct_learn: Array<number> = [];
const s__SpecializationStruct_passive: Array<number> = [];
const s__SpecializationStruct_active: Array<number> = [];
const s__SpecializationStruct_upgrade: Array<number> = [];

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

export const Specialization_onSave = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );

	if ( Specialization__levels[ i ] === null )

		Specialization__levels[ i ] = 0;

	Specialization__levels[ i ] = Specialization__levels[ i ] + 1;
	BlzSetUnitIntegerField( u, UNIT_IF_LEVEL, GetUnitLevel( u ) + 1 );

	Specialization_onSpawn( u );

};

export const Specialization_onDeath = ( u: unit ): void => {

	Specialization__levels[ GetPlayerId( GetOwningPlayer( u ) ) ] = 0;

};

export const Specialization_GetLevel = ( u: unit ): number => Specialization__levels[ GetPlayerId( GetOwningPlayer( u ) ) ];

// library Specialization ends

addScriptHook( W3TS_HOOK.MAIN_AFTER, init );
