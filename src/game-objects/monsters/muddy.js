import { MONSTERS } from "../../constants";
import { MonsterBasicAnimation } from "./base-classes/monster-basic-animation";

export class Muddy extends MonsterBasicAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.muddy);

		this.hitPoints = 50;
		this.xp = 10;
		this.baseSpeed = 0;
		this.strength = 10;
		
		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.8);
		this.setOffset(4, 3);
	}

	// override because muddy's don't move
	updateMovement() {
		return;
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
