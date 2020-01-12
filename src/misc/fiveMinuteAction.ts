
import { addScriptHook, W3TS_HOOK } from "w3ts";
import {
	DisplayTimedText,
	goldFactor,
	DOLLY_TYPE,
} from "shared";
import { withTempGroup } from "util/temp";
// todo: test this
const DOLLY_SPEED_AURA = FourCC( "Aasl" );

const filterDolly = (): boolean => GetUnitTypeId( GetFilterUnit() ) === DOLLY_TYPE;

const increaseMovementSpeed = (): void => {

	DisplayTimedText( 15, "Five minutes remaining! Movement speed increased by 25%!" );

	const dolly = withTempGroup( g => {

		GroupEnumUnitsOfPlayer( g, Player( PLAYER_NEUTRAL_PASSIVE ), Condition( filterDolly ) );
		return FirstOfGroup( g );

	} );

	if ( dolly === null ) return;

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
	// 3 (sheep delay) + 20 (shepherd delay) + 1200 (20 minutes)
	TriggerRegisterTimerEventSingle( t, 1223 );
	TriggerAddAction( t, action );

} );
