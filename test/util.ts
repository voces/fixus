
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instrument = <T extends Array<any>, U>( name: string, fn: ( ...args: T ) => U ) => ( ...args: T ): U => {

	BJDebugMsg( name + " start" );
	const v = fn( ...args );
	BJDebugMsg( name + " end" );
	return v;

};

export const repeat = ( count: number, fn: () => void ): void => {

	for ( let i = 0; i < count; i ++ )
		fn();

};
