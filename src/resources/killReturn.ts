
import { goldFactor, fillArrayFn } from "shared";
import { awardBounty } from "util/proximityProportions";
import { onDeath } from "util/event";

// ===========================================================================
// Trigger: miscKillReturn
// ===========================================================================

const Trig_miscKillReturn_Actions = (): void => {

	if ( GetKillingUnit() == null || IsUnitAlly( GetKillingUnit(), GetOwningPlayer( GetTriggerUnit() ) ) )
		return;

	const goldBase = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_BASE );
	const goldDice = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_NUMBER_OF_DICE );
	const goldSides = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_GOLD_BOUNTY_AWARDED_SIDES_PER_DIE );
	const gold = ( goldBase + fillArrayFn( goldDice, () => Math.ceil( Math.random() * goldSides ) ).reduce( ( sum, v ) => sum + v, 0 ) ) * goldFactor();

	const experience = BlzGetUnitIntegerField( GetTriggerUnit(), UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE ) * goldFactor();

	// Gold bounty
	awardBounty(
		{ x: GetUnitX( GetTriggerUnit() ), y: GetUnitY( GetTriggerUnit() ) },
		{ gold, experience },
		GetOwningPlayer( GetKillingUnit() ),
	);

};

// ===========================================================================
onDeath( "kill return", Trig_miscKillReturn_Actions );
