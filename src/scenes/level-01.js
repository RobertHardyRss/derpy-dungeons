import Phaser from "phaser";
import { IMAGES, MONSTERS, SCENES } from "../constants";
import { Player } from "../game-objects/player";
import { debugCollisions } from "../utility";
import { Skeleton } from "../game-objects/monsters/skeleton";

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

		map.createLayer("floor", map.addTilesetImage("floors", IMAGES.floor));
		const wallLayer = map.createLayer(
			"wall",
			map.addTilesetImage("low-walls", IMAGES.walls)
		);
		map.createLayer("decor", map.addTilesetImage("high-walls", IMAGES.decor));

		wallLayer.setCollisionByProperty({ collides: true });
		debugCollisions(this, wallLayer);


		this.monsters = this.add.group();

		let monsterObjects = map.createFromObjects("spawns", [
			{
				name: MONSTERS.skeleton,
				key: IMAGES.sprites,
				classType: Skeleton
			}
		]);


		this.player = new Player(this, 50, 50);

		this.physics.add.collider(this.player, wallLayer);

		//this.cameras.main.setOrigin(50, 50);
		this.cameras.main.zoom = 3;
		this.cameras.main.startFollow(this.player);
	}

	update() {
		this.player.update();
	}
}
