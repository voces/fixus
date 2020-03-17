
import { onSpellCast } from "event";

const WARD_TYPE = FourCC( "n001" );
const WARD_ABILITY_TYPE = FourCC( "A001" );

// ===========================================================================
// Trigger: wolfWard
// ===========================================================================

const Trig_wolfWard_Actions = (): void => {

	if ( GetSpellAbilityId() !== WARD_ABILITY_TYPE ) return;

	const u = CreateUnit( GetOwningPlayer( GetTriggerUnit() ), WARD_TYPE, GetSpellTargetX(), GetSpellTargetY(), 270 );
	SetUnitPosition( u, GetSpellTargetX(), GetSpellTargetY() );
	UnitApplyTimedLife( u, FourCC( "BTLF" ), 240 );

};

// ===========================================================================
onSpellCast( "ward", Trig_wolfWard_Actions );
