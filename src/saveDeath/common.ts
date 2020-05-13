
import { removeQuickShop } from "abilities/wolves/quickShops";
import { getDummy } from "util/dummy";
import { timeout } from "util/temp";

const BLOODLUST_ABILITY_ID = FourCC( "A00I" );
const BLOODLUST_BUFF_ID = FourCC( "Bblo" );

const buffLevelMap: Map<unit, number> = new Map();

export const getBloodlustLevel = ( u: unit ): number => {

	const hasBloodlust = GetUnitAbilityLevel( u, BLOODLUST_BUFF_ID ) > 0;
	return hasBloodlust ? buffLevelMap.get( u ) ?? 0 : 0;

};

export const bloodlust = ( target: unit, level = getBloodlustLevel( target ) + 1 ): void => {

	buffLevelMap.set( target, level );

	const dummy = getDummy();
	UnitAddAbility( dummy, BLOODLUST_ABILITY_ID );
	SetUnitAbilityLevel( dummy, BLOODLUST_ABILITY_ID, level );
	SetUnitX( dummy, GetUnitX( target ) );
	SetUnitY( dummy, GetUnitY( target ) );

	IssueTargetOrder( dummy, "bloodlust", target );

};

export const replaceUnit = ( u: unit, newType: number ): unit => {

	// General unit props
	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );
	const bloodlustLevel = getBloodlustLevel( u );

	// Copy hero props
	const xp = GetHeroXP( u );
	const it: Array<number> = [];
	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );

	// Remove it
	removeQuickShop( u );
	RemoveUnit( u );

	// Create a new one
	u = CreateUnit( p, newType, x, y, f );
	SelectUnitForPlayerSingle( u, p );

	// Copy hero props
	SetHeroXP( u, xp, false );
	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		UnitAddItem( u, CreateItem( it[ i ], x, y ) );

	// replacement always happens with a +level
	timeout( "replaceUnit", 0.01, () => bloodlust( u, bloodlustLevel + 1 ) );

	return u;

};
