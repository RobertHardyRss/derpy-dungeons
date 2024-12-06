import Phaser from "phaser";
import { IMAGES, SCENES } from "../constants";

export class Preloader extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.preloader });
	}

	preload() {
		this.load.image(IMAGES.floor, "/tilemaps/atlas_floor-16x16.png");
		this.load.image(IMAGES.walls, "/tilemaps/atlas_walls_low-16x16.png");
		this.load.image(IMAGES.decor, "/tilemaps/atlas_walls_high-16x32.png");

		this.load.atlas(
			IMAGES.sprites,
			"/sprites/dungeon-sprites.png",
			"/sprites/dungeon-sprites.json"
		);
	}

	create() {
		this.scene.start(SCENES.level01);
	}
}
