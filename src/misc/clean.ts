
import { onDeath } from "event";
import { timeout } from "util/temp";

// ===========================================================================
// Trigger: miscClean
// ===========================================================================

onDeath( "clean", () => {

	const dyingUnit = GetDyingUnit();

	if ( IsUnitType( dyingUnit, UNIT_TYPE_HERO ) !== false ) return;

	timeout( 30, () => RemoveUnit( dyingUnit ) );

} );
