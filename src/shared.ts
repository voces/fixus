
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

export const color: Array<string> = [];
export const dollyClick: Array<number> = [];
export const gameState: ( newState?: GAME_STATES ) => GAME_STATES = getterSetterFunc( "init" as GAME_STATES );
export const gemActivated: Array<boolean> = [];
export const goldFactor: ( newFactory?: number ) => number = getterSetterFunc( 1 );
export const isHere = (): boolean => GetPlayerSlotState( GetFilterPlayer() ) === PLAYER_SLOT_STATE_PLAYING;
export const myTimer = CreateTimer();
export const myTimerDialog = CreateTimerDialog( myTimer );
export const saveskills: Array<number> = [];
export const wws: Array<unit> = [];
export const sheeps: Array<unit> = [];
export const sheepTeam = CreateForce();
export const wispTeam = CreateForce();
export const wolfTeam = CreateForce();
export const wolves: Array<unit> = [];
export const WORLD_BOUNDS: ( newRect?: rect ) => rect = getterSetterFunc();
export const myArg: Array<string | null> = [];
export let myArgCount = 0;
export const s__wisp_type = FourCC( "eC01" );
export const s__misc_dolly = FourCC( "nshf" );
export const s__misc_dollySpeedAura = FourCC( "Aasl" );
export const s__sheep_blacktype = FourCC( "uC02" );
export const s__sheep_silvertype = FourCC( "u000" );
export const s__sheep_goldtype = FourCC( "u001" );

// const s__sheep_dolly = FourCC( "nshf" );
// const s__sheep_katama = FourCC( "n002" );
export const s__wolf_blacktype = FourCC( "E002" );
export const s__wolf_imbatype = FourCC( "E000" );
export const s__wolf_wwtype = FourCC( "eC16" );
// const s__wolf_wwitem = FourCC( "I003" );
// const s__wolf_wardtype = FourCC( "n001" );
// const s__wolf_wardability = FourCC( "A001" );
export const s__wolf_golemtype = FourCC( "ewsp" );
export const s__wolf_stalkertype = FourCC( "nfel" );
// const s__wolf_gem = FourCC( "gemt" );
export const s__sheep_type = FourCC( "uC04" );
export const s__wolf_type = FourCC( "EC03" );
export const s__wolf_cloakitem = FourCC( "clfm" );
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

// Grabs the player's main unit
export const mainUnit = ( p: player ): unit => {

	if ( GetPlayerId( p ) > 6 )

		return wolves[ GetPlayerId( p ) ];

	else

	if ( IsPlayerInForce( p, sheepTeam ) )

		return sheeps[ GetPlayerId( p ) ];

	else

		return wisps[ GetPlayerId( p ) ];

};

export const SmallText = ( amount: number, u: unit, cc: number, x: number, y: number ): void => {

	let tt: texttag;

	if ( GetUnitAbilityLevel( u, FourCC( "Alv1" ) ) <= 0 && IsVisibleToPlayer( GetUnitX( u ), GetUnitY( u ), GetLocalPlayer() ) ) {

		tt = CreateTextTag();
		SetTextTagPermanent( tt, false );
		SetTextTagPos( tt, GetUnitX( u ) + x, GetUnitY( u ) + y, 25 );
		SetTextTagText( tt, color[ cc ] + "+" + I2S( amount ), 0.0276 );
		SetTextTagColor( tt, 217, 217, 25, 0 );
		SetTextTagFadepoint( tt, 0 );
		SetTextTagVelocity( tt, 0, 0.027734375 );
		SetTextTagLifespan( tt, 3 );

	}

};
