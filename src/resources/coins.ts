
import { fillArrayFn, goldFactor, SmallText } from "shared";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { withUnitsInRange } from "util/temp";
import { wrappedTriggerAddAction } from "util/emitLog";
import { adjustPlayerGold } from "./goldPerSecond";

const FACTOR = 0.5;
const THRESHOLD = 3;
const DURATION = 30;
const RANGE = 384;
const COIN_ITEM_TYPE = FourCC( "gold" );
const coins: Set<{
	gold: number;
	item: item;
	timeout: number;
	x: number;
	y: number;
}> = new Set();
let time = 0;

export const spawnCoin = ( source: unit ): void => {

	const goldBase = BlzGetUnitIntegerField(
		source,
		UNIT_IF_GOLD_BOUNTY_AWARDED_BASE,
	);
	const goldDice = BlzGetUnitIntegerField(
		source,
		UNIT_IF_GOLD_BOUNTY_AWARDED_NUMBER_OF_DICE,
	);
	const goldSides = BlzGetUnitIntegerField(
		source,
		UNIT_IF_GOLD_BOUNTY_AWARDED_SIDES_PER_DIE,
	);

	const randPortion = fillArrayFn(
		goldDice,
		() => Math.ceil( Math.random() * goldSides ),
	)
		.reduce( ( sum, v ) => sum + v, 0 );
	const rawGold = goldBase + randPortion;
	const gold = Math.ceil( rawGold * goldFactor() * FACTOR );

	if ( gold < THRESHOLD ) return;

	const coin = CreateItem(
		COIN_ITEM_TYPE,
		GetUnitX( source ),
		GetUnitY( source ),
	);

	coins.add( {
		gold,
		item: coin,
		timeout: time + DURATION,
		x: GetUnitX( source ),
		y: GetUnitY( source ),
	} );

};

const isNotStructure = Filter( (): boolean =>
	! IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) );

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterTimerEvent( t, 0.5, true );
	wrappedTriggerAddAction( t, "coins tick", () => {

		time += 0.5;

		for ( const coin of coins.values() ) {

			const collector = withUnitsInRange(
				coin.x,
				coin.y,
				RANGE,
				units => FirstOfGroup( units ),
				isNotStructure,
			);
			if ( collector != null ) {

				adjustPlayerGold( GetOwningPlayer( collector ), coin.gold );
				SmallText( coin.gold, collector, "gold", 0, 0 );
				RemoveItem( coin.item );
				coins.delete( coin );

				continue;

			}

			if ( time > coin.timeout ) {

				RemoveItem( coin.item );
				coins.delete( coin );

			}

		}

	} );

} );
