
import "../test/w3api";
import { main, units } from "./dragonFire";

it( "smoke", () => {

	main();
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "uC04" ), 96, 96, 270 );

	expect( BlzGroupGetSize( units ) ).toEqual( 1 );

} );
