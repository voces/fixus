
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { s__wolf_cloakitem } from "shared";

// globals from CloakOfFlames:
const CloakOfFlames__cloakHolders = CreateGroup();
// endglobals from CloakOfFlames
// todo: test this
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

// library CloakOfFlames ends

addScriptHook( W3TS_HOOK.MAIN_AFTER, CloakOfFlames__Init );
