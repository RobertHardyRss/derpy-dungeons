import { SwitchBase } from "./switch-base";
import { SwitchStates } from "./switch-states";

const STATES = new SwitchStates("lever_left.png", "lever_right.png");

export class Lever extends SwitchBase {
	constructor(scene, x, y) {
		super(scene, x, y, STATES);
	}
}
