
export const withTempGroup = <T>( fn: ( group: group ) => T ): T => {

	const g = CreateGroup();
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

export const forEachPlayerUnit = <T>( player: player, fn: ( unit: unit ) => void, filter?: boolexpr ): void => {

	const g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, player, filter || null );
	ForGroup( g, () => fn( GetEnumUnit() ) );
	DestroyGroup( g );

};

export const reducePlayerUnits = <T>( player: player, fn: ( acc: T, unit: unit ) => T, initial: T, filter?: boolexpr ): T => {

	const g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, player, filter || null );
	ForGroup( g, () => initial = fn( initial, GetEnumUnit() ) );
	DestroyGroup( g );
	return initial;

};

export const withTempForce = <T>( fn: ( force: force ) => T ): T => {

	const f = CreateForce();
	const result = fn( f );
	DestroyForce( f );
	return result;

};