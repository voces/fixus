import { WOLF_TYPE, BLACK_WOLF_TYPE, IMBA_WOLF_TYPE } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const GOLEM_UNIT_TYPE = FourCC( "ewsp" );
const STALKER_UNIT_TYPE = FourCC( "nfel" );
const JOTYE_BUFF_TYPE = FourCC( "BHab" );

// ===========================================================================
// Trigger: sheepJotyeFarm
// ===========================================================================

// Can probably just use the aura targets property instead of checking type...
const isEffectedByJotyeFarm = ( u: unit ): boolean => {

	const unitType = GetUnitTypeId( u );
	return unitType === WOLF_TYPE || unitType === BLACK_WOLF_TYPE ||
		unitType === IMBA_WOLF_TYPE || unitType === GOLEM_UNIT_TYPE ||
		unitType === STALKER_UNIT_TYPE;

};

const Trig_sheepJotyeFarm_Actions = (): void => {

	const u = GetTriggerUnit();

	if ( ! isEffectedByJotyeFarm( u ) || GetUnitAbilityLevel( u, JOTYE_BUFF_TYPE ) <= 0 ) return;

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
	TriggerAddAction( t, Trig_sheepJotyeFarm_Actions );

} );
