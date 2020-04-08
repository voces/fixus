
import { timeout } from "./temp";

const DUMMY_UNIT_TYPE = FourCC( "dumy" );

const dummies: unit[] = [];

export const getDummy = ( timeoutInterval = 0.25 ): unit => {

	const dummy = dummies.length > 0 ?
		dummies.pop() as unit :
		CreateUnit( Player( PLAYER_NEUTRAL_PASSIVE ), DUMMY_UNIT_TYPE, 0, 0, 0 );

	timeout( "getDummy reuse", timeoutInterval, () => dummies.push( dummy ) );

	return dummy;

};
