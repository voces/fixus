
import {
	getterSetterFunc,
	saveskills,
	sheepTeam,
	wolfTeam,
	color,
	wispTeam,
	countHere,
} from "shared";

export const board: ( newBoard?: multiboard ) => multiboard = getterSetterFunc();

const updateMultiboardRow = (
	index: number,
	value1: string | null,
	icon: string | null,
	value2: string | null,
): void => {

	let mbi = MultiboardGetItem( board(), index, 0 );
	if ( value1 ) MultiboardSetItemValue( mbi, value1 );
	MultiboardSetItemWidth( mbi, 0.1 );
	MultiboardSetItemStyle( mbi, true, false );
	MultiboardReleaseItem( mbi );

	mbi = MultiboardGetItem( board(), index, 1 );
	if ( value2 ) MultiboardSetItemValue( mbi, value2 );

	if ( icon === null ) MultiboardSetItemStyle( mbi, true, false );
	else MultiboardSetItemIcon( mbi, icon );

	MultiboardReleaseItem( mbi );

};

const getSheepIcon = ( i: number ): string => {

	if ( saveskills[ i ] >= 25 ) return "ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp";
	else if ( saveskills[ i ] >= 15 ) return "ReplaceableTextures\\CommandButtons\\BTNDruidOfTheClaw.blp";
	else if ( saveskills[ i ] >= 10 ) return "ReplaceableTextures\\CommandButtons\\BTNSheep.blp";
	return "ReplaceableTextures\\CommandButtons\\BTNPolymorph.blp";

};

const getWolfIcon = ( i: number ): string => {

	if ( saveskills[ i ] >= 25 ) return "ReplaceableTextures\\CommandButtons\\BTNDoomGuard.blp";
	else if ( saveskills[ i ] >= 10 ) return "ReplaceableTextures\\CommandButtons\\BTNDireWolf.blp";
	return "ReplaceableTextures\\CommandButtons\\BTNTimberWolf.blp";

};

export const reloadMultiboard = (): void => {

	let index = 0;
	const oldBoard = board();
	MultiboardDisplay( oldBoard, false );
	DestroyMultiboard( oldBoard );

	const newBoard = CreateMultiboard();
	board( newBoard );
	MultiboardSetTitleText( newBoard, "Ultimate Sheep Tag Fixus" );
	MultiboardSetColumnCount( newBoard, 2 );
	MultiboardSetRowCount(
		newBoard,
		5 + CountPlayersInForceBJ( sheepTeam )
			+ CountPlayersInForceBJ( wolfTeam )
			+ CountPlayersInForceBJ( wispTeam ),
	);

	// sheep
	updateMultiboardRow(
		index,
		color[ 12 ] + "Sheep: " + I2S( countHere( sheepTeam ) ),
		null,
		"Saves",
	);
	index = index + 1;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), sheepTeam ) ) {

			updateMultiboardRow(
				index,
				color[ i ] + GetPlayerName( Player( i ) ),
				getSheepIcon( i ),
				I2S( saveskills[ i ] ),
			);
			index = index + 1;

		}

	updateMultiboardRow( index, null, null, null );
	index = index + 1;

	// Wisps
	updateMultiboardRow(
		index,
		color[ 12 ] + "Wisps: " + I2S( countHere( wispTeam ) ),
		null,
		"Saves",
	);
	index = index + 1;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), wispTeam ) ) {

			updateMultiboardRow(
				index,
				color[ i ] + GetPlayerName( Player( i ) ),
				"ReplaceableTextures\\CommandButtons\\BTNWisp.blp",
				I2S( saveskills[ i ] ),
			);
			index = index + 1;

		}

	updateMultiboardRow( index, null, null, null );
	index = index + 1;

	// Wolves
	updateMultiboardRow(
		index,
		color[ 13 ] + "Wolves: " + I2S( countHere( wolfTeam ) ),
		null,
		"Kills",
	);
	index = index + 1;

	for ( let i = 0; i < bj_MAX_PLAYERS; i ++ )
		if ( IsPlayerInForce( Player( i ), wolfTeam ) ) {

			updateMultiboardRow(
				index,
				color[ i ] + GetPlayerName( Player( i ) ),
				getWolfIcon( i ),
				I2S( saveskills[ i ] ),
			);
			index = index + 1;

		}

	MultiboardDisplay( newBoard, true );

};
