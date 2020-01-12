
import {
	InStr,
	saveskills,
	goldFactor,
	sheepTeam,
	color,
	WORLD_BOUNDS,
	wispTeam,
	WISP_TYPE,
	wolves,
	countHere,
	wolfTeam,
	SmallText,
	sheeps,
	endGame,
	s__wolf_blacktype,
	s__wolf_imbatype,
	WOLF_TYPE,
	SHEEP_TYPE,
	wisps,
	s__wolf_wwtype,
	wws,
	s__wolf_cloakitem,
} from "shared";
import {
	Specialization_GetLevel,
	Specialization_onDeath,
	Specialization_onSave,
	Specialization_onSpawn,
} from "specialization";
import { ScoutPhoenixUpgrade_onSpawn } from "wolves/scoutPhoenixUpgrade";
import { reloadMultiboard } from "misc/multiboard";
import { addScriptHook, W3TS_HOOK } from "w3ts";

const s__sheep_blacktype = FourCC( "uC02" );
const s__sheep_silvertype = FourCC( "u000" );
const s__sheep_goldtype = FourCC( "u001" );

// todo: test this

// ===========================================================================
// Trigger: sheepSaveDeath
// ===========================================================================

const sheepSaveDeath_removeDyingSheepUnits = (): boolean => {

	if ( GetOwningPlayer( GetFilterUnit() ) === GetOwningPlayer( GetTriggerUnit() ) )

		// return UnitDamageTarget(GetKillingUnit(), GetFilterUnit(), 10000, true, false, ATTACK_TYPE_HERO, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS)
		// call KillUnit(GetFilterUnit())
		RemoveUnit( GetFilterUnit() );

	return false;

};

const IsStructureFilter = (): boolean => IsUnitType( GetFilterUnit(), UNIT_TYPE_STRUCTURE );

const replaceUnit = ( u: unit, newType: number ): unit => {

	// General unit props
	const x = GetUnitX( u );
	const y = GetUnitY( u );
	const f = GetUnitFacing( u );
	const p = GetOwningPlayer( u );
	// Hero props
	const l = GetUnitLevel( u );
	const it: Array<number> = [];

	let i = 0;

	// Copy hero props

	while ( true ) {

		if ( i === 6 ) break;
		it[ i ] = GetItemTypeId( UnitItemInSlot( u, i ) );
		i = i + 1;

	}

	// Remove it
	RemoveUnit( u );

	// Create a new one
	u = CreateUnit( p, newType, x, y, f );

	if ( InStr( GetPlayerName( p ), "Grim" ) >= 0 ) {

		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", u, "origin" );
		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", u, "head" );

	}

	SelectUnitForPlayerSingle( u, p );

	// Copy hero props
	SetHeroLevel( u, l, false );
	i = 0;

	while ( true ) {

		if ( i === 6 ) break;
		UnitAddItem( u, CreateItem( it[ i ], x, y ) );
		i = i + 1;

	}

	return u;

};

const getWolfType = ( p: player ): number => {

	if ( saveskills[ GetPlayerId( p ) ] === 10 )

		return s__wolf_blacktype;

	else if ( saveskills[ GetPlayerId( p ) ] === 25 )

		return s__wolf_imbatype;

	return WOLF_TYPE;

};

const GetSheepBounty = ( dyingUnit: unit ): number => {

	const sheepType = GetUnitTypeId( dyingUnit );
	let bounty = 100;
	let u: unit;

	// sheep type bonus

	if ( sheepType === s__sheep_goldtype )

		bounty = bounty + 100;

	else if ( sheepType === s__sheep_silvertype )

		bounty = bounty + 50;

	else if ( sheepType === s__sheep_blacktype )

		bounty = bounty + 25;

	// level bonus
	bounty = bounty + Specialization_GetLevel( dyingUnit ) * 10;

	// farm bonus
	const g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, GetOwningPlayer( dyingUnit ), Filter( IsStructureFilter ) );

	while ( true ) {

		u = FirstOfGroup( g );
		if ( u === null ) break;
		GroupRemoveUnit( g, u );
		bounty = bounty + I2R( BlzGetUnitIntegerField( u, UNIT_IF_GOLD_BOUNTY_AWARDED_BASE ) ) / 2;

	}

	DestroyGroup( g );

	return bounty;

};

const onSheepDeath = ( killedUnit: unit, killingUnit: unit ): void => {

	const killedPlayer = GetOwningPlayer( killedUnit );
	const killedPlayerId = GetPlayerId( killedPlayer );
	const killingPlayer = GetOwningPlayer( killingUnit );
	const killingPlayerId = GetPlayerId( killingPlayer );
	const g = CreateGroup();
	let i: number;

	// Handle dying sheep
	const bounty = GetSheepBounty( killedUnit ) * goldFactor();
	ForceRemovePlayer( sheepTeam, killedPlayer );
	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ killedPlayerId ] + GetPlayerName( killedPlayer ) + "|r has been " + color[ 13 ] + "killed|r by " + color[ GetPlayerId( killingPlayer ) ] + GetPlayerName( killingPlayer ) + "|r!" );
	GroupEnumUnitsInRect( g, WORLD_BOUNDS(), Condition( sheepSaveDeath_removeDyingSheepUnits ) );
	DestroyGroup( g );
	Specialization_onDeath( killedUnit );

	// Move to wisps
	ForceAddPlayer( wispTeam, killedPlayer );
	killedUnit = CreateUnit( killedPlayer, WISP_TYPE, - 256, - 832, 270 );
	wisps[ killedPlayerId ] = killedUnit;
	SetUnitPathing( killedUnit, false );

	if ( InStr( GetPlayerName( killedPlayer ), "Grim" ) >= 0 ) {

		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", killedUnit, "origin" );
		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", killedUnit, "origin" );

	}

	// Increase wolf kills and upgrade
	saveskills[ killingPlayerId ] = saveskills[ killingPlayerId ] + 1;

	if ( saveskills[ killingPlayerId ] === 10 || saveskills[ killingPlayerId ] === 25 ) {

		if ( GetUnitTypeId( wolves[ killingPlayerId ] ) !== s__wolf_wwtype ) {

			killingUnit = replaceUnit( wolves[ killingPlayerId ], getWolfType( killingPlayer ) );
			wolves[ killingPlayerId ] = killingUnit;

		} else {

			killingUnit = replaceUnit( wws[ killingPlayerId ], getWolfType( killingPlayer ) );
			wws[ killingPlayerId ] = killingUnit;

		}

		ScoutPhoenixUpgrade_onSpawn( killingUnit );
		UnitAddItem( killingUnit, CreateItem( s__wolf_cloakitem, GetUnitX( killingUnit ), GetUnitY( killingUnit ) ) );

	}

	// Gold bounty
	i = 0;
	const allyBounty = R2I( bounty / ( I2R( countHere( wolfTeam ) ) + 0.5 ) );
	const killerBounty = R2I( bounty - allyBounty * ( countHere( wolfTeam ) - 1 ) );

	while ( true ) {

		if ( i === 12 ) break;

		if ( GetPlayerSlotState( Player( i ) ) === PLAYER_SLOT_STATE_PLAYING && IsPlayerInForce( Player( i ), wolfTeam ) )

			if ( Player( i ) === killingPlayer ) {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + killerBounty );
				SmallText( killerBounty, wolves[ i ], 14, 0, 0 );

			} else {

				SetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( Player( i ), PLAYER_STATE_RESOURCE_GOLD ) + allyBounty );
				SmallText( allyBounty, wolves[ i ], 14, 0, 0 );

			}

		i = i + 1;

	}

};

const getSheepType = ( p: player ): number => {

	if ( saveskills[ GetPlayerId( p ) ] >= 25 )

		return s__sheep_goldtype;

	else if ( saveskills[ GetPlayerId( p ) ] >= 15 )

		return s__sheep_silvertype;

	else if ( saveskills[ GetPlayerId( p ) ] >= 10 )

		return s__sheep_blacktype;

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
	DisplayTextToPlayer( GetLocalPlayer(), 0, 0, color[ savedPlayerId ] + GetPlayerName( savedPlayer ) + "|r has been " + color[ 12 ] + "saved|r by " + color[ GetPlayerId( savingPlayer ) ] + GetPlayerName( savingPlayer ) + "|r!" );

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

	if ( InStr( GetPlayerName( savedPlayer ), "Grim" ) >= 0 ) {

		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savedUnit, "origin" );
		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savedUnit, "origin" );

	}

	// Increase saves and upgrade
	saveskills[ savingPlayerId ] = saveskills[ savingPlayerId ] + 1;
	Specialization_onSave( savingUnit );

	if ( saveskills[ savingPlayerId ] === 10 || saveskills[ savingPlayerId ] === 15 || saveskills[ savingPlayerId ] === 25 ) {

		savingUnit = replaceUnit( savingUnit, getSheepType( savingPlayer ) );
		sheeps[ savingPlayerId ] = savingUnit;
		SelectUnitForPlayerSingle( savingUnit, savingPlayer );

		if ( InStr( GetPlayerName( savingPlayer ), "Grim" ) >= 0 ) {

			AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", savingUnit, "origin" );
			AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", savingUnit, "origin" );

		}

		Specialization_onSpawn( savingUnit );

	}

	// Bounty
	SetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD, GetPlayerState( savingPlayer, PLAYER_STATE_RESOURCE_GOLD ) + 100 * goldFactor() );
	SmallText( 100 * goldFactor(), savingUnit, 14, 0, 0 );

};

const onWolfDeath = ( wolfUnit: unit, killer: unit ): void => {

	// todo: do we still get gold?
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const killingPlayer = GetOwningPlayer( killer );
	TriggerSleepAction( 5 );
	ReviveHero( wolfUnit, - 256, - 832, true );

};

const onWispTK = ( wispUnit: unit ): void => {

	const wispPlayer = GetOwningPlayer( wispUnit );
	const wispPlayerId = GetPlayerId( wispPlayer );
	wisps[ wispPlayerId ] = CreateUnit( wispPlayer, WISP_TYPE, - 256, - 832, 270 );
	SetUnitPathing( wisps[ wispPlayerId ], false );

	if ( InStr( GetPlayerName( wispPlayer ), "Grim" ) >= 0 ) {

		AddSpecialEffectTarget( "Objects\\Spawnmodels\\Undead\\UndeadDissipate\\UndeadDissipate.mdl", wisps[ wispPlayerId ], "origin" );
		AddSpecialEffectTarget( "Abilities\\Spells\\NightElf\\FaerieDragonInvis\\FaerieDragon_Invis.mdl", wisps[ wispPlayerId ], "origin" );

	}

};

const Trig_sheepSaveDeath_Actions = (): void => {

	let relevantDeath = false;

	// Sheep death

	if ( GetUnitTypeId( GetTriggerUnit() ) === SHEEP_TYPE || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_silvertype || GetUnitTypeId( GetTriggerUnit() ) === s__sheep_goldtype ) {

		onSheepDeath( GetTriggerUnit(), GetKillingUnit() );
		relevantDeath = true;

		// Spirit death (save)

	} else if ( GetUnitTypeId( GetTriggerUnit() ) === WISP_TYPE )

		if ( GetUnitTypeId( GetKillingUnit() ) !== WISP_TYPE ) {

			onSheepSave( GetTriggerUnit(), GetKillingUnit() );
			relevantDeath = true;

		} else onWispTK( GetTriggerUnit() );

	// Wolf death

	else if ( GetUnitTypeId( GetTriggerUnit() ) === WOLF_TYPE || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_blacktype || GetUnitTypeId( GetTriggerUnit() ) === s__wolf_imbatype )

		onWolfDeath( GetTriggerUnit(), GetKillingUnit() );

	if ( relevantDeath ) {

		reloadMultiboard();

		if ( countHere( sheepTeam ) === 0 )
			endGame( 2 );

	}

};

// ===========================================================================
addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	const t = CreateTrigger();
	TriggerRegisterAnyUnitEventBJ( t, EVENT_PLAYER_UNIT_DEATH );
	TriggerAddAction( t, Trig_sheepSaveDeath_Actions );

} );
