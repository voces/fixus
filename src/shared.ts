
// This file should not import anything from this repo except libs

import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { AbilityRangePreload } from "./misc/abilityPreload";

export const getterSetterFunc = <T>( init?: T ): ( newValue?: T ) => T => {

	let value = init;
	return ( newValue?: T ): T => {

		if ( newValue !== undefined )
			value = newValue;

		if ( value === undefined )
			throw new Error( "variable left undefined" );

		return value;

	};

};

type GAME_STATES = "init" | "start" | "play";

export const fillArray = <T>( size: number, value: T, arr: Array<T> = [] ): Array<T> => {

	for ( let i = 0; i < size; i ++ )
		arr.push( value );

	return arr;

};

export const fillArrayFn = <T>( size: number, fn: ( index: number ) => T, arr: Array<T> = [] ): Array<T> => {

	for ( let i = 0; i < size; i ++ )
		arr[ i ] = fn( i );

	return arr;

};

export const color = [
	"|CFFFF0303", "|CFF0042FF", "|CFF1CE6B9", "|CFF540081",
	"|CFFFFFF01", "|CFFFE8A0E", "|CFF20C000", "|CFFE55BB0",
	"|CFF959697", "|CFF7EBFF1", "|CFF106246", "|CFF4E2A04",
	"|CFF3F81F8", "|CFFC00040", "|CFFD9D919",
];
export const gameState: ( newState?: GAME_STATES ) => GAME_STATES = getterSetterFunc( "init" as GAME_STATES );
export const goldFactor: ( newFactory?: number ) => number = getterSetterFunc( 1 );
export const isHere = (): boolean => GetPlayerSlotState( GetFilterPlayer() ) === PLAYER_SLOT_STATE_PLAYING;
export const saveskills: Array<number> = fillArray( bj_MAX_PLAYERS, 0 );
export const wws: Array<unit> = [];
export const sheeps: Array<unit> = [];
export const sheepTeam = CreateForce();
export const wispTeam = CreateForce();
export const wolfTeam = CreateForce();
export const wolves: Array<unit> = [];
export const WISP_TYPE = FourCC( "eC01" );

export const BLACK_WOLF_TYPE = FourCC( "E002" );
export const IMBA_WOLF_TYPE = FourCC( "E000" );
export const WHITE_WOLF_TYPE = FourCC( "eC16" );
export const SHEEP_TYPE = FourCC( "uC04" );
export const WOLF_TYPE = FourCC( "EC03" );
export const CLOAK_TYPE = FourCC( "clfm" );
export const DOLLY_TYPE = FourCC( "nshf" );
export const wisps: Array<unit> = [];
export const isSandbox = getterSetterFunc( false );

let someInteger: number;

const countHereEnum = (): void => {

	if ( GetPlayerSlotState( GetEnumPlayer() ) === PLAYER_SLOT_STATE_PLAYING )
		someInteger = someInteger + 1;

};

// Counts players in force that are here
export const countHere = ( f: force ): number => {

	someInteger = 0;
	ForForce( f, countHereEnum );
	return someInteger;

};

const countHereRealEnum = (): void => {

	if ( GetPlayerSlotState( GetEnumPlayer() ) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController( GetEnumPlayer() ) === MAP_CONTROL_USER )
		someInteger = someInteger + 1;

};

// Counts players in force that are here
export const countHereReal = ( f: force ): number => {

	someInteger = 0;
	ForForce( f, countHereRealEnum );
	return someInteger;

};

export const DisplayTimedText = ( duration: number, message: string ): void => {

	let i = 0;

	while ( true ) {

		if ( i === bj_MAX_PLAYERS ) break;
		DisplayTimedTextToPlayer( Player( i ), 0, 0, duration, message );
		i = i + 1;

	}

};

export const TriggerRegisterPlayerChatEventAll = ( t: trigger, s: string, match: boolean ): void => {

	let i = 0;

	while ( true ) {

		if ( i === bj_MAX_PLAYERS ) break;
		TriggerRegisterPlayerChatEvent( t, Player( i ), s, match );
		i = i + 1;

	}

};

export const TriggerRegisterPlayerEventAll = ( t: trigger, e: playerevent ): void => {

	let i = 0;

	while ( true ) {

		if ( i === bj_MAX_PLAYERS ) break;
		TriggerRegisterPlayerEvent( t, Player( i ), e );
		i = i + 1;

	}

};

export const TriggerRegisterPlayerUnitEventAll = ( t: trigger, p: playerunitevent, b: boolexpr | null ): void => {

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		TriggerRegisterPlayerUnitEvent( t, Player( i ), p, b );

};

// Grabs the player's main unit
export const mainUnit = ( p: player ): unit => {

	const playerId = GetPlayerId( p );

	if ( IsPlayerInForce( p, wolfTeam ) )
		return wolves[ playerId ];

	if ( IsPlayerInForce( p, sheepTeam ) )
		return sheeps[ playerId ];

	return wisps[ playerId ];

};

export const wolfUnit = ( p: player ): unit => {

	if ( ! IsPlayerInForce( p, wolfTeam ) ) throw new Error( "used wolfUnit on non-wolf" );

	const playerId = GetPlayerId( p );
	const wolf = wolves[ playerId ];

	if ( GetUnitTypeId( wolf ) === WHITE_WOLF_TYPE )
		return wws[ playerId ];

	return wolf;

};

export const SmallText = ( amount: number, u: unit, cc: number, x: number, y: number ): void => {

	if ( GetUnitAbilityLevel( u, FourCC( "Alv1" ) ) <= 0 && IsVisibleToPlayer( GetUnitX( u ), GetUnitY( u ), GetLocalPlayer() ) ) {

		const tt = CreateTextTag();
		SetTextTagPermanent( tt, false );
		SetTextTagPos( tt, GetUnitX( u ) + x, GetUnitY( u ) + y, 25 );
		SetTextTagText( tt, `${color[ cc ]}+${amount}`, 0.0276 );
		SetTextTagColor( tt, 217, 217, 25, 0 );
		SetTextTagFadepoint( tt, 0 );
		SetTextTagVelocity( tt, 0, 0.027734375 );
		SetTextTagLifespan( tt, 3 );

	}

};

addScriptHook( W3TS_HOOK.MAIN_BEFORE, (): void => {

	SetMapFlag( MAP_SHARED_ADVANCED_CONTROL, true );

	ForceEnumAllies( sheepTeam, Player( 0 ), Condition( isHere ) );
	ForceEnumAllies( wolfTeam, Player( 11 ), Condition( isHere ) );

} );

export const BLACK_SHEEP_TYPE = FourCC( "uC02" );
export const SILVER_SHEEP_TYPE = FourCC( "u000" );
export const GOLD_SHEEP_TYPE = FourCC( "u001" );

const sheepTypes = [ SHEEP_TYPE, BLACK_SHEEP_TYPE, SILVER_SHEEP_TYPE, GOLD_SHEEP_TYPE ];
const wolfTypes = [ WOLF_TYPE, BLACK_WOLF_TYPE, IMBA_WOLF_TYPE ];

export const isUnitSheep = ( unit: unit ): boolean =>
	sheepTypes.includes( GetUnitTypeId( unit ) );

export const isUnitWolf = ( unit: unit ): boolean =>
	wolfTypes.includes( GetUnitTypeId( unit ) );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	AbilityRangePreload( FourCC( "A001" ), FourCC( "A00Q" ) );

} );
