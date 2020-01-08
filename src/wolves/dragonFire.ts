
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: I doubt this works...
import { WORLD_BOUNDS, wolves } from "../index";

// globals from DragonFire:
let DragonFire__burnWolfId = 7;
let DragonFire__emptyCount: number;
const DragonFire__spreadFire = CreateTrigger();
const DragonFire__burnUnits = CreateTrigger();
// endglobals from DragonFire

const s__DragonFire__data_dragonGlass = FourCC( "A00H" );
const s__DragonFire__data_dragonFireBuff = FourCC( "B000" );
const s__DragonFire__data_dragonFireAbility = FourCC( "A00N" );

// library DragonFire:

const DragonFire__NeedsFireAbility = (): boolean => GetUnitAbilityLevel( GetFilterUnit(), s__DragonFire__data_dragonFireBuff ) > 0 && BlzGetUnitAbility( GetFilterUnit(), s__DragonFire__data_dragonFireAbility ) === null && IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE );

const DragonFire__SpreadFire = (): void => {

	const g = CreateGroup();
	let u: unit;
	GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( DragonFire__NeedsFireAbility ) );

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

	GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( DragonFire__BurningUnits ) );

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

addScriptHook( W3TS_HOOK.MAIN_AFTER, DragonFire__Init );
