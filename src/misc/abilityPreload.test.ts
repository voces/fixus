
import "../test/w3api";
import { hookedMain } from "@voces/w3ts";
import "./abilityPreload";
import { getGame } from "w3api";
import { FourCCRev } from "w3api/dist/helpers/string";

const unitAddAbilityMock = globalThis.UnitAddAbility = jest.fn();

it( "preloads all custom abilities", () => {

	hookedMain();

	const game = getGame();
	const abilities = Object.values( game.data.units )
		.map( u => u.abil?.abilList )
		.flat()
		.filter( ( v, i, arr ) =>
			// remove undefines
			v &&
			// filter to custom abilities
			v.startsWith( "A0" ) &&
			// remove duplicates
			arr.indexOf( v ) === i,
		)
		.map( v => FourCC( v ) )
		.sort( ( a, b ) => a - b );

	abilities.forEach( ability => {

		try {

			expect( unitAddAbilityMock ).toHaveBeenCalledWith( expect.anything(), ability );

		} catch ( err ) {

			throw new Error(
				err +
				"\n\n" +
				`Ability '${FourCCRev( ability )}' has not been preloaded. ` +
				"You can preload it by extending the range in " +
				"src/misc/abilityPreload.ts",
			);

		}

	} );

} );
