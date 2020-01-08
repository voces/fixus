
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
export const sheeps: Array<unit> = [];
export const sheepTeam = CreateForce();
export const wispTeam = CreateForce();
export const wolfTeam = CreateForce();
export const wolves: Array<unit> = [];
export const WORLD_BOUNDS: ( newRect?: rect ) => rect = getterSetterFunc();

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

const DisplayTimedText = ( duration: number, message: string ): void => {

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
