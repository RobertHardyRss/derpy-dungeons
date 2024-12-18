import { MonsterBase } from "./monster-base";

export class MonsterFullAnimation extends MonsterBase {
	constructor(scene, x, y, monsterName) {
		super(scene, x, y, `${monsterName}_idle_anim_f0.png`, monsterName);
		this.anims.play(`${monsterName}_idle`, true);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (this.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
			this.anims.play(`${monsterName}_idle`, true);
		} else {
			this.anims.play(`${monsterName}_run`, true);
		}
	}
}
