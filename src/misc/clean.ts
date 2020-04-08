
import { onDeath } from "util/event";
import { timeout } from "util/temp";

// ===========================================================================
// Trigger: miscClean
// ===========================================================================

onDeath( "clean", () => {

	const dyingUnit = GetDyingUnit();

	if ( IsUnitType( dyingUnit, UNIT_TYPE_HERO ) !== false ) return;

	timeout( "clean", 30, () => RemoveUnit( dyingUnit ) );

} );
