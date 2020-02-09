
// globals from MMD:
export const LIBRARY_MMD = true;
export const MMD_GOAL_NONE = 101;
export const MMD_GOAL_HIGH = 102;
export const MMD_GOAL_LOW = 103;

export const MMD_TYPE_STRING = 101;
export const MMD_TYPE_REAL = 102;
export const MMD_TYPE_INT = 103;

export const MMD_OP_ADD = 101;
export const MMD_OP_SUB = 102;
export const MMD_OP_SET = 103;

export const MMD_SUGGEST_NONE = 101;
export const MMD_SUGGEST_TRACK = 102;
export const MMD_SUGGEST_LEADERBOARD = 103;

export const MMD_FLAG_DRAWER = 101;
export const MMD_FLAG_LOSER = 102;
export const MMD_FLAG_WINNER = 103;
export const MMD_FLAG_LEAVER = 104;
export const MMD_FLAG_PRACTICING = 105;
export const MMD__SHOW_DEBUG_MESSAGES = false;

export const MMD__chars = "bj_MAX3456789_-+= \\!@#$^&*()/?>.<,;:'\"{}[]|`~";
export const MMD__num_chars = StringLength( MMD__chars );
export const MMD__flags: Array<string> = [];
export const MMD__goals: Array<string> = [];
export const MMD__ops: Array<string> = [];
export const MMD__types: Array<string> = [];
export const MMD__suggestions: Array<string> = [];
export let MMD__initialized = false;

export let MMD__gc: gamecache;
export const MMD__ESCAPED_CHARS = " \\";

export const MMD__CURRENT_VERSION = 1;
export const MMD__MINIMUM_PARSER_VERSION = 1;
export const MMD__FILENAME = "MMD.Dat";
export const MMD__M_KEY_VAL = "val:";
export const MMD__M_KEY_CHK = "chk:";
export const MMD__NUM_SENDERS_NAIVE = 1;
export const MMD__NUM_SENDERS_SAFE = 3;
export let MMD__num_senders = MMD__NUM_SENDERS_NAIVE;
export let MMD__num_msg = 0;

export const MMD__clock = CreateTimer();
export const MMD__q_msg: Array<string> = [];
export const MMD__q_time: Array<number> = [];
export const MMD__q_index: Array<number> = [];
export let MMD__q_head = 0;
export let MMD__q_tail = 0;
// endglobals from MMD

// JASSHelper struct globals:
export const si__MMD__QueueNode = 1;
export let si__MMD__QueueNode_F = 0;
export let si__MMD__QueueNode_I = 0;
export const si__MMD__QueueNode_V: Array<number> = [];
export const s__MMD__QueueNode_timeout: Array<number> = [];
export const s__MMD__QueueNode_msg: Array<string | null> = [];
export const s__MMD__QueueNode_checksum: Array<number> = [];
export const s__MMD__QueueNode_key: Array<string | null> = [];
export const s__MMD__QueueNode_next: Array<number> = [];
export let st__MMD__QueueNode_onDestroy: trigger;
export let f__arg__this: number;

// Generated method caller for MMD__QueueNode.onDestroy
export const sc__MMD__QueueNode_onDestroy = ( _this: number ): void => {

	FlushStoredInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_msg[ _this ] || "" );
	FlushStoredInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_key[ _this ] || "" );
	s__MMD__QueueNode_msg[ _this ] = null;
	s__MMD__QueueNode_key[ _this ] = null;
	s__MMD__QueueNode_next[ _this ] = 0;

};

// Generated allocator of MMD__QueueNode
export const s__MMD__QueueNode__allocate = (): number => {

	let _this = si__MMD__QueueNode_F;

	if ( _this !== 0 )

		si__MMD__QueueNode_F = si__MMD__QueueNode_V[ _this ];

	else {

		si__MMD__QueueNode_I = si__MMD__QueueNode_I + 1;
		_this = si__MMD__QueueNode_I;

	}

	if ( _this > 8190 )

		return 0;

	s__MMD__QueueNode_next[ _this ] = 0;
	si__MMD__QueueNode_V[ _this ] = - 1;
	return _this;

};

// Generated destructor of MMD__QueueNode
export const sc__MMD__QueueNode_deallocate = ( _this: number ): void => {

	if ( _this === null )

		return;

	else if ( si__MMD__QueueNode_V[ _this ] !== - 1 )

		return;

	f__arg__this = _this;
	TriggerEvaluate( st__MMD__QueueNode_onDestroy );
	si__MMD__QueueNode_V[ _this ] = si__MMD__QueueNode_F;
	si__MMD__QueueNode_F = _this;

};

// library MMD:

// /////////////////////////////////////////////////////////////
// / Private variables and constants
// /////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////
// / Private functions
// /////////////////////////////////////////////////////////////

// /Triggered when tampering is detected. Increases the number of safeguards against tampering.
export const MMD_RaiseGuard = ( reason: string ): void => {

	print( reason );
	MMD__num_senders = MMD__NUM_SENDERS_SAFE;

};

// /Returns seconds elapsed in game time
export const MMD__time = (): number => TimerGetElapsed( MMD__clock );

// /Initializes the char-to-int conversion
export const MMD__prepC2I = (): void => {

	let i = 0;
	let id: string;

	while ( true ) {

		if ( i >= MMD__num_chars ) break;
		id = SubString( MMD__chars, i, i + 1 );

		if ( id === StringCase( id, true ) )

			id = id + "U";

		StoreInteger( MMD__gc, "c2i", id, i );
		i = i + 1;

	}

};

// /Converts a character to an integer
export const MMD__C2I = ( c: string ): number => {

	let i: number;
	let id = c;

	if ( id === StringCase( id, true ) )

		id = id + "U";

	i = GetStoredInteger( MMD__gc, "c2i", id );

	if ( ( i < 0 || i >= MMD__num_chars || SubString( MMD__chars, i, i + 1 ) !== c ) && HaveStoredInteger( MMD__gc, "c2i", id ) ) {

		// A cheater sent a fake sync to screw with the cached values
		i = 0;

		while ( true ) {

			if ( i >= MMD__num_chars ) break;

			if ( c === SubString( MMD__chars, i, i + 1 ) ) {

				MMD_RaiseGuard( "c2i poisoned" );
				StoreInteger( MMD__gc, "c2i", id, i );
				if ( true ) break;

			}

			i = i + 1;

		}

	}

	return i;

};

// /Computes a weak hash value, hopefully secure enough for our purposes
export const MMD__poor_hash = ( s: string, seed: number ): number => {

	const n = StringLength( s );
	let m = n + seed;
	let i = 0;

	while ( true ) {

		if ( i >= n ) break;
		m = m * 41 + MMD__C2I( SubString( s, i, i + 1 ) );
		i = i + 1;

	}

	return m;

};

// /Stores previously sent messages for tamper detection purposes
export const s__MMD__QueueNode_create = ( id: number, msg: string ): number => {

	const _this = s__MMD__QueueNode__allocate();
	s__MMD__QueueNode_timeout[ _this ] = MMD__time() + 7 + GetRandomReal( 0, 2 + 0.1 * GetPlayerId( GetLocalPlayer() ) );
	s__MMD__QueueNode_msg[ _this ] = msg;
	s__MMD__QueueNode_checksum[ _this ] = MMD__poor_hash( s__MMD__QueueNode_msg[ _this ] || "", id );
	s__MMD__QueueNode_key[ _this ] = I2S( id );
	return _this;

};

export const s__MMD__QueueNode_onDestroy = ( _this: number ): void => {

	FlushStoredInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_msg[ _this ] || "" );
	FlushStoredInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_key[ _this ] || "" );
	s__MMD__QueueNode_msg[ _this ] = null;
	s__MMD__QueueNode_key[ _this ] = null;
	s__MMD__QueueNode_next[ _this ] = 0;

};

// Generated destructor of MMD__QueueNode
export const s__MMD__QueueNode_deallocate = ( _this: number ): void => {

	if ( _this === null )

		return;

	else if ( si__MMD__QueueNode_V[ _this ] !== - 1 )

		return;

	s__MMD__QueueNode_onDestroy( _this );
	si__MMD__QueueNode_V[ _this ] = si__MMD__QueueNode_F;
	si__MMD__QueueNode_F = _this;

};

export const s__MMD__QueueNode_send = ( _this: number ): void => {

	StoreInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_msg[ _this ] || "", s__MMD__QueueNode_checksum[ _this ] );
	StoreInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_key[ _this ] || "", s__MMD__QueueNode_checksum[ _this ] );
	SyncStoredInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_msg[ _this ] || "" );
	SyncStoredInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ _this ], s__MMD__QueueNode_key[ _this ] || "" );

};

// /Returns true for a fixed size uniform random subset of players in the game
export const MMD__isEmitter = (): boolean => {

	let i = 0;
	let n = 0;
	let r: number;
	const picks: Array<number> = [];
	const pick_flags: Array<boolean> = [];

	while ( true ) {

		if ( i >= bj_MAX_PLAYERS ) break;

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_USER && GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING ) {

			if ( n < MMD__num_senders ) {

				picks[ n ] = i;
				pick_flags[ i ] = true;

			} else {

				r = GetRandomInt( 0, n );

				if ( r < MMD__num_senders ) {

					pick_flags[ picks[ r ] ] = false;
					picks[ r ] = i;
					pick_flags[ i ] = true;

				}

			}

			n = n + 1;

		}

		i = i + 1;

	}

	return pick_flags[ GetPlayerId( GetLocalPlayer() ) ];

};

// /Places meta-data in the replay and in network traffic
export const MMD__emit = ( message: string ): void => {

	if ( ! MMD__initialized ) {

		BJDebugMsg( "MMD Emit Error: Library not initialized yet." );
		return;

	}

	// remember sent messages for tamper check
	const q = s__MMD__QueueNode_create( MMD__num_msg, message );

	if ( MMD__q_head === 0 )

		MMD__q_head = q;

	else

		s__MMD__QueueNode_next[ MMD__q_tail ] = q;

	MMD__q_tail = q;

	// send new message
	MMD__num_msg = MMD__num_msg + 1;

	if ( MMD__isEmitter() )

		s__MMD__QueueNode_send( q );

};

// /Performs tamper checks
export const MMD__tick = (): void => {

	let q: number;
	let i: number;

	// check previously sent messages for tampering
	q = MMD__q_head;

	while ( true ) {

		if ( q === 0 || s__MMD__QueueNode_timeout[ q ] >= MMD__time() ) break;

		if ( ! HaveStoredInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ q ], s__MMD__QueueNode_msg[ q ] || "" ) ) {

			MMD_RaiseGuard( "message skipping" );
			s__MMD__QueueNode_send( q );

		} else if ( ! HaveStoredInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ q ], s__MMD__QueueNode_key[ q ] || "" ) ) {

			MMD_RaiseGuard( "checksum skipping" );
			s__MMD__QueueNode_send( q );

		} else if ( GetStoredInteger( MMD__gc, MMD__M_KEY_VAL + s__MMD__QueueNode_key[ q ], s__MMD__QueueNode_msg[ q ] || "" ) !== s__MMD__QueueNode_checksum[ q ] ) {

			MMD_RaiseGuard( "message tampering" );
			s__MMD__QueueNode_send( q );

		} else if ( GetStoredInteger( MMD__gc, MMD__M_KEY_CHK + s__MMD__QueueNode_key[ q ], s__MMD__QueueNode_key[ q ] || "" ) !== s__MMD__QueueNode_checksum[ q ] ) {

			MMD_RaiseGuard( "checksum tampering" );
			s__MMD__QueueNode_send( q );

		}

		MMD__q_head = s__MMD__QueueNode_next[ q ];
		s__MMD__QueueNode_deallocate( q );
		q = MMD__q_head;

	}

	if ( MMD__q_head === 0 )

		MMD__q_tail = 0;

	// check for future message tampering
	i = 0;

	while ( true ) {

		if ( ! HaveStoredInteger( MMD__gc, MMD__M_KEY_CHK + I2S( MMD__num_msg ), I2S( MMD__num_msg ) ) ) break;
		MMD_RaiseGuard( "message insertion" );
		MMD__emit( "Blank" );
		i = i + 1;
		if ( i >= 10 ) break;

	}

};

// /Replaces control characters with escape sequences
export const MMD__pack = ( value: string ): string => {

	let j: number;
	let i = 0;
	let result = "";
	let c: string;

	while ( true ) {

		if ( i >= StringLength( value ) ) break;
		c = SubString( value, i, i + 1 );
		j = 0;

		while ( true ) {

			if ( j >= StringLength( MMD__ESCAPED_CHARS ) ) break;
			// escape control characters

			if ( c === SubString( MMD__ESCAPED_CHARS, j, j + 1 ) ) {

				c = "\\" + c;
				if ( true ) break;

			}

			j = j + 1;

		}

		result = result + c;
		i = i + 1;

	}

	return result;

};

// /Updates the value of a defined variable for a given player
export const MMD__update_value = ( name: string, p: player, op: string, value: string, val_type: number ): void => {

	const id = GetPlayerId( p );

	if ( p === null || id < 0 || id >= bj_MAX_PLAYERS )

		BJDebugMsg( "MMD Set Error: Invalid player. Must be P1 to P24." );

	else if ( val_type !== GetStoredInteger( MMD__gc, "types", name ) )

		BJDebugMsg( "MMD Set Error: Updated value of undefined variable or used value of incorrect type." );

	else if ( StringLength( op ) === 0 )

		BJDebugMsg( "MMD Set Error: Unrecognized operation type." );

	else if ( StringLength( name ) > 50 )

		BJDebugMsg( "MMD Set Error: Variable name is too long." );

	else if ( StringLength( name ) === 0 )

		BJDebugMsg( "MMD Set Error: Variable name is empty." );

	else

		MMD__emit( "VarP " + I2S( id ) + " " + MMD__pack( name ) + " " + op + " " + value );

};

// /Defines an event's arguments and format
export const MMD__DefineEvent = ( name: string, format: string, ...args: string[] ): void => {

	if ( GetStoredInteger( MMD__gc, "events", name ) !== 0 )

		BJDebugMsg( "MMD DefEvent Error: Event redefined." );

	else {

		StoreInteger( MMD__gc, "events", name, args.length + 1 );
		MMD__emit( "DefEvent " + MMD__pack( name ) + " " + I2S( args.length ) + " " + args.map( arg => MMD__pack( arg ) ).join( " " ) + MMD__pack( format ) );

	}

};

// /Places an event in the meta-data
export const MMD__LogEvent = ( name: string, ...args: string[] ): void => {

	if ( GetStoredInteger( MMD__gc, "events", name ) !== args.length + 1 )

		BJDebugMsg( `MMD LogEvent Error: Event not defined or defined with different # of args. Expected ${GetStoredInteger( MMD__gc, "events", name )}, got ${args.length + 1}` );

	else

		MMD__emit( "Event " + MMD__pack( name ) + " " + args.map( arg => MMD__pack( arg ) ).join( " " ) );

};

// /////////////////////////////////////////////////////////////
// / Public functions
// /////////////////////////////////////////////////////////////

// /Sets a player flag like "win_on_leave"
export const MMD_FlagPlayer = ( p: player, flag_type: number ): void => {

	const flag = MMD__flags[ flag_type ];
	const id = GetPlayerId( p );

	if ( p === null || id < 0 || id >= bj_MAX_PLAYERS )
		BJDebugMsg( "MMD Flag Error: Invalid player. Must be P1 to P24." );

	else if ( StringLength( flag ) === 0 )
		BJDebugMsg( "MMD Flag Error: Unrecognized flag type." );

	else if ( GetPlayerController( Player( id ) ) === MAP_CONTROL_USER )
		MMD__emit( "FlagP " + I2S( id ) + " " + flag );

};

// /Defines a variable to store things in
export const MMD_DefineValue = ( name: string, value_type: number, goal_type: number, suggestion_type: number ): void => {

	const goal = MMD__goals[ goal_type ];
	const vtype = MMD__types[ value_type ];
	const stype = MMD__suggestions[ suggestion_type ];

	if ( goal === null )
		BJDebugMsg( "MMD Def Error: Unrecognized goal type." );

	else if ( vtype === null )
		BJDebugMsg( "MMD Def Error: Unrecognized value type." );

	else if ( stype === null )
		BJDebugMsg( "Stats Def Error: Unrecognized suggestion type." );

	else if ( StringLength( name ) > 32 )
		BJDebugMsg( "MMD Def Error: Variable name is too long." );

	else if ( StringLength( name ) === 0 )
		BJDebugMsg( "MMD Def Error: Variable name is empty." );

	else if ( value_type === MMD_TYPE_STRING && goal_type !== MMD_GOAL_NONE )
		BJDebugMsg( "MMD Def Error: Strings must have goal type of none." );

	else if ( GetStoredInteger( MMD__gc, "types", name ) !== 0 )
		BJDebugMsg( "MMD Def Error: Value redefined." );

	else {

		StoreInteger( MMD__gc, "types", name, value_type );
		MMD__emit( "DefVarP " + MMD__pack( name ) + " " + vtype + " " + goal + " " + stype );

	}

};

// /Updates the value of an integer variable
export const MMD_UpdateValueInt = ( name: string, p: player, op: number, value: number ): void => {

	MMD__update_value( name, p, MMD__ops[ op ], I2S( value ), MMD_TYPE_INT );

};

// /Updates the value of a real variable
export const MMD_UpdateValueReal = ( name: string, p: player, op: number, value: number ): void => {

	MMD__update_value( name, p, MMD__ops[ op ], R2S( value ), MMD_TYPE_REAL );

};

// /Updates the value of a string variable
export const MMD_UpdateValueString = ( name: string, p: player, value: string ): void => {

	const q = "\"";
	MMD__update_value( name, p, MMD__ops[ MMD_OP_SET ], q + MMD__pack( value ) + q, MMD_TYPE_STRING );

};

// /Emits meta-data which parsers will ignore unless they are customized to understand it
export const MMD_LogCustom = ( unique_identifier: string, data: string ): void => {

	MMD__emit( "custom " + MMD__pack( unique_identifier ) + " " + MMD__pack( data ) );

};

// /////////////////////////////////////////////////////////////
// / Initialization
// /////////////////////////////////////////////////////////////

// /Emits initialization data
export const MMD__init2 = (): void => {

	let i: number;
	MMD__initialized = true;

	MMD__emit( "init version " + I2S( MMD__MINIMUM_PARSER_VERSION ) + " " + I2S( MMD__CURRENT_VERSION ) );

	i = 0;

	while ( true ) {

		if ( i >= bj_MAX_PLAYERS ) break;

		if ( GetPlayerController( Player( i ) ) === MAP_CONTROL_USER && GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )

			MMD__emit( "init pid " + I2S( i ) + " " + MMD__pack( GetPlayerName( Player( i ) ) ) );

		i = i + 1;

	}

	const t = CreateTrigger();
	TriggerAddAction( t, MMD__tick );
	TriggerRegisterTimerEvent( t, 0.37, true );

};

// /Places init2 on a timer, initializes game cache, and translates constants
export const MMD__init = (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0, false );
	TriggerAddAction( t, MMD__init2 );

	MMD__goals[ MMD_GOAL_NONE ] = "none";
	MMD__goals[ MMD_GOAL_HIGH ] = "high";
	MMD__goals[ MMD_GOAL_LOW ] = "low";

	MMD__types[ MMD_TYPE_INT ] = "int";
	MMD__types[ MMD_TYPE_REAL ] = "real";
	MMD__types[ MMD_TYPE_STRING ] = "string";

	MMD__suggestions[ MMD_SUGGEST_NONE ] = "none";
	MMD__suggestions[ MMD_SUGGEST_TRACK ] = "track";
	MMD__suggestions[ MMD_SUGGEST_LEADERBOARD ] = "leaderboard";

	MMD__ops[ MMD_OP_ADD ] = "+=";
	MMD__ops[ MMD_OP_SUB ] = "-=";
	MMD__ops[ MMD_OP_SET ] = "=";

	MMD__flags[ MMD_FLAG_DRAWER ] = "drawer";
	MMD__flags[ MMD_FLAG_LOSER ] = "loser";
	MMD__flags[ MMD_FLAG_WINNER ] = "winner";
	MMD__flags[ MMD_FLAG_LEAVER ] = "leaver";
	MMD__flags[ MMD_FLAG_PRACTICING ] = "practicing";

	FlushGameCache( InitGameCache( MMD__FILENAME ) );
	MMD__gc = InitGameCache( MMD__FILENAME );
	TimerStart( MMD__clock, 999999999, false, () => { /* do nothing */ } );
	MMD__prepC2I();

};

// library MMD ends
