
import { W3TS_HOOK, addScriptHook } from "@voces/w3ts";
import { forEachPlayer } from "util/temp";
import { fetch } from "misc/networkio";
import { getTeams } from "./getTeams";
import { sheepTeam, wolfTeam, gameState } from "shared";
import { reloadMultiboard } from "misc/multiboard";
import { transitionGame, TransitionInformation } from "./index";
import { Value } from "misc/json";
import { log } from "util/log";

let preferenceDialog: dialog;
const dialogButtonMap: Map<button, "sheep" | "wolf" | "none"> = new Map();
let remainingDialogs = 0;
let fetchedBiases = false;
let preferences: Map<player, {preference: "sheep" | "wolf" | "none"; netPreference: number}>;
const playerNameToPlayer: Record<string, player> = {};

const finalizeTeams = (): void => {

	const { sheep, wolves } = getTeams( preferences );

	sheep.forEach( p => ForceAddPlayer( sheepTeam, p ) );
	wolves.forEach( p => ForceAddPlayer( wolfTeam, p ) );

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

	fetchedBiases = true;

	log( result );

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

export const selectTeams = (): TransitionInformation => {

	preferences = new Map();

	fetch( "http://localhost:8080/test.txt", null, onFetchBiases );
	forEachPlayer( p => {

		DialogDisplay( p, preferenceDialog, true );
		remainingDialogs ++;
		preferences.set( p, { preference: "none", netPreference: 0 } );

	} );

	gameState( "team-selection" );
	return { remaining: 15, title: "Picking teams..." };

};

addScriptHook( W3TS_HOOK.MAIN_AFTER, (): void => {

	preferenceDialog = DialogCreate();
	DialogSetMessage( preferenceDialog, "Team preference" );

	let button = DialogAddButton( preferenceDialog, "No preference", "N".charCodeAt( 0 ) );
	dialogButtonMap.set( button, "none" );

	button = DialogAddButton( preferenceDialog, "Sheep", "S".charCodeAt( 0 ) );
	dialogButtonMap.set( button, "sheep" );

	button = DialogAddButton( preferenceDialog, "Wolf", "W".charCodeAt( 0 ) );
	dialogButtonMap.set( button, "wolf" );

	forEachPlayer( p => playerNameToPlayer[ GetPlayerName( p ) ] = p );

	const t = CreateTrigger();
	TriggerRegisterDialogEvent( t, preferenceDialog );
	TriggerAddAction( t, onDialogSelection );

} );
