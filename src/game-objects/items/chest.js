import Phaser from "phaser";
import { ANIMS, IMAGES } from "../../constants";
import { EVENTS, sceneEvents } from "../../events/event-center";

export class Chest extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);

		this.anims.play(ANIMS.chest.closed);
		this.isOpened = false;
		this.coins = Phaser.Math.Between(50, 500);
	}

	toggle() {
		if (this.isOpened) {
			return;
		}

		this.isOpened = true;
		this.anims.play(ANIMS.chest.open);
		sceneEvents.emit(EVENTS.player.coinsChanged, this.coins);
	}
}
