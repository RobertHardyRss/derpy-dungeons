//@ts-check
import Phaser from "phaser";
import { IMAGES } from "../../../constants";

export class WeaponBase extends Phaser.Physics.Arcade.Sprite {
	/**
	 * @param { Phaser.Scene } scene
	 * @param { number } x
	 * @param { number } y
	 * @param { string | number | undefined } frame
	 * @param { Phaser.Math.Vector2 } attackDirection
	 * @param { boolean } flipX
	 */
	constructor(scene, x, y, frame, attackDirection, flipX) {
		super(scene, x, y, IMAGES.sprites, frame);
		this.flipX = flipX;

		this.damage = 1;
		this.coolDownTimer = 500;
		
		this.attackDirection = attackDirection.equals(Phaser.Math.Vector2.ZERO)
			? new Phaser.Math.Vector2(1, 1)
			: attackDirection;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
	}
}
