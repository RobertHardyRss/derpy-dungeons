import { MonsterFullAnimation } from "./base-classes/monster-full-animation";
import { MONSTERS } from "../../constants";

export class BigZombie extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.bigZombie);

		this.hitPoints = 100;
		this.xp = 200;
		this.baseSpeed = 25;
		this.strength = 50;

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.65);
		this.setOffset(8, 12);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
