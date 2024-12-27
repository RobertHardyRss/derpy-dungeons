import Phaser from "phaser";
import { ANIMS, AUDIO, IMAGES, MONSTERS, SCENES } from "../constants";
import { resetRegistry } from "../utility";

export class Preloader extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.preloader });
		console.log("Preloader constructor");
	}

	preload() {
		console.log("Preloader preload");
		this.load.image(IMAGES.floor, "tilemaps/atlas_floor-16x16.png");
		this.load.image(IMAGES.walls, "tilemaps/atlas_walls_low-16x16.png");
		this.load.image(IMAGES.decor, "tilemaps/atlas_walls_high-16x32.png");

		this.load.atlas(
			IMAGES.sprites,
			"sprites/dungeon-sprites.png",
			"sprites/dungeon-sprites.json"
		);

		this.load.bitmapFont("arcade", "fonts/arcade.png", "fonts/arcade.xml");

		//audio
		this.load.audio(AUDIO.button, "sfx/button.wav");
		this.load.audio(AUDIO.chest, "sfx/chest.wav");
		this.load.audio(AUDIO.doorClose, "sfx/door_close.mp3");
		this.load.audio(AUDIO.doorOpen, "sfx/door_open.mp3");
		this.load.audio(AUDIO.lever, "sfx/lever.wav");
		this.load.audio(AUDIO.monsterDamage[0], "sfx/monster_damage_1.wav");
		this.load.audio(AUDIO.monsterDamage[1], "sfx/monster_damage_2.wav");
		this.load.audio(AUDIO.monsterDamage[2], "sfx/monster_damage_3.wav");
		this.load.audio(AUDIO.monsterDeath, "sfx/monster_death.wav");
		this.load.audio(AUDIO.playerDamage[0], "sfx/player_damage_1.wav");
		this.load.audio(AUDIO.playerDamage[1], "sfx/player_damage_2.wav");
		this.load.audio(AUDIO.playerDamage[2], "sfx/player_damage_3.wav");
		this.load.audio(AUDIO.playerDamage[3], "sfx/player_damage_4.wav");
		this.load.audio(AUDIO.playerDamage[4], "sfx/player_damage_5.wav");
		this.load.audio(AUDIO.playerDamage[5], "sfx/player_damage_6.wav");
		this.load.audio(AUDIO.playerAttackHit, "sfx/axe_hit.wav");
		this.load.audio(AUDIO.playerAttackMiss, "sfx/axe_miss.wav");
		this.load.audio(AUDIO.playerDeath, "sfx/death.wav");
		this.load.audio(AUDIO.playerWalk[0], "sfx/player_walk_stone_1.wav");
		this.load.audio(AUDIO.playerWalk[1], "sfx/player_walk_stone_2.wav");
		this.load.audio(AUDIO.playerWalk[2], "sfx/player_walk_stone_3.wav");
		this.load.audio(AUDIO.music, "music/Goblins_Den.wav");
		this.load.audio(AUDIO.gameOver, "music/Goblins_Dance.wav");
		this.load.audio(AUDIO.heal, "sfx/heal.wav");

		// level tile maps
		this.load.tilemapTiledJSON(SCENES.levelDemo, "tilemaps/level-demo.json");
		this.load.tilemapTiledJSON(SCENES.level01, "tilemaps/level-01.json");
		this.load.tilemapTiledJSON(SCENES.level02, "tilemaps/level-02.json");
	}

	create() {
		console.log("Preloader create");
		resetRegistry(this);

		this.setupAnimations();
		this.scene.start(SCENES.gameUi);
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
