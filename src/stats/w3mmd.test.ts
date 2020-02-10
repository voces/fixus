
import "../test/w3api";
import { MMD__pack } from "./w3mmd";

describe( "MMD_pack", () => {

	it( "smoke", () => expect(
		MMD__pack( "hello world how are \"you\" this fine \"morning? 3\\2 = 1.5, and 4\\2 = 2" ),
	).toEqual( "hello\\ world\\ how\\ are\\ \"you\"\\ this\\ fine\\ \"morning?\\ 3\\\\2\\ =\\ 1.5,\\ and\\ 4\\\\2\\ =\\ 2" ) );

} );
