
// This file should not import anything from this repo except libs

import { addScriptHook, W3TS_HOOK } from "w3ts";
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

export const fillArray = <T>( size: number, value: T ): Array<T> => {

	const arr = [];
	for ( let i = 0; i < size; i ++ )
		arr.push( value );

	return arr;

};

export const fillArrayFn = <T>( size: number, fn: ( index: number ) => T, arr: Array<T> = [] ): Array<T> => {

	for ( let i = 0; i < size; i ++ )
		arr[ i ] = fn( i );

	return arr;

};

export const color: Array<string> = [];
export const gameState: ( newState?: GAME_STATES ) => GAME_STATES = getterSetterFunc( "init" as GAME_STATES );
export const goldFactor: ( newFactory?: number ) => number = getterSetterFunc( 1 );
export const isHere = (): boolean => GetPlayerSlotState( GetFilterPlayer() ) === PLAYER_SLOT_STATE_PLAYING;
export const myTimer = CreateTimer();
export const myTimerDialog = CreateTimerDialog( myTimer );
export const saveskills: Array<number> = fillArray( bj_MAX_PLAYERS, 0 );
export const wws: Array<unit> = [];
export const sheeps: Array<unit> = [];
export const sheepTeam = CreateForce();
export const wispTeam = CreateForce();
export const wolfTeam = CreateForce();
export const wolves: Array<unit> = [];
export const WORLD_BOUNDS: ( newRect?: rect ) => rect = getterSetterFunc();
export const WISP_TYPE = FourCC( "eC01" );

export const s__wolf_blacktype = FourCC( "E002" );
export const s__wolf_imbatype = FourCC( "E000" );
export const s__wolf_wwtype = FourCC( "eC16" );
export const SHEEP_TYPE = FourCC( "uC04" );
export const WOLF_TYPE = FourCC( "EC03" );
export const s__wolf_cloakitem = FourCC( "clfm" );
export const DOLLY_TYPE = FourCC( "nshf" );
export const wisps: Array<unit> = [];

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

let gameEnded = false;
const defeatString = "Yooz bee uhn disgreysd too shahkruh!";
// Ends the game, awarding wins/loses and other W3MMD data
export const endGame = ( winner: number ): void => {

	let i = 0;

	if ( gameEnded )

		return;

	gameEnded = true;
	TimerDialogDisplay( myTimerDialog, false );
	DisplayTimedText( 120, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
	// todo: this should be nullable
	TimerStart( myTimer, 15, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( myTimerDialog, "Ending in..." );
	TimerDialogDisplay( myTimerDialog, true );

	if ( winner < 1 )

		while ( true ) {

			if ( i === 12 ) break;

			if ( IsPlayerInForce( Player( i ), sheepTeam ) ) {

				SetUnitInvulnerable( sheeps[ i ], true );
				BlzSetUnitBaseDamage( sheeps[ i ], 4999, 0 );
				SetUnitMoveSpeed( sheeps[ i ], 522 );
				BlzSetUnitRealField( sheeps[ i ], UNIT_RF_SIGHT_RADIUS, 5000 );

			}

			i = i + 1;

		}

	TriggerSleepAction( 15 );

	DisplayTimedText( 120, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
	i = 0;

	while ( true ) {

		if ( i === 12 ) break;

		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

			if ( winner < 1 ) {

				CustomVictoryBJ( Player( i ), true, true );

			} else {

				CustomDefeatBJ( Player( i ), defeatString );

			}

		else

		if ( winner > 1 )

			CustomVictoryBJ( Player( i ), true, true );

		else

			CustomDefeatBJ( Player( i ), defeatString );

		i = i + 1;

	}

};

// Returns the index in which string part is found in string whole
export const InStr = ( whole: string, part: string ): number => {

	let index = 0;

	while ( true ) {

		if ( StringLength( whole ) - index < StringLength( part ) ) break;

		if ( SubString( whole, index, StringLength( part ) + index ) === part )

			return index;

		index = index + 1;

	}

	return - 1;

};

export const myArg: Array<string | null> = [];
export let myArgCount = 0;
// Splits a string into arguments around string c. If bb true, first argument is ignored.
export const Split = ( s: string, c: string, bb: boolean ): void => {

	let i = 0;
	let n = 0;

	while ( true ) {

		if ( i === myArgCount ) break;
		myArg[ i ] = null;
		i = i + 1;

	}

	i = 0;

	if ( bb )

		while ( true ) {

			if ( SubString( s, 0, 1 ) === c ) break;
			s = SubString( s, 1, StringLength( s ) );

		}

	s = SubString( s, 1, StringLength( s ) );

	while ( true ) {

		if ( s === null ) break;
		i = 0;

		while ( true ) {

			if ( SubString( s, i, i + 1 ) === c || SubString( s, i, i + 1 ) === null ) break;
			i = i + 1;

		}

		myArg[ n ] = SubString( s, 0, i );
		s = SubString( s, i + 1, StringLength( s ) );
		n = n + 1;

	}

	myArgCount = n;

};

let si__splitarray_I = 0;
let si__splitarray_F = 0;
export const s__splitarray: Array<string> = [];
const si__splitarray_V: Array<number> = [];

// Generated allocator of splitarray
const s__splitarray__allocate = (): number => {

	let _this = si__splitarray_F;

	if ( _this !== 0 )

		si__splitarray_F = si__splitarray_V[ _this ];

	else {

		si__splitarray_I = si__splitarray_I + 4;
		_this = si__splitarray_I;

	}

	if ( _this > 8187 )

		return 0;

	si__splitarray_V[ _this ] = - 1;
	return _this;

};

// processed :type splitarray extends string array[4]
export const Split2 = ( str: string, separator: string ): number => {

	let i = 0;
	let n = 0;
	let last = 0;
	const separatorLength = StringLength( separator );
	const strLength = StringLength( str );
	const targetLength = strLength - separatorLength;
	const substrings = s__splitarray__allocate();

	while ( true ) {

		if ( i >= targetLength || n >= 4 ) break;

		if ( SubString( str, i, i + separatorLength ) === separator ) {

			s__splitarray[ substrings + n ] = SubString( str, last, i );
			n = n + 1;
			i = i + separatorLength;
			last = i;

		}

		i = i + 1;

	}

	if ( last < strLength && n < 4 )

		s__splitarray[ substrings + n ] = SubString( str, last, strLength );

	return substrings;

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

export const TriggerRegisterPlayerUnitEventAll = ( t: trigger, p: playerunitevent, b: boolexpr ): void => {

	let i = 0;

	while ( true ) {

		if ( i === bj_MAX_PLAYERS ) break;
		TriggerRegisterPlayerUnitEvent( t, Player( i ), p, b );
		i = i + 1;

	}

};

// Grabs the player's main unit
export const mainUnit = ( p: player ): unit => {

	if ( GetPlayerId( p ) > 6 )
		return wolves[ GetPlayerId( p ) ];

	if ( IsPlayerInForce( p, sheepTeam ) )
		return sheeps[ GetPlayerId( p ) ];

	return wisps[ GetPlayerId( p ) ];

};

export const SmallText = ( amount: number, u: unit, cc: number, x: number, y: number ): void => {

	if ( GetUnitAbilityLevel( u, FourCC( "Alv1" ) ) <= 0 && IsVisibleToPlayer( GetUnitX( u ), GetUnitY( u ), GetLocalPlayer() ) ) {

		const tt = CreateTextTag();
		SetTextTagPermanent( tt, false );
		SetTextTagPos( tt, GetUnitX( u ) + x, GetUnitY( u ) + y, 25 );
		SetTextTagText( tt, color[ cc ] + "+" + I2S( amount ), 0.0276 );
		SetTextTagColor( tt, 217, 217, 25, 0 );
		SetTextTagFadepoint( tt, 0 );
		SetTextTagVelocity( tt, 0, 0.027734375 );
		SetTextTagLifespan( tt, 3 );

	}

};

export const grimEffect = ( u: unit ): void => {

	AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );
	AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "origin" );

};

addScriptHook( W3TS_HOOK.MAIN_BEFORE, (): void => {

	WORLD_BOUNDS( GetWorldBounds() );
	SetMapFlag( MAP_SHARED_ADVANCED_CONTROL, true );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		saveskills[ i ] = 0;

	color[ 0 ] = "|CFFFF0303";
	color[ 1 ] = "|CFF0042FF";
	color[ 2 ] = "|CFF1CE6B9";
	color[ 3 ] = "|CFF540081";
	color[ 4 ] = "|CFFFFFF01";
	color[ 5 ] = "|CFFFE8A0E";
	color[ 6 ] = "|CFF20C000";
	color[ 7 ] = "|CFFE55BB0";
	color[ 8 ] = "|CFF959697";
	color[ 9 ] = "|CFF7EBFF1";
	color[ 10 ] = "|CFF106246";
	color[ 11 ] = "|CFF4E2A04";
	color[ 12 ] = "|CFF3F81F8";
	color[ 13 ] = "|CFFC00040";
	color[ 14 ] = "|CFFD9D919";

	ForceEnumAllies( sheepTeam, Player( 0 ), Condition( isHere ) );
	ForceEnumAllies( wolfTeam, Player( 11 ), Condition( isHere ) );

} );

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	AbilityRangePreload( FourCC( "A001" ), FourCC( "A00P" ) );

} );
