import { MonsterFullAnimation } from "./base-classes/monster-full-animation";
import { MONSTERS } from "../../constants";

export class BigDemon extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.bigDemon);

		this.hitPoints = 500;
		this.xp = 1000;
		this.baseSpeed = 100;
		this.strength = 50;

		// adjust hitbox
		this.setSize(14, 24);
		this.setOffset(10, 12);
	}

}
