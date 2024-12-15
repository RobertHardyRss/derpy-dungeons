import Phaser from "phaser";
import { IMAGES, SCENES, GIDS } from "../constants";
import { Player } from "../game-objects/player";
import { debugCollisions, generateMonstersFromMap } from "../utility";
import { Skeleton } from "../game-objects/monsters/skeleton";
import { BigDemon } from "../game-objects/monsters/big-demon";
import { BigZombie } from "../game-objects/monsters/big-zombie";

export class Level01 extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.level01 });
	}

	preload() {
		this.load.tilemapTiledJSON("level-01", "/tilemaps/level-01.json");
	}

	create() {
		const map = this.make.tilemap({
			key: "level-01",
			tileHeight: 16,
			tileWidth: 16,
		});

		const floorTiles = map.addTilesetImage("floors", IMAGES.floor);
		const floorLayer = map.createLayer("floor", floorTiles);

		const wallTiles = map.addTilesetImage("low-walls", IMAGES.walls);
		const wallLayer = map.createLayer("wall", wallTiles);

		wallLayer.setCollisionByProperty({ collides: true });
		debugCollisions(this, wallLayer);

		const decorTiles = map.addTilesetImage("high-walls", IMAGES.decor);
		const decorLayer = map.createLayer("decor", decorTiles);

		this.monsters = generateMonstersFromMap(map);
		this.player = new Player(this, 50, 50);

		this.physics.add.collider(this.player, wallLayer);
		this.physics.add.collider(this.monsters, wallLayer);
		this.physics.add.overlap(this.monsters, this.monsters);

		this.physics.add.collider(
			this.player,
			this.monsters,
			this.handlePlayerMonsterCollision,
			undefined,
			this
		);

		this.cameras.main.zoom = 3;
		this.cameras.main.startFollow(this.player);
	}

	update(time, delta) {
		this.player.update();
		this.monsters.forEach((m) => m.update(time, delta));
	}

	handlePlayerMonsterCollision(player, monster) {
		
	}
}
