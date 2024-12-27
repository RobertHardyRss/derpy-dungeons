import { MONSTERS } from "../../constants";
import { MonsterBasicAnimation } from "./base-classes/monster-basic-animation";
import { MonsterFullAnimation } from "./base-classes/monster-full-animation";

export class PlagueDoctor extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.plagueDoctor);

		this.hitPoints = 1;
		this.xp = 1;
		this.baseSpeed = 5;
		this.strength = 1;

		// adjust hitbox
		this.setSize(8, 14);
		this.setOffset(4, 8);
	}
}
