
import "../test/w3api";
import { main, units } from "./dragonFire";

it( "smoke", () => {

	main();
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 0, 270 );

	expect( BlzGroupGetSize( units ) ).toEqual( 1 );

} );
