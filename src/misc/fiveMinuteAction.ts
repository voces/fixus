
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import {
	DisplayTimedText,
	goldFactor,
	DOLLY_TYPE,
} from "shared";
import { withPlayerUnits } from "util/temp";

const DOLLY_SPEED_AURA = FourCC( "Aasl" );

const filterDolly = Condition( (): boolean => GetUnitTypeId( GetFilterUnit() ) === DOLLY_TYPE );

const increaseMovementSpeed = (): void => {

	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

	const dolly = withPlayerUnits( Player( PLAYER_NEUTRAL_PASSIVE ), FirstOfGroup, filterDolly );
	if ( dolly == null ) return;

	UnitAddAbility( dolly, DOLLY_SPEED_AURA );

};

const doubleIncome = (): void => {

	DisplayTimedText( 15, "Five minutes remaining! All income is doubled!" );
	goldFactor( goldFactor() * 2 );

};

const cases = [ increaseMovementSpeed, doubleIncome ];

const action = (): void =>
	cases[ Math.floor( Math.random() * cases.length ) ]();

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	// 3 (sheep delay) + 10 (shepherd delay) + 1200 (20 minutes)
	TriggerRegisterTimerEventSingle( t, 1213 );
	TriggerAddAction( t, action );

} );
