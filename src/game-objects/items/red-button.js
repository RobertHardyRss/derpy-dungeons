import { AUDIO } from "../../constants";
import { SwitchBase } from "./switch-base";
import { SwitchStates } from "./switch-states";

const STATES = new SwitchStates("button_red_up.png", "button_red_down.png");

export class RedButton extends SwitchBase {
	constructor(scene, x, y) {
		super(scene, x, y, STATES);
		this.sound = AUDIO.button;
	}
}
