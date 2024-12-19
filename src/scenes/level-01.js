import Phaser from "phaser";
import { AUDIO, IMAGES, SCENES } from "../constants";
import { Player } from "../game-objects/player";
import {
	debugCollisions,
	generateCollideItemsFromMap,
	generateOverlapItemsFromMap,
	generateMonstersFromMap,
	generateTraps,
	generateDoors,
	generatePotions,
	getPlayerStart,
} from "../utility";
import { MonsterBase } from "../game-objects/monsters/base-classes/monster-base";
import { WeaponBase } from "../game-objects/weapons/base-classes/weapon-base";
import { Lever } from "../game-objects/items/lever";
import { BlueButton } from "../game-objects/items/blue-button";
import { RedButton } from "../game-objects/items/red-button";
import {
	LargeHealthPotion,
	SmallHealthPotion,
} from "../game-objects/items/health-potion";

export class Level01 extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.level01 });

		this.playerWeapons;
	}

	preload() {
		this.load.tilemapTiledJSON("level-01", "tilemaps/level-01.json");
	}

	create() {
		this.sound.play(AUDIO.music, { loop: true, volume: 0.5 });
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

		this.traps = this.physics.add.staticGroup();
		generateTraps(map, this.traps);

		wallLayer.setCollisionByProperty({ collides: true });
		debugCollisions(this, wallLayer);

		this.collideItems = this.physics.add.staticGroup();
		generateCollideItemsFromMap(map, this.collideItems);

		this.overlapItems = this.physics.add.staticGroup();
		generateOverlapItemsFromMap(map, this.overlapItems);

		this.potions = this.physics.add.staticGroup();
		generatePotions(map, this.potions);

		this.playerWeapons = this.add.group();

		let startVector = getPlayerStart(map);
		this.player = new Player(
			this,
			startVector.x,
			startVector.y,
			this.playerWeapons
		);

		this.monsters = this.add.group();
		generateMonstersFromMap(map, this.monsters);

		map.createLayer("decor", map.addTilesetImage("high-walls", IMAGES.decor));

		this.doors = this.physics.add.staticGroup();
		generateDoors(map, this.doors);

		this.physics.add.collider(this.player, wallLayer);
		this.physics.add.collider(this.monsters, wallLayer);
		this.physics.add.collider(
			this.playerWeapons,
			wallLayer,
			this.handleWeaponWallCollision,
			undefined,
			this
		);
		this.physics.add.collider(
			this.player,
			this.collideItems,
			this.handleCollideItem,
			undefined,
			this
		);

		this.physics.add.collider(this.player, this.doors);
		this.physics.add.collider(this.monsters, this.doors);

		this.physics.add.overlap(
			this.player,
			this.overlapItems,
			this.handleCollideItem,
			undefined,
			this
		);
		this.physics.add.overlap(
			this.monsters,
			this.overlapItems,
			this.handleCollideItem,
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
		this.physics.add.overlap(
			this.player,
			this.traps,
			this.handlePlayerTrapOverlap,
			undefined,
			this
		);

		this.physics.add.overlap(
			this.player,
			this.potions,
			this.handlePlayerPotionOverlap,
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
		player.handleDamageToPlayer(monster, monster.active);
	}

	/**
	 * @param {Player} player
	 * @param {FloorSpikes} trap
	 */
	handlePlayerTrapOverlap(player, trap) {
		player.handleDamageToPlayer(trap, trap.isActive(), false);
	}

	/**
	 * @param {WeaponBase} weapon
	 * @param {MonsterBase} monster
	 */
	handleWeaponMonsterCollision(weapon, monster) {
		this.sound.play(AUDIO.playerAttackHit);
		let hp = monster.handleWeaponCollision(weapon);
		this.playerWeapons.remove(weapon);
		weapon.destroy();

		if (hp <= 0) {
			this.monsters.remove(monster);
			monster.destroy();
		}
	}

	handleWeaponWallCollision(weapon) {
		this.sound.play(AUDIO.playerAttackMiss);
		this.playerWeapons.remove(weapon);
		weapon.destroy();
	}

	/**
	 * @param {Player} player
	 * @param {SmallHealthPotion | LargeHealthPotion} potion
	 */
	handlePlayerPotionOverlap(player, potion) {
		if (player.health >= 100) {
			return;
		}

		player.handlePlayerHealing(potion.strength);
		this.potions.remove(potion);
		potion.destroy();
	}

	/**
	 * @param {Lever | Chest | BlueButton | RedButton} item
	 */
	handleCollideItem(obj, item) {
		item.toggle();
	}
}
