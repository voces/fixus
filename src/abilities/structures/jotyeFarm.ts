
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { wrappedTriggerAddAction } from "util/emitLog";

const JOTYE_BUFF_TYPE = FourCC( "BHab" );

// ===========================================================================
// Trigger: sheepJotyeFarm
// ===========================================================================

const Trig_sheepJotyeFarm_Actions = (): void => {

	const u = GetTriggerUnit();

	if ( GetUnitAbilityLevel( u, JOTYE_BUFF_TYPE ) <= 0 ) return;

	DisableTrigger( GetTriggeringTrigger() );
	IssuePointOrderById(
		u,
		GetIssuedOrderId(),
		GetUnitX( u ) + ( GetUnitX( u ) - GetOrderPointX() ),
		GetUnitY( u ) + ( GetUnitY( u ) - GetOrderPointY() ),
	);
	EnableTrigger( GetTriggeringTrigger() );

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
	wrappedTriggerAddAction( t, "jotye", Trig_sheepJotyeFarm_Actions );

} );
