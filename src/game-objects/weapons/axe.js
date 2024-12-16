import Phaser from "phaser";
import { ThrownWeapon } from "./base-classes/thrown-weapon";
import { WEAPONS } from "../../constants";

export class Axe extends ThrownWeapon {
	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {Phaser.Math.Vector2} [attackDirection]
	 */
	constructor(scene, x, y, attackDirection, flipX) {
		super(scene, x, y, WEAPONS.axe, attackDirection, flipX);
		this.damage = 10;
		this.speed = 150;
		this.coolDownTimer = 2000;

		this.init();

		this.scene.tweens.add({
			targets: this,
			duration: 500,
			repeat: -1,
			angle: { from: 0, to: flipX ? -360 : 360 },
		});
	}
}
