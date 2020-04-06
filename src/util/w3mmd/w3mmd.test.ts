
import "../../../test/w3api";
import { pack } from "./w3mmd";

describe( "pack", () => {

	it( "smoke", () => expect(
		pack( "hello world how are \"you\" this fine \"morning? 3\\2 = 1.5, and 4\\2 = 2" ),
	).toEqual( "hello\\ world\\ how\\ are\\ \"you\"\\ this\\ fine\\ \"morning?\\ 3\\\\2\\ =\\ 1.5,\\ and\\ 4\\\\2\\ =\\ 2" ) );

} );
