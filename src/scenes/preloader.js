import Phaser from "phaser";
import { ANIMS, IMAGES, MONSTERS, SCENES } from "../constants";

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
		this.createPlayerAnimations();

		let monstersWithIdleAnimations = [
			MONSTERS.angel,
			MONSTERS.bigDemon,
			MONSTERS.bigZombie,
			MONSTERS.chort,
			MONSTERS.plagueDoctor,
			MONSTERS.goblin,
			MONSTERS.iceZombie,
			MONSTERS.imp,
			MONSTERS.maskedOrc,
			MONSTERS.ogre,
			MONSTERS.orcShaman,
			MONSTERS.orcWarrior,
			MONSTERS.pumpkinDude,
			MONSTERS.skeleton,
			MONSTERS.tinyZombie,
			MONSTERS.wogol,
		];

		for (let name of monstersWithIdleAnimations) {
			this.createFullMonsterAnimations(name);
		}

		let monstersWithBasicAnimations = [
			MONSTERS.muddy,
			MONSTERS.necromancer,
			MONSTERS.slug,
			MONSTERS.swampy,
			MONSTERS.tinySlug,
			MONSTERS.zombie,
		];

		for (let name of monstersWithBasicAnimations) {
			this.createBasicMonsterAnimations(name);
		}
	}

	createPlayerAnimations() {
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

	createFullMonsterAnimations(namePrefix) {
		this.anims.create({
			key: `${namePrefix}_idle`,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: `${namePrefix}_idle_anim_f`,
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 9,
			repeat: -1,
		});

		this.anims.create({
			key: `${namePrefix}_run`,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: `${namePrefix}_run_anim_f`,
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 12,
			repeat: -1,
		});
	}

	createBasicMonsterAnimations(namePrefix) {
		this.anims.create({
			key: `${namePrefix}`,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: `${namePrefix}_anim_f`,
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 12,
			repeat: -1,
		});
	}
}
