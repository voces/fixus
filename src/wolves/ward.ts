
import { addScriptHook, W3TS_HOOK } from "w3ts";
// todo: test this
const s__wolf_wardtype = FourCC( "n001" );
const s__wolf_wardability = FourCC( "A001" );

// ===========================================================================
// Trigger: wolfWard
// ===========================================================================

const Trig_wolfWard_Actions = (): void => {

	let u: unit;

	if ( GetSpellAbilityId() === s__wolf_wardability ) {

		u = CreateUnit( GetOwningPlayer( GetTriggerUnit() ), s__wolf_wardtype, GetSpellTargetX(), GetSpellTargetY(), 270 );
		SetUnitPosition( u, GetSpellTargetX(), GetSpellTargetY() );
		UnitApplyTimedLife( u, FourCC( "BTLF" ), 240 );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_SPELL_CAST );
	TriggerAddAction( t, Trig_wolfWard_Actions );

} );
