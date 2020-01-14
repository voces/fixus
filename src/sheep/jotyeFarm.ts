import { WOLF_TYPE, BLACK_WOLF_TYPE, IMBA_WOLF_TYPE } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const s__wolf_golemtype = FourCC( "ewsp" );
const s__wolf_stalkertype = FourCC( "nfel" );

// todo: test this
// ===========================================================================
// Trigger: sheepJotyeFarm
// ===========================================================================

// Can probably just use the aura targets property instead of checking type...
const sheepJotyeFarm_isProperType = ( u: unit ): boolean => {

	const unitType = GetUnitTypeId( u );
	return unitType === WOLF_TYPE || unitType === BLACK_WOLF_TYPE || unitType === IMBA_WOLF_TYPE || unitType === s__wolf_golemtype || unitType === s__wolf_stalkertype;

};

const Trig_sheepJotyeFarm_Actions = (): void => {

	const u = GetTriggerUnit();

	if ( sheepJotyeFarm_isProperType( u ) && GetUnitAbilityLevel( u, FourCC( "BHab" ) ) > 0 ) {

		DisableTrigger( GetTriggeringTrigger() );
		IssuePointOrderById( u, GetIssuedOrderId(), GetUnitX( u ) + ( GetUnitX( u ) - GetOrderPointX() ), GetUnitY( u ) + ( GetUnitY( u ) - GetOrderPointY() ) );
		EnableTrigger( GetTriggeringTrigger() );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER );
	TriggerAddAction( t, Trig_sheepJotyeFarm_Actions );

} );
