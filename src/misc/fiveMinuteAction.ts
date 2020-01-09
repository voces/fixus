
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	WORLD_BOUNDS,
	DisplayTimedText,
	goldFactor,
	DOLLY_TYPE,
} from "shared";

const DOLLY_SPEED_AURA = FourCC( "Aasl" );

const filterDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === DOLLY_TYPE;

const increaseMovementSpeed = (): void => {

	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

	const g = CreateGroup();
	GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( filterDolly ) );
	const dolly = GroupPickRandomUnit( g );
	DestroyGroup( g );

	if ( dolly === null )

		return;

	UnitAddAbility( dolly, DOLLY_SPEED_AURA );

};

const action = (): void => {

	const rand = GetRandomReal( 0, 1 );

	if ( rand < 0.5 ) {

		DisplayTimedText( 15, "Five minutes remaining! All income is doubled!" );
		goldFactor( goldFactor() * 2 );

	} else increaseMovementSpeed();

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	// 3 (sheep delay) + 20 (shepherd delay) + 1200 (20 minutes)
	TriggerRegisterTimerEventSingle( t, 1223 );
	TriggerAddAction( t, action );

} );
