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

		this.load.bitmapFont("arcade", "/fonts/arcade.png", "/fonts/arcade.xml");
	}

	create() {
		this.registry.set("coins", 0);
		this.registry.set("xp", 0);

		this.setupAnimations();
		this.scene.start(SCENES.level01);
	}

	setupAnimations() {
		this.createPlayerAnimations();
		this.createInteractionAnimations();
		this.createUiAnimations();

		let monstersWithIdleAnimations = [
			MONSTERS.angel,
			MONSTERS.bigDemon,
			MONSTERS.bigZombie,
			MONSTERS.chort,
			MONSTERS.plagueDoctor,
			MONSTERS.goblin,
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
			MONSTERS.iceZombie,
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
			key: ANIMS.player.dead,
			frames: [{ key: IMAGES.sprites, frame: "skull.png" }],
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

	createUiAnimations() {
		this.anims.create({
			key: ANIMS.ui.coin,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "coin_anim_f",
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 9,
			repeat: -1,
		});
	}

	createInteractionAnimations() {
		this.anims.create({
			key: ANIMS.chest.closed,
			frames: [{ key: IMAGES.sprites, frame: "chest_empty_open_anim_f0.png" }],
		});

		this.anims.create({
			key: ANIMS.chest.open,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "chest_empty_open_anim_f",
				suffix: ".png",
				start: 0,
				end: 2,
			}),
			frameRate: 5,
			repeat: 0,
		});

		this.anims.create({
			key: ANIMS.floorSpikes.up,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "floor_spikes_anim_f",
				suffix: ".png",
				start: 0,
				end: 3,
			}),
			frameRate: 9,
			repeat: 0,
		});

		this.anims.create({
			key: ANIMS.floorSpikes.down,
			frames: this.anims.generateFrameNames(IMAGES.sprites, {
				prefix: "floor_spikes_anim_f",
				suffix: ".png",
				start: 3,
				end: 0,
			}),
			frameRate: 9,
			repeat: 0,
		});
	}
}
