
import {
	isUnitSheep,
	isUnitWolf,
	sheeps,
	WISP_TYPE,
} from "shared";
import { timeout } from "util/temp";
import { onDeath } from "util/event";
import { reloadMultiboard } from "util/multiboard";
import { endGame } from "game/states/end";
import { onSheepDeath } from "./sheepDeath";
import { onWolfDeath } from "./wolfDeath";
import { onSheepSave } from "./sheepSave";
import { onWispTK } from "./wispTK";

// Trigger: sheepSaveDeath
// ===========================================================================

onDeath( "saveDeath", (): void => {

	const dyingUnit = GetDyingUnit();
	const killingUnit = GetKillingUnit();

	let relevantDeath = false;

	// Sheep death
	if ( isUnitSheep( dyingUnit ) ) {

		onSheepDeath( dyingUnit, killingUnit );
		relevantDeath = true;

		// Spirit death (save)

	} else if ( GetUnitTypeId( dyingUnit ) === WISP_TYPE )
		if ( GetUnitTypeId( killingUnit ) !== WISP_TYPE ) {

			onSheepSave( dyingUnit, killingUnit );
			relevantDeath = true;

		} else onWispTK( dyingUnit );

	// Wolf death
	else if ( isUnitWolf( dyingUnit ) )
		onWolfDeath( dyingUnit );

	if ( relevantDeath ) {

		reloadMultiboard();

		let allDead = true;
		for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
			if ( sheeps[ i ] && UnitAlive( sheeps[ i ] ) ) {

				allDead = false;
				break;

			}
		if ( allDead )
			timeout( 0.125, () => endGame( "wolves" ) );

	}

} );
