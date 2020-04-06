
import "../../test/w3api";
import { gameContext, simulateChat } from "w3api";
import { registerCommand, main } from "./registerCommand";

const defaultArgs: {
	command: string;
	category: "hidden";
	description: string;
} = {
	command: "test",
	category: "hidden",
	description: "a test command",
};

main();

it( "arg-less", () => gameContext.withTemp( () => {

	const fn = jest.fn();
	registerCommand( { ...defaultArgs, alias: "t", fn } );
	simulateChat( Player( 0 ), "-test" );

	expect( fn ).toHaveBeenCalledWith( {}, [ "-test" ] );

} ) );

describe( "player arg", () => {

	it( "works", () => gameContext.withTemp( () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			alias: "t",
			args: [ { name: "player", type: "player" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-t" ); // does not result in a call
		simulateChat( Player( 0 ), "-t 2" );

		expect( fn ).toHaveBeenCalledTimes( 1 );
		expect( fn ).toHaveBeenCalledWith( { player: Player( 1 ) }, [ "-t", "2" ] );

	} ) );

	it( "rejects invalid players", () => gameContext.withTemp( () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			alias: "t",
			args: [ { name: "player", type: "player" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-t 0" );
		simulateChat( Player( 0 ), "-t 30" );

		expect( fn ).not.toHaveBeenCalled();

	} ) );

} );

describe( "number arg", () => {

	it( "works", () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			args: [ { name: "amount", type: "number" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-test 12.7" );

		expect( fn ).toHaveBeenCalledWith( { amount: 12.7 }, [ "-test", "12.7" ] );

	} );

	it( "with default value", () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			args: [ { name: "amount", type: "number", default: 12.7 } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-test" );

		expect( fn ).toHaveBeenCalledWith( { amount: 12.7 }, [ "-test" ] );

	} );

} );

describe( "string arg", () => {

	it( "works", () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			args: [ { name: "amount", type: "string" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-test 12.7" );

		expect( fn ).toHaveBeenCalledWith( { amount: "12.7" }, [ "-test", "12.7" ] );

	} );

	it( "with default value", () => {

		const fn = jest.fn();
		registerCommand( {
			...defaultArgs,
			args: [ { name: "amount", type: "string", default: "12.7" } ],
			fn,
		} );
		simulateChat( Player( 0 ), "-test" );

		expect( fn ).toHaveBeenCalledWith( { amount: "12.7" }, [ "-test" ] );

	} );

} );
