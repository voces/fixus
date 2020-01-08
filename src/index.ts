
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: remove empty imports if used by other files
import "./misc/fileIO";
import "./core/init";
import "./core/game";
import "./sheep/factoryFarm";
import "./sheep/specialization";
import "./wolves/cloakOfFlames";
import "./wolves/dragonFire";
import "./wolves/scoutPhoenixUpgrade";

// // Generated
// let gg_rct_Pen: rect;
// let gg_trg_coreInit: trigger;
// let gg_trg_coreGame: trigger;
// let gg_trg_miscFace: trigger;
// let gg_trg_miscFriendlyAttack: trigger;
// let gg_trg_miscSmartSave: trigger;
// let gg_trg_miscFiveMinuteAction: trigger;
// let gg_trg_miscDollyMove: trigger;
// let gg_trg_sheepCommands: trigger;
// let gg_trg_sheepJotyeFarm: trigger;
// let gg_trg_eggGem: trigger;
// let gg_trg_eggDolly: trigger;

// const wisps: Array<unit> = [];
// const wws: Array<unit> = [];
// const myArg: Array<string | null> = [];
// let myArgCount = 0;

// const quickBuyTax = 1.5;
// const quickSellTax = 0.5;
// const sheepZoom: Array<number> = [];
// const wolfZoom: Array<number> = [];
// const wwTimer: Array<timer> = [];
// const wwTimerDialog: Array<timerdialog> = [];
// let katama = true;
// const dollyTimer: Array<timer> = [];
// const dollyTimerDialog: Array<timerdialog> = [];

// JASSHelper struct globals:
// const s__sheep_blacktype = FourCC( "uC02" );
// const s__sheep_silvertype = FourCC( "u000" );
// const s__sheep_goldtype = FourCC( "u001" );
// const s__sheep_xability = FourCC( "A00D" );
// const s__sheep_dolly = FourCC( "nshf" );
// const s__sheep_katama = FourCC( "n002" );
// const s__wisp_type = FourCC( "eC01" );
// const s__wolf_blacktype = FourCC( "E002" );
// const s__wolf_imbatype = FourCC( "E000" );
// const s__wolf_wwtype = FourCC( "eC16" );
// const s__wolf_wwitem = FourCC( "I003" );
// const s__wolf_wardtype = FourCC( "n001" );
// const s__wolf_wardability = FourCC( "A001" );
// const s__wolf_golemtype = FourCC( "ewsp" );
// const s__wolf_stalkertype = FourCC( "nfel" );
// const s__wolf_gem = FourCC( "gemt" );
// const s__misc_dolly = FourCC( "nshf" );
// const s__misc_dollySpeedAura = FourCC( "Aasl" );
// let si__splitarray_I = 0;
// let si__splitarray_F = 0;
// const s__splitarray: Array<string> = [];
// const si__splitarray_V: Array<number> = [];

// // Generated allocator of splitarray
// const s__splitarray__allocate = (): number => {

// 	let _this = si__splitarray_F;

// 	if ( _this !== 0 )

// 		si__splitarray_F = si__splitarray_V[ _this ];

// 	else {

// 		si__splitarray_I = si__splitarray_I + 4;
// 		_this = si__splitarray_I;

// 	}

// 	if ( _this > 8187 )

// 		return 0;

// 	si__splitarray_V[ _this ] = - 1;
// 	return _this;

// };

// // ***************************************************************************
// // *
// // *  Custom Script Code
// // *
// // ***************************************************************************

// // Duh
// const TriggerRegisterPlayerEventAll = ( t: trigger, e: playerevent ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerEvent( t, Player( i ), e );
// 		i = i + 1;

// 	}

// };

// // Duh
// const TriggerRegisterPlayerUnitEventAll = ( t: trigger, p: playerunitevent, b: boolexpr ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerUnitEvent( t, Player( i ), p, b );
// 		i = i + 1;

// 	}

// };

// // Duh
// const TriggerRegisterPlayerChatEventAll = ( t: trigger, s: string, match: boolean ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerChatEvent( t, Player( i ), s, match );
// 		i = i + 1;

// 	}

// };

// // Splits a string into arguments around string c. If bb true, first argument is ignored.
// const Split = ( s: string, c: string, bb: boolean ): void => {

// 	let i = 0;
// 	let n = 0;

// 	while ( true ) {

// 		if ( i === myArgCount ) break;
// 		myArg[ i ] = null;
// 		i = i + 1;

// 	}

// 	i = 0;

// 	if ( bb )

// 		while ( true ) {

// 			if ( SubString( s, 0, 1 ) === c ) break;
// 			s = SubString( s, 1, StringLength( s ) );

// 		}

// 	s = SubString( s, 1, StringLength( s ) );

// 	while ( true ) {

// 		if ( s === null ) break;
// 		i = 0;

// 		while ( true ) {

// 			if ( SubString( s, i, i + 1 ) === c || SubString( s, i, i + 1 ) === null ) break;
// 			i = i + 1;

// 		}

// 		myArg[ n ] = SubString( s, 0, i );
// 		s = SubString( s, i + 1, StringLength( s ) );
// 		n = n + 1;

// 	}

// 	myArgCount = n;

// };

// // processed :type splitarray extends string array[4]
// const Split2 = ( str: string, separator: string ): number => {

// 	let i = 0;
// 	let n = 0;
// 	let last = 0;
// 	const separatorLength = StringLength( separator );
// 	const strLength = StringLength( str );
// 	const targetLength = strLength - separatorLength;
// 	const substrings = s__splitarray__allocate();

// 	while ( true ) {

// 		if ( i >= targetLength || n >= 4 ) break;

// 		if ( SubString( str, i, i + separatorLength ) === separator ) {

// 			s__splitarray[ substrings + n ] = SubString( str, last, i );
// 			n = n + 1;
// 			i = i + separatorLength;
// 			last = i;

// 		}

// 		i = i + 1;

// 	}

// 	if ( last < strLength && n < 4 )

// 		s__splitarray[ substrings + n ] = SubString( str, last, strLength );

// 	return substrings;

// };

// const SmallText = ( amount: number, u: unit, cc: number, x: number, y: number ): void => {

// 	let tt: texttag;

// 	if ( GetUnitAbilityLevel( u, FourCC( "Alv1" ) ) <= 0 && IsVisibleToPlayer( GetUnitX( u ), GetUnitY( u ), GetLocalPlayer() ) ) {

// 		tt = CreateTextTag();
// 		SetTextTagPermanent( tt, false );
// 		SetTextTagPos( tt, GetUnitX( u ) + x, GetUnitY( u ) + y, 25 );
// 		SetTextTagText( tt, color[ cc ] + "+" + I2S( amount ), 0.0276 );
// 		SetTextTagColor( tt, 217, 217, 25, 0 );
// 		SetTextTagFadepoint( tt, 0 );
// 		SetTextTagVelocity( tt, 0, 0.027734375 );
// 		SetTextTagLifespan( tt, 3 );

// 	}

// };

// const countHereRealEnum = (): void => {

// 	if ( GetPlayerSlotState( GetEnumPlayer() ) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController( GetEnumPlayer() ) === MAP_CONTROL_USER )

// 		someInteger = someInteger + 1;

// };

// // Counts players in force that are here
// const countHereReal = ( f: force ): number => {

// 	someInteger = 0;
// 	ForForce( f, countHereRealEnum );
// 	return someInteger;

// };

// // Grabs the player's main unit
// const mainUnit = ( p: player ): unit => {

// 	if ( GetPlayerId( p ) > 6 )

// 		return wolves[ GetPlayerId( p ) ];

// 	else

// 	if ( IsPlayerInForce( p, sheepTeam ) )

// 		return sheeps[ GetPlayerId( p ) ];

// 	else

// 		return wisps[ GetPlayerId( p ) ];

// };

// // ***************************************************************************
// // *
// // *  Triggers
// // *
// // ***************************************************************************

// // ===========================================================================
// // Trigger: changelog
// // ===========================================================================

// // ===========================================================================
// // Trigger: miscClean
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_miscClean_Actions = (): void => {

// 	if ( IsUnitType( GetTriggerUnit(), UNIT_TYPE_HERO ) === false ) {

// 		TriggerSleepAction( 5 );
// 		RemoveUnit( GetTriggerUnit() );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscClean = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_miscClean_Actions );

// };

// // ===========================================================================
// // Trigger: miscGoldTick
// // ===========================================================================
// const filterActiveUsers = (): boolean => GetPlayerController( GetFilterPlayer() ) !== MAP_CONTROL_COMPUTER && GetPlayerSlotState( GetFilterPlayer() ) !== PLAYER_SLOT_STATE_LEFT;

// const Trig_miscGoldTick_Actions = (): void => {

// 	let i = 0;
// 	let n: number;
// 	let t: number;
// 	let f: force;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor );

// 		else {

// 			t = countHereReal( wolfTeam );

// 			if ( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) > 0 && t > 0 && ModuloInteger( GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ), t ) === 0 && ( GetPlayerController( Player( i ) ) === MAP_CONTROL_COMPUTER || GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_LEFT ) ) {

// 				n = 0;
// 				f = CreateForce();
// 				ForceEnumAllies( f, Player( i ), Condition( filterActiveUsers ) );

// 				while ( true ) {

// 					if ( n === 12 ) break;

// 					if ( IsPlayerInForce( Player( n ), f ) )

// 						SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) / t );

// 					n = n + 1;

// 				}

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, 0 );
// 				DestroyForce( f );

// 			}

// 		}

// 		i = i + 1;

// 	}

// };

// const Trig_miscSavingTick_Actions = (): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) )

// 			if ( saveskills[ i ] >= 25 ) {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 8 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

// 			} else {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "ohun" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "otbk" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 2 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h009" ) ) );
// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + 4 * goldFactor * GetPlayerUnitTypeCount( Player( i ), FourCC( "h00A" ) ) );

// 			}

// 		else

// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + goldFactor );

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_miscGoldTick = (): void => {

// 	let t = CreateTrigger();
// 	TriggerRegisterTimerEvent( t, 2, true );
// 	TriggerAddAction( t, Trig_miscGoldTick_Actions );
// 	t = CreateTrigger();
// 	TriggerRegisterTimerEvent( t, 4, true );
// 	TriggerAddAction( t, Trig_miscSavingTick_Actions );

// };

// // ===========================================================================
// // Trigger: miscZoom
// // ===========================================================================

// const Trig_miscZoom_Actions = (): void => {

// 	let zoom: number;
// 	const playerId = GetPlayerId( GetTriggerPlayer() );

// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "zoom" && myArg[ 0 ] !== "z" )

// 		return;

// 	zoom = S2R( myArg[ 1 ] || "" );

// 	if ( zoom === 0 )

// 		if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) ) {

// 			zoom = wolfZoom[ playerId ];

// 		} else {

// 			zoom = sheepZoom[ playerId ];

// 		}

// 	if ( zoom <= 0 )

// 		zoom = 1650;

// 	while ( true ) {

// 		if ( zoom > 400 ) break;
// 		zoom = zoom * 10;

// 	}

// 	if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		wolfZoom[ playerId ] = zoom;

// 	else

// 		sheepZoom[ playerId ] = zoom;

// 	if ( GetLocalPlayer() === GetTriggerPlayer() ) {

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, zoom, 0 );
// 		s__File_close( s__File_write( s__File_open( "fixus/zooms.txt" ), R2S( sheepZoom[ playerId ] ) + " " + R2S( wolfZoom[ playerId ] ) ) );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscZoom = (): void => {

// 	const t = CreateTrigger();
// 	const zooms = Split2( s__File_readAndClose( s__File_open( "fixus/zooms.txt" ) ) || "", " " );

// 	TriggerRegisterPlayerChatEventAll( t, "-zoom", false );
// 	TriggerRegisterPlayerChatEventAll( t, "-z", false );
// 	TriggerAddAction( t, Trig_miscZoom_Actions );

// 	sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms ] );

// 	if ( sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

// 		sheepZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

// 	wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = S2R( s__splitarray[ zooms + 1 ] );

// 	if ( wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] === 0 )

// 		wolfZoom[ GetPlayerId( GetLocalPlayer() ) ] = 1650;

// 	if ( IsPlayerInForce( GetLocalPlayer(), wolfTeam ) )

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, wolfZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

// 	else

// 		SetCameraField( CAMERA_FIELD_TARGET_DISTANCE, sheepZoom[ GetPlayerId( GetLocalPlayer() ) ], 0 );

// };

// // ===========================================================================
// // Trigger: miscAngle
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_miscAngle_Actions = (): void => {

// 	Split( GetEventPlayerChatString(), " ", true );

// 	if ( myArgCount === 1 && GetLocalPlayer() === GetTriggerPlayer() )

// 		SetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK, S2R( myArg[ 0 ] || "" ), 0 );

// };

// // ===========================================================================
// const InitTrig_miscAngle = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-angle ", false );
// 	TriggerRegisterPlayerChatEventAll( t, "-a ", false );
// 	TriggerAddAction( t, Trig_miscAngle_Actions );

// };

// // ===========================================================================
// // Trigger: miscGold
// // ===========================================================================

// const miscGold_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const senderId: number = GetPlayerId( GetTriggerPlayer() );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );
// 	let gold: number;

// 	if ( myArg[ 0 ] !== "g" )

// 		return;

// 	if ( receiverId >= 0 && receiverId <= 11 && IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING && GetTriggerPlayer() !== receiver ) {

// 		gold = S2I( myArg[ 2 ] || "" );

// 		if ( gold === 0 )

// 			gold = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD );

// 		if ( gold === 0 )

// 			return;

// 		DisplayTextToPlayer( receiver, 0, 0, color[ senderId ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
// 		DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, I2S( gold ) + " gold given to " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );
// 		SetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( receiver, PLAYER_STATE_RESOURCE_GOLD ) + gold );
// 		SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - gold );

// 	}

// };

// // ===========================================================================
// const InitTrig_miscGold = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-g ", false );
// 	TriggerAddAction( t, miscGold_Actions );

// };

// // ===========================================================================
// // Trigger: miscControl
// // ===========================================================================

// const Trig_miscControl_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );

// 	if ( myArg[ 0 ] !== "c" || receiverId < 0 || receiverId > 11 || ! ( IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING ) )

// 		return;

// 	// Grant control
// 	SetPlayerAllianceStateBJ( GetTriggerPlayer(), receiver, bj_ALLIANCE_ALLIED_ADVUNITS );
// 	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control given to " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );

// };

// // ===========================================================================
// const InitTrig_miscControl = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-c ", false );
// 	TriggerAddAction( t, Trig_miscControl_Actions );

// };

// // ===========================================================================
// // Trigger: miscUncontrol
// // ===========================================================================

// const Trig_miscUncontrol_Actions = (): void => {

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );
// 	const receiverId: number = S2I( myArg[ 1 ] || "" ) - 1;
// 	const receiver: player = Player( receiverId );

// 	if ( myArg[ 0 ] !== "uc" || receiverId < 0 || receiverId > 11 || ! ( IsPlayerAlly( GetTriggerPlayer(), receiver ) && GetPlayerSlotState( receiver ) === PLAYER_SLOT_STATE_PLAYING ) )

// 		return;

// 	// Remove control
// 	SetPlayerAllianceStateBJ( GetTriggerPlayer(), receiver, bj_ALLIANCE_ALLIED_VISION );
// 	DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "Control taken from " + color[ receiverId ] + GetPlayerName( receiver ) + "|r." );

// };

// // ===========================================================================
// const InitTrig_miscUncontrol = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-uc ", false );
// 	TriggerAddAction( t, Trig_miscUncontrol_Actions );

// };

// // ===========================================================================
// // Trigger: miscLeaves
// // ===========================================================================

// const IsSameTeam = ( a: player, b: player ): boolean => IsPlayerInForce( a, wolfTeam ) && IsPlayerInForce( b, wolfTeam ) || ! IsPlayerInForce( a, wolfTeam ) && ! IsPlayerInForce( b, wolfTeam );

// const IsPlayerHere = ( checkPlayer: player ): boolean => GetPlayerSlotState( checkPlayer ) === PLAYER_SLOT_STATE_PLAYING && GetPlayerController( checkPlayer ) === MAP_CONTROL_USER;

// const Trig_miscLeaves_Actions = (): void => {

// 	let i = 0;
// 	const gold: number = GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) / i;
// 	const f = CreateForce();

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsSameTeam( GetTriggerPlayer(), Player( i ) ) && IsPlayerHere( Player( i ) ) )

// 			ForceAddPlayer( f, Player( i ) );

// 		i = i + 1;

// 	}

// 	// Divy out resources
// 	i = countHere( f );

// 	if ( i > 1 )

// 		i = i - 1;

// 	i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( IsPlayerInForce( Player( i ), f ) ) {

// 			SetPlayerAllianceStateBJ( GetTriggerPlayer(), Player( i ), bj_ALLIANCE_ALLIED_ADVUNITS );
// 			DisplayTextToPlayer( Player( i ), 0, 0, color[ GetPlayerId( GetTriggerPlayer() ) ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave you " + I2S( gold ) + " gold." );
// 			SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + gold );

// 		}

// 		i = i + 1;

// 	}

// 	SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, 0 );
// 	DestroyForce( f );

// 	// Update name
// 	SetPlayerName( GetTriggerPlayer(), "|r" + GetPlayerName( GetTriggerPlayer() ) );
// 	reloadMultiboard();

// 	// Remove main unit if sheep or wisp

// 	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) || IsPlayerInForce( GetTriggerPlayer(), wispTeam ) )

// 		RemoveUnit( mainUnit( GetTriggerPlayer() ) );

// 	// End game if last

// 	if ( IsPlayerInForce( GetTriggerPlayer(), sheepTeam ) && countHere( sheepTeam ) === 1 )

// 		endGame( 2 );

// 	else if ( IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) && countHere( wolfTeam ) === 1 )

// 		endGame( 0 );

// };

// // ===========================================================================
// const InitTrig_miscLeaves = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
// 	TriggerAddAction( t, Trig_miscLeaves_Actions );

// };

// // ===========================================================================
// // Trigger: miscFace
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const miscFace_Actions = (): void => {

// 	const g = CreateGroup();
// 	let u: unit;
// 	Split( GetEventPlayerChatString(), " ", true );
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), null );

// 	while ( true ) {

// 		u = FirstOfGroup( g );
// 		if ( u === null ) break;

// 		if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "+" )

// 			SetUnitFacing( u, GetUnitFacing( u ) + S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

// 		else if ( SubString( myArg[ 0 ] || "", 0, 1 ) === "-" )

// 			SetUnitFacing( u, GetUnitFacing( u ) - S2R( SubString( myArg[ 0 ] || "", 1, StringLength( myArg[ 0 ] || "" ) - 7 ) ) );

// 		else

// 			SetUnitFacing( u, S2R( myArg[ 0 ] || "" ) );

// 		GroupRemoveUnit( g, u );

// 	}

// 	DestroyGroup( g );

// };

// // ===========================================================================
// const InitTrig_miscFace = (): void => {

// 	gg_trg_miscFace = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( gg_trg_miscFace, "-face ", false );
// 	TriggerAddAction( gg_trg_miscFace, miscFace_Actions );

// };

// // ===========================================================================
// // Trigger: miscFriendlyAttack
// // ===========================================================================

// const miscFriendlyAttack_Actions = (): void => {

// 	const attacked = GetTriggerUnit();

// 	if ( IsUnitAlly( attacked, GetOwningPlayer( GetAttacker() ) ) && GetUnitTypeId( attacked ) !== s__wisp_type && IsUnitType( attacked, UNIT_TYPE_STRUCTURE ) )

// 		KillUnit( attacked );

// };

// // ===========================================================================
// const InitTrig_miscFriendlyAttack = (): void => {

// 	gg_trg_miscFriendlyAttack = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscFriendlyAttack, EVENT_PLAYER_UNIT_ATTACKED );
// 	TriggerAddAction( gg_trg_miscFriendlyAttack, miscFriendlyAttack_Actions );

// };

// // ===========================================================================
// // Trigger: miscKillReturn
// // ===========================================================================

// const Trig_miscKillReturn_Actions = (): void => {

// 	const gold = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) * goldFactor;
// 	const xp = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE ) * goldFactor;

// 	if ( GetKillingUnit() !== null && IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetTriggerUnit() ) ) === false ) {

// 		if ( gold > 0 ) {

// 			SetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetOwningPlayer( GetKillingUnit() ), PLAYER_STATE_RESOURCE_GOLD ) + gold );
// 			SmallText( gold, GetTriggerUnit(), 14, 0, 0 );

// 		}

// 		if ( xp > 0 ) {

// 			SetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ), GetHeroXP( mainUnit( GetOwningPlayer( GetKillingUnit() ) ) ) + xp, true );
// 			SmallText( xp, GetTriggerUnit(), 3, 16, - 32 );

// 		}

// 	}

// };

// // ===========================================================================
// const InitTrig_miscKillReturn = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_miscKillReturn_Actions );

// };

// // ===========================================================================
// // Trigger: miscSmartSave
// // ===========================================================================

// const Trig_miscSmartSave_Actions = (): void => {

// 	const attacked = GetOrderTargetUnit();

// 	if ( OrderId2StringBJ( GetIssuedOrderId() ) === "smart" && IsUnitAlly( GetTriggerUnit(), GetOwningPlayer( attacked ) ) && GetUnitTypeId( attacked ) === s__wisp_type )

// 		IssueTargetOrder( GetTriggerUnit(), "attack", attacked );

// };

// // ===========================================================================
// const InitTrig_miscSmartSave = (): void => {

// 	gg_trg_miscSmartSave = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscSmartSave, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER );
// 	TriggerAddAction( gg_trg_miscSmartSave, Trig_miscSmartSave_Actions );

// };

// // ===========================================================================
// // Trigger: miscFiveMinuteAction
// // ===========================================================================

// const FilterDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__misc_dolly;

// const increaseMovementSpeed = (): void => {

// 	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

// 	const g = CreateGroup();
// 	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( FilterDolly ) );
// 	const dolly = GroupPickRandomUnit( g );
// 	DestroyGroup( g );

// 	if ( dolly === null )

// 		return;

// 	UnitAddAbility( dolly, s__misc_dollySpeedAura );

// };

// const Trig_miscFiveMinuteAction_Actions = (): void => {

// 	const rand = GetRandomReal( 0, 1 );

// 	if ( rand < 0.5 ) {

// 		DisplayTimedText( 15, "Five minutes remaining! All income is doubled!" );
// 		goldFactor = goldFactor * 2;

// 	} else

// 		increaseMovementSpeed();

// };

// // ===========================================================================
// const InitTrig_miscFiveMinuteAction = (): void => {

// 	gg_trg_miscFiveMinuteAction = CreateTrigger();
// 	// 3 (sheep delay) + 20 (shepherd delay) + 1200 (20 minutes)
// 	TriggerRegisterTimerEventSingle( gg_trg_miscFiveMinuteAction, 1223 );
// 	TriggerAddAction( gg_trg_miscFiveMinuteAction, Trig_miscFiveMinuteAction_Actions );

// };

// // ===========================================================================
// // Trigger: miscDollyMove
// // ===========================================================================
// const Trig_miscDollyMove_Conditions = (): boolean => {

// 	if ( ! ( GetUnitTypeId( GetTriggerUnit() ) === FourCC( "nshf" ) ) )

// 		return false;

// 	return true;

// };

// const Trig_miscDollyMove_Actions = (): void => {

// 	IssueImmediateOrderBJ( GetTriggerUnit(), "stop" );

// };

// // ===========================================================================
// const InitTrig_miscDollyMove = (): void => {

// 	gg_trg_miscDollyMove = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_miscDollyMove, EVENT_PLAYER_UNIT_SELL_ITEM );
// 	TriggerAddCondition( gg_trg_miscDollyMove, Condition( Trig_miscDollyMove_Conditions ) );
// 	TriggerAddAction( gg_trg_miscDollyMove, Trig_miscDollyMove_Actions );

// };

// // ===========================================================================
// // Trigger: miscPreload
// // ===========================================================================

// // ===========================================================================
// // Trigger: miscFileIO
// // ===========================================================================

// // ===========================================================================
// // Trigger: sheepFarmSelfDestruct
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_sheepFarmSelfDestruct_Actions = (): void => {

// 	KillUnit( GetTriggerUnit() );

// };

// // ===========================================================================
// const InitTrig_sheepFarmSelfDestruct = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_TRAIN_START );
// 	TriggerAddAction( t, Trig_sheepFarmSelfDestruct_Actions );

// };

// // ===========================================================================
// // Trigger: sheepSaveDeath
// // ===========================================================================

// const sheepSaveDeath_removeDyingSheepUnits = (): boolean => {

// 	if ( GetOwningPlayer( GetFilterUnit() ) === GetOwningPlayer( GetTriggerUnit() ) )

// 		// return UnitDamageTarget(GetKillingUnit(), GetFilterUnit(), 10000, true, false, ATTACK_TYPE_HERO, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS)
// 		// call KillUnit(GetFilterUnit())
// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const IsStructureFilter = (): boolean => IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE );

// const replaceUnit = ( u: unit, newType: number ): unit => {

// 	// General unit props
// 	const x = GetUnitX( u );
// 	const y = GetUnitY( u );
// 	const f = GetUnitFacing( u );
// 	const p = GetOwningPlayer( u );
// 	// Hero props
// 	const l = GetUnitLevel( u );
// 	const it: Array<number> = [];

// 	let i = 0;

// 	// Copy hero props

// 	while ( true ) {

// 		if ( i === 6 ) break;
// 		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );
// 		i = i + 1;

// 	}

// 	// Remove it
// 	RemoveUnit( u );

// 	// Create a new one
// 	u = CreateUnit( p, newType, x, y, f );

// 	if ( InStr( GetPlayerName( p ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "head" );

// 	}

// 	SelectUnitForPlayerSingle( u, p );

// 	// Copy hero props
// 	SetHeroLevel( u, l, false );
// 	i = 0;

// 	while ( true ) {

// 		if ( i === 6 ) break;
// 		UnitAddItem( u, CreateItem( it[ i ], x, y ) );
// 		i = i + 1;

// 	}

// 	return u;

// };

// const getWolfType = ( p: player ): number => {

// 	if ( saveskills[ GetPlayerId( p ) ] === 10 )

// 		return s__wolf_blacktype;

// 	else if ( saveskills[ GetPlayerId( p ) ] === 25 )

// 		return s__wolf_imbatype;

// 	return s__wolf_type;

// };

// const GetSheepBounty = ( dyingUnit: unit ): number => {

// 	const sheepType = GetUnitTypeId( dyingUnit );
// 	let bounty = 100;
// 	let u: unit;

// 	// sheep type bonus

// 	if ( sheepType === s__sheep_goldtype )

// 		bounty = bounty + 100;

// 	else if ( sheepType === s__sheep_silvertype )

// 		bounty = bounty + 50;

// 	else if ( sheepType === s__sheep_blacktype )

// 		bounty = bounty + 25;

// 	// level bonus
// 	bounty = bounty + Specialization_GetLevel( dyingUnit ) * 10;

// 	// farm bonus
// 	const g = CreateGroup();
// 	GroupEnumUnitsOfPlayer( g, GetOwningPlayer( dyingUnit ), Filter( IsStructureFilter ) );

// 	while ( true ) {

// 		u = FirstOfGroup( g );
// 		if ( u === null ) break;
// 		GroupRemoveUnit( g, u );
// 		bounty = bounty + I2R( BlzGetUnitIntegerField( u, UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) ) / 2;

// 	}

// 	DestroyGroup( g );

// 	return bounty;

// };

// const onSheepDeath = ( killedUnit: unit, killingUnit: unit ): void => {

// 	const killedPlayer = GetOwningPlayer( killedUnit );
// 	const killedPlayerId = GetPlayerId( killedPlayer );
// 	const killingPlayer = GetOwningPlayer( killingUnit );
// 	const killingPlayerId = GetPlayerId( killingPlayer );
// 	const g = CreateGroup();
// 	let i: number;

// 	// Handle dying sheep
// 	const bounty = GetSheepBounty( killedUnit ) * goldFactor;
// 	ForceRemovePlayer( sheepTeam, killedPlayer );
// 	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ killedPlayerId ] + GetPlayerName( killedPlayer ) + "|r has been " + color[ 13 ] + "killed|r by " + color[ GetPlayerId( killingPlayer ) ] + GetPlayerName( killingPlayer ) + "|r!" );
// 	GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( sheepSaveDeath_removeDyingSheepUnits ) );
// 	DestroyGroup( g );
// 	Specialization_onDeath( killedUnit );

// 	// Move to wisps
// 	ForceAddPlayer( wispTeam, killedPlayer );
// 	killedUnit = CreateUnit( killedPlayer, s__wisp_type, - 256, - 832, 270 );
// 	wisps[ killedPlayerId ] = killedUnit;
// 	SetUnitPathing( killedUnit, false );

// 	if ( InStr( GetPlayerName( killedPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", killedUnit, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", killedUnit, "origin" );

// 	}

// 	// Increase wolf kills and upgrade
// 	saveskills[ killingPlayerId ] = saveskills[ killingPlayerId ] + 1;

// 	if ( saveskills[ killingPlayerId ] === 10 || saveskills[ killingPlayerId ] === 25 ) {

// 		if ( GetUnitTypeId( wolves[ killingPlayerId ] ) !== s__wolf_wwtype ) {

// 			killingUnit = replaceUnit( wolves[ killingPlayerId ], getWolfType( killingPlayer ) );
// 			wolves[ killingPlayerId ] = killingUnit;

// 		} else {

// 			killingUnit = replaceUnit( wws[ killingPlayerId ], getWolfType( killingPlayer ) );
// 			wws[ killingPlayerId ] = killingUnit;

// 		}

// 		ScoutPhoenixUpgrade_onSpawn( killingUnit );
// 		UnitAddItem( killingUnit, CreateItem( s__wolf_cloakitem, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ) );

// 	}

// 	// Gold bounty
// 	i = 0;
// 	const allyBounty = R2I( bounty / ( I2R( countHere( wolfTeam ) ) + 0.5 ) );
// 	const killerBounty = R2I( bounty - allyBounty * ( countHere( wolfTeam ) - 1 ) );

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING && IsPlayerInForce( Player( i ), wolfTeam ) )

// 			if ( Player( i ) === killingPlayer ) {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + killerBounty );
// 				SmallText( killerBounty, wolves[ i ], 14, 0, 0 );

// 			} else {

// 				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + allyBounty );
// 				SmallText( allyBounty, wolves[ i ], 14, 0, 0 );

// 			}

// 		i = i + 1;

// 	}

// };

// const getSheepType = ( p: player ): number => {

// 	if ( saveskills[ GetPlayerId( p ) ] >= 25 )

// 		return s__sheep_goldtype;

// 	else if ( saveskills[ GetPlayerId( p ) ] >= 15 )

// 		return s__sheep_silvertype;

// 	else if ( saveskills[ GetPlayerId( p ) ] >= 10 )

// 		return s__sheep_blacktype;

// 	return s__sheep_type;

// };

// const onSheepSave = ( savedUnit: unit, savingUnit: unit ): void => {

// 	const savedPlayer = GetOwningPlayer( savedUnit );
// 	const savedPlayerId = GetPlayerId( savedPlayer );
// 	const savingPlayer = GetOwningPlayer( savingUnit );
// 	const savingPlayerId = GetPlayerId( savingPlayer );
// 	let i = 0;

// 	// Handle dying wisp
// 	ForceRemovePlayer( wispTeam, savedPlayer );
// 	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ savedPlayerId ] + GetPlayerName( savedPlayer ) + "|r has been " + color[ 12 ] + "saved|r by " + color[ GetPlayerId( savingPlayer ) ] + GetPlayerName( savingPlayer ) + "|r!" );

// 	// Move to sheep
// 	ForceAddPlayer( sheepTeam, savedPlayer );

// 	while ( true ) {

// 		i = GetRandomInt( 0, 12 );
// 		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) break;

// 	}

// 	const x = GetStartLocationX( i );
// 	const y = GetStartLocationY( i );
// 	savedUnit = CreateUnit( savedPlayer, getSheepType( savedPlayer ), x, y, 270 );
// 	sheeps[ savedPlayerId ] = savedUnit;
// 	Specialization_onSpawn( savedUnit );

// 	if ( GetLocalPlayer() === savedPlayer ) {

// 		PanCameraToTimed( x, y, 0 );
// 		ClearSelection();
// 		SelectUnit( savedUnit, true );

// 	}

// 	if ( InStr( GetPlayerName( savedPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savedUnit, "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savedUnit, "origin" );

// 	}

// 	// Increase saves and upgrade
// 	saveskills[ savingPlayerId ] = saveskills[ savingPlayerId ] + 1;
// 	Specialization_onSave( savingUnit );

// 	if ( saveskills[ savingPlayerId ] === 10 || saveskills[ savingPlayerId ] === 15 || saveskills[ savingPlayerId ] === 25 ) {

// 		savingUnit = replaceUnit( savingUnit, getSheepType( savingPlayer ) );
// 		sheeps[ savingPlayerId ] = savingUnit;
// 		SelectUnitForPlayerSingle( savingUnit, savingPlayer );

// 		if ( InStr( GetPlayerName( savingPlayer ), "Grim" ) >= 0 ) {

// 			AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savingUnit, "origin" );
// 			AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savingUnit, "origin" );

// 		}

// 		Specialization_onSpawn( savingUnit );

// 	}

// 	// Bounty
// 	SetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD ) + 100 * goldFactor );
// 	SmallText( 100 * goldFactor, savingUnit, 14, 0, 0 );

// };

// const onWolfDeath = ( wolfUnit: unit, killer: unit ): void => {

// 	// todo: do we still get gold?
// 	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// 	const killingPlayer = GetOwningPlayer( killer );
// 	TriggerSleepAction( 5 );
// 	ReviveHero( wolfUnit, - 256, - 832, true );

// };

// const onWispTK = ( wispUnit: unit ): void => {

// 	const wispPlayer = GetOwningPlayer( wispUnit );
// 	const wispPlayerId = GetPlayerId( wispPlayer );
// 	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, s__wisp_type, - 256, - 832, 270 );
// 	SetUnitPathing( wisps[ wispPlayerId ], false );

// 	if ( InStr( GetPlayerName( wispPlayer ), "Grim" ) >= 0 ) {

// 		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", wisps[ wispPlayerId ], "origin" );
// 		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", wisps[ wispPlayerId ], "origin" );

// 	}

// };

// const Trig_sheepSaveDeath_Actions = (): void => {

// 	let relevantDeath = false;

// 	// Sheep death

// 	if ( GetUnitTypeId( GetTriggerUnit() ) === s__sheep_type || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_silvertype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_goldtype ) {

// 		onSheepDeath( GetTriggerUnit(), GetKillingUnit() );
// 		relevantDeath = true;

// 		// Spirit death (save)

// 	} else if ( GetUnitTypeId( GetTriggerUnit() ) === s__wisp_type )

// 		if ( GetUnitTypeId( GetKillingUnit() ) !== s__wisp_type ) {

// 			onSheepSave( GetTriggerUnit(), GetKillingUnit() );
// 			relevantDeath = true;

// 		} else {

// 			onWispTK( GetTriggerUnit() );

// 		}

// 	// Wolf death

// 	else if ( GetUnitTypeId( GetTriggerUnit() ) === s__wolf_type || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_imbatype )

// 		onWolfDeath( GetTriggerUnit(), GetKillingUnit() );

// 	if ( relevantDeath ) {

// 		reloadMultiboard();

// 		if ( countHere( sheepTeam ) === 0 )

// 			endGame( 2 );

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepSaveDeath = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
// 	TriggerAddAction( t, Trig_sheepSaveDeath_Actions );

// };

// // ===========================================================================
// // Trigger: sheepWispLeave
// //
// // Work
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_sheepWispLeave_Actions = (): void => {

// 	if ( GetUnitTypeId( GetTriggerUnit() ) === s__wisp_type )

// 		SetUnitPosition( GetTriggerUnit(), - 256, - 832 );

// };

// // ===========================================================================
// const InitTrig_sheepWispLeave = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterLeaveRectSimple( t, gg_rct_Pen );
// 	TriggerAddAction( t, Trig_sheepWispLeave_Actions );

// };

// // ===========================================================================
// // Trigger: sheepCommands
// // ===========================================================================

// const Trig_sheepCommands_RemoveCheapFarms = (): boolean => {

// 	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) && BlzGetUnitIntegerField( GetFilterUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) < 5 )

// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const Trig_sheepCommands_RemoveAllFarms = (): boolean => {

// 	if ( IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) )

// 		RemoveUnit( GetFilterUnit() );

// 	return false;

// };

// const Trig_sheepCommands_Actions = (): void => {

// 	let i = 0;
// 	let n: number;
// 	let g: group;

// 	if ( GetEventPlayerChatString() === "-d" ) {

// 		g = CreateGroup();
// 		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveCheapFarms ) );
// 		DestroyGroup( g );
// 		return;

// 	} else if ( GetEventPlayerChatString() === "-dall" ) {

// 		g = CreateGroup();
// 		GroupEnumUnitsOfPlayer( g, GetTriggerPlayer(), Condition( Trig_sheepCommands_RemoveAllFarms ) );
// 		DestroyGroup( g );
// 		return;

// 	}

// 	while ( true ) {

// 		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING )

// 			if ( Player( i ) === GetTriggerPlayer() ) {

// 				n = 0;

// 				while ( true ) {

// 					if ( n === 12 ) break;

// 					if ( GetEventPlayerChatString() === "-wolf gold" ) {

// 						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r gave the shepherds 100 gold!" );

// 						if ( IsPlayerInForce( Player( n ), wolfTeam ) )

// 							SetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( n ), PLAYER_STATE_RESOURCE_GOLD ) + 100 );

// 					} else if ( GetEventPlayerChatString() === "-destroy all farms" ) {

// 						DisplayTextToPlayer( Player( n ), 0, 0, color[ i ] + GetPlayerName( GetTriggerPlayer() ) + "|r has destroyed all the farms!" );

// 						if ( n === 0 ) {

// 							g = CreateGroup();
// 							GroupEnumUnitsInRect( g, WORLD_BOUNDS, Condition( Trig_sheepCommands_RemoveCheapFarms ) );
// 							DestroyGroup( g );

// 						}

// 					}

// 					n = n + 1;

// 				}

// 			} else {

// 				return;

// 			}

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepCommands = (): void => {

// 	gg_trg_sheepCommands = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-wolf gold", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-destroy all farms", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-dall", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d on", true );
// 	TriggerRegisterPlayerChatEventAll( gg_trg_sheepCommands, "-d off", true );
// 	TriggerAddAction( gg_trg_sheepCommands, Trig_sheepCommands_Actions );

// };

// // ===========================================================================
// // Trigger: sheepJotyeFarm
// // ===========================================================================

// // Can probably just use the aura targets property instead of checking type...
// const sheepJotyeFarm_isProperType = ( u: unit ): boolean => {

// 	const unitType = GetUnitTypeId( u );
// 	return unitType === s__wolf_type || unitType === s__wolf_blacktype || unitType === s__wolf_imbatype || unitType === s__wolf_golemtype || unitType === s__wolf_stalkertype;

// };

// const Trig_sheepJotyeFarm_Actions = (): void => {

// 	const u = GetTriggerUnit();

// 	if ( sheepJotyeFarm_isProperType( u ) && GetUnitAbilityLevel( u, FourCC( "BHab" ) ) > 0 ) {

// 		DisableTrigger( GetTriggeringTrigger() );
// 		IssuePointOrderById( u, GetIssuedOrderId(), GetUnitX( u ) + ( GetUnitX( u ) - GetOrderPointX() ), GetUnitY( u ) + ( GetUnitY( u ) - GetOrderPointY() ) );
// 		EnableTrigger( GetTriggeringTrigger() );

// 	}

// };

// // ===========================================================================
// const InitTrig_sheepJotyeFarm = (): void => {

// 	gg_trg_sheepJotyeFarm = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_sheepJotyeFarm, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
// 	TriggerAddAction( gg_trg_sheepJotyeFarm, Trig_sheepJotyeFarm_Actions );

// };

// // ===========================================================================
// // Trigger: sheepDestroyLastFarm
// // ===========================================================================

// const Trig_sheepDestroyLastFarm_Actions = (): void => {

// 	if ( GetSpellAbilityId() === s__sheep_xability )

// 		KillUnit( GetBuilding( GetOwningPlayer( GetTriggerUnit() ) ) );

// };

// // ===========================================================================
// const InitTrig_sheepDestroyLastFarm = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
// 	TriggerAddAction( t, Trig_sheepDestroyLastFarm_Actions );

// };

// // ===========================================================================
// // Trigger: sheepFactoryFarm
// // ===========================================================================

// // ===========================================================================
// // Trigger: sheepSpecialization
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfQuickBuy
// // ===========================================================================

// const hasInventoryAndControlled = (): boolean => IsUnitIllusion( GetFilterUnit() ) === false && GetUnitAbilityLevel( GetFilterUnit(), FourCC( "AInv" ) ) > 0 && ( GetPlayerAlliance( GetOwningPlayer( GetFilterUnit() ), GetTriggerPlayer(), ALLIANCE_SHARED_ADVANCED_CONTROL ) || GetOwningPlayer( GetFilterUnit() ) === GetTriggerPlayer() );

// const wolfQuickBuy_Actions = (): void => {

// 	let g = CreateGroup();
// 	let u: unit;

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "buy" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		return;

// 	// Find unit to give the item to
// 	g = CreateGroup();
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

// 	if ( BlzGroupGetSize( g ) > 0 )

// 		u = FirstOfGroup( g );

// 	else

// 		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

// 	DestroyGroup( g );

// 	// Get and buy the item
// 	Split( GetEventPlayerChatString(), " ", true );
// 	const itemSpec = itemSpecs[ LoadInteger( itemSpecsNames, StringHash( myArg[ 0 ] ), 0 ) ];

// 	if ( itemSpec !== null )

// 		if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) >= R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) >= R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

// 			UnitAddItem( u, CreateItem( s__itemspec_id[ itemSpec ], GetUnitX( u ), GetUnitY( u ) ) );
// 			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) - R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) );
// 			SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) - R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) );

// 		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) && GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) < R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold and " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

// 		} else if ( GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) < R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickBuyTax ) ) + " gold." );

// 		} else {

// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, "That item costs " + I2S( R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickBuyTax ) ) + " lumber." );

// 		}

// };

// const wolfQuickSell_Actions = (): void => {

// 	let i = 0;
// 	let u: unit;
// 	let itemSpec: number;

// 	// Preconditions
// 	Split( GetEventPlayerChatString(), " ", false );

// 	if ( myArg[ 0 ] !== "sell" || ! IsPlayerInForce( GetTriggerPlayer(), wolfTeam ) )

// 		return;

// 	// Find unit to sell the item on
// 	const g = CreateGroup();
// 	GroupEnumUnitsSelected( g, GetTriggerPlayer(), Condition( hasInventoryAndControlled ) );

// 	if ( BlzGroupGetSize( g ) > 0 )

// 		u = FirstOfGroup( g );

// 	else

// 		u = wolves[ GetPlayerId( GetTriggerPlayer() ) ];

// 	DestroyGroup( g );

// 	// Get the slot
// 	Split( GetEventPlayerChatString(), " ", true );

// 	if ( myArg[ 1 ] === "all" )

// 		Split( "-sell 1 2 3 4 5 6", " ", true );

// 	// Sell items

// 	while ( true ) {

// 		if ( myArg[ i ] === null || S2I( myArg[ i ] || "" ) === 0 ) break;

// 		if ( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) !== null ) {

// 			itemSpec = itemSpecs[ LoadInteger( itemSpecsIds, GetItemTypeId( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) ), 0 ) ];

// 			if ( itemSpec !== null ) {

// 				RemoveItem( UnitItemInSlot( u, S2I( myArg[ i ] || "" ) - 1 ) );
// 				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD ) + R2I( I2R( s__itemspec_gold[ itemSpec ] ) * quickSellTax ) );
// 				SetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER ) + R2I( I2R( s__itemspec_lumber[ itemSpec ] ) * quickSellTax ) );

// 			}

// 		}

// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfQuickBuy = (): void => {

// 	let t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-buy ", false );
// 	TriggerAddAction( t, wolfQuickBuy_Actions );
// 	t = CreateTrigger();
// 	TriggerRegisterPlayerChatEventAll( t, "-sell ", false );
// 	TriggerAddAction( t, wolfQuickSell_Actions );

// };

// // ===========================================================================
// // Trigger: wolfWhiteWolf
// // ===========================================================================

// const Trig_wolfWhiteWolf_Actions = (): void => {

// 	let x: number;
// 	let y: number;
// 	let f: number;
// 	let p: player;
// 	let original: unit;
// 	let ww: unit;

// 	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_wwitem ) {

// 		RemoveItem( GetManipulatedItem() );
// 		original = GetTriggerUnit();
// 		x = GetUnitX( original );
// 		y = GetUnitY( original );
// 		f = GetUnitFacing( original );
// 		p = GetOwningPlayer( original );

// 		if ( GetUnitTypeId( original ) === s__wolf_type || GetUnitTypeId( original ) === s__wolf_blacktype || GetUnitTypeId( original ) === s__wolf_imbatype ) {

// 			// Freeze wolf unit
// 			PauseUnit( original, true );
// 			SetUnitOwner( original, Player( PLAYER_NEUTRAL_PASSIVE ), false );
// 			SetUnitX( original, - 6144 );
// 			SetUnitY( original, - 6656 );
// 			wws[ GetPlayerId( p ) ] = original;

// 			// Create the White Wolf
// 			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
// 			wolves[ GetPlayerId( p ) ] = ww;
// 			SelectUnitForPlayerSingle( ww, p );

// 			// Start the timer
// 			// todo: should be nullable
// 			TimerStart( wwTimer[ GetPlayerId( p ) ], 60, false, () => { /* do nothing */ } );
// 			TimerDialogSetTitle( wwTimerDialog[ GetPlayerId( p ) ], "Changing in..." );

// 			if ( GetLocalPlayer() === p )

// 				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], true );

// 			TriggerSleepAction( 60 );

// 			// Clear the timer

// 			if ( GetLocalPlayer() === p )

// 				TimerDialogDisplay( wwTimerDialog[ GetPlayerId( p ) ], false );

// 			// Remove the white wolf
// 			x = GetUnitX( ww );
// 			y = GetUnitY( ww );
// 			f = GetUnitFacing( ww );
// 			RemoveUnit( ww );

// 			// Restore the wolf unit
// 			wolves[ GetPlayerId( p ) ] = original;
// 			PauseUnit( original, false );
// 			SetUnitOwner( original, p, false );
// 			SetUnitPosition( original, x, y );
// 			SelectUnitForPlayerSingle( original, p );

// 		} else {

// 			RemoveUnit( original );
// 			ww = CreateUnit( p, s__wolf_wwtype, x, y, f );
// 			UnitApplyTimedLife( ww, FourCC( "BTLF" ), 150 );
// 			SelectUnitForPlayerSingle( ww, p );

// 		}

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfWhiteWolf = (): void => {

// 	let i = 0;
// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_PICKUP_ITEM );
// 	TriggerAddAction( t, Trig_wolfWhiteWolf_Actions );

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		wwTimer[ i ] = CreateTimer();
// 		wwTimerDialog[ i ] = CreateTimerDialog( wwTimer[ i ] );
// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// // Trigger: wolfLumber
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_wolfLumber_Actions = (): void => {

// 	if ( GetHeroLevel( GetTriggerUnit() ) >= 3 )

// 		SetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER, GetPlayerState( GetOwningPlayer( GetTriggerUnit() ), PLAYER_STATE_RESOURCE_LUMBER ) + 2 * goldFactor );

// };

// // ===========================================================================
// const InitTrig_wolfLumber = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_HERO_LEVEL );
// 	TriggerAddAction( t, Trig_wolfLumber_Actions );

// };

// // ===========================================================================
// // Trigger: wolfWard
// // ===========================================================================

// const Trig_wolfWard_Actions = (): void => {

// 	let u: unit;

// 	if ( GetSpellAbilityId() === s__wolf_wardability ) {

// 		u = CreateUnit( GetOwningPlayer( GetTriggerUnit() ), s__wolf_wardtype, GetSpellTargetX(), GetSpellTargetY(), 270 );
// 		SetUnitPosition( u, GetSpellTargetX(), GetSpellTargetY() );
// 		UnitApplyTimedLife( u, FourCC( "BTLF" ), 240 );

// 	}

// };

// // ===========================================================================
// const InitTrig_wolfWard = (): void => {

// 	const t = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
// 	TriggerAddAction( t, Trig_wolfWard_Actions );

// };

// // ===========================================================================
// // Trigger: wolfCloakOfFlames
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfDragonFire
// // ===========================================================================

// // ===========================================================================
// // Trigger: wolfScoutPhoenixUpgrade
// // ===========================================================================

// // ===========================================================================
// // Trigger: eggGem
// // ===========================================================================
// // TESH.scrollpos=0
// // TESH.alwaysfold=0
// const Trig_eggGem_Actions = (): void => {

// 	const i = GetRandomInt( 0, 100 );

// 	if ( GetItemTypeId( GetManipulatedItem() ) === s__wolf_gem )

// 		if ( gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] ) {

// 			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = false;
// 			DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem deactivated." );

// 		} else {

// 			gemActivated[ GetPlayerId( GetTriggerPlayer() ) ] = true;

// 			if ( i === 0 )

// 				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Perfect gem activated." );

// 			else

// 				DisplayTextToPlayer( GetTriggerPlayer(), 0, 0, color[ 3 ] + "Gem activated." );

// 		}

// };

// // ===========================================================================
// const InitTrig_eggGem = (): void => {

// 	gg_trg_eggGem = CreateTrigger();
// 	TriggerRegisterAnyUnitEventBJ( gg_trg_eggGem, EVENT_PLAYER_UNIT_USE_ITEM );
// 	TriggerAddAction( gg_trg_eggGem, Trig_eggGem_Actions );

// };

// // ===========================================================================
// // Trigger: eggDolly
// // ===========================================================================

// const Trig_eggDolly_Actions = (): void => {

// 	let e: effect;
// 	const playerId = GetPlayerId( GetTriggerPlayer() );
// 	dollyClick[ playerId ] = dollyClick[ playerId ] + 1;

// 	if ( dollyClick[ playerId ] > 10 ) {

// 		e = AddSpecialEffectTarget( "Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Human\\HumanLargeDeathExplode\\HumanLargeDeathExplode.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Abilities\\Weapons\\Mortar\\MortarMissile.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );
// 		e = AddSpecialEffectTarget( "Objects\\Spawnmodels\\Orc\\OrcSmallDeathExplode\\OrcSmallDeathExplode.mdx", GetTriggerUnit(), "origin" );
// 		DestroyEffect( e );

// 		if ( katama ) {

// 			katama = false;
// 			CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_katama, GetUnitX( GetTriggerUnit() ), GetUnitY( GetTriggerUnit() ), GetUnitFacing( GetTriggerUnit() ) + 180 );

// 		}

// 		KillUnit( GetTriggerUnit() );
// 		DisplayTimedTextToPlayer( GetTriggerPlayer(), 0, 0, 5, "You killed Dolly! You've been placed in time out!" );
// 		// todo: should be nullable
// 		TimerStart( dollyTimer[ playerId ], 15, false, () => { /* do nothing */ } );
// 		TimerDialogSetTitle( dollyTimerDialog[ playerId ], "Time out ends in..." );

// 		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

// 			TimerDialogDisplay( dollyTimerDialog[ playerId ], true );
// 			EnableUserControl( false );

// 		}

// 		TriggerSleepAction( 15 );

// 		if ( GetTriggerPlayer() === GetLocalPlayer() ) {

// 			EnableUserControl( true );
// 			TimerDialogDisplay( dollyTimerDialog[ playerId ], false );

// 		}

// 	}

// };

// const Trig_eggDolly_Tick = (): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === 12 ) break;

// 		if ( dollyClick[ i ] > 0 )

// 			dollyClick[ i ] = dollyClick[ i ] - 1;

// 		i = i + 1;

// 	}

// 	if ( GetPlayerUnitTypeCount( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly ) === 0 )

// 		CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), s__sheep_dolly, - 256, - 768, 270 );

// };

// const Trig_eggDolly_isDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__sheep_dolly;

// // ===========================================================================
// const InitTrig_eggDolly = (): void => {

// 	const t = CreateTrigger();
// 	let i = 0;
// 	gg_trg_eggDolly = CreateTrigger();
// 	TriggerRegisterPlayerUnitEventAll( gg_trg_eggDolly, EVENT_PLAYER_UNIT_SELECTED, Condition( Trig_eggDolly_isDolly ) );
// 	TriggerAddAction( gg_trg_eggDolly, Trig_eggDolly_Actions );
// 	TriggerRegisterTimerEvent( t, 1, true );
// 	TriggerAddAction( t, Trig_eggDolly_Tick );

// 	while ( true ) {

// 		if ( i === 12 ) break;
// 		dollyTimer[ i ] = CreateTimer();
// 		dollyTimerDialog[ i ] = CreateTimerDialog( dollyTimer[ i ] );
// 		i = i + 1;

// 	}

// };

// // ===========================================================================
// const InitCustomTriggers = (): void => {

// 	InitTrig_coreInit();
// 	InitTrig_coreGame();
// 	// Function not found: call InitTrig_changelog()
// 	InitTrig_miscClean();
// 	InitTrig_miscGoldTick();
// 	InitTrig_miscZoom();
// 	InitTrig_miscAngle();
// 	InitTrig_miscGold();
// 	InitTrig_miscControl();
// 	InitTrig_miscUncontrol();
// 	InitTrig_miscLeaves();
// 	InitTrig_miscFace();
// 	InitTrig_miscFriendlyAttack();
// 	InitTrig_miscKillReturn();
// 	InitTrig_miscSmartSave();
// 	InitTrig_miscFiveMinuteAction();
// 	InitTrig_miscDollyMove();
// 	// Function not found: call InitTrig_miscPreload()
// 	// Function not found: call InitTrig_miscMath()
// 	// Function not found: call InitTrig_miscFileIO()
// 	InitTrig_sheepFarmSelfDestruct();
// 	InitTrig_sheepSaveDeath();
// 	InitTrig_sheepWispLeave();
// 	InitTrig_sheepCommands();
// 	InitTrig_sheepJotyeFarm();
// 	InitTrig_sheepDestroyLastFarm();
// 	// Function not found: call InitTrig_sheepFactoryFarm()
// 	// Function not found: call InitTrig_sheepSpecialization()
// 	InitTrig_wolfQuickBuy();
// 	InitTrig_wolfWhiteWolf();
// 	InitTrig_wolfLumber();
// 	InitTrig_wolfWard();
// 	// Function not found: call InitTrig_wolfCloakOfFlames()
// 	// Function not found: call InitTrig_wolfDragonFire()
// 	// Function not found: call InitTrig_wolfScoutPhoenixUpgrade()
// 	InitTrig_eggGem();
// 	InitTrig_eggDolly();

// };

// // ===========================================================================
// const RunInitializationTriggers = (): void => {

// 	ConditionalTriggerExecute( gg_trg_coreInit );

// };

// ***************************************************************************
// *
// *  Players
// *
// ***************************************************************************

// const InitCustomPlayerSlots = (): void => {

// 	// Player 0
// 	SetPlayerStartLocation( Player( 0 ), 0 );
// 	ForcePlayerStartLocation( Player( 0 ), 0 );
// 	SetPlayerColor( Player( 0 ), ConvertPlayerColor( 0 ) );
// 	SetPlayerRacePreference( Player( 0 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 0 ), false );
// 	SetPlayerController( Player( 0 ), MAP_CONTROL_USER );

// 	// Player 1
// 	SetPlayerStartLocation( Player( 1 ), 1 );
// 	ForcePlayerStartLocation( Player( 1 ), 1 );
// 	SetPlayerColor( Player( 1 ), ConvertPlayerColor( 1 ) );
// 	SetPlayerRacePreference( Player( 1 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 1 ), false );
// 	SetPlayerController( Player( 1 ), MAP_CONTROL_USER );

// 	// Player 2
// 	SetPlayerStartLocation( Player( 2 ), 2 );
// 	ForcePlayerStartLocation( Player( 2 ), 2 );
// 	SetPlayerColor( Player( 2 ), ConvertPlayerColor( 2 ) );
// 	SetPlayerRacePreference( Player( 2 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 2 ), false );
// 	SetPlayerController( Player( 2 ), MAP_CONTROL_USER );

// 	// Player 3
// 	SetPlayerStartLocation( Player( 3 ), 3 );
// 	ForcePlayerStartLocation( Player( 3 ), 3 );
// 	SetPlayerColor( Player( 3 ), ConvertPlayerColor( 3 ) );
// 	SetPlayerRacePreference( Player( 3 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 3 ), false );
// 	SetPlayerController( Player( 3 ), MAP_CONTROL_USER );

// 	// Player 4
// 	SetPlayerStartLocation( Player( 4 ), 4 );
// 	ForcePlayerStartLocation( Player( 4 ), 4 );
// 	SetPlayerColor( Player( 4 ), ConvertPlayerColor( 4 ) );
// 	SetPlayerRacePreference( Player( 4 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 4 ), false );
// 	SetPlayerController( Player( 4 ), MAP_CONTROL_USER );

// 	// Player 5
// 	SetPlayerStartLocation( Player( 5 ), 5 );
// 	ForcePlayerStartLocation( Player( 5 ), 5 );
// 	SetPlayerColor( Player( 5 ), ConvertPlayerColor( 5 ) );
// 	SetPlayerRacePreference( Player( 5 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 5 ), false );
// 	SetPlayerController( Player( 5 ), MAP_CONTROL_USER );

// 	// Player 6
// 	SetPlayerStartLocation( Player( 6 ), 6 );
// 	ForcePlayerStartLocation( Player( 6 ), 6 );
// 	SetPlayerColor( Player( 6 ), ConvertPlayerColor( 6 ) );
// 	SetPlayerRacePreference( Player( 6 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 6 ), false );
// 	SetPlayerController( Player( 6 ), MAP_CONTROL_USER );

// 	// Player 7
// 	SetPlayerStartLocation( Player( 7 ), 7 );
// 	ForcePlayerStartLocation( Player( 7 ), 7 );
// 	SetPlayerColor( Player( 7 ), ConvertPlayerColor( 7 ) );
// 	SetPlayerRacePreference( Player( 7 ), RACE_PREF_HUMAN );
// 	SetPlayerRaceSelectable( Player( 7 ), false );
// 	SetPlayerController( Player( 7 ), MAP_CONTROL_USER );

// 	// Player 8
// 	SetPlayerStartLocation( Player( 8 ), 8 );
// 	SetPlayerColor( Player( 8 ), ConvertPlayerColor( 8 ) );
// 	SetPlayerRacePreference( Player( 8 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 8 ), false );
// 	SetPlayerController( Player( 8 ), MAP_CONTROL_USER );

// 	// Player 9
// 	SetPlayerStartLocation( Player( 9 ), 9 );
// 	SetPlayerColor( Player( 9 ), ConvertPlayerColor( 9 ) );
// 	SetPlayerRacePreference( Player( 9 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 9 ), false );
// 	SetPlayerController( Player( 9 ), MAP_CONTROL_USER );

// 	// Player 10
// 	SetPlayerStartLocation( Player( 10 ), 10 );
// 	SetPlayerColor( Player( 10 ), ConvertPlayerColor( 10 ) );
// 	SetPlayerRacePreference( Player( 10 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 10 ), false );
// 	SetPlayerController( Player( 10 ), MAP_CONTROL_USER );

// 	// Player 11
// 	SetPlayerStartLocation( Player( 11 ), 11 );
// 	SetPlayerColor( Player( 11 ), ConvertPlayerColor( 11 ) );
// 	SetPlayerRacePreference( Player( 11 ), RACE_PREF_ORC );
// 	SetPlayerRaceSelectable( Player( 11 ), false );
// 	SetPlayerController( Player( 11 ), MAP_CONTROL_USER );

// };

// const InitCustomTeams = (): void => {

// 	// Force: TRIGSTR_013
// 	SetPlayerTeam( Player( 0 ), 0 );
// 	SetPlayerState( Player( 0 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 1 ), 0 );
// 	SetPlayerState( Player( 1 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 2 ), 0 );
// 	SetPlayerState( Player( 2 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 3 ), 0 );
// 	SetPlayerState( Player( 3 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 4 ), 0 );
// 	SetPlayerState( Player( 4 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 5 ), 0 );
// 	SetPlayerState( Player( 5 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 6 ), 0 );
// 	SetPlayerState( Player( 6 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 7 ), 0 );
// 	SetPlayerState( Player( 7 ), PLAYER_STATE_ALLIED_VICTORY, 1 );

// 	//   Allied
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 0 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 1 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 2 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 3 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 4 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 6 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 5 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 6 ), Player( 7 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 0 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 1 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 2 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 3 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 4 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 5 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 7 ), Player( 6 ), true );

// 	//   Shared Vision
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 0 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 1 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 2 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 3 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 4 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 6 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 5 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 6 ), Player( 7 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 0 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 1 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 2 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 3 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 4 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 5 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 7 ), Player( 6 ), true );

// 	// Force: TRIGSTR_4360
// 	SetPlayerTeam( Player( 8 ), 1 );
// 	SetPlayerState( Player( 8 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 9 ), 1 );
// 	SetPlayerState( Player( 9 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 10 ), 1 );
// 	SetPlayerState( Player( 10 ), PLAYER_STATE_ALLIED_VICTORY, 1 );
// 	SetPlayerTeam( Player( 11 ), 1 );
// 	SetPlayerState( Player( 11 ), PLAYER_STATE_ALLIED_VICTORY, 1 );

// 	//   Allied
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 10 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 8 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 10 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 9 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 10 ), Player( 11 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 8 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 9 ), true );
// 	SetPlayerAllianceStateAllyBJ( Player( 11 ), Player( 10 ), true );

// 	//   Shared Vision
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 10 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 8 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 10 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 9 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 10 ), Player( 11 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 8 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 9 ), true );
// 	SetPlayerAllianceStateVisionBJ( Player( 11 ), Player( 10 ), true );

// };

// const InitAllyPriorities = (): void => {

// 	SetStartLocPrioCount( 1, 1 );
// 	SetStartLocPrio( 1, 0, 0, MAP_LOC_PRIO_LOW );

// 	SetStartLocPrioCount( 5, 1 );
// 	SetStartLocPrio( 5, 0, 8, MAP_LOC_PRIO_HIGH );

// };

// ***************************************************************************
// *
// *  Main Initialization
// *
// ***************************************************************************

// ===========================================================================

const mainAfter = (): void => {

	// InitCustomTriggers();
	// RunInitializationTriggers();

};

// ***************************************************************************
// *
// *  Map Configuration
// *
// ***************************************************************************

// const config = (): void => {

// 	SetMapName( "TRIGSTR_039" );
// 	SetMapDescription( "TRIGSTR_041" );
// 	SetPlayers( 12 );
// 	SetTeams( 12 );
// 	SetGamePlacement( MAP_PLACEMENT_TEAMS_TOGETHER );

// 	DefineStartLocation( 0, - 896, - 1216 );
// 	DefineStartLocation( 1, - 768, - 1408 );
// 	DefineStartLocation( 2, - 128, - 1600 );
// 	DefineStartLocation( 3, 384, - 1408 );
// 	DefineStartLocation( 4, 320, - 704 );
// 	DefineStartLocation( 5, 0, - 256 );
// 	DefineStartLocation( 6, - 768, - 256 );
// 	DefineStartLocation( 7, - 896, - 704 );
// 	DefineStartLocation( 8, - 320, - 768 );
// 	DefineStartLocation( 9, - 192, - 768 );
// 	DefineStartLocation( 10, - 320, - 896 );
// 	DefineStartLocation( 11, - 192, - 896 );

// 	// Player setup
// 	InitCustomPlayerSlots();
// 	InitCustomTeams();
// 	InitAllyPriorities();

// };

addScriptHook( W3TS_HOOK.MAIN_AFTER, mainAfter );
