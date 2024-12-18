import Phaser from "phaser";
import { SwitchStates } from "./switch-states";
import { IMAGES } from "../../constants";
import { EVENTS, sceneEvents } from "../../events/event-center";

export class SwitchBase extends Phaser.Physics.Arcade.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {SwitchStates} switchStates
	 */
	constructor(scene, x, y, switchStates) {
		super(scene, x, y, IMAGES.sprites);
		this.scene.add.existing(this);
		// add as a static body so it can't be moved
		this.scene.physics.add.existing(this, true);

		this.states = switchStates;
		this.currentState = switchStates.off;

		/** this will be used when triggered to indicate the target ID of the level  */
		this.targets = null;
	}

	preUpdate() {
		this.setFrame(this.currentState);
	}

	toggle() {
		if (this.currentState == this.states.off) {
			this.currentState = this.states.on;
		} else {
			this.currentState = this.states.off;
		}

		// emit an event so anything targets of this state change can react
		sceneEvents.emit(EVENTS.switchActivated, this.targets);
	}
}
