
import { addScriptHook, W3TS_HOOK } from "w3ts";
import { DisplayTimedText, isSandbox } from "shared";
import { board } from "util/multiboard";
import { changelog } from "misc/changelog";
import { commands, Command, Arg, isArgRequired } from "commands/registerCommand";
import { wrappedTriggerAddAction } from "util/emitLog";
import { forEachPlayer } from "util/temp";
import { isPlayingPlayer } from "util/player";
import { colorize } from "util/colorize";

// ===========================================================================
// Trigger: coreInit
// ===========================================================================

export const argHelp = ( arg: Arg<string | number> ): string => {

	const defaultValue = arg.default;
	const defaultStringified = defaultValue !== undefined ?
		typeof defaultValue === "string" ?
			defaultValue :
			typeof defaultValue === "number" ?
				defaultValue.toString() : undefined
		: undefined;

	const defaultPart = defaultStringified === undefined ? "" : `=${defaultStringified}`;

	return isArgRequired( arg ) ? `<${arg.name}>` : `[${arg.name}${defaultPart}]`;

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandHelp = ( command: Command<any> ): string =>
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
		QuestSetTitle( q, "Misc commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNWarEagle.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "sheep" );
		const q = CreateQuest();
		QuestSetTitle( q, "Sheep commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNSheep.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "wolf" );
		const q = CreateQuest();
		QuestSetTitle( q, "Wolf commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNRaider.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	{

		const filteredCommands = commands.filter( c => c.category === "host" );
		const q = CreateQuest();
		QuestSetTitle( q, "Host commands" );
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

	DisplayTimedText( 3, [
		`Fixus by ${colorize.gray( "Chakra" )}`,
		`Discord: ${colorize.sheepblue( "http://tiny.cc/sheeptag" )}`,
	].join( "\n" ) );

	// debug mode
	let playingPlayers = 0;
	forEachPlayer( player => {

		if ( isPlayingPlayer( player ) ) playingPlayers ++;

	} );
	if ( playingPlayers === 1 ) {

		isSandbox( true );

		DisplayTimedText( 5, "Sandbox commands enabled." );

		const filteredCommands = commands.filter( c => c.category === "sandbox" );
		const q = CreateQuest();
		QuestSetTitle( q, "Sandbox commands" );
		QuestSetIconPath( q, "ReplaceableTextures\\CommandButtons\\BTNDwarfCar.blp" );
		QuestSetDescription( q, filteredCommands.map( c => commandHelp( c ) ).join( "\n\n" ) );

	}

	board( CreateMultiboard() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0.01, false );
	wrappedTriggerAddAction( t, "init", action );

} );
