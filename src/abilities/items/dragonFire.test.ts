
import "../../../test/w3api";
import { executeHooksMainAfter } from "@voces/w3ts";
import { main, units, nextWolfId } from "./dragonFire";
import { wolfTeam, WOLF_TYPE } from "shared";

jest.mock(
	"shared",
	() => ( {
		...jest.requireActual( "shared" ),
		wolves: new Proxy( [], {
			get: ( _, prop ): boolean | null =>
				typeof prop === "string" && [ "2", "5", "8", "11" ].includes( prop ) ? true : null,
		} ),
	} ),
);

it( "smoke", () => {

	SetPlayerController( Player( 0 ), MAP_CONTROL_USER );
	Player( 0 ).slotState = PLAYER_SLOT_STATE_PLAYING;

	executeHooksMainAfter();
	main();
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "uC04" ), 96, 96, 270 );

	expect( BlzGroupGetSize( units ) ).toEqual( 1 );

} );

it( "nextWolfId", () => {

	ForceAddPlayer( wolfTeam, Player( 2 ) );
	const wolf1 = CreateUnit( Player( 2 ), WOLF_TYPE, 1024, 1024, 270 );
	ForceAddPlayer( wolfTeam, Player( 5 ) );
	const wolf2 = CreateUnit( Player( 5 ), WOLF_TYPE, 1024, 1024, 270 );
	ForceAddPlayer( wolfTeam, Player( 8 ) );
	const wolf3 = CreateUnit( Player( 8 ), WOLF_TYPE, 4096, 4096, 270 );
	ForceAddPlayer( wolfTeam, Player( 11 ) );
	const wolf4 = CreateUnit( Player( 11 ), WOLF_TYPE, 4096, 4096, 270 );

	expect( nextWolfId( 0 ) ).toEqual( 2 ); // sheep
	expect( nextWolfId( 1 ) ).toEqual( 2 ); // sheep
	expect( nextWolfId( 2 ) ).toEqual( 5 ); // wolf
	expect( nextWolfId( 3 ) ).toEqual( 5 ); // sheep
	expect( nextWolfId( 4 ) ).toEqual( 5 ); // sheep
	expect( nextWolfId( 5 ) ).toEqual( 8 ); // wolf
	expect( nextWolfId( 6 ) ).toEqual( 8 ); // sheep
	expect( nextWolfId( 7 ) ).toEqual( 8 ); // sheep
	expect( nextWolfId( 8 ) ).toEqual( 11 ); // wolf
	expect( nextWolfId( 9 ) ).toEqual( 11 ); // sheep
	expect( nextWolfId( 10 ) ).toEqual( 11 ); // sheep
	expect( nextWolfId( 11 ) ).toEqual( 2 ); // wolf

	ForceRemovePlayer( wolfTeam, Player( 2 ) );
	RemoveUnit( wolf1 );
	ForceRemovePlayer( wolfTeam, Player( 5 ) );
	RemoveUnit( wolf2 );
	ForceRemovePlayer( wolfTeam, Player( 8 ) );
	RemoveUnit( wolf3 );
	ForceRemovePlayer( wolfTeam, Player( 11 ) );
	RemoveUnit( wolf4 );

} );
