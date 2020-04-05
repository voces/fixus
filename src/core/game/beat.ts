
import { TransitionInformation, transitionsFrom, gameState } from "./common";

transitionsFrom[ "team-selection" ] = (): TransitionInformation => {

	gameState( "beat" );
	return { remaining: 3, title: "Sheep in..." };

};
