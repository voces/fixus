
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { forEachUnit } from "util/temp";
import { wolves } from "shared";
import { onSpellCast, onCreated } from "util/event";
import { wrappedTriggerAddAction } from "util/emitLog";

let burnWolfId = 2;
let emptyTicks: number;
const spreadFireTrigger = CreateTrigger();
const burnUnitsTrigger = CreateTrigger();
export const units = CreateGroup(); // group for actual units that can move
const burningStructures = CreateGroup(); // group of structures that are burning

const DRAGON_GLASS_ITEM_TYPE = FourCC( "A00H" );
const DRAGON_FIRE_BUFF_TYPE = FourCC( "B000" );
const DRAGON_FIRE_ABILITY_TYPE = FourCC( "A00N" );

const needsFireAbilityFilter = Condition( () =>
	GetUnitAbilityLevel( GetFilterUnit(), DRAGON_FIRE_BUFF_TYPE ) > 0 &&
	BlzGetUnitAbility( GetFilterUnit(), DRAGON_FIRE_ABILITY_TYPE ) == null &&
	IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ),
);

/**
 * Spreads the fire to structures with the buff
 */
const spreadFire = (): void => forEachUnit(
	u => {

		GroupAddUnit( burningStructures, u );
		UnitAddAbility( u, DRAGON_FIRE_ABILITY_TYPE );

	},
	needsFireAbilityFilter,
);

/**
 * We cycle through wolves for each damage event
 */
export const nextWolfId = ( current: number ): number => {

	let tries = 12;

	while ( tries -- ) {

		current = current + 1;

		if ( current === 12 ) current = 0;
		if ( wolves[ current ] != null ) return current;

	}

	return 1.5;

};

/**
 * Burn the passed unit
 */
const burnUnit = ( u: unit ): void => {

	burnWolfId = nextWolfId( burnWolfId );
	const damage = Math.max( R2I( BlzGetUnitMaxHP( u ) * 0.0325 ), 1 );

	UnitDamageTarget(
		wolves[ burnWolfId ],
		u,
		damage,
		true,
		false,
		ATTACK_TYPE_MAGIC,
		DAMAGE_TYPE_FIRE, WEAPON_TYPE_WHOKNOWS,
	);

};

/**
 * Considers all moving units to burn.
 * Burns all units in the burningStructures (structures)
 */
const burnUnits = (): void => {

	let isEmpty = true;

	// Iterate through all moving units
	ForGroup( units, () => {

		isEmpty = false;
		const u = GetEnumUnit();
		if ( GetUnitAbilityLevel( u, DRAGON_FIRE_BUFF_TYPE ) > 0 )
			burnUnit( u );

	} );

	// Burning structures can never stop burning, so no need to check for buff
	ForGroup( burningStructures, () => {

		isEmpty = false;
		burnUnit( GetEnumUnit() );

	} );

	if ( isEmpty ) {

		emptyTicks ++;

		if ( emptyTicks > 3 ) {

			DisableTrigger( spreadFireTrigger );
			DisableTrigger( burnUnitsTrigger );

		}

	} else emptyTicks = 0;

};

/**
 * Runs when we cast the item ability
 */
const onCastDragonFire = (): void => {

	if ( GetSpellAbilityId() === DRAGON_GLASS_ITEM_TYPE ) {

		emptyTicks = 0;
		EnableTrigger( spreadFireTrigger );
		EnableTrigger( burnUnitsTrigger );

	}

};

const onUnitCreated = (): void => {

	if ( ! IsUnitType( GetTriggerUnit(), UNIT_TYPE_STRUCTURE ) )
		GroupAddUnit( units, GetTriggerUnit() );

};

export const main = (): void => {

	onSpellCast( "dragon fire", onCastDragonFire );

	TriggerRegisterTimerEvent( spreadFireTrigger, 10, true );
	wrappedTriggerAddAction( spreadFireTrigger, "dragon fire spread", spreadFire );
	DisableTrigger( spreadFireTrigger );

	TriggerRegisterTimerEvent( burnUnitsTrigger, 1, true );
	wrappedTriggerAddAction( burnUnitsTrigger, "dragon fire burn", burnUnits );
	DisableTrigger( burnUnitsTrigger );

	onCreated( "dragon fire", onUnitCreated );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, main );
