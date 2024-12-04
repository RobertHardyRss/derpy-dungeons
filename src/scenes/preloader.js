import Phaser from "phaser";
import { IMAGES, SCENES } from "../constants";

export class Preloader extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.preloader });
	}

    preload() {
        this.load.image(IMAGES.floor, "/tilemaps/atlas_floor-16x16.png");
    }
}
