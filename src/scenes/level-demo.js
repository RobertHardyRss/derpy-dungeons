import Phaser from "phaser";
import { SCENES } from "../constants";
import { LevelBase } from "./level-base";

export class LevelDemo extends LevelBase {
	constructor() {
		super(SCENES.levelDemo);
	}
}
