import { MonsterFullAnimation } from "./base-classes/monster-full-animation";
import { MONSTERS } from "../../constants";

export class Ogre extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.ogre);

		this.hitPoints = 100;
		this.xp = 200;
		this.baseSpeed = 25;
		this.strength = 50;

		// adjust hitbox
		this.setSize(14, 20);
		this.setOffset(10, 16);
	}
}
