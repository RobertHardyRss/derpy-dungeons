import Phaser from "phaser";
import { MonsterBase } from "./monster-base";

export class MonsterFullAnimation extends MonsterBase {
	constructor(scene, x, y, typeName) {
		super(scene, x, y, `${typeName}_idle_anim_f0.png`, typeName);
		this.anims.play(`${this.typeName}_idle`, true);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
			this.anims.play(`${this.typeName}_idle`, true);
		} else {
			this.anims.play(`${this.typeName}_run`, true);
		}
	}
}
