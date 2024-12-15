import { MONSTERS } from "../../constants";
import { MonsterBasicAnimation } from "./base-classes/monster-basic-animation";

export class Slug extends MonsterBasicAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.slug);

		this.hitPoints = 1;
		this.xp = 1;
		this.baseSpeed = 5;
		this.strength = 1;

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.5);
		this.setOffset(4, 10);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
