
import { color } from "shared";

export const colorizedName = ( player: player ): string => {

	const id = GetPlayerId( player );
	return `|cff${color[ id ]}${GetPlayerName( player )}|r`;

};

export const displayToPlayer = ( player: player, message: string ): void =>
	DisplayTextToPlayer( player, 0, 0, message );

export const isPlayingPlayer = ( player: player ): boolean =>
	GetPlayerController( GetFilterPlayer() ) === MAP_CONTROL_USER &&
    GetPlayerSlotState( GetFilterPlayer() ) === PLAYER_SLOT_STATE_PLAYING;

export const isComputer = ( player: player ): boolean =>
	GetPlayerController( player ) === MAP_CONTROL_COMPUTER;

export const hasLeft = ( player: player ): boolean =>
	GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_LEFT;
