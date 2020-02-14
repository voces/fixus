
import fs from "fs";
import "../test/w3api";
import { main, units } from "./dragonFire";
import { getGame } from "w3api";

it( "smoke", () => {

	getGame().loadData( {
		w3u: fs.readFileSync( "maps/fixus.w3x/war3map.w3u" ),
		wts: fs.readFileSync( "maps/fixus.w3x/war3map.wts" ),
	} );
	main();
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 0, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 0, 270 );
	CreateUnit( Player( 0 ), FourCC( "hhou" ), 192, 192, 270 );
	CreateUnit( Player( 0 ), FourCC( "uC04" ), 96, 96, 270 );

	expect( BlzGroupGetSize( units ) ).toEqual( 1 );

} );
