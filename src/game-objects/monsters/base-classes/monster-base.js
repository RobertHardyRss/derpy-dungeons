import Phaser from "phaser";
import { IMAGES } from "../../../constants";

export class MonsterBase extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame, monsterName) {
		super(scene, x, y, IMAGES.sprites, frame);

		this.scene.physics.add.existing(this);

		this.monsterName = monsterName;
		this.hp = 1;
		this.xp = 1;

        /** this is how much damage we will do */
		this.strength = 1;

		this.baseSpeed = 50;
	}
}
