
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
} from "shared";
import { forEachPlayer, reducePlayerUnits } from "util/temp";
import { adjustPlayerGold } from "resources/goldPerSecond";
import { isPlayingPlayer, isComputer } from "./player";

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

/**
 * Returns an array where all values sum to 1.
 */
export const normalize = ( arr: number[] ): number[] => {

	const sum = arr.reduce( ( sum, v ) => sum + v, 0 );
	return arr.map( v => v / sum );

};

/**
 * Returns a sigmoid function using the passed constants.
 * @param v Controls the impact of inflection.
 * @param b Linear transformer on `t`.
 * @param c Controls how far t=0 is along the curve.
 */
const sigmoid = ( v: number, b: number, c: number ):
( ( t: number ) => number ) => {

	const cTetrated = c ** c;
	const k = ( cTetrated + 1 ) ** v;
	return ( t: number ): number =>
		k / ( cTetrated + Math.exp( b * t ) ) ** v;

};

const sheepSigmoid = sigmoid( 0.04, 0.03, 4 );

const sheepProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if (
			! IsPlayerInForce( p, sheepTeam ) ||
			! isPlayingPlayer( p ) && ! isComputer( p )
		) return;

		const xDelta = GetUnitX( sheeps[ GetPlayerId( p ) ] ) - x;
		const yDelta = GetUnitY( sheeps[ GetPlayerId( p ) ] ) - y;
		const distance = ( xDelta ** 2 + yDelta ** 2 ) ** 0.5;
		const proportion = sheepSigmoid( distance );

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

const wispSigmoid = sigmoid( 0.08, 0.08, 8 );

const wispProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if (
			! IsPlayerInForce( p, wispTeam ) ||
			! isPlayingPlayer( p ) && ! isComputer( p )
		) return;

		const xDelta = GetUnitX( wisps[ GetPlayerId( p ) ] ) - x;
		const yDelta = GetUnitY( wisps[ GetPlayerId( p ) ] ) - y;
		const distance = ( xDelta ** 2 + yDelta ** 2 ) ** 0.5;
		const proportion = wispSigmoid( distance );

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

const wolfSheepKillSigmoid = sigmoid( 0.01, 0.02, 4 );
const wolfOtherKillSigmoid = sigmoid( 0.04, 0.04, 4 );

// wolves shouldn't have too many units, so fine to iterate over them all
const wolfProximityProportions = (
	{ x, y }: Point,
	amounts: Amount,
	killType: "sheep" | "other" = "other",
): Map<player, Amount> => {

	// calculate proportions, which is the max of the players' units' proportion
	const players: player[] = [];
	let proportions: number[] = [];
	forEachPlayer( p => {

		if ( ! IsPlayerInForce( p, wolfTeam ) ) return;

		const proportion = reducePlayerUnits( p, ( max, unit ) => {

			const xDelta = GetUnitX( unit ) - x;
			const yDelta = GetUnitY( unit ) - y;
			const distance = ( xDelta ** 2 + yDelta ** 2 ) ** 0.5;
			const proportion = ( killType === "sheep" ?
				wolfSheepKillSigmoid :
				wolfOtherKillSigmoid
			)( distance ) * unitFactor( unit );

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
	killType: "sheep" | "other" = "other",
): Map<player, Amount> => {

	if ( IsPlayerInForce( killer, wolfTeam ) )
		return wolfProximityProportions( origin, amounts, killType );

	if ( IsPlayerInForce( killer, sheepTeam ) )
		return sheepProximityProportions( origin, amounts );

	return wispProximityProportions( origin, amounts );

};

export const awardBounty = (
	origin: Point,
	amounts: Amount,
	killer: player,
	killType: "sheep" | "other" = "other",
): void => {

	const bounties = proximityProportions( origin, amounts, killer, killType );

	bounties.forEach( ( bounty, player ) => {

		let offsets = 0;

		if ( bounty.gold && bounty.gold > 0 ) {

			adjustPlayerGold( player, bounty.gold );
			SmallText( bounty.gold, mainUnit( player ), "gold", offsets * 16, offsets * - 64 );
			offsets ++;

		}

		if ( bounty.experience && bounty.experience > 0 ) {

			const unit = wolfUnit( player );

			if ( ! unit ) return;

			AddHeroXP( unit, bounty.experience, true );
			SmallText( bounty.experience, unit, "purple", offsets * 16, offsets * - 64 );
			offsets ++;

		}

		if ( bounty.lumber && bounty.lumber > 0 ) {

			const unit = wolfUnit( player );

			if ( ! unit ) return;

			AddHeroXP( unit, bounty.lumber, true );
			SmallText( bounty.lumber, unit, "darkgreen", offsets * 16, offsets * - 64 );
			offsets ++;

		}

	} );

};
