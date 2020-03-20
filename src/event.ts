
/**
 * Instead of creating a trigger for frequently-invoked events, we create just
 * one trigger and invoke all the callbacks. This avoids building up a trigger
 * context for each invocation.
 */

import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "./util/emitLog";

const spellCastCallbacks: Array<{key: string; callback: () => void}> = [];
export const onSpellCast = ( key: string, callback: () => void ): void => {

	spellCastCallbacks.push( { key, callback } );

};

const deathCallbacks: Array<{key: string; callback: () => void}> = [];
export const onDeath = ( key: string, callback: () => void ): void => {

	deathCallbacks.push( { key, callback } );

};

const createdCallbacks: Array<{key: string; callback: () => void}> = [];
export const onCreated = ( key: string, callback: () => void ): void => {

	createdCallbacks.push( { key, callback } );

};

const constructionStartCallbacks: Array<{key: string; callback: () => void}> = [];
export const onConstructionStart = ( key: string, callback: () => void ): void => {

	constructionStartCallbacks.push( { key, callback } );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	let t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	wrappedTriggerAddAction( t, "unitSpellCast", () => {

		for ( const data of spellCastCallbacks )
			try {

				data.callback();

			} catch ( err ) {

				throw `${data.key} (unitSpellCast): ${err}`;

			}

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	wrappedTriggerAddAction( t, "unitDeath", () => {

		for ( const data of deathCallbacks )
			try {

				data.callback();

			} catch ( err ) {

				throw `${data.key} (unitDeath): ${err}`;

			}

	} );

	t = CreateTrigger();
	const r = GetWorldBounds();
	const re = CreateRegion();
	RegionAddRect( re, r );
	RemoveRect( r );
	TriggerRegisterEnterRegion( t, re, null );
	wrappedTriggerAddAction( t, "unitCreated", () => {

		for ( const data of createdCallbacks )
			try {

				data.callback();

			} catch ( err ) {

				throw `${data.key} (unitCreated): ${err}`;

			}

	} );

	t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_CONSTRUCT_START );
	wrappedTriggerAddAction( t, "constructionStart", () => {

		for ( const data of constructionStartCallbacks )
			try {

				data.callback();

			} catch ( err ) {

				throw `${data.key} (constructionStart): ${err}`;

			}

	} );

} );
