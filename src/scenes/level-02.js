import Phaser from "phaser";
import { SCENES } from "../constants";
import { LevelBase } from "./level-base";

export class Level02 extends LevelBase {
	constructor() {
		super(SCENES.level02);
	}
}
