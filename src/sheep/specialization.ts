
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { fillArrayFn } from "../shared";
import { emitLog, wrappedTriggerAddAction } from "../util/emitLog";

type SpecializationData = {
	learn: number;
	passive: number;
	active: number;
	upgrade?: number;
}

const specializations: Record<string, SpecializationData> = {
	flash: {
		learn: FourCC( "A007" ),
		passive: FourCC( "A00F" ),
		active: FourCC( "A00A" ),
	},
	engineer: {
		learn: FourCC( "A008" ),
		passive: FourCC( "A009" ),
		active: FourCC( "A00G" ),
	},
	attacker: {
		learn: FourCC( "A00E" ),
		passive: FourCC( "A00K" ),
		active: FourCC( "A00J" ),
		upgrade: FourCC( "R003" ),
	},
	hulk: {
		learn: FourCC( "A00C" ),
		passive: FourCC( "A00L" ),
		active: FourCC( "A00I" ),
	},
};

const specializationLearnAbilities = Object.values( specializations ).map( s => s.learn );

export const specializationNames: Map<SpecializationData, string> = new Map();
Object.entries( specializations ).map( ( [ k, v ] ) => specializationNames.set( v, k ) );

type PlayerSpecialization = {
	level: number;
	maxLevel: number;
	specialization: SpecializationData | null;
}

export const playerSpecializations: PlayerSpecialization[] =
	fillArrayFn( bj_MAX_PLAYERS, () => ( { level: 0, maxLevel: 0, specialization: null } ) );

const SPELLBOOK_ABILITY_TYPE = FourCC( "A006" );

const updateUnit = ( u: unit ): void => {

	const playerIndex = GetPlayerId( GetOwningPlayer( u ) );
	const playerSpecialization = playerSpecializations[ playerIndex ];
	const { level, specialization } = playerSpecialization;

	// Player hasn't picked one yet (they got another save)
	if ( specialization == null ) return;

	const effectiveLevel = Math.min( 25, level );

	if ( effectiveLevel > 0 ) {

		if ( BlzGetUnitAbility( u, specialization.active ) == null ) {

			UnitAddAbility( u, specialization.passive );
			UnitAddAbility( u, specialization.active );

			// todo, move this into a callback
			if ( specialization === specializations.hulk ) {

				BlzSetUnitMaxHP( u, BlzGetUnitMaxHP( u ) + effectiveLevel * 15 );
				SetUnitState( u, UNIT_STATE_LIFE, GetUnitState( u, UNIT_STATE_LIFE ) + effectiveLevel * 15 );

			}

		} else

		// todo, move this into a callback
		if ( specialization === specializations.hulk ) {

			BlzSetUnitMaxHP( u, BlzGetUnitMaxHP( u ) + 15 );
			SetUnitState( u, UNIT_STATE_LIFE, GetUnitState( u, UNIT_STATE_LIFE ) + 15 );

		}

		SetUnitAbilityLevel( u, specialization.passive, effectiveLevel );
		SetUnitAbilityLevel( u, specialization.active, effectiveLevel );

	}

	if ( specialization.upgrade )
		SetPlayerTechResearched( GetOwningPlayer( u ), specialization.upgrade, effectiveLevel );

};

const setSpecialization = (): void => {

	const playerId = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
	const spellId = GetSpellAbilityId();

	// Close and remove the spellbook
	ForceUICancelBJ( GetOwningPlayer( GetTriggerUnit() ) );
	UnitRemoveAbilityBJ( SPELLBOOK_ABILITY_TYPE, GetTriggerUnit() );

	// Set specialization and update unit

	for ( const specialization of Object.values( specializations ) )

		if ( specialization.learn === spellId ) {

			playerSpecializations[ playerId ].specialization = specialization;
			updateUnit( GetTriggerUnit() );

			return;

		}

	emitLog( "Unknown specialization", spellId );

};

const isSpecializationAbilityCondition = Condition(
	(): boolean => specializationLearnAbilities.includes( GetSpellAbilityId() ),
);

const startConstruction = (): void => {

	const playerIndex = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
	const specialization = playerSpecializations[ playerIndex ];

	if ( specialization.specialization === specializations.engineer ) {

		const effectiveLevel = Math.min( 25, specialization.level );
		BlzSetUnitMaxHP( GetTriggerUnit(), BlzGetUnitMaxHP( GetTriggerUnit() ) + 10 * effectiveLevel );

	}

};

export const Specialization_onSpawn = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );
	const playerSpecialization = playerSpecializations[ i ];

	if (
		playerSpecialization.level >= 1 &&
		playerSpecialization.specialization == null &&
		BlzGetUnitAbility( u, SPELLBOOK_ABILITY_TYPE ) == null
	)
		UnitAddAbility( u, SPELLBOOK_ABILITY_TYPE );

	else if ( playerSpecialization.specialization != null )
		updateUnit( u );

};

export const Specialization_onSave = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );

	playerSpecializations[ i ].level ++;

	if ( playerSpecializations[ i ].level > playerSpecializations[ i ].maxLevel )
		playerSpecializations[ i ].maxLevel = playerSpecializations[ i ].level;

	Specialization_onSpawn( u );

};

export const Specialization_onDeath = ( u: unit ): void => {

	playerSpecializations[ GetPlayerId( GetOwningPlayer( u ) ) ].level = 0;

};

export const Specialization_GetLevel = ( u: unit ): number =>
	playerSpecializations[ GetPlayerId( GetOwningPlayer( u ) ) ].level;

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();

	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddCondition( t, isSpecializationAbilityCondition );
	wrappedTriggerAddAction( t, "sheep specialization set", setSpecialization );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_START );
	wrappedTriggerAddAction( t, "sheep specialization construct", startConstruction );

} );
