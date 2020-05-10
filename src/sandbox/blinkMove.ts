
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { isSandbox } from "shared";
import { wrappedTriggerAddAction } from "util/emitLog";

const blinkMove = (): void => {

	const u = GetTriggerUnit();

	// smart
	if ( GetIssuedOrderId() !== 851971 ) return;

	const x1 = GetUnitX( u );
	const y1 = GetUnitY( u );
	const x2 = GetOrderPointX();
	const y2 = GetOrderPointY();

	// 1536 (12 farms) squared
	const distanceSquared = ( x2 - x1 ) ** 2 + ( y2 - y1 ) ** 2;
	if ( distanceSquared > 2359296 ) {

		const distance = Math.sqrt( distanceSquared ) - 8;
		const angle = Math.atan2( y2 - y1, x2 - x1 );

		const newX = x1 + distance * Math.cos( angle );
		const newY = y1 + distance * Math.sin( angle );

		if ( IsUnitType( u, UNIT_TYPE_STRUCTURE ) )
			SetUnitPosition( u, newX, newY );

		else {

			SetUnitX( u, newX );
			SetUnitY( u, newY );

		}

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0.25, false );
	wrappedTriggerAddAction( t, "blink move delay init", () => {

		if ( ! isSandbox() ) return;

		const t = CreateTrigger();
		TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
		wrappedTriggerAddAction( t, "blink move smart", blinkMove );

	} );

} );
