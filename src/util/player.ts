
import { playerColorToColor, color } from "shared";

export const colorizedName = ( player: player ): string =>
	`${color[ playerColorToColor( GetPlayerColor( player ) ) ]}${GetPlayerName( player )}|r`;

export const displayToPlayer = ( player: player, message: string ): void =>
	DisplayTextToPlayer( player, 0, 0, message );

export const isPlayingPlayer = ( player: player ): boolean =>
	GetPlayerController( player ) === MAP_CONTROL_USER &&
    GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_PLAYING;

export const isComputer = ( player: player ): boolean =>
	GetPlayerController( player ) === MAP_CONTROL_COMPUTER;

export const hasLeft = ( player: player ): boolean =>
	GetPlayerSlotState( player ) === PLAYER_SLOT_STATE_LEFT;
