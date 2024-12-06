import Phaser from "phaser";
import { IMAGES } from "../constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");

		this.speed = 100;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.keys = this.scene.input.keyboard.createCursorKeys();
	}

	create() {}

	update() {
		if (this.keys.left.isDown) {
			this.setVelocityX(-this.speed);
		} else if (this.keys.right.isDown) {
			this.setVelocityX(this.speed);
		} else {
			this.setVelocityX(0);
		}

		if (this.keys.up.isDown) {
			this.setVelocityY(-this.speed);
		} else if (this.keys.down.isDown) {
			this.setVelocityY(this.speed);
		} else {
			this.setVelocityY(0);
		}
	}
}
