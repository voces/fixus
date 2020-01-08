
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: remove empty imports if used by other files
import "./core/game";
import "./core/init";
import "./misc/angle";
import "./misc/clean";
import "./misc/control";
import "./misc/face";
import "./misc/friendlyAttack";
import "./misc/gold";
import "./misc/goldTick";
import "./misc/killReturn";
import "./misc/leaves";
import "./misc/fiveMinuteAction";
import "./misc/smartSave";
import "./misc/uncontrol";
import "./misc/zoom";
import "./misc/dollyMove";
import "./sheep/factoryFarm";
import "./sheep/farmSelfDestruct";
import "./sheep/specialization";
import "./sheep/saveDeath";
import "./sheep/wispLeave";
import "./sheep/commands";
import "./sheep/destroyLastFarm";
import "./sheep/jotyeFarm";
import "./wolves/cloakOfFlames";
import "./wolves/dragonFire";
import "./wolves/quickBuy";
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

// const wwTimer: Array<timer> = [];
// const wwTimerDialog: Array<timerdialog> = [];
// let katama = true;
// const dollyTimer: Array<timer> = [];
// const dollyTimerDialog: Array<timerdialog> = [];

// // ***************************************************************************
// // *
// // *  Custom Script Code
// // *
// // ***************************************************************************

// // Duh
// const TriggerRegisterPlayerUnitEventAll = ( t: trigger, p: playerunitevent, b: boolexpr ): void => {

// 	let i = 0;

// 	while ( true ) {

// 		if ( i === bj_MAX_PLAYERS ) break;
// 		TriggerRegisterPlayerUnitEvent( t, Player( i ), p, b );
// 		i = i + 1;

// 	}

// };

// // ***************************************************************************
// // *
// // *  Triggers
// // *
// // ***************************************************************************

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
