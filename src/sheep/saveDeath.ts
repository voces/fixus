
import {
	BLACK_WOLF_TYPE,
	CLOAK_TYPE,
	color,
	countHere,
	goldFactor,
	IMBA_WOLF_TYPE,
	saveskills,
	SHEEP_TYPE,
	sheeps,
	sheepTeam,
	SmallText,
	WHITE_WOLF_TYPE,
	WISP_TYPE,
	wisps,
	wispTeam,
	WOLF_TYPE,
	wolfTeam,
	wolves,
	wws,
} from "shared";
import {
	Specialization_GetLevel,
	Specialization_onDeath,
	Specialization_onSave,
	Specialization_onSpawn,
} from "./specialization";
import { ScoutPhoenixUpgrade_onSpawn } from "wolves/scoutPhoenixUpgrade";
import { reloadMultiboard } from "misc/multiboard";
import { addScriptHook, W3TS_HOOK } from "@voces/w3ts";
import { reducePlayerUnits, forEachPlayerUnit } from "util/temp";
import { colorizedName } from "util/player";
import { endGame } from "../core/game";

const BLACK_SHEEP_TYPE = FourCC( "uC02" );
const SILVER_SHEEP_TYPE = FourCC( "u000" );
const GOLD_SHEEP_TYPE = FourCC( "u001" );

// ===========================================================================
// Trigger: sheepSaveDeath
// ===========================================================================

const isStructureFilter = Filter( (): boolean => IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE ) );

const replaceUnit = ( u: unit, newType: number ): unit => {

	// General unit props
	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );

	// Copy hero props
	const l = GetUnitLevel( u );
	const it: Array<number> = [];
	for ( let i = 0; i < bj_MAX_INVENTORY; i ++ )
		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );

	// Remove it
	RemoveUnit( u );

	// Create a new one
	u = CreateUnit( p, newType, x, y, f );
	SelectUnitForPlayerSingle( u, p );

	// Copy hero props
	SetHeroLevel( u, l, false );
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
		( bounty, u ) => bounty + I2R( BlzGetUnitIntegerField( u, UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) ) * 0.4,
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

	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, `${colorizedName( killedPlayer )} has been ${color[ 13 ]}killed|r by ${colorizedName( killingPlayer )}!` );
	forEachPlayerUnit( killedPlayer, RemoveUnit );
	Specialization_onDeath( killedUnit );

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

		ScoutPhoenixUpgrade_onSpawn( killingUnit );
		UnitAddItem( killingUnit, CreateItem( CLOAK_TYPE, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ) );

	}

	// Gold bounty
	const allyBounty = R2I( bounty / ( I2R( countHere( wolfTeam ) ) + 0.5 ) );
	const killerBounty = R2I( bounty - allyBounty * ( countHere( wolfTeam ) - 1 ) );

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING && IsPlayerInForce( Player( i ), wolfTeam ) )

			if ( Player( i ) === killingPlayer ) {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + killerBounty );
				SmallText( killerBounty, wolves[ i ], 14, 0, 0 );

			} else {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + allyBounty );
				SmallText( allyBounty, wolves[ i ], 14, 0, 0 );

			}

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

	// Handle dying wisp
	ForceRemovePlayer( wispTeam, savedPlayer );
	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, `${colorizedName( savedPlayer )} has been ${color[ 12 ]}saved|r by ${colorizedName( savingPlayer )}!` );

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

	// Bounty
	SetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD ) + 100 * goldFactor() );
	SmallText( 100 * goldFactor(), savingUnit, 14, 0, 0 );

};

const onWolfDeath = ( wolfUnit: unit ): void => {

	PolledWait( 5 );
	ReviveHero( wolfUnit, - 256, - 832, true );

};

const onWispTK = ( wispUnit: unit ): void => {

	const wispPlayer = GetOwningPlayer( wispUnit );
	const wispPlayerId = GetPlayerId( wispPlayer );
	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, WISP_TYPE, - 256, - 832, 270 );
	SetUnitPathing( wisps[ wispPlayerId ], false );

};

const action = (): void => {

	let relevantDeath = false;

	// Sheep death

	if ( GetUnitTypeId( GetTriggerUnit() ) === SHEEP_TYPE || GetUnitTypeId( GetTriggerUnit() ) === BLACK_SHEEP_TYPE || GetUnitTypeId( GetTriggerUnit() ) === SILVER_SHEEP_TYPE || GetUnitTypeId( GetTriggerUnit() ) === GOLD_SHEEP_TYPE ) {

		onSheepDeath( GetTriggerUnit(), GetKillingUnit() );
		relevantDeath = true;

		// Spirit death (save)

	} else if ( GetUnitTypeId( GetTriggerUnit() ) === WISP_TYPE )

		if ( GetUnitTypeId( GetKillingUnit() ) !== WISP_TYPE ) {

			onSheepSave( GetTriggerUnit(), GetKillingUnit() );
			relevantDeath = true;

		} else onWispTK( GetTriggerUnit() );

	// Wolf death

	else if ( GetUnitTypeId( GetTriggerUnit() ) === WOLF_TYPE || GetUnitTypeId( GetTriggerUnit() ) === BLACK_WOLF_TYPE || GetUnitTypeId( GetTriggerUnit() ) === IMBA_WOLF_TYPE )

		onWolfDeath( GetTriggerUnit() );

	if ( relevantDeath ) {

		reloadMultiboard();

		if ( countHere( sheepTeam ) === 0 )
			endGame( "wolves" );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, action );

} );
