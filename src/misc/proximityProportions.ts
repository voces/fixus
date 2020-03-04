
import {
	BLACK_WOLF_TYPE,
	IMBA_WOLF_TYPE,
	sheeps,
	sheepTeam,
	WOLF_TYPE,
	wolfTeam,
} from "../shared";
import { forEachPlayer, reducePlayerUnits } from "../util/temp";

export const GOLEM_TYPE = FourCC( "ewsp" );
const STALKER_TYPE = FourCC( "nfel" );

type Point = {
    x: number;
    y: number;
}

type Amount = {
    gold?: number;
    lumber?: number;
    experience?: number;
}

const WIDTH = 5376 * 2;

const SHEEP_DISTANCE_FACTOR = 1 / 27;
const SHEEP_DENOM = ( WIDTH ** 2 * 2 - 128 ) ** SHEEP_DISTANCE_FACTOR;

const WOLF_DISTANCE_FACTOR = 1 / 9;
const WOLF_DENOM = ( WIDTH ** 2 * 2 - 128 ) ** WOLF_DISTANCE_FACTOR;

const UNIT_FACTORS: Record<number, number> = {
	[ WOLF_TYPE ]: 1,
	[ BLACK_WOLF_TYPE ]: 1,
	[ IMBA_WOLF_TYPE ]: 1,
	[ GOLEM_TYPE ]: 0.5,
	[ STALKER_TYPE ]: 0.5,
};
const unitFactor = ( unit: unit ): number => {

	const baseFactor = UNIT_FACTORS[ GetUnitTypeId( unit ) ];

	// no entry or hardcoded 0
	if ( ! baseFactor || baseFactor <= 0 ) return 0;

	// illusions give 50%
	if ( IsUnitIllusion( unit ) ) return baseFactor * 0.50;

	return baseFactor;

};

export const normalize = ( arr: number[] ): number[] => {

	const sum = arr.reduce( ( sum, v ) => sum + v, 0 );
	return arr.map( v => v / sum );

};

const sheepProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if ( ! IsPlayerInForce( p, sheepTeam ) ) return;

		const distanceSquared = ( GetUnitX( sheeps[ GetPlayerId( p ) ] ) - x ) ** 2 + ( GetUnitY( sheeps[ GetPlayerId( p ) ] ) - y ) ** 2;
		const proportion = 1 - Math.max( distanceSquared - 128, 0 ) ** SHEEP_DISTANCE_FACTOR / SHEEP_DENOM;

		proportions.push( proportion );
		players.push( p );

	} );
	proportions = normalize( proportions );

	// calculate amounts
	const proportionAmounts: Map<player, Amount> = new Map();
	let remainders = { gold: 0, lumber: 0, experience: 0 };
	for ( let i = 0; i < players.length; i ++ ) {

		const reals = {
			gold: ( amounts.gold || 0 ) * proportions[ i ] + remainders.gold,
			lumber: ( amounts.lumber || 0 ) * proportions[ i ] + remainders.lumber,
			experience: ( amounts.experience || 0 ) * proportions[ i ] + remainders.experience,
		};

		const integers = {
			gold: Math.round( reals.gold ),
			lumber: Math.round( reals.lumber ),
			experience: Math.round( reals.experience ),
		};

		remainders = {
			gold: integers.gold - reals.gold,
			lumber: integers.lumber - reals.lumber,
			experience: integers.experience - reals.experience,
		};

		proportionAmounts.set( players[ i ], integers );

	}

	return proportionAmounts;

};

// wolves shouldn't have too many units, so fine to iterate over them all
const wolfProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if ( ! IsPlayerInForce( p, wolfTeam ) ) return;

		const proportion = reducePlayerUnits( p, ( max, unit ) => {

			const distanceSquared = ( GetUnitX( unit ) - x ) ** 2 + ( GetUnitY( unit ) - y ) ** 2;
			const proportion = ( 1 - Math.max( distanceSquared - 128, 0 ) ** WOLF_DISTANCE_FACTOR / WOLF_DENOM ) * unitFactor( unit );
			if ( proportion > max )	return proportion;
			return max;

		}, 0 );

		proportions.push( proportion );
		players.push( p );

	} );
	proportions = normalize( proportions );

	// calculate amounts
	const proportionAmounts: Map<player, Amount> = new Map();
	let remainders = { gold: 0, lumber: 0, experience: 0 };
	for ( let i = 0; i < proportions.length; i ++ ) {

		const reals = {
			gold: ( amounts.gold || 0 ) * proportions[ i ] + remainders.gold,
			lumber: ( amounts.lumber || 0 ) * proportions[ i ] + remainders.lumber,
			experience: ( amounts.experience || 0 ) * proportions[ i ] + remainders.experience,
		};

		const integers = {
			gold: Math.round( reals.gold ),
			lumber: Math.round( reals.lumber ),
			experience: Math.round( reals.experience ),
		};

		remainders = {
			gold: reals.gold - integers.gold,
			lumber: reals.lumber - integers.lumber,
			experience: reals.experience - integers.experience,
		};

		proportionAmounts.set( players[ i ], integers );

	}

	return proportionAmounts;

};

export const proximityProportions = (
	origin: Point,
	amounts: Amount,
	killer: player,
): Map<player, Amount> => {

	if ( IsPlayerInForce( killer, wolfTeam ) )
		return wolfProximityProportions( origin, amounts );

	return sheepProximityProportions( origin, amounts );

};
