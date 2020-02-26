
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { isSandbox } from "core/init";

const blinkMove = (): void => {

	const u = GetTriggerUnit();

	// smart
	if ( GetIssuedOrderId() !== 851971 ) return;

	const x1 = GetUnitX( u );
	const y1 = GetUnitY( u );
	const x2 = GetOrderPointX();
	const y2 = GetOrderPointY();

	// 1536 (12 farms) squared
	if ( ( x2 - x1 ) ** 2 + ( y2 - y1 ) ** 2 > 2359296 ) {

		SetUnitX( u, x2 );
		SetUnitY( u, y2 );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0.25, false );
	TriggerAddAction( t, () => {

		if ( ! isSandbox() ) return;

		const t = CreateTrigger();
		TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
		TriggerAddAction( t, blinkMove );

	} );

} );
