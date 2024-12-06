import Phaser from "phaser";
import { IMAGES } from "../constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");
	}
}
