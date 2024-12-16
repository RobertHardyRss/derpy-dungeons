import Phaser from "phaser";
import { MonsterBase } from "./monster-base";

export class MonsterBasicAnimation extends MonsterBase {
	constructor(scene, x, y, typeName) {
		super(scene, x, y, `${typeName}_anim_f0.png`, typeName);
		this.anims.play(this.typeName, true);
	}
}
