
import "../test/w3api";
import { gameContext } from "w3api/dist/contexts";
import { registerCommand } from "./commands";
import { simulateChat } from "w3api/dist/PlayerClass";

it( "arg-less", () => gameContext.withTemp( () => {

	SetPlayers( 1 );
	const fn = jest.fn();
	registerCommand( { command: "test", alias: "t", fn } );
	simulateChat( Player( 0 ), "-test" );

	expect( fn ).toHaveBeenCalledWith( {}, [ "-test" ] );

} ) );

describe( "player arg", () => {

	it( "works", () => gameContext.withTemp( () => {

		SetPlayers( 2 );
		const fn = jest.fn();
		registerCommand( {
			command: "test",
			alias: "t",
			args: [ { name: "player", type: "player" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-t" ); // does not result in a call
		simulateChat( Player( 0 ), "-t 2" );

		expect( fn ).toHaveBeenCalledTimes( 1 );
		expect( fn ).toHaveBeenCalledWith( { player: Player( 1 ) }, [ "-t", "2" ] );

	} ) );

	it( "ignores invalid players", () => gameContext.withTemp( () => {

		SetPlayers( 2 );
		const fn = jest.fn();
		registerCommand( {
			command: "test",
			alias: "t",
			args: [ { name: "player", type: "player" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-t 0" );
		simulateChat( Player( 0 ), "-t 30" );

		expect( fn ).not.toHaveBeenCalled();

	} ) );

} );
