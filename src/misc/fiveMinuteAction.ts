
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	WORLD_BOUNDS,
	DisplayTimedText,
	goldFactor,
} from "shared";

const s__misc_dolly = FourCC( "nshf" );
const s__misc_dollySpeedAura = FourCC( "Aasl" );

// ===========================================================================
// Trigger: miscFiveMinuteAction
// ===========================================================================

const FilterDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === s__misc_dolly;

const increaseMovementSpeed = (): void => {

	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

	const g = CreateGroup();
	GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( FilterDolly ) );
	const dolly = GroupPickRandomUnit( g );
	DestroyGroup( g );

	if ( dolly === null )

		return;

	UnitAddAbility( dolly, s__misc_dollySpeedAura );

};

const Trig_miscFiveMinuteAction_Actions = (): void => {

	const rand = GetRandomReal( 0, 1 );

	if ( rand < 0.5 ) {

		DisplayTimedText( 15, "Five minutes remaining! All income is doubled!" );
		goldFactor( goldFactor() * 2 );

	} else

		increaseMovementSpeed();

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	// 3 (sheep delay) + 20 (shepherd delay) + 1200 (20 minutes)
	TriggerRegisterTimerEventSingle( t, 1223 );
	TriggerAddAction( t, Trig_miscFiveMinuteAction_Actions );

} );
