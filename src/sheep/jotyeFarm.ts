import { s__wolf_type, s__wolf_blacktype, s__wolf_imbatype } from "shared";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const s__wolf_golemtype = FourCC( "ewsp" );
const s__wolf_stalkertype = FourCC( "nfel" );

// ===========================================================================
// Trigger: sheepJotyeFarm
// ===========================================================================

// Can probably just use the aura targets property instead of checking type...
const sheepJotyeFarm_isProperType = ( u: unit ): boolean => {

	const unitType = GetUnitTypeId( u );
	return unitType === s__wolf_type || unitType === s__wolf_blacktype || unitType === s__wolf_imbatype || unitType === s__wolf_golemtype || unitType === s__wolf_stalkertype;

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
