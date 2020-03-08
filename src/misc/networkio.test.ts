
import "../test/w3api";
import { parseSyncData } from "./networkio";

it( "parseSyncData", () => expect( parseSyncData( "512-3/6-my data blah blah blah" ) )
	.toEqual( { requestId: 512, chunk: 3, totalChunks: 6, data: "my data blah blah blah" } ) );

