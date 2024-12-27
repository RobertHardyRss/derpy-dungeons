import { MonsterFullAnimation } from "./base-classes/monster-full-animation";
import { MONSTERS } from "../../constants";

export class OrcShaman extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.orcShaman);

		this.hitPoints = 5;
		this.xp = 10;
		this.baseSpeed = 50;
		this.strength = 5;

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.7);
		this.setOffset(6, 8);
	}
}
