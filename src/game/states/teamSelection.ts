
import { W3TS_HOOK, addScriptHook } from "@voces/w3ts";
import { forEachPlayer, timeout, mapEachPlayer } from "util/temp";
import { fetch } from "util/networkio";
import { getTeams } from "./helpers/getTeams";
import { sheepTeam, wolfTeam, isSandbox, TriggerRegisterPlayerEventAll } from "shared";
import { reloadMultiboard } from "util/multiboard";
import {
	gameState,
	transitionGame,
	TransitionInformation,
	transitionsFrom,
} from "./common";
import { Value } from "util/json";
import { isPlayingPlayer, isComputer } from "util/player";
import { defineStringValue } from "w3ts-w3mmd";
import { colorize } from "util/colorize";
import { zoom } from "commands/zoom";
import { wrappedTriggerAddAction } from "util/emitLog";

let preferenceDialog: dialog;
const dialogButtonMap: Map<button, "sheep" | "wolf" | "none"> = new Map();
const remainingDialogs: Set<player> = new Set();
let fetchedBiases = false;
let preferences: Map<
	player,
	{preference: "sheep" | "wolf" | "none"; netPreference: number}
>;
const playerNameToPlayer: Record<string, player> = {};

const logPreference = defineStringValue( "preference", "none" );
const logMode = defineStringValue( "mode", "none" );
const logTeam = defineStringValue( "team", "none" );

const finalizeTeams = (): void => {

	[ ...preferences.entries() ].forEach( ( [ player, preference ] ) =>
		logPreference( player, preference.preference ) );

	const { sheep, wolves } = getTeams( preferences );

	if ( isSandbox() ) {

		for (
			let i = 2 - sheep.length, n = 0;
			n < bj_MAX_PLAYERS && i > 0;
			n ++
		)
			if (
				! sheep.includes( Player( n ) ) &&
				! wolves.includes( Player( n ) )
			) {

				sheep.push( Player( n ) );
				i --;

			}

		if ( wolves.length === 0 )
			for ( let n = 0; n < bj_MAX_PLAYERS; n ++ )
				if (
					! sheep.includes( Player( n ) ) &&
					! wolves.includes( Player( n ) )
				) {

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

	zoom();

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
	remainingDialogs.delete( player );

	const preference = dialogButtonMap.get( GetClickedButton() );
	if ( preference == null ) throw `unexpected preference '${preference}'`;

	const prevPreference = preferences.get( player );
	if ( ! prevPreference )
		throw `unexpected lack of preference for player ${GetPlayerName( player )}`;

	prevPreference.preference = preference;

	if ( remainingDialogs.size === 0 && fetchedBiases )
		finalizeTeams();

};

const onFetchBiases = ( result: Value ): void => {

	if ( fetchedBiases ) return;

	fetchedBiases = true;

	if ( result != null && typeof result === "object" )

		Object.entries( result ).forEach( ( [ key, value ] ) => {

			// make sure we have the right shape
			if ( typeof value !== "number" ) throw "bad shape on response";

			// make sure the key is a palyer
			const player = playerNameToPlayer[ key ];
			if ( ! player ) {

				const players = Object.keys( playerNameToPlayer ).join( ", " );
				throw `key does not result in a player (key: ${key}, players: ${players})`;

			}

			// make sure we have a preference
			const prevPreference = preferences.get( player );
			if ( ! prevPreference )
				throw `unexpected lack of preference for player ${GetPlayerName( player )}`;

			prevPreference.netPreference = value;

		} );

	if ( remainingDialogs.size === 0 && fetchedBiases )
		finalizeTeams();

};

const createDialog = (): void => {

	preferenceDialog = DialogCreate();
	DialogSetMessage( preferenceDialog, "Team preference" );

	dialogButtonMap.set(
		DialogAddButton(
			preferenceDialog,
			`${colorize.white( "N" )}${colorize.gold( "o preference" )}`,
			"N".charCodeAt( 0 ),
		),
		"none",
	);

	dialogButtonMap.set(
		DialogAddButton(
			preferenceDialog,
			`${colorize.white( "S" )}${colorize.gold( "heep" )}`,
			"S".charCodeAt( 0 ),
		),
		"sheep",
	);

	dialogButtonMap.set(
		DialogAddButton(
			preferenceDialog,
			`${colorize.white( "W" )}${colorize.gold( "olf" )}`,
			"W".charCodeAt( 0 ),
		),
		"wolf",
	);

	const t = CreateTrigger();
	TriggerRegisterDialogEvent( t, preferenceDialog );
	wrappedTriggerAddAction( t, "team selection dialog", onDialogSelection );

};

const selectTeams = (): TransitionInformation => {

	preferences = new Map();

	if ( preferenceDialog == null ) createDialog();

	const playerNames =
		mapEachPlayer( p => isPlayingPlayer( p ) ? GetPlayerName( p ) : null )
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
		remainingDialogs.add( p );

	} );

	timeout( "team select", 14.75, () => {

		if ( remainingDialogs.size > 0 || ! fetchedBiases ) {

			forEachPlayer( p => DialogDisplay( p, preferenceDialog, false ) );
			remainingDialogs.clear();

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

	const t = CreateTrigger();
	TriggerRegisterPlayerEventAll( t, EVENT_PLAYER_LEAVE );
	wrappedTriggerAddAction( t, "teamSelection leave", () => {

		if ( remainingDialogs.size === 0 && fetchedBiases ) return;

		const leaver = GetTriggerPlayer();

		preferences.delete( leaver );
		remainingDialogs.delete( leaver );

		if ( remainingDialogs.size === 0 && fetchedBiases )
			finalizeTeams();

	} );

} );
