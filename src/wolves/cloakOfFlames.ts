
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { CLOAK_TYPE } from "shared";
import { withTempGroup } from "util/temp";

const cloakHolders = CreateGroup();

const onPickupItem = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) === CLOAK_TYPE )
		GroupAddUnit( cloakHolders, GetManipulatingUnit() );

};

const countCloaks = ( u: unit ): number => {

	let cloaks = 0;

	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		if ( GetItemTypeId( UnitItemInSlot( u, i ) ) === CLOAK_TYPE )
			cloaks ++;

	return cloaks;

};

const onDropItem = (): void => {

	if ( GetItemTypeId( GetManipulatedItem() ) === CLOAK_TYPE && countCloaks( GetManipulatingUnit() ) === 1 )
		GroupRemoveUnit( cloakHolders, GetManipulatingUnit() );

};

const tick = (): void => {

	let cloakHolder: unit;

	withTempGroup( tempCloakHolders => {

		BlzGroupAddGroupFast( cloakHolders, tempCloakHolders );

		// eslint-disable-next-line no-cond-assign
		while ( cloakHolder = FirstOfGroup( tempCloakHolders ) ) {

			const x = GetUnitX( cloakHolder );
			const y = GetUnitY( cloakHolder );
			let cloaks = 0;

			for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
				if ( GetItemTypeId( UnitItemInSlot( cloakHolder, i ) ) === CLOAK_TYPE )
					withTempGroup( unitsToDamage => {

						GroupEnumUnitsInRange( unitsToDamage, x, y, 256 + cloaks * 64, null );

						let damagedUnit;
						// eslint-disable-next-line no-cond-assign
						while ( damagedUnit = FirstOfGroup( unitsToDamage ) ) {

							if ( IsUnitType( damagedUnit, UNIT_TYPE_STRUCTURE ) && ! IsUnitAlly( damagedUnit, GetOwningPlayer( cloakHolder ) ) ) {

								const damage = IsUnitIllusion( cloakHolder ) ? 6 - cloaks : 15 - cloaks * 2;
								UnitDamageTarget( cloakHolder, damagedUnit, damage, true, false, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS );

							}

							GroupRemoveUnit( unitsToDamage, damagedUnit );

						}

						cloaks = cloaks + 1;

					} );

			GroupRemoveUnit( tempCloakHolders, cloakHolder );

		}

	} );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
	TriggerAddAction( t, onPickupItem );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DROP_ITEM );
	TriggerAddAction( t, onDropItem );

	t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 1, true );
	TriggerAddAction( t, tick );

} );
