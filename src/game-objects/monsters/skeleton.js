import { MONSTERS } from "../../constants";
import { MonsterFullAnimation } from "./base-classes/monster-full-animation";

export class Skeleton extends MonsterFullAnimation {
	constructor(scene, x, y) {
		super(scene, x, y, MONSTERS.skeleton);

		this.hp = 5;
		this.xp = 10;
		this.baseSpeed = 50;
		this.strength = 5;
	}
}
