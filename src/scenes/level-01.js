import Phaser from "phaser";
import { IMAGES, SCENES } from "../constants";
import { Player } from "../game-objects/player";
import { debugCollisions, generateMonstersFromMap } from "../utility";
import { MonsterBase } from "../game-objects/monsters/base-classes/monster-base";
import { WeaponBase } from "../game-objects/weapons/base-classes/weapon-base";

export class Level01 extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.level01 });

		this.playerWeapons;
	}

	preload() {
		this.load.tilemapTiledJSON("level-01", "/tilemaps/level-01.json");
	}

	create() {
		this.scene.run(SCENES.gameUi);

		const map = this.make.tilemap({
			key: "level-01",
			tileHeight: 16,
			tileWidth: 16,
		});

		map.createLayer("floor", map.addTilesetImage("floors", IMAGES.floor));
		const wallLayer = map.createLayer(
			"wall",
			map.addTilesetImage("low-walls", IMAGES.walls)
		);
		map.createLayer("decor", map.addTilesetImage("high-walls", IMAGES.decor));

		wallLayer.setCollisionByProperty({ collides: true });
		debugCollisions(this, wallLayer);

		this.monsters = this.add.group();
		generateMonstersFromMap(map, this.monsters);

		this.playerWeapons = this.add.group();
		this.player = new Player(this, 50, 50, this.playerWeapons);

		this.physics.add.collider(this.player, wallLayer);
		this.physics.add.collider(this.monsters, wallLayer);
		this.physics.add.collider(
			this.playerWeapons,
			wallLayer,
			this.handleWeaponWallCollision,
			undefined,
			this
		);
		this.physics.add.overlap(
			this.playerWeapons,
			this.monsters,
			this.handleWeaponMonsterCollision,
			undefined,
			this
		);
		this.physics.add.overlap(
			this.player,
			this.monsters,
			this.handlePlayerMonsterCollision,
			undefined,
			this
		);

		this.cameras.main.zoom = 3;
		this.cameras.main.startFollow(this.player);
	}

	/**
	 * @param {Player} player
	 * @param {MonsterBase} monster
	 */
	handlePlayerMonsterCollision(player, monster) {
		player.handleMonsterDamage(monster);
	}

	/**
	 * @param {WeaponBase} weapon
	 * @param {MonsterBase} monster
	 */
	handleWeaponMonsterCollision(weapon, monster) {
		let hp = monster.handleWeaponCollision(weapon);
		this.playerWeapons.remove(weapon);
		weapon.destroy();

		if (hp <= 0) {
			this.monsters.remove(monster);
			monster.destroy();
		}
	}

	handleWeaponWallCollision(weapon) {
		this.playerWeapons.remove(weapon);
		weapon.destroy();
	}
}
