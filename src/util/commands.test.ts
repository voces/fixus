
import "../test/w3api";
import { gameContext } from "w3api/dist/contexts";
import { registerCommand } from "./commands";
import { simulateChat } from "w3api/dist/PlayerClass";

it( "smoke", () => gameContext.withTemp( () => {

	SetPlayers( 1 );
	registerCommand( { command: "test", alias: "t", fn: jest.fn() } );
	simulateChat( Player( 0 ), "-test apple" );

} ) );
