
import { wisps, WISP_TYPE } from "shared";

export const onWispTK = ( wispUnit: unit ): void => {

	const wispPlayer = GetOwningPlayer( wispUnit );
	const wispPlayerId = GetPlayerId( wispPlayer );
	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, WISP_TYPE, - 256, - 832, 270 );
	SetUnitPathing( wisps[ wispPlayerId ], false );

};
