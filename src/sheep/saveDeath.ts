
import {
	BLACK_SHEEP_TYPE,
	BLACK_WOLF_TYPE,
	CLOAK_TYPE,
	GOLD_SHEEP_TYPE,
	goldFactor,
	IMBA_WOLF_TYPE,
	isUnitSheep,
	isUnitWolf,
	saveskills,
	SHEEP_TYPE,
	sheeps,
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
import {
	Specialization_GetLevel,
	Specialization_onDeath,
	Specialization_onSave,
	Specialization_onSpawn,
} from "./specialization";
import { onSheepDeath as pityXpOnSheepDeath } from "../wolves/pityXp";
import { onSpawn as phoenixOnSpawn } from "wolves/scoutPhoenixUpgrade";
import { reloadMultiboard } from "misc/multiboard";
import { reducePlayerUnits, forEachPlayerUnit, timeout } from "util/temp";
import { colorizedName } from "util/player";
import { awardBounty } from "misc/proximityProportions";
import { onDeath } from "../event";
import { removeQuickShop } from "../wolves/quickShops";
import { endGame } from "core/game/end";
import { colorize } from "util/colorize";

// Trigger: sheepSaveDeath
// ===========================================================================

const isStructureFilter = Filter( (): boolean =>
	IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) );

const replaceUnit = ( u: unit, newType: number ): unit => {

	// General unit props
	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );

	// Copy hero props
	const xp = GetHeroXP( u );
	const it: Array<number> = [];
	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );

	// Remove it
	removeQuickShop( u );
	RemoveUnit( u );

	// Create a new one
	u = CreateUnit( p, newType, x, y, f );
	SelectUnitForPlayerSingle( u, p );

	// Copy hero props
	SetHeroXP( u, xp, false );
	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		UnitAddItem( u, CreateItem( it[ i ], x, y ) );

	return u;

};

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

const onSheepDeath = ( killedUnit: unit, killingUnit: unit ): void => {

	const killedPlayer = GetOwningPlayer( killedUnit );
	const killedPlayerId = GetPlayerId( killedPlayer );
	const killingPlayer = GetOwningPlayer( killingUnit );
	const killingPlayerId = GetPlayerId( killingPlayer );

	// Handle dying sheep
	const bounty = GetSheepBounty( killedUnit ) * goldFactor();
	ForceRemovePlayer( sheepTeam, killedPlayer );

	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, `${colorizedName( killedPlayer )} has been ${colorize.wolfred( "killed" )} by ${colorizedName( killingPlayer )}!` );
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

	if ( saveskills[ killingPlayerId ] === 10 || saveskills[ killingPlayerId ] === 25 ) {

		if ( GetUnitTypeId( wolves[ killingPlayerId ] ) !== WHITE_WOLF_TYPE ) {

			killingUnit = replaceUnit( wolves[ killingPlayerId ], getWolfType( killingPlayer ) );
			wolves[ killingPlayerId ] = killingUnit;

		} else {

			killingUnit = replaceUnit( wws[ killingPlayerId ], getWolfType( killingPlayer ) );
			wws[ killingPlayerId ] = killingUnit;

		}

		// todo: make this a listener
		phoenixOnSpawn( killingUnit );
		UnitAddItem( killingUnit, CreateItem( CLOAK_TYPE, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ) );

	}

	// Gold bounty
	awardBounty(
		{ x, y },
		{ gold: bounty, experience: 100 + Specialization_GetLevel( killedUnit ) * 25 },
		killingPlayer,
	);

};

const getSheepType = ( p: player ): number => {

	if ( saveskills[ GetPlayerId( p ) ] >= 25 ) return GOLD_SHEEP_TYPE;
	else if ( saveskills[ GetPlayerId( p ) ] >= 15 ) return SILVER_SHEEP_TYPE;
	else if ( saveskills[ GetPlayerId( p ) ] >= 10 ) return BLACK_SHEEP_TYPE;
	return SHEEP_TYPE;

};

const onSheepSave = ( savedUnit: unit, savingUnit: unit ): void => {

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

	}

};

const onWolfDeath = ( wolfUnit: unit ): void =>
	timeout( 5, () =>
		ReviveHero( wolfUnit, - 256, - 832, true ) );

const onWispTK = ( wispUnit: unit ): void => {

	const wispPlayer = GetOwningPlayer( wispUnit );
	const wispPlayerId = GetPlayerId( wispPlayer );
	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, WISP_TYPE, - 256, - 832, 270 );
	SetUnitPathing( wisps[ wispPlayerId ], false );

};

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
