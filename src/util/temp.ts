
// Groups

export const withTempGroup = <T>( fn: ( group: group ) => T ): T => {

	const g = CreateGroup();
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

export const forEachUnit = <T>( fn: ( unit: unit ) => void, filter?: boolexpr ): void => {

	const g = CreateGroup();
	GroupEnumUnitsInRange( g, 0, 0, 0x100000, filter || null );
	ForGroup( g, () => fn( GetEnumUnit() ) );
	DestroyGroup( g );

};

export const withPlayerUnits = <T>( player: player, fn: ( group: group ) => T, filter?: boolexpr ): T => {

	const g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, player, filter || null );
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

export const forEachPlayerUnit = <T>( player: player, fn: ( unit: unit ) => void, filter?: boolexpr ): void =>
	withPlayerUnits( player, g => ForGroup( g, () => fn( GetEnumUnit() ) ), filter );

export const reducePlayerUnits = <T>( player: player, fn: ( acc: T, unit: unit ) => T, initial: T, filter?: boolexpr ): T =>
	withPlayerUnits( player, g => {

		ForGroup( g, () => initial = fn( initial, GetEnumUnit() ) );
		return initial;

	}, filter );

export const withSelectedUnits = <T>( player: player, fn: ( group: group ) => T, filter?: boolexpr ): T => {

	const g = CreateGroup();
	GroupEnumUnitsSelected( g, player, filter || null );
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

export const forEachSelectedUnit = <T>( player: player, fn: ( unit: unit ) => T, filter?: boolexpr ): void =>
	withSelectedUnits( player, g => ForGroup( g, () => fn( GetEnumUnit() ) ), filter );

export const withUnitsInRange = <T>( x: number, y: number, radius: number, fn: ( group: group ) => T, filter?: boolexpr ): T => {

	const g = CreateGroup();
	GroupEnumUnitsInRange( g, x, y, radius, filter || null );
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

// Forces

export const withTempForce = <T>( fn: ( force: force ) => T ): T => {

	const f = CreateForce();
	const result = fn( f );
	DestroyForce( f );
	return result;

};

export const mapEachPlayer = <T>( fn: ( player: player ) => T ): Array<T> => {

	const arr: Array<T> = [];

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		arr.push( fn( Player( i ) ) );

	return arr;

};

export const forEachPlayer = ( fn: ( player: player ) => void ): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		fn( Player( i ) );

};

const timers: timer[] = [];
export const timeout = ( seconds: number, fn: () => void ): void => {

	const t = timers.length > 0 ? timers.pop() as timer : CreateTimer();

	TimerStart( t, seconds, false, () => {

		timers.push( t );
		fn();

	} );

};
