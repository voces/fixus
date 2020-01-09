
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	countHere,
	goldFactor,
	myTimer,
	myTimerDialog,
	sheepTeam,
	wolfTeam,
} from "../shared";
import { board } from "../misc/multiboard";

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
	TriggerRegisterTimerEvent( t, 0.01, false );
	TriggerAddAction( t, Trig_coreInitDelay_Actions );

} );
