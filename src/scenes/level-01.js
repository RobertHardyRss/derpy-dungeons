import Phaser from "phaser";
import { SCENES } from "../constants";
import { LevelBase } from "./level-base";

export class Level01 extends LevelBase {
	constructor() {
		super(SCENES.level01);
	}

	preload() {
		this.load.tilemapTiledJSON("level-01", "tilemaps/level-01.json");
	}
}
