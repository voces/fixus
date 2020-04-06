
import { timeout } from "util/temp";

export const onWolfDeath = ( wolfUnit: unit ): void =>
	timeout( 5, () =>
		ReviveHero( wolfUnit, - 256, - 832, true ) );
