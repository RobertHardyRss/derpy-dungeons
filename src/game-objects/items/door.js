import Phaser from "phaser";
import { AUDIO, IMAGES } from "../../constants";
import { EVENTS } from "../../events/event-center";

export class Door extends Phaser.Physics.Arcade.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);

		/** the target ID for this instance, gets set when object is created on the map */
		this.target = 0;

		this.isOpened = false;

		this.scene.events.on(EVENTS.switchActivated, this.toggle, this);
	}

	toggle(target) {
		if (this.target !== target) {
			return;
		}

		this.isOpened = !this.isOpened;

		if (this.isOpened) {
			this.setFrame("doors_leaf_open.png");
			this.body.checkCollision.none = true;
			this.scene.sound.play(AUDIO.doorOpen);
		} else {
			this.setFrame("doors_leaf_closed.png");
			this.body.checkCollision.none = false;
			this.scene.sound.play(AUDIO.doorClose);
		}
	}
}
