import Phaser from "phaser";
import { ANIMS, IMAGES } from "../../constants";
import { SwitchStates } from "./switch-states";
import { EVENTS } from "../../events/event-center";

const STATES = new SwitchStates(ANIMS.floorSpikes.down, ANIMS.floorSpikes.up);

export class FloorSpikes extends Phaser.Physics.Arcade.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);
		// this.scene.physics.add.existing(this, true);

		this.currentState = STATES.on;
		this.anims.play(this.currentState);
		/** the target ID for this instance, gets set when object is created on the map */
		this.target = 0;

		this.strength = 5;
		this.scene.events.on(EVENTS.switchActivated, this.toggle, this);
	}

	isActive() {
		return this.currentState === STATES.on;
	}

	toggle(target) {
		if (this.target !== target) {
			return;
		}

		if (this.currentState === STATES.on) {
			this.currentState = STATES.off;
		} else {
			this.currentState = STATES.on;
		}
		this.anims.play(this.currentState, true);
	}
}
