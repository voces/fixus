
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { fillArrayFn } from "../shared";
import { emitLog } from "../util/emitLog";
import { timeout } from "../util/temp";
import { onSpellCast, onConstructionStart } from "event";

type SpecializationData = {
	learn: number;
	passive: number;
	active: number;
	upgrade?: number;
	customSheepLogic?: ( sheep: unit, level: number, prevLevel: number ) => void;
	customFarmLogic?: ( farm: unit, level: number ) => void;
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
		customFarmLogic: ( farm: unit, level: number ): void =>
			BlzSetUnitMaxHP( farm, BlzGetUnitMaxHP( farm ) + 10 * level ),
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
		active: FourCC( "A00W" ),
		customSheepLogic: ( sheep: unit, level: number, prevLevel: number ): void => {

			const incHP = ( level - prevLevel ) * 10;
			BlzSetUnitMaxHP( sheep, BlzGetUnitMaxHP( sheep ) + incHP );
			SetUnitState( sheep, UNIT_STATE_LIFE, GetUnitState( sheep, UNIT_STATE_LIFE ) + incHP );
			const scale = 2 + level * 0.05;
			SetUnitScale( sheep, scale, scale, scale );

		},
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

			if ( specialization.customSheepLogic )
				specialization.customSheepLogic( u, effectiveLevel, 0 );

		} else if ( specialization.customSheepLogic )
			specialization.customSheepLogic( u, effectiveLevel, effectiveLevel - 1 );

		SetUnitAbilityLevel( u, specialization.passive, effectiveLevel );
		SetUnitAbilityLevel( u, specialization.active, effectiveLevel );

	}

	if ( specialization.upgrade )
		SetPlayerTechResearched( GetOwningPlayer( u ), specialization.upgrade, effectiveLevel );

};

const onSetSpecialization = (): void => {

	const spellId = GetSpellAbilityId();

	if ( ! specializationLearnAbilities.includes( GetSpellAbilityId() ) ) return;

	const unit = GetTriggerUnit();
	const playerId = GetPlayerId( GetOwningPlayer( unit ) );

	// Close and remove the spellbook
	ForceUICancelBJ( GetOwningPlayer( unit ) );
	BlzUnitHideAbility( unit, SPELLBOOK_ABILITY_TYPE, true );
	timeout( 0, () => UnitRemoveAbility( unit, SPELLBOOK_ABILITY_TYPE ) );

	// Set specialization and update unit

	for ( const specialization of Object.values( specializations ) )

		if ( specialization.learn === spellId ) {

			playerSpecializations[ playerId ].specialization = specialization;
			updateUnit( unit );

			return;

		}

	emitLog( "Unknown specialization", spellId );

};

const onStartConstruction = (): void => {

	const playerIndex = GetPlayerId( GetOwningPlayer( GetTriggerUnit() ) );
	const playerSpecialization = playerSpecializations[ playerIndex ];
	const specialization = playerSpecialization.specialization;
	const effectiveLevel = Math.min( 25, playerSpecialization.level );

	if ( specialization && specialization.customFarmLogic )
		specialization.customFarmLogic( GetTriggerUnit(), effectiveLevel );

};

export const Specialization_onSpawn = ( u: unit ): void => {

	const i = GetPlayerId( GetOwningPlayer( u ) );
	const playerSpecialization = playerSpecializations[ i ];

	if (
		playerSpecialization.level >= 1 &&
		playerSpecialization.specialization == null &&
		BlzGetUnitAbility( u, SPELLBOOK_ABILITY_TYPE ) == null
	) {

		UnitAddAbility( u, SPELLBOOK_ABILITY_TYPE );
		timeout( 30, () => {

			if ( u && UnitAlive( u ) && BlzGetUnitAbility( u, SPELLBOOK_ABILITY_TYPE ) != null )
				DisplayTextToPlayer( GetOwningPlayer( u ), 0, 0, "You've saved someone! You can specialize by clicking the spellbook icon." );

		} );

	} else if ( playerSpecialization.specialization != null )
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

	onSpellCast( "sheep specialization", onSetSpecialization );
	onConstructionStart( "sheep specialization", onStartConstruction );

} );
