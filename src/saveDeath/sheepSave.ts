
import {
	BLACK_SHEEP_TYPE,
	GOLD_SHEEP_TYPE,
	goldFactor,
	saveskills,
	SHEEP_TYPE,
	sheeps,
	sheepTeam,
	SILVER_SHEEP_TYPE,
	wispTeam,
} from "shared";
import { awardBounty } from "util/proximityProportions";
import { colorizedName } from "util/player";
import { colorize } from "util/colorize";
import { Specialization_onSpawn, Specialization_onSave } from "abilities/sheep/specialization";
import { replaceUnit, bloodlust } from "./common";

const getSheepType = ( p: player ): number => {

	if ( saveskills[ GetPlayerId( p ) ] >= 25 ) return GOLD_SHEEP_TYPE;
	else if ( saveskills[ GetPlayerId( p ) ] >= 15 ) return SILVER_SHEEP_TYPE;
	else if ( saveskills[ GetPlayerId( p ) ] >= 10 ) return BLACK_SHEEP_TYPE;
	return SHEEP_TYPE;

};

export const onSheepSave = ( savedUnit: unit, savingUnit: unit ): void => {

	const savedPlayer = GetOwningPlayer( savedUnit );
	const savedPlayerId = GetPlayerId( savedPlayer );
	const savingPlayer = GetOwningPlayer( savingUnit );
	const savingPlayerId = GetPlayerId( savingPlayer );
	let i = 0;

	// Gold bounty
	awardBounty(
		{ x: GetUnitX( savedUnit ), y: GetUnitX( savedUnit ) },
		{ gold: 100 * goldFactor() },
		savingPlayer,
	);

	// Handle dying wisp
	ForceRemovePlayer( wispTeam, savedPlayer );
	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, `${colorizedName( savedPlayer )} has been ${colorize.sheepblue( "saved" )} by ${colorizedName( savingPlayer )}!` );

	// Move to sheep
	ForceAddPlayer( sheepTeam, savedPlayer );

	while ( true ) {

		i = GetRandomInt( 0, 12 );
		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) break;

	}

	const x = GetStartLocationX( i );
	const y = GetStartLocationY( i );
	savedUnit = CreateUnit( savedPlayer, getSheepType( savedPlayer ), x, y, 270 );
	sheeps[ savedPlayerId ] = savedUnit;
	Specialization_onSpawn( savedUnit );

	if ( GetLocalPlayer() === savedPlayer ) {

		PanCameraToTimed( x, y, 0 );
		ClearSelection();
		SelectUnit( savedUnit, true );

	}

	// Increase saves and upgrade
	saveskills[ savingPlayerId ] = saveskills[ savingPlayerId ] + 1;
	Specialization_onSave( savingUnit );

	if ( saveskills[ savingPlayerId ] === 10 || saveskills[ savingPlayerId ] === 15 || saveskills[ savingPlayerId ] === 25 ) {

		savingUnit = replaceUnit( savingUnit, getSheepType( savingPlayer ) );
		sheeps[ savingPlayerId ] = savingUnit;
		SelectUnitForPlayerSingle( savingUnit, savingPlayer );

		Specialization_onSpawn( savingUnit );

	} else
		bloodlust( savingUnit );

};
