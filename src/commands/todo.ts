
import { registerCommand } from "./registerCommand";
import { writeFile, openFile } from "util/fileIO";

const time = os.date( "%Y-%m-%d %H-%M-%S" );

const logs: string[] = [];

registerCommand( {
	command: "todo",
	category: "hidden",
	description: "Logs a todo item to local disk",
	args: [ { name: "string" } ],
	fn: ( _ignore: string, words: string[] ): void => {

		logs.push( `[${os.date( "%Y-%m-%d %H:%M:%S" )}] ${words.slice( 1 ).join( " " )}` );

		writeFile(
			openFile( `fixus/todos/${time}.txt` ),
			logs.join( "\n" ),
			true,
		);

	},
} );
