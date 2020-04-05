
import { W3TS_HOOK, addScriptHook } from "@voces/w3ts";
import { forEachPlayer, timeout, mapEachPlayer } from "util/temp";
import { fetch } from "misc/networkio";
import { getTeams } from "./getTeams";
import { sheepTeam, wolfTeam, isSandbox } from "shared";
import { reloadMultiboard } from "misc/multiboard";
import { transitionGame, TransitionInformation, gameState, transitionsFrom } from "./common";
import { Value } from "misc/json";
import { isPlayingPlayer, isComputer } from "util/player";
import { defineStringValue } from "stats/w3mmd";

let preferenceDialog: dialog;
const dialogButtonMap: Map<button, "sheep" | "wolf" | "none"> = new Map();
let remainingDialogs = 0;
let fetchedBiases = false;
let preferences: Map<player, {preference: "sheep" | "wolf" | "none"; netPreference: number}>;
const playerNameToPlayer: Record<string, player> = {};

const logPreference = defineStringValue( "preference", "none" );
const logMode = defineStringValue( "mode", "none" );
const logTeam = defineStringValue( "team", "none" );

const finalizeTeams = (): void => {

	[ ...preferences.entries() ].forEach( ( [ player, preference ] ) =>
		logPreference( player, preference.preference ) );

	const { sheep, wolves } = getTeams( preferences );

	if ( isSandbox() ) {

		for ( let i = 2 - sheep.length, n = 0; n < bj_MAX_PLAYERS && i > 0; n ++ )
			if ( ! sheep.includes( Player( n ) ) && ! wolves.includes( Player( n ) ) ) {

				sheep.push( Player( n ) );
				i --;

			}

		if ( wolves.length === 0 )
			for ( let n = 0; n < bj_MAX_PLAYERS; n ++ )
				if ( ! sheep.includes( Player( n ) ) && ! wolves.includes( Player( n ) ) ) {

					wolves.push( Player( n ) );
					break;

				}

	}

	sheep.forEach( p => {

		logMode( p, "sheep" );
		logTeam( p, "sheep" );
		ForceAddPlayer( sheepTeam, p );

	} );

	wolves.forEach( p => {

		logMode( p, "wolf" );
		logTeam( p, "wolf" );
		ForceAddPlayer( wolfTeam, p );

	} );

	SetForceAllianceStateBJ( sheepTeam, sheepTeam, bj_ALLIANCE_ALLIED_VISION );
	SetForceAllianceStateBJ( sheepTeam, wolfTeam, bj_ALLIANCE_UNALLIED );
	SetForceAllianceStateBJ( wolfTeam, sheepTeam, bj_ALLIANCE_UNALLIED );
	SetForceAllianceStateBJ( wolfTeam, wolfTeam, bj_ALLIANCE_ALLIED_VISION );

	reloadMultiboard();

	transitionGame();

};

const onDialogSelection = (): void => {

	const player = GetTriggerPlayer();

	DialogDisplay( player, preferenceDialog, false );
	remainingDialogs --;

	const preference = dialogButtonMap.get( GetClickedButton() );
	if ( ! preference ) throw `unexpected preference '${preference}'`;

	const prevPreference = preferences.get( player );
	if ( ! prevPreference ) throw `unexpected lack of preference for player ${GetPlayerName( player )}`;

	prevPreference.preference = preference;

	if ( remainingDialogs === 0 && fetchedBiases )
		finalizeTeams();

};

const onFetchBiases = ( result: Value ): void => {

	if ( fetchedBiases ) return;

	fetchedBiases = true;

	if ( result && typeof result === "object" )

		Object.entries( result ).forEach( ( [ key, value ] ) => {

			// make sure we have the right shape
			if ( typeof value !== "number" ) throw "bad shape on response";

			// make sure the key is a palyer
			const player = playerNameToPlayer[ key ];
			if ( ! player )
				throw `key does not result in a player (key: ${key}, players: ${Object.keys( playerNameToPlayer ).join( ", " )})`;

			// make sure we have a preference
			const prevPreference = preferences.get( player );
			if ( ! prevPreference ) throw `unexpected lack of preference for player ${GetPlayerName( player )}`;

			prevPreference.netPreference = value;

		} );

	if ( remainingDialogs === 0 && fetchedBiases )
		finalizeTeams();

};

const selectTeams = (): TransitionInformation => {

	preferences = new Map();

	if ( preferenceDialog == null ) {

		preferenceDialog = DialogCreate();
		DialogSetMessage( preferenceDialog, "Team preference" );

		dialogButtonMap.set(
			DialogAddButton( preferenceDialog, "No preference", "N".charCodeAt( 0 ) ),
			"none",
		);

		dialogButtonMap.set(
			DialogAddButton( preferenceDialog, "Sheep", "S".charCodeAt( 0 ) ),
			"sheep",
		);

		dialogButtonMap.set(
			DialogAddButton( preferenceDialog, "Wolf", "W".charCodeAt( 0 ) ),
			"wolf",
		);

		const t = CreateTrigger();
		TriggerRegisterDialogEvent( t, preferenceDialog );
		TriggerAddAction( t, onDialogSelection );

	}

	const playerNames = mapEachPlayer( p => isPlayingPlayer( p ) ? GetPlayerName( p ) : null )
		.filter( p => p != null )
		.join( "," );

	fetch(
		`http://api.w3x.io/preferences?map=fixus&players=${playerNames}`,
		null,
		onFetchBiases,
	);

	forEachPlayer( p => {

		if ( isComputer( p ) || isPlayingPlayer( p ) )
			preferences.set( p, { preference: "none", netPreference: 0 } );

		if ( ! isPlayingPlayer( p ) ) return;

		DialogDisplay( p, preferenceDialog, true );
		remainingDialogs ++;

	} );

	timeout( 14.75, () => {

		if ( remainingDialogs > 0 || ! fetchedBiases ) {

			forEachPlayer( p => DialogDisplay( p, preferenceDialog, false ) );
			remainingDialogs = 0;

			fetchedBiases = true;

			finalizeTeams();

		}

	} );

	gameState( "team-selection" );
	return { remaining: 15, title: "Picking teams..." };

};
transitionsFrom[ "init" ] = selectTeams;

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	forEachPlayer( p => playerNameToPlayer[ GetPlayerName( p ) ] = p );

} );
