
import {
	BLACK_SHEEP_TYPE,
	BLACK_WOLF_TYPE,
	CLOAK_TYPE,
	GOLD_SHEEP_TYPE,
	goldFactor,
	IMBA_WOLF_TYPE,
	saveskills,
	sheepTeam,
	SILVER_SHEEP_TYPE,
	WHITE_WOLF_TYPE,
	WISP_TYPE,
	wisps,
	wispTeam,
	WOLF_TYPE,
	wolves,
	wws,
} from "shared";
import { colorize } from "util/colorize";
import { forEachPlayerUnit, reducePlayerUnits } from "util/temp";
import { Specialization_onDeath, Specialization_GetLevel } from "abilities/sheep/specialization";
import { colorizedName } from "util/player";
import { awardBounty } from "util/proximityProportions";
import { replaceUnit, bloodlust } from "./common";
import { onSheepDeath as pityXpOnSheepDeath } from "resources/pityXp";
import { onSpawn as phoenixOnSpawn } from "upgrades/scoutPhoenixUpgrade";

const isStructureFilter = Filter( (): boolean =>
	IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) );

const getWolfType = ( p: player ): number => {

	if ( saveskills[ GetPlayerId( p ) ] === 10 ) return BLACK_WOLF_TYPE;
	else if ( saveskills[ GetPlayerId( p ) ] === 25 ) return IMBA_WOLF_TYPE;
	return WOLF_TYPE;

};

const GetSheepBounty = ( dyingUnit: unit ): number => {

	const sheepType = GetUnitTypeId( dyingUnit );
	let bounty = 100;

	// sheep type bonus
	if ( sheepType === GOLD_SHEEP_TYPE ) bounty += 100;
	else if ( sheepType === SILVER_SHEEP_TYPE ) bounty += 50;
	else if ( sheepType === BLACK_SHEEP_TYPE ) bounty += 25;

	// level bonus
	bounty += Specialization_GetLevel( dyingUnit ) * 10;

	// farm bonus
	bounty = reducePlayerUnits(
		GetOwningPlayer( dyingUnit ),
		( bounty, u ) => {

			const unitBounty = I2R( BlzGetUnitIntegerField( u, UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) );
			if ( unitBounty >= 5 ) return bounty + unitBounty * 0.6;
			return bounty;

		},
		bounty,
		isStructureFilter,
	);

	return bounty;

};

export const onSheepDeath = ( killedUnit: unit, killingUnit: unit ): void => {

	const killedPlayer = GetOwningPlayer( killedUnit );
	const killedPlayerId = GetPlayerId( killedPlayer );
	const killingPlayer = GetOwningPlayer( killingUnit );
	const killingPlayerId = GetPlayerId( killingPlayer );

	// Handle dying sheep
	const bounty = GetSheepBounty( killedUnit ) * goldFactor();
	ForceRemovePlayer( sheepTeam, killedPlayer );

	{

		const killed = colorizedName( killedPlayer );
		const killing = colorizedName( killingPlayer );
		DisplayTextToPlayer(
			GetLocalPlayer(),
			0,
			0,
			`${killed} has been ${colorize.wolfred( "killed" )} by ${killing}!`,
		);

	}

	forEachPlayerUnit( killedPlayer, RemoveUnit );
	Specialization_onDeath( killedUnit );
	pityXpOnSheepDeath();
	const x = GetUnitX( killedUnit );
	const y = GetUnitX( killedUnit );

	// Move to wisps
	ForceAddPlayer( wispTeam, killedPlayer );
	killedUnit = CreateUnit( killedPlayer, WISP_TYPE, - 256, - 832, 270 );
	wisps[ killedPlayerId ] = killedUnit;
	SetUnitPathing( killedUnit, false );

	// Increase wolf kills and upgrade
	saveskills[ killingPlayerId ] = saveskills[ killingPlayerId ] + 1;

	const isWhiteWolf = GetUnitTypeId( wolves[ killingPlayerId ] ) !== WHITE_WOLF_TYPE;

	if ( saveskills[ killingPlayerId ] === 10 || saveskills[ killingPlayerId ] === 25 ) {

		if ( isWhiteWolf ) {

			killingUnit = replaceUnit( wolves[ killingPlayerId ], getWolfType( killingPlayer ) );
			wolves[ killingPlayerId ] = killingUnit;

		} else {

			killingUnit = replaceUnit( wws[ killingPlayerId ], getWolfType( killingPlayer ) );
			wws[ killingPlayerId ] = killingUnit;

		}

		// todo: make this a listener
		phoenixOnSpawn( killingUnit );
		UnitAddItem(
			killingUnit,
			CreateItem( CLOAK_TYPE, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ),
		);

	} else
		bloodlust( isWhiteWolf ? wolves[ killingPlayerId ] : killingUnit );

	// Gold bounty
	awardBounty(
		{ x, y },
		{ gold: bounty, experience: 100 + Specialization_GetLevel( killedUnit ) * 25 },
		killingPlayer,
	);

};
