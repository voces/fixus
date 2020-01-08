
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	color,
	countHere,
	dollyClick,
	gemActivated,
	goldFactor,
	isHere,
	myTimer,
	myTimerDialog,
	saveskills,
	sheepTeam,
	wolfTeam,
	WORLD_BOUNDS,
} from "../shared";
import { board } from "../misc/multiboard";
import { AbilityRangePreload } from "../misc/abilityPreload";

// ===========================================================================
// Trigger: coreInit
// ===========================================================================

const Trig_coreInitDelay_Actions = (): void => {

	let i: number;
	let q: quest;
	let qi: questitem;
	q = CreateQuest();
	QuestSetTitle( q, "Ultimate Sheep Tag Fixus" );
	QuestSetDescription( q, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNAcorn.blp" );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Fixus by |CFF959697Chakra|r" );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Ultimate Sheep Tag using |CFF959697Chakra|r's Sheep Tag Template file." );

	q = CreateQuest();
	QuestSetTitle( q, "Sheep" );
	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNSheep.blp" );
	QuestSetRequired( q, false );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Either last 25 minutes or until all wolves leave to win." );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Build farms to survive." );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Save dead sheep to last." );

	q = CreateQuest();
	QuestSetTitle( q, "Wolves" );
	QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNRaider.blp" );
	QuestSetRequired( q, false );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Either kill all sheep or wait until all sheep leave to win." );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Buy items to kill sheep." );
	qi = QuestCreateItem( q );
	QuestItemSetDescription( qi, "Camp the middle to avoid killed sheep to be revived." );

	i = 0;

	while ( true ) {

		if ( i === 12 ) break;
		DisplayTimedTextToPlayer( Player( i ), 0, 0, 3, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );
		i = i + 1;

	}

	if ( countHere( wolfTeam ) === 0 || countHere( sheepTeam ) === 0 )

		goldFactor( 1000 );

	// todo: should be nullable
	TimerStart( myTimer, 3, false, () => { /* do nothing */ } );
	TimerDialogSetTitle( myTimerDialog, "Starting in..." );
	TimerDialogDisplay( myTimerDialog, true );
	board( CreateMultiboard() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	let i: number;
	WORLD_BOUNDS( GetWorldBounds() );
	SetMapFlag( MAP_SHARED_ADVANCED_CONTROL, true );
	TriggerRegisterTimerEvent( t, 0.01, false );
	TriggerAddAction( t, Trig_coreInitDelay_Actions );
	i = 0;

	while ( true ) {

		if ( i === 12 ) break;
		saveskills[ i ] = 0;
		dollyClick[ i ] = 0;
		gemActivated[ i ] = false;
		i = i + 1;

	}

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
	AbilityRangePreload( FourCC( "A001" ), FourCC( "A00P" ) );

} );
