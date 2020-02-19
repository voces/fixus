
import { generateTs } from "./changelog";
import { promises as fs } from "fs";

it( "snapshot", async done => {

	try {

		expect( await generateTs() )
			.toEqual(
				await fs.readFile( "src/misc/changelog.ts", { encoding: "utf-8" } ),
			);

		done();

	} catch ( err ) {

		throw new Error( err + "\n\n" + "Maybe run `npm run build:changelog`?" );

	}

} );
