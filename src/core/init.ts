
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	board,
	color,
	countHere,
	dollyClick,
	gemActivated,
	goldFactor,
	isHere,
	saveskills,
	sheepTeam,
	wolfTeam,
	WORLD_BOUNDS,
} from "../index";
import { AbilityRangePreload } from "../misc/abilityPreload";

export const myTimer = CreateTimer();
export const myTimerDialog = CreateTimerDialog( myTimer );
const itemSpecs: Array<number> = [];
// skip 0 to avoid typos
let itemSpecsLength = 1;
const itemSpecsNames = InitHashtable();
const itemSpecsIds = InitHashtable();
let si__itemspec_F = 0;
let si__itemspec_I = 0;
const si__itemspec_V: Array<number> = [];
const s__itemspec_name: Array<string> = [];
const s__itemspec_gold: Array<number> = [];
const s__itemspec_lumber: Array<number> = [];
const s__itemspec_id: Array<number> = [];

// Generated allocator of itemspec
const s__itemspec__allocate = (): number => {

	let _this = si__itemspec_F;

	if ( _this !== 0 )

		si__itemspec_F = si__itemspec_V[ _this ];

	else {

		si__itemspec_I = si__itemspec_I + 1;
		_this = si__itemspec_I;

	}

	if ( _this > 8190 )

		return 0;

	si__itemspec_V[ _this ] = - 1;
	return _this;

};

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

const RegisterItem = ( name: string, gold: number, lumber: number, id: number ): number => {

	// Can't directly get gold/lumber cost off an item, so... :(
	itemSpecs[ itemSpecsLength ] = s__itemspec__allocate();
	s__itemspec_name[ itemSpecs[ itemSpecsLength ] ] = name;
	s__itemspec_gold[ itemSpecs[ itemSpecsLength ] ] = gold;
	s__itemspec_lumber[ itemSpecs[ itemSpecsLength ] ] = lumber;
	s__itemspec_id[ itemSpecs[ itemSpecsLength ] ] = id;
	SaveInteger( itemSpecsNames, StringHash( name ), 0, itemSpecsLength );
	SaveInteger( itemSpecsIds, id, 0, itemSpecsLength );
	itemSpecsLength = itemSpecsLength + 1;
	return itemSpecs[ itemSpecsLength - 1 ];

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

	RegisterItem( "supergolem", 350, 0, FourCC( "I001" ) );
	RegisterItem( "stalker", 100, 0, FourCC( "fgfh" ) );
	RegisterItem( "golem", 100, 0, FourCC( "fgrg" ) );
	RegisterItem( "speed", 25, 0, FourCC( "pspd" ) );
	RegisterItem( "invis", 35, 0, FourCC( "pinv" ) );
	RegisterItem( "mana", 20, 0, FourCC( "pman" ) );
	RegisterItem( "cheese", 0, 2, FourCC( "I003" ) );
	RegisterItem( "50", 350, 0, FourCC( "I002" ) );
	RegisterItem( "sabre", 300, 0, FourCC( "I000" ) );
	RegisterItem( "21", 126, 0, FourCC( "ratf" ) );
	RegisterItem( "12", 60, 0, FourCC( "ratc" ) );
	RegisterItem( "dagger", 67, 0, FourCC( "mcou" ) );
	RegisterItem( "cloak", 250, 0, FourCC( "clfm" ) );
	RegisterItem( "neck", 150, 0, FourCC( "nspi" ) );
	RegisterItem( "boots", 70, 0, FourCC( "bspd" ) );
	RegisterItem( "gem", 125, 0, FourCC( "gemt" ) );
	RegisterItem( "orb", 300, 0, FourCC( "ofir" ) );
	RegisterItem( "scope", 30, 0, FourCC( "tels" ) );
	RegisterItem( "invul", 25, 0, FourCC( "pnvu" ) );
	RegisterItem( "6", 18, 0, FourCC( "rat6" ) );
	RegisterItem( "gloves", 80, 0, FourCC( "gcel" ) );
	RegisterItem( "9", 36, 0, FourCC( "rat9" ) );
	RegisterItem( "shadow", 100, 0, FourCC( "clsd" ) );
	RegisterItem( "siege", 150, 0, FourCC( "tfar" ) );
	RegisterItem( "dragon", 400, 2, FourCC( "I004" ) );
	RegisterItem( "mines", 150, 0, FourCC( "gobm" ) );
	RegisterItem( "negation", 50, 0, FourCC( "I005" ) );
	RegisterItem( "power", 200, 0, FourCC( "tkno" ) );
	RegisterItem( "health", 50, 0, FourCC( "hlst" ) );
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
