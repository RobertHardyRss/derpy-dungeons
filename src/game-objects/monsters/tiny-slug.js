import { MONSTERS } from "../../constants";
import { MonsterBasicAnimation } from "./base-classes/monster-basic-animation";

export class TinySlug extends MonsterBasicAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.tinySlug);

		this.hitPoints = 50;
		this.xp = 10;
		this.baseSpeed = 5;
		this.strength = 10;

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.6);
		this.setOffset(4, 6);
	}
}
