
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	countHere,
	DisplayTimedText,
	goldFactor,
	myTimer,
	myTimerDialog,
	sheepTeam,
	wolfTeam,
} from "shared";
import { board } from "misc/multiboard";
import { changelog } from "misc/changelog";
import { commands, Command, Arg } from "util/commands";

// ===========================================================================
// Trigger: coreInit
// ===========================================================================

const argHelp = ( arg: Arg ): string =>
	arg.required === undefined || arg.required ? `<${arg.name}>` : `[${arg.name}]`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commandHelp = ( command: Command<any> ): string =>
	[
		"-" + command.command,
		command.args ? " " + command.args.map( arg => argHelp( arg ) ).join( " " ) : "",
		command.alias ? ` (alias -${command.alias})` : "",
		"\n" + command.description,
	].join( "" );

const action = (): void => {

	{

		const filteredCommands = commands.filter( c => c.category === "misc" );
		const q = CreateQuest();
		QuestSetTitle( q, "Commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNWarEagle.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "sheep" );
		const q = CreateQuest();
		QuestSetTitle( q, "Sheep Commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNSheep.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "wolf" );
		const q = CreateQuest();
		QuestSetTitle( q, "Wolf Commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNRaider.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "host" );
		const q = CreateQuest();
		QuestSetTitle( q, "Host Commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNHeroPaladin.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	changelog.forEach( quest => {

		const lines = quest.content.split( "\n" );
		for ( let i = 0; i < lines.length; i += 32 ) {

			const q = CreateQuest();
			QuestSetTitle( q, quest.title + ( i === 0 ? "" : " (cont.)" ) );
			QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNBansheeMaster.blp" );
			QuestSetRequired( q, false );
			QuestSetDescription( q, lines.slice( i, i + 32 ).join( "\n" ) );

		}

	} );

	DisplayTimedText( 3, "Fixus by |CFF959697Chakra|r\nDiscord: http://tiny.cc/sheeptag" );

	// debug mode
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
	TriggerAddAction( t, action );

} );
