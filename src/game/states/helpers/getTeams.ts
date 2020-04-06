import { isSandbox } from "shared";

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

enum Direction {
	wolves = - 1,
	sheep = 1,
}

export const forceTeams = (
	sheep: Array<player>,
	wolves: Array<player>,
	idealSheep: number,
	history: Map<player, number>,
): void => {

	const [ direction, source, target, ideal ] = sheep.length > idealSheep ?
		[ Direction.wolves, sheep, wolves, sheep.length + wolves.length - idealSheep ] :
		[ Direction.sheep, wolves, sheep, idealSheep ];

	while ( target.length < ideal ) {

		if ( source.length === 0 )
			throw "not enough players";

		let high = Infinity * direction;
		const pool = source.reduce( ( pool, player ) => {

			const playerHistory = history.get( player ) || 0;
			if (
				// drafting towards wolf; get most sheep
				direction === Direction.sheep && playerHistory < high ||
				direction === Direction.wolves && playerHistory > high
			) {

				high = playerHistory;
				pool = [];

			}

			if ( playerHistory === high )
				pool.push( player );

			return pool;

		}, [] as Array<player> );

		while ( target.length < ideal && pool.length > 0 ) {

			const r = GetRandomInt( 0, pool.length - 1 );
			const p = pool.splice( r, 1 )[ 0 ];
			target.push( p );
			source.splice( source.indexOf( p ), 1 );

		}

	}

};

export const getTeams = (
	playerPreferences: Map<player, {preference: "sheep" | "wolf" | "none"; netPreference: number}>,
): {sheep: Array<player>; wolves: Array<player>} => {

	const entries = [ ...playerPreferences.entries() ];

	if ( isSandbox() )
		return {
			sheep: entries.filter( p => p[ 1 ].preference !== "wolf" ).map( p => p[ 0 ] ),
			wolves: entries.filter( p => p[ 1 ].preference === "wolf" ).map( p => p[ 0 ] ),
		};

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

	// return if we're good!
	if ( sheep.length === idealSheep ) return { sheep, wolves };

	const history = new Map( entries.map( ( [ player, data ] ) => [ player, data.netPreference ] ) );
	forceTeams( sheep, wolves, idealSheep, history );

	return { sheep, wolves };

};
