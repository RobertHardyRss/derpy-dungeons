import Phaser from "phaser";
import { IMAGES } from "../../constants";

export class Stairs extends Phaser.Physics.Arcade.Sprite {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites);
		/** the destination scene to start */
		this.destination = "";
	}
}
