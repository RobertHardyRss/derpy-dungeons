import Phaser from "phaser";
import { IMAGES } from "../../constants";

export class LargeHealthPotion extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);
		this.strength = Phaser.Math.Between(60, 100);
	}
}

export class SmallHealthPotion extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);
		this.strength = Phaser.Math.Between(20, 40);
	}
}
