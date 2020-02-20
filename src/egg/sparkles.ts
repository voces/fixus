
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { WISP_TYPE } from "../shared";

const PHOENIX1_TYPE = FourCC( "h00F" );
const PHOENIX2_TYPE = FourCC( "h00G" );
const PHOENIX3_TYPE = FourCC( "h00H" );

const hawkysExclusions = [ WISP_TYPE, PHOENIX1_TYPE, PHOENIX2_TYPE, PHOENIX3_TYPE ];

const onUnitCreated = (): boolean => {

	const u = GetFilterUnit();

	if ( IsUnitType( u, UNIT_TYPE_STRUCTURE ) ) return false;

	const playerName = GetPlayerName( GetOwningPlayer( u ) ).toLowerCase();

	if ( playerName.indexOf( "grim" ) >= 0 || playerName.indexOf( "jefferson" ) >= 0 ) {

		if ( ! IsUnitIllusion( u ) )
			AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );

		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "origin" );

	} else if ( playerName.indexOf( "hawkys" ) >= 0 && ! hawkysExclusions.includes( GetUnitTypeId( u ) ) ) {

		const e = AddSpecialEffectTarget( "Doodads\\Underground\\Plants\\ShroomsBlue\\ShroomsBlue.mdl", u, "head" );
		BlzSetSpecialEffectScale( e, 0.1 );

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
