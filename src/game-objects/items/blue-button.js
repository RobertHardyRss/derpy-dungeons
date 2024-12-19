import { AUDIO } from "../../constants";
import { SwitchBase } from "./switch-base";
import { SwitchStates } from "./switch-states";

const STATES = new SwitchStates("button_blue_up.png", "button_blue_down.png");

export class BlueButton extends SwitchBase {
	constructor(scene, x, y) {
		super(scene, x, y, STATES);
		this.sound = AUDIO.button;
	}
}
