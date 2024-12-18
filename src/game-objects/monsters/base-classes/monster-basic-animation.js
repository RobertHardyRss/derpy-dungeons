import { MonsterBase } from "./monster-base";

export class MonsterBasicAnimation extends MonsterBase {
	constructor(scene, x, y, monsterName) {
		super(scene, x, y, `${monsterName}_anim_f0.png`, monsterName);
		this.anims.play(monsterName, true);
	}
}
