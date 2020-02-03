
import { addScriptHook, W3TS_HOOK } from "w3ts";

const onUnitCreated = (): boolean => {

	const u = GetFilterUnit();

	if ( IsUnitType( u, UNIT_TYPE_STRUCTURE ) ) return false;

	const playerName = GetPlayerName( GetOwningPlayer( u ) ).toLowerCase();

	if ( playerName.indexOf( "grim" ) >= 0 || playerName.indexOf( "jefferson" ) >= 0 ) {

		if ( ! IsUnitIllusion( u ) )
			AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );

		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "origin" );

	}

	return false;

};

export const main = (): void => {

	const r = GetWorldBounds();
	const re = CreateRegion();
	RegionAddRect( re, r );
	RemoveRect( r );
	TriggerRegisterEnterRegion( CreateTrigger(), re, Filter( onUnitCreated ) );

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, main );
