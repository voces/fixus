
import { removeQuickShop } from "abilities/wolves/quickShops";

export const replaceUnit = ( u: unit, newType: number ): unit => {

	// General unit props
	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );

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

	return u;

};
