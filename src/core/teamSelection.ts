
const IDEAL_SHEEP: Record<number, number> = {
	1: 1,
	2: 1,
	3: 2,
	4: 2,
	5: 3,
	6: 4,
	7: 5,
	8: 5,
	9: 6,
	10: 7,
	11: 8,
	12: 8,
};

export const forceTeams = (
	targetTeam: Array<player>,
	sourceTeam: Array<player>,
	targetSize: number,
	direction: - 1 | 1,
	history: Map<player, number>,
): void => {

	while ( targetTeam.length < targetSize ) {

		let high = - Infinity * direction;
		const pool = sourceTeam.reduce( ( pool, player ) => {

			const playerHistory = history.get( player ) || Infinity;
			if (
				// drafting towards wolf; get most sheep
				direction === - 1 && playerHistory > high ||
				direction === 1 && playerHistory < high
			) {

				high = playerHistory;
				pool = [];

			}

			if ( playerHistory === high )
				pool.push( player );

			return pool;

		}, [] as Array<player> );

		while ( targetTeam.length < targetSize && pool.length > 0 ) {

			const r = GetRandomInt( 0, pool.length - 1 );
			const p = pool.splice( r, 1 )[ 0 ];
			targetTeam.push( p );
			sourceTeam.splice( sourceTeam.indexOf( p ), 1 );

		}

	}

};

export const getTeams = (
	playerPreferences: Map<player, {preference: "sheep" | "wolf" | "none"; netPreference: number}>,
): {sheep: Array<player>; wolves: Array<player>} => {

	const entries = Array.from( playerPreferences.entries() );
	const playerCount = entries.length;

	const idealSheep = IDEAL_SHEEP[ playerCount ];
	const idealWolves = playerCount - idealSheep;

	const [ sheep, wolves, none ] = entries.reduce( ( desires, [ player, data ] ) => {

		if ( data.preference === "sheep" ) desires[ 0 ].push( player );
		else if ( data.preference === "wolf" ) desires[ 1 ].push( player );
		else desires[ 2 ].push( player );

		return desires;

	}, [[], [], []] as Array<player[]> );

	// draft from none first
	while ( sheep.length < idealSheep && none.length > 0 ) {

		const r = GetRandomInt( 0, none.length - 1 );
		sheep.push( none.splice( r, 1 )[ 0 ] );

	}
	while ( wolves.length < idealWolves && none.length > 0 ) {

		const r = GetRandomInt( 0, none.length - 1 );
		wolves.push( none.splice( r, 1 )[ 0 ] );

	}

	if ( sheep.length === idealSheep ) return { sheep, wolves };

	const history = new Map( entries.map( ( [ player, data ] ) => [ player, data.netPreference ] ) );

	if ( sheep.length < idealSheep ) forceTeams( sheep, wolves, idealSheep, 1, history );
	else forceTeams( wolves, sheep, idealWolves, - 1, history );

	return { sheep, wolves };

};
