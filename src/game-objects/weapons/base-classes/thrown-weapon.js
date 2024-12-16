//@ts-check
import Phaser from "phaser";
import { WeaponBase } from "./weapon-base";

export class ThrownWeapon extends WeaponBase {
	/**
	 * @param { Phaser.Scene } scene
	 * @param { number } x
	 * @param { number } y
	 * @param { string | number | undefined } frame
	 * @param { Phaser.Math.Vector2 } attackDirection
	 * @param { boolean } flipX
	 */
	constructor(scene, x, y, frame, attackDirection, flipX) {
		super(scene, x, y, frame, attackDirection, flipX);
		this.flipX = flipX;

		this.speed = 200;
	}

	init() {
		let speed = new Phaser.Math.Vector2(this.speed, this.speed);
		let velocity = speed.multiply(this.attackDirection);

		velocity.normalize().scale(this.speed);
		this.setVelocity(velocity.x, velocity.y);
	}
}
