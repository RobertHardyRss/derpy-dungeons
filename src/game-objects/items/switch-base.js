import Phaser from "phaser";
import { SwitchStates } from "./switch-states";
import { AUDIO, IMAGES } from "../../constants";
import { EVENTS } from "../../events/event-center";

export class SwitchBase extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {SwitchStates} switchStates
	 */
	constructor(scene, x, y, switchStates) {
		super(scene, x, y, IMAGES.sprites);
		this.states = switchStates;
		this.currentState = switchStates.off;
		this.toggleCooldown = 1000;
		this.toggleTimer = 0;
		this.sound = AUDIO.lever;

		/** this will be used when triggered to indicate the target ID of the level  */
		this.targets = null;
	}

	preUpdate(time, delta) {
		if (this.toggleTimer > 0) {
			this.toggleTimer -= delta;
		}

		this.setFrame(this.currentState);
	}

	toggle() {
		if (this.toggleTimer > 0) {
			// don't toggle if we are cooling down
			return;
		}

		this.scene.sound.play(this.sound, { volume: 0.2 });
		this.toggleTimer = this.toggleCooldown;

		if (this.currentState == this.states.off) {
			this.currentState = this.states.on;
		} else {
			this.currentState = this.states.off;
		}

		// emit an event so anything that is a target of this state change can react
		this.scene.events.emit(EVENTS.switchActivated, this.targets);
	}
}
