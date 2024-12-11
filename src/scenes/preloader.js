import Phaser from "phaser";
import { ANIMS, IMAGES, SCENES } from "../constants";

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
		this.setupAnimations();
		this.scene.start(SCENES.level01);
	}

	setupAnimations() {
		this.anims.create({
			key: ANIMS.player.hit,
			frames: [{ key: IMAGES.sprites, frame: "knight_f_hit_anim_f0.png" }],
		});

		this.anims.create({
			key: ANIMS.player.idle,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "knight_f_idle_anim_f",
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 9,
			repeat: -1,
		});

		this.anims.create({
			key: ANIMS.player.run,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "knight_f_run_anim_f",
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 12,
			repeat: -1,
		});
	}
}
