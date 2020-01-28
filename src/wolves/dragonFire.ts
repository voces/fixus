
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { wolves } from "shared";
import { forEachUnit } from "util/temp";

// todo: test this

let burnWolfId = 7;
let emptyTicks: number;
const spreadFireTrigger = CreateTrigger();
const burnUnitsTrigger = CreateTrigger();

const DRAGON_GLASS_ITEM_TYPE = FourCC( "A00H" );
const DRAGON_FIRE_BUFF_TYPE = FourCC( "B000" );
const DRAGON_FIRE_ABILITY_TYPE = FourCC( "A00N" );

const needsFireAbilityFilter = Condition( () =>
	GetUnitAbilityLevel( GetFilterUnit(), DRAGON_FIRE_BUFF_TYPE ) > 0 &&
	BlzGetUnitAbility( GetFilterUnit(), DRAGON_FIRE_ABILITY_TYPE ) === null &&
	IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ),
);

const spreadFire = (): void => forEachUnit(
	u => UnitAddAbility( u, DRAGON_FIRE_ABILITY_TYPE ),
	needsFireAbilityFilter,
);

const nextWolfId = ( current: number ): number => {

	let tries = 5;

	while ( tries -- ) {

		current = current + 1;

		if ( current === 12 ) current = 8;
		if ( wolves[ current ] !== null ) return current;

	}

	return 8;

};

const burningUnitsFilter = Condition(
	() => GetUnitAbilityLevel( GetFilterUnit(), DRAGON_FIRE_BUFF_TYPE ) > 0,
);

const burnUnits = (): void => {

	let isEmpty = true;

	forEachUnit( u => {

		isEmpty = false;
		burnWolfId = nextWolfId( burnWolfId );
		const damage = Math.max( R2I( BlzGetUnitMaxHP( u ) * 0.01 ), 1 );

		UnitDamageTarget(
			wolves[ burnWolfId ],
			u,
			damage,
			true,
			false,
			ATTACK_TYPE_MAGIC,
			DAMAGE_TYPE_FIRE, WEAPON_TYPE_WHOKNOWS,
		);

	}, burningUnitsFilter );

	if ( isEmpty ) {

		emptyTicks ++;

		if ( emptyTicks > 3 ) {

			DisableTrigger( spreadFireTrigger );
			DisableTrigger( burnUnitsTrigger );

		}

	} else emptyTicks = 0;

};

const onSpellCast = (): void => {

	if ( GetSpellAbilityId() === DRAGON_GLASS_ITEM_TYPE ) {

		emptyTicks = 0;
		EnableTrigger( spreadFireTrigger );
		EnableTrigger( burnUnitsTrigger );

	}

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, onSpellCast );

	TriggerRegisterTimerEvent( spreadFireTrigger, 10, true );
	TriggerAddAction( spreadFireTrigger, spreadFire );
	DisableTrigger( spreadFireTrigger );

	TriggerRegisterTimerEvent( burnUnitsTrigger, 1, true );
	TriggerAddAction( burnUnitsTrigger, burnUnits );
	DisableTrigger( burnUnitsTrigger );

} );
