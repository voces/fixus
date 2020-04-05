
import { wolves, WOLF_TYPE, countHere, wolfTeam } from "shared";
import { addQuickShop } from "wolves/quickShops";
import {
	gameState,
	shareControlWithAllies,
	TransitionInformation,
	transitionsFrom,
} from "./common";

const STARTER_ITEM_TYPE = FourCC( "mcou" ); // everyone gets this
const ONE_WOLF_ITEM_TYPE = FourCC( "ratf" );
const TWO_WOLF_ITEM_TYPE = FourCC( "ratc" );
const THREE_WOLF_ITEM_TYPE = FourCC( "rat9" );
const FOUR_WOLF_ITEM_TYPE = FourCC( "rat6" );

const starterItemMap: Record<number, number> = {
	1: ONE_WOLF_ITEM_TYPE,
	2: TWO_WOLF_ITEM_TYPE,
	3: THREE_WOLF_ITEM_TYPE,
	4: FOUR_WOLF_ITEM_TYPE,
};

const spawnWolf = ( index: number, starterItem: number ): void => {

	const player = Player( index );

	wolves[ index ] = CreateUnit( player, WOLF_TYPE, - 256, - 832, 270 );
	UnitAddItem( wolves[ index ], CreateItem( STARTER_ITEM_TYPE, - 256, - 832 ) );
	UnitAddItem( wolves[ index ], CreateItem( starterItem, - 256, - 832 ) );
	addQuickShop( wolves[ index ] );

	if ( GetLocalPlayer() === player ) {

		ClearSelection();
		SelectUnit( wolves[ index ], true );
		PanCameraToTimed( - 256, - 1024, 0 );

	}

	if ( GetPlayerController( player ) !== MAP_CONTROL_USER || GetPlayerSlotState( player ) !== PLAYER_SLOT_STATE_PLAYING )
		shareControlWithAllies( player );

};

/**
 * Spawns wolves
 */
const wolfStart = (): TransitionInformation => {

	const starterItem = starterItemMap[ countHere( wolfTeam ) ];
	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), wolfTeam ) )
			spawnWolf( i, starterItem );

	gameState( "play" );
	return { remaining: 1500, title: "Sheep win in..." };

};
transitionsFrom[ "start" ] = wolfStart;
