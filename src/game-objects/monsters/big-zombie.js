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
		this.setSize(14, 20);
		this.setOffset(10, 16);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
