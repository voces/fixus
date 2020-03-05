
import {
	BLACK_WOLF_TYPE,
	IMBA_WOLF_TYPE,
	mainUnit,
	sheeps,
	sheepTeam,
	SmallText,
	wisps,
	wispTeam,
	WOLF_TYPE,
	wolfTeam,
	wolfUnit,
} from "../shared";
import { forEachPlayer, reducePlayerUnits } from "../util/temp";
import { log } from "util/log";

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

const WISP_DISTANCE_FACTOR = 1 / 27;
const WISP_DENOM = ( ( WIDTH / 10 ) ** 2 * 2 - 128 ) ** WISP_DISTANCE_FACTOR;

const WOLF_DISTANCE_FACTOR = 1 / 9;
const WOLF_DENOM = ( WIDTH ** 2 * 2 - 128 ) ** WOLF_DISTANCE_FACTOR;

const UNIT_FACTORS: Record<number, number> = {
	[ WOLF_TYPE ]: 1,
	[ BLACK_WOLF_TYPE ]: 1,
	[ IMBA_WOLF_TYPE ]: 1,
	[ GOLEM_TYPE ]: 0.75,
	[ STALKER_TYPE ]: 0.75,
};
const unitFactor = ( unit: unit ): number => {

	const baseFactor = UNIT_FACTORS[ GetUnitTypeId( unit ) ];

	// no entry or hardcoded 0
	if ( ! baseFactor || baseFactor <= 0 ) return 0;

	// illusions give 75%
	if ( IsUnitIllusion( unit ) ) return baseFactor * 0.75;

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

const wispProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if ( ! IsPlayerInForce( p, wispTeam ) ) return;

		const distanceSquared = ( GetUnitX( wisps[ GetPlayerId( p ) ] ) - x ) ** 2 + ( GetUnitY( wisps[ GetPlayerId( p ) ] ) - y ) ** 2;
		const proportion = 1 - Math.max( distanceSquared - 128, 0 ) ** WISP_DISTANCE_FACTOR / WISP_DENOM;

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
			log( GetUnitName( unit ), GetPlayerName( p ), {
				origin: { x, y },
				unit: { x: GetUnitX( unit ), y: GetUnitY( unit ) },
				xDelta: GetUnitX( unit ) - x,
				yDelta: GetUnitY( unit ) - y,
				distanceSquared,
				proportion,
			} );
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

	if ( IsPlayerInForce( killer, sheepTeam ) )
		return sheepProximityProportions( origin, amounts );

	return wispProximityProportions( origin, amounts );

};

export const awardBounty = (
	origin: Point,
	amounts: Amount,
	killer: player,
): void => {

	const bounties = proximityProportions( origin, amounts, killer );

	bounties.forEach( ( bounty, player ) => {

		let offsets = 0;

		if ( bounty.gold && bounty.gold > 0 ) {

			AdjustPlayerStateBJ( bounty.gold, player, PLAYER_STATE_RESOURCE_GOLD );
			SmallText( bounty.gold, mainUnit( player ), 14, offsets * 16, offsets * - 64 );
			offsets ++;

		}

		if ( bounty.experience && bounty.experience > 0 ) {

			const unit = wolfUnit( player );

			if ( ! unit ) return;

			AddHeroXP( unit, bounty.experience, true );
			SmallText( bounty.experience, unit, 3, offsets * 16, offsets * - 64 );
			offsets ++;

		}

		if ( bounty.lumber && bounty.lumber > 0 ) {

			const unit = wolfUnit( player );

			if ( ! unit ) return;

			AddHeroXP( unit, bounty.lumber, true );
			SmallText( bounty.lumber, unit, 10, offsets * 16, offsets * - 64 );
			offsets ++;

		}

	} );

};
