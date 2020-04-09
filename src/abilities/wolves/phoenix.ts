
import { onSummon } from "util/event";
import { PHOENIX_UNIT_TYPES } from "types";

onSummon( "phoneix replace", (): void => {

	let u = GetSummonedUnit();
	const t = GetUnitTypeId( u );

	if ( ! PHOENIX_UNIT_TYPES.includes( t ) ) return;

	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );

	RemoveUnit( u );
	u = CreateUnit( p, t, x, y, f );
	SetUnitAnimation( u, "birth" );
	QueueUnitAnimation( u, "stand" );

} );
