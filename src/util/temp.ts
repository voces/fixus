
export const withTempGroup = <T>( fn: ( group: group ) => T ): T => {

	const g = CreateGroup();
	const result = fn( g );
	DestroyGroup( g );
	return result;

};

export const withTempForce = <T>( fn: ( force: force ) => T ): T => {

	const f = CreateForce();
	const result = fn( f );
	DestroyForce( f );
	return result;

};
